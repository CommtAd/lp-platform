# implementation-brief-02.md — パターンC（ブライダルフェア）制作指示書

## 0. コンテキスト

ブライダルフェア（式場の来館予約）案件をLP基盤に載せるための指示書。
基盤（LPShell / LPForm / clients テーブル / CV転送）は業種非依存なので**一切分けない**。
分けるのは以下の3レイヤーだけ。

| レイヤー | 分け方 | 実体 |
|---|---|---|
| デザインテンプレ | パターンCを新設 | `apps/lp/clients/_base-c/`, `clients/pattern-c.types.ts` |
| 公開ドメイン | `bridal-lp.commitad.com` を追加 | 同一Vercelプロジェクトにドメイン追加（§5） |
| ダッシュボード分類 | `clients.industry` | `supabase/migrations/0015_client_industry.sql` |

リポジトリ・Vercelプロジェクト・LPShell・LPForm・フォーム送信先は**フィットネスと共通のまま**。
分けると基盤改善が二重管理になり、Vercelのプロジェクト追加費用も発生する。

## 1. パターンCの位置づけ

- パターンA = ピラティス／ジムの体験申込（消費者向け・ネイビー×ゴールド×生成り）
- パターンB = B2B支援パック（ネイビー×白×オレンジ・ゴシックのみ）
- **パターンC = ブライダルフェアの来館予約（生成り×チャコール×シャンパンゴールド）**

3つは独立したデザインシステム。**混ぜない**（CLAUDE.md）。

CVが「フェア来館予約」であることがパターンCの設計を決めている。
体験入会でも資料請求でもないので、次の3点が骨格になる。

1. **特典を金額つきで並べる**。業界の慣習であり比較軸。
   来館特典（`privilege`・数万円規模）と成約特典（`grandOffer`・百万円規模）は
   条件も桁も違うので、必ず別セクションで扱う。
2. **体験できることをカルーセルで見せる**。写真が主役の商材なので、
   グリッドに詰めるより1枚を大きく見せたほうが決まる。
3. **フォームで来館希望日を必ず取る**。これがないと式場側が枠を押さえられない。

## 2. セクション構成

ヘッダー → FV（会場写真＋キャッチ＋訴求バンド＋オファーチップ）→ 限定特典（成約特典）
→ 開催日程 → 施設紹介（カルーセル）→ 体験できること（カルーセル）→ おすすめな方
→ 来館特典（金額＋TOTAL）→ 会場ギャラリー → 選ばれる理由 → プラン例
→ 先輩カップルの声 → 当日の流れ → FAQ → アクセス（tel: 付き）→ 予約概要 → 予約フォーム

`experience`（体験できること）と `facility`（施設紹介）は同じ `Carousel` を共有する。
写真の比率だけ `facility.aspect` で変えられる（会場のパノラマ写真は 4:3 だと左右が切れる）。

**順序は固定。ただし `pattern-c.types.ts` で `?` の付いたセクションは丸ごと省略できる**
（`grandOffer` / `schedule` / `recommend` / `gallery` / `reasons` / `plan` / `voices` /
`faq` / `overview`）。式場によって出せる情報が大きく違うため、揃わない項目を
空欄やダミーで埋めるより落とすほうが仕上がりが良い。`page.tsx` が自動でスキップする。

必須なのは header / fv / experience / privilege / flow / access / form の7つ。

## 3. 確定デザイン要素（変更禁止）

- 配色: 生成り `#FBF8F3` × チャコール `#3B3730` × シャンパンゴールド `#B99653`。
- 見出しは明朝（Shippori Mincho）、英字キッカーは Playfair Display のイタリック、本文はゴシック。
- FVは**写真全面＋下方向グラデーション**。パターンAの縦書きキャッチは使わない。
  会場写真は明るいものが多いので、スクリムに加えて白文字側に text-shadow を入れてある。
  最も強い金額訴求は `fv.highlight` のゴールドバンドに入れる（白文字だと写真に沈む）。
- 横位置素材を使うときは `fv.heroAspect` を緩める（既定 "3 / 4" は縦位置向け）。
- **FVのスライド素材は人物を下半分に置く。** `framed` のプレートがFVの上から約55%を
  覆うので、顔がそれより上だと隠れる。横位置を縦長で受けると横しかトリミングされず
  `position` では上下に動かせないため、素材そのものを切り直す必要がある。
- 特典バンド（限定特典・来館特典）の地色を変えるときは `band` を指定する。
  **ブランドゴールド `#B99653` は中間トーンなので、中間色の地に置くと金額が消える**
  （`#A49483` 上で 1.06:1）。明るい地にするなら `band.accent` / `band.rule` を濃色に、
  `forest-terrace-hiroshima/config.ts` が実例。
- **金額は白プレート＋深い金 `#8C6B2F`（`goldOnWhite`）で置くのがパターンCの固定ルール。**
  FV訴求・FV下サマリー・限定特典・来館特典カード・TOTAL のすべてで揃えている。
  数字部分は `amountEmphasis()` が自動で特大にするので、`amount` は素の文字列でよい。
- モバイル単一カラム（max-width 480px）。デスクトップ専用レイアウトは作らない。
- 特典・プランの金額は**必ず顧客確認を取ってから**記載する。
  二重価格（`was` → `price`）は根拠のある通常価格がある場合のみ。

## 4. 制作手順

1. ダッシュボードで枠を作る。**業種は「ブライダル」を選ぶ**。slug をコピーする。
2. `apps/lp/clients/_base-c/` を `apps/lp/clients/{slug}/` にコピーする。
3. `config.ts` を実データに差し替える。`page.tsx` / `FaqAccordion.tsx` / `TelLink.tsx` は触らない。
4. 画像は `apps/lp/public/clients/{slug}/` に置き、`config.ts` からパス参照する。
5. `clients/registry.ts` の3つのマップに slug を登録する。
6. `npm run check-rules` と `npm run check-slug-sync` を通す。
7. `npm run build` を通してからPRを出す。

## 5. ドメイン追加手順（初回のみ）

`fitness-lp.commitad.com` の配下にブライダルLPをぶら下げないための作業。

1. お名前.com で `bridal-lp` の CNAME を `cname.vercel-dns.com` に向ける。
2. Vercel の **lp プロジェクト**（新規プロジェクトではない）の Settings → Domains に
   `bridal-lp.commitad.com` を追加する。
3. 検証が通ったら `https://bridal-lp.commitad.com/{slug}` で表示される。

同一プロジェクトにドメインを足すだけなので、デプロイもコードも1本のまま・追加費用なし。
技術的には両ドメインが同じアプリを指すため、`fitness-lp.commitad.com/{slug}` でも
ブライダルLPは表示できてしまう。顧客に案内するURLが分かれれば運用上は十分。
URL自体を業種で塞ぐ必要が出たら、`apps/lp/middleware.ts` にホスト別のガードを足す。

顧客ごとの独自ドメイン（例 `fair.example-wedding.jp`）が必要な場合は、
ダッシュボードの「独自ドメイン」欄がそのまま使える（Phase 3 実装済み）。

## 6. 受け入れ条件

- [ ] `npm run check-rules` / `npm run check-slug-sync` / `npm run build` がすべて通る
- [ ] LPShell 経由でタグが注入される（本番で Pixel の発火を確認）
- [ ] フォーム送信が submissions に記録され、通知メールが届く
- [ ] `tel:` タップで tel_tap が記録される（`TelLink` を使っていれば自動）
- [ ] ダッシュボードの「ブライダル」タブに表示される
- [ ] 375px 幅で横スクロールが発生しない
