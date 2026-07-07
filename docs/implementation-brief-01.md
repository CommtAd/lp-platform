# implementation-brief-01.md — 基盤構築 + パターンAコード化 実装指示書

> 対象セッション: Claude Code(初回実装)
> 親ドキュメント: lp-platform-spec.md(全体仕様。本書はその実装第1弾の具体指示)
> ゴール: LP基盤の心臓部を作り、Claude Designで確定したパターンAを規約準拠コードにする

---

## 0. コンテキスト

- 広告代理店の営業がピラティススタジオ等のLPを制作・公開する基盤を構築中
- デザインはClaude Designで確定済み(パターンA = THE PERSONAL PILATES)
- **一方通行ルール**: 以降の修正はすべてコード側で行う。Claude Designには戻らない
- 入力素材:
  - Claude Designからのハンドオフコード(パターンA)
  - 全ページ縦長スクショ(見た目の検収基準。`design-refs/pattern-a/` に配置)
  - HTMLエクスポート(参照用の保険。同フォルダに配置)

## 1. リポジトリ初期化

lp-platform-spec.md セクション4の構成に従いmonorepoを作成する。

```
lp-platform/
├ apps/
│ ├ lp/                    # Next.js(App Router) LP配信アプリ
│ │ ├ app/[slug]/page.tsx
│ │ ├ clients/
│ │ │ ├ _base-a/          # パターンA原型テンプレ(本書で作る)
│ │ │ └ the-personal-pilates/  # 実顧客LP(本書で作る)
│ │ └ components/
│ │   ├ LPShell.tsx
│ │   ├ LPForm.tsx
│ │   └ StickyFooterCTA.tsx
│ └ dashboard/             # 今回は空プレースホルダのみ(Phase 1は次回)
├ packages/shared/
├ supabase/
│ ├ migrations/
│ └ functions/form-submit/
├ design-refs/pattern-a/   # スクショ・HTML(検収基準、ビルド対象外)
└ CLAUDE.md
```

技術スタック: Next.js(App Router) + TypeScript + Tailwind + Supabase。
Vercelデプロイ前提(1プロジェクト、Deploy Hook運用)。

## 2. Supabaseスキーマ(migrations作成)

lp-platform-spec.md セクション5の通り3テーブルを作成:

- **clients**: slug / name / status(draft|published|unpublished) / owner_user_id /
  commitad_client_id / custom_domain / use_custom_domain_as_canonical /
  meta_pixel_id / ga4_id / gtm_id / line_tag_id / meta_domain_verification /
  cv_events(jsonb) / created_at / updated_at
- **submissions**: id(冪等キー) / client_id / event_type / form_data(jsonb) /
  utm(jsonb) / user_agent / referrer / occurred_at
- **pending_webhooks**: id / submission_id / payload / attempts / next_retry_at /
  status(pending|delivered|failed)

RLS:
- 営業ロール: owner_user_id = auth.uid() の行のみ全操作可
- submissions のINSERTは service_role(Edge Function)のみ
- 営業は自分の顧客のsubmissionsのみSELECT可

## 3. 基盤コンポーネント実装

### 3.1 LPShell.tsx(必須ラッパー)

- props: `clientSlug`
- clientsテーブルから該当行を取得し:
  - meta_pixel_id / ga4_id / gtm_id / line_tag_id が存在するものだけ該当タグをheadに注入
  - meta_domain_verification があれば `<meta name="facebook-domain-verification">` を注入
  - status が published 以外なら noindex + 画面上部に「非公開プレビュー」バナー
- URLのUTMパラメータ(source/medium/campaign/content/term)をsessionStorageに保持
- 子要素はそのままレンダリング(デザインに干渉しない)

### 3.2 LPForm.tsx(必須フォーム)

- 送信先: Supabase Edge Function `form-submit` の絶対URL。
  **送信先URLはpropsで受け取らない(型レベルで変更不可にする)**
- 送信時:
  - event_id(uuid)を生成し、ペイロードに含める
  - 同じevent_idでMeta Pixelの `Lead` イベントを発火(Pixel IDが設定されている場合)
  - sessionStorageのUTMを添付
- フィールド構成・クラス名はpropsで上書き可能(見た目は自由)
- デフォルトフィールド: 希望店舗(選択) / 名前 / 電話 / メール / 希望日時×2 / 相談内容
- 送信成功時: サンクス表示(将来サンクスページに差し替え可能な構造に)
- `trackEvent(type: 'tel_tap' | 'line_tap')` ヘルパーもエクスポート
  (tel:リンク・LINEリンクに付与し、submissionsへ記録)

