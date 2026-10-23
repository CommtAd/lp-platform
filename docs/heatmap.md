# ヒートマップ分析（自社実装）

外部SaaS（Microsoft Clarity / Hotjar など）を使わず、LPのクリック位置と
スクロール到達を自分の Supabase に溜めてダッシュボードで可視化する。
既存のタグ注入と同じ経路（`clients` の列 → 公開RPC → LPShell）に乗っているので、
**各LPの `page.tsx` には何も足さなくてよい。**

**既定はOFF（オプトイン）。分析したい案件だけダッシュボードでONにする。**
全案件で回し続けると、使わないデータで無料枠の500MBを削ることになる。
同じDBに `submissions`（CV）が入っているので、容量が詰まると一番落としては
いけないフォーム送信の記録まで止まる。分析が終わったらOFFに戻してよい
（それまでのデータは残る）。

## 何を保存しているか

| 保存するもの | 保存しないもの |
| --- | --- |
| クリック座標（キャンバス座標） | 入力欄の中身 |
| 押されたボタン・リンクの文字 | セッション録画・DOMスナップショット |
| スクロールの最大到達深さ | Cookie・個人の識別子 |
| 滞在時間・画面サイズ・UTM | IPアドレス |

- セッション識別子は `sessionStorage` に置く。タブを閉じれば消えるので、
  同じ人が開き直すと別セッションとして数える（Cookieは使わない）。
- ブラウザの「追跡しない（DNT）」が有効な訪問者は計測しない。
- ダッシュボードのヒートマップ画面はLPを iframe で表示するが、
  収集スクリプトは iframe 内では動かないので自分の閲覧は混ざらない。

## 座標の取り方（この実装の肝）

LPは「幅390pxの1枚のキャンバス」で、表示幅に応じて `zoom` でキャンバスごと
拡大縮小される（CLAUDE.md §16）。生の `clientX/Y` を保存すると端末ごとに
倍率の違う座標が混ざるので、キャンバスの矩形を基準に割り戻して
**キャンバス座標**（＝390px設計上の座標）に直してから送る。

```
scale = canvas.getBoundingClientRect().width / canvas.offsetWidth
x     = (clientX - rect.left) / scale / canvas.offsetWidth   // 0〜1 の比率
y     = (clientY - rect.top)  / scale                        // キャンバス座標px
```

`getBoundingClientRect().top` はスクロールに応じて動くので、y はスクロール量を
足さずにそのまま求まる。

実測（`hotel-racine`、同じ要素の同じクリック）:

| 表示幅 | zoom | 記録された x | 記録された y |
| --- | --- | --- | --- |
| 1280px | 1.231 | 0.29167 | 6725 |
| 360px | 0.923 | 0.29167 | 6720 |

ダッシュボードは幅390pxの iframe にLPを出すので、iframe の中では `zoom` が 1 に
なり、保存した座標がそのまま重なる。

### 横幅ずれ防止ルールの対象外である既存17本

`.lp-canvas` を持たないので、body から「背の高い子が1つだけ」の連鎖を辿り、
幅が body より狭くなった時点＝中央寄せカラム（`maxWidth: 480`）を
キャンバス代わりにする。body をそのまま使うと、PC幅では body が1280px・
中身が480pxになり、クリックのx比率が中央に潰れる（実測で確認）。

キャンバスが可変幅なので端末ごとにページ全高が変わる。そのため
`heatmap_sessions.page_height_px` を一緒に保存し、ダッシュボード側で
y を比率に直してから重ねている。

## 構成

| 場所 | 役割 |
| --- | --- |
| `supabase/migrations/0038_heatmap.sql` | テーブル2つ・記録RPC・掃除関数・`clients.heatmap_enabled` |
| `supabase/migrations/0039_heatmap_opt_in.sql` | `heatmap_enabled` を既定OFFに（オプトイン化） |
| `apps/lp/components/HeatmapTracker.tsx` | 収集。LPShell が全LPに差し込む |
| `apps/lp/components/LPShell.tsx` | `heatmap_enabled` を見てトラッカーを出す |
| `packages/shared/index.ts` | 型と集計ヘルパー（`heatmapPoints` / `scrollReach` / `clickRanking`） |
| `apps/dashboard/app/clients/[id]/heatmap/` | 可視化画面（iframe + canvas オーバーレイ） |

書き込みは `record_heatmap`（SECURITY DEFINER）だけ。テーブルへの anon INSERT は
開けていない。関数側で slug を解決し、値域を丸め、1回あたり300件で切っている。

## 運用

- **ON/OFF**: ダッシュボードの案件詳細 →「ヒートマップ分析」。**既定はOFF。**
  分析したい案件だけONにする。ONの案件は次のSQLで一覧できる。
  ```sql
  select slug, name from public.clients where heatmap_enabled order by slug;
  ```
- **送信タイミング**: 表示2秒後・15秒ごと・離脱時（`fetch` の `keepalive`）。
- **保持期間**: 自動削除はしていない。オプトインなので当面は溜まらないが、
  増えてきたら SQL エディタで `select public.prune_heatmap(90);`
  （90日より古いセッションと、そこにぶら下がるクリックを消す）。
  増え方は次のSQLで見る。
  ```sql
  select pg_size_pretty(pg_total_relation_size('public.heatmap_clicks')) as clicks,
         pg_size_pretty(pg_total_relation_size('public.heatmap_sessions')) as sessions;
  ```
  なお、LPを修正するとページの高さも構成も変わるため、修正前のクリックは
  修正後のLPには重ならない。古いデータは分析には使えないものとして扱う。
- **読み込み上限**: 1画面あたり20,000行。超える案件は期間を短くする。

## 読み方の注意

- `position: sticky` のヘッダー／追従CTAと、横スクロールするカルーセルの中身は
  「押した時に指があった位置」で記録される（DOM上の位置ではない）。
  何枚目のスライドを押したかは座標からは分からないので、
  **「押された要素」ランキングと併せて読む。**
- 下書き・非公開のLPは iframe にプレビュー帯（約33px）が出るぶん、
  オーバーレイが下にずれて重なる。分析は公開中のLPで行う前提。