### 3.3 form-submit Edge Function

lp-platform-spec.md セクション7の通り:
1. バリデーション → submissions INSERT
2. CommitAd Webhook へPOST(URL・HMACシークレットは環境変数。未設定ならスキップしログのみ)
3. 失敗時 pending_webhooks に積む
※ CommitAd側の受信実装は別セッション。送信側だけ完成させる

### 3.4 StickyFooterCTA.tsx

パターンAの追従フッター(「90分体験¥0|入会金¥0」+予約ボタン)を共通部品化。
- props: オファー文言、ボタンテキスト、スクロール先アンカー
- 全セクション末尾との被り防止: ページ最下部にフッター高さ分の余白を自動確保

## 4. パターンAの規約載せ替え

ハンドオフコードを `_base-a/` として以下の変換を行う:

1. 全体をLPShellでラップ
2. 予約フォームをLPFormに差し替え(**見た目は現デザインを完全維持**。
   design-refs/pattern-a/ のスクショと見比べて差分ゼロを目指す)
3. 追従フッターをStickyFooterCTAに置換
4. 画像プレースホルダ(「ピラティスのシーン写真」等)を config.ts のパス参照に置換。
   すべて aspect-ratio + object-fit: cover で受け、差し替えで崩れない構造に
5. config.ts に集約する項目:
   - slug / メタ情報(title / description / OGP)
   - 画像パス一覧(スロット名をキーに)
   - モニター募集バッジの表示ON/OFF(**デフォルトON**)
   - 店舗情報(国分寺店・吉祥寺店の住所・営業時間・アクセス)
6. 二重価格表記(11,000円→0円 / 33,000円→0円)は顧客確認済み。そのまま維持
7. tel:リンク・LINEリンクが存在する場合は trackEvent を付与

**保持すべき確定デザイン要素**(変更禁止):
- ネイビー×ゴールド×生成りの配色、明朝見出し×ゴシック本文
- セクション構成: ヘッダー(オファーバー) → FV(縦書きキャッチ) → 90分お試し体験(0円+6項目の円形アイコン) → 入会金0円 → 料金(1回7,150円) → スタジオについて → 悩み共感4枚 → 選ばれる3つの理由 → 通い方シーン3例 → トレーナー紹介(スワイプ) → 90分体験の流れ3ステップ → FAQ4問 → 店舗案内2店 → 予約フォーム
- 「業界最安クラス」は削除済み。復活させない

## 5. 実顧客LPの分離

`_base-a/` 完成後、`the-personal-pilates/` としてコピーし:
- _base-a/ 側: テキストをダミー化(文字数は実データと同等の長さを維持)、
  画像はプレースホルダに戻す → 以降のテンプレA改善はこちらで行う
- the-personal-pilates/ 側: 実データのまま → この顧客の本番・運用はこちら

## 6. CLAUDE.md 作成

lp-platform-spec.md セクション9の7項目に加え、以下を追記:

- 「新規LP制作時は必ず brief.md を読み、assets/ 内のデザイン参照画像を確認してから着手」
- 「Claude Designの出力コードを直接持ち込まない。ベーステンプレート(_base-*)からの差分適用で制作する」
- 「コード化後のデザイン修正はコード側で行う。Claude Designに戻らない(一方通行ルール)」
- 「参照画像のデザインは参考にしてよいが、画像素材そのものをLPに流用しない」

## 7. CIチェック(簡易)

`clients/*/page.tsx` に LPShell と LPForm のimportが存在することを検証する
スクリプトを scripts/check-rules.ts として作成し、CI(GitHub Actions)で実行。

## 8. 受け入れ条件

- [ ] `npm run dev` で /the-personal-pilates が表示され、モバイル幅375pxで
      design-refs/pattern-a/ のスクショと視覚的に一致する
- [ ] フォーム送信 → submissionsに行が入る → (Webhook未設定のため)ログにスキップ記録
- [ ] clientsテーブルにダミーPixel IDを入れると、ページのheadにPixelタグが注入される
- [ ] status=draft のとき noindex + プレビューバナーが出る
- [ ] check-rules.ts がパスする
- [ ] 追従フッターとコンテンツの被りがない(全セクション実機確認)

## 9. このセッションでやらないこと

- ダッシュボード実装(Phase 1、次セッション)
- CommitAd側のWebhook受信(別セッション)
- CAPI送信(Phase 2オプション)
- 独自ドメイン対応・HTML納品(Phase 3/4)
