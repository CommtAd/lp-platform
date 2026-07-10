# lp-platform-spec.md — LP制作・公開基盤 実装仕様書

> 作成日: 2026-07-06
> 用途: Claude Code実装セッションの起点ドキュメント
> 関連システム: CommitAd（CV連携先）

---

## 1. コンセプト

広告代理店の営業メンバー（現在3名、デザインスキルあり）が、各自の顧客（主にピラティススタジオ）のLP管理者となる。

- **制作**: Claude Codeで自由にデザイン・実装（テンプレ固定にしない）
- **基盤の責務**: 公開・タグ注入・CV受信と転送の自動化に特化
- **CV以降のデータ**: CommitAdへWebhook連携（リード管理・成果報告・Slack通知はCommitAd側の責務）

### 基盤の4つのコア機能

1. 制作（スターターキット + CLAUDE.md規約）
2. 公開（パス方式標準、独自ドメイン・HTML納品はオプション）
3. タグ注入（コードに書かせず、Supabaseから自動注入）
4. CV受信と転送（Edge Functionで受信 → CommitAdへWebhook）

---

## 2. 確定済み設計判断

| 論点 | 決定 | 理由 |
|---|---|---|
| Claude契約 | Pro×3（$60/月） | Team最低5シート縛りの回避。営業5名到達時にTeam移行 |
| リポジトリ | monorepo（`apps/lp/{slug}/`） | 顧客ごとにrepo/Vercelプロジェクトを増やさない |
| デプロイ | Vercel 1プロジェクト・1シート | マシンアカウント + Deploy Hookで営業分のシート費回避。営業をVercelチームに入れない |
| 公開URL | パス方式が本番標準（`agency-lp.com/{slug}/`） | DNS作業ゼロ。ドメイン評判共有リスクは初期は許容 |
| 顧客ドメイン | オプション対応（CNAME + middleware書き換え） | 発生時のみ。Phase 3 |
| HTML納品 | 買い切りオプション（凍結納品と顧客に明示） | Phase 4。要望が出てから半日規模で実装 |
| タグ管理 | LPShellがSupabaseから自動注入 | 営業はダッシュボードでIDを貼るだけ |
| 制作規約 | LPShellとフォームのみ必須、他は自由 | CLAUDE.mdでClaude Codeに規約を伝える |
| CV連携 | CommitAdへWebhook（方式A・疎結合） | CVは案件の成果データなのでCommitAd側が正 |
| CAPI送信 | **必須ではない。Phase 2オプション** | Pixelのみで8〜9割捕捉可能。広告費の大きい顧客向けの上位プラン材料として温存 |

---

## 3. システム構成

```
┌─ 制作 ────────────────┐   ┌─ 基盤 ─────────────────────────┐
│ 営業 × Claude Code     │   │ GitHub monorepo                 │
│  └ スターターキット     │ → │  └ apps/lp/{client-slug}/       │
│  └ CLAUDE.md 規約      │   │ Vercel（1プロジェクト配信）       │
│  └ PR = プレビューURL   │   │  └ middleware: ホスト判定→slug   │
└───────────────────────┘   │ Supabase                        │
                             │  └ clients / submissions        │
┌─ 運用 ────────────────┐   │  └ Edge Function（フォーム受口）  │
│ 管理ダッシュボード       │ → │      └→ CommitAd Webhook        │
│ （Next.js + Supabase）  │   └────────────────────────────────┘
└───────────────────────┘
```

### 技術スタック

- LP配信: Next.js（App Router、`app/[slug]/page.tsx` 動的ルート）+ Vercel
- ダッシュボード: Next.js + Supabase（同monorepo内 `apps/dashboard/`）
- DB / フォーム受け口: Supabase（Postgres + Edge Functions）
- CI/CD: GitHub → Vercel Deploy Hook（マシンアカウント経由）

---

## 4. リポジトリ構成

```
lp-platform/
├ apps/
│ ├ lp/                    # LP配信アプリ（Vercelデプロイ対象）
│ │ ├ app/[slug]/page.tsx  # slug → 顧客フォルダ解決
│ │ ├ middleware.ts        # Phase 3: ホスト判定
│ │ ├ clients/             # 顧客別LP実装
│ │ │ ├ _template/         # スターターキット
│ │ │ └ {client-slug}/
│ │ └ components/
│ │   ├ LPShell.tsx        # 必須ラッパー（タグ注入の受け口）
│ │   └ LPForm.tsx         # 必須フォーム（送信先固定）
│ └ dashboard/             # 管理ダッシュボード
├ packages/shared/          # 型定義・Supabaseクライアント共有
├ supabase/
│ ├ migrations/
│ └ functions/
│   ├ form-submit/         # フォーム受信 + Webhook転送
│   └ webhook-retry/       # 再送処理（cron）
├ scripts/
│ └ export-html.ts         # Phase 4: 静的書き出し
└ CLAUDE.md                # 制作規約（営業向け）
```

---

## 5. Supabaseスキーマ

### clients

| カラム | 型 | 備考 |
|---|---|---|
| id | uuid PK | |
| slug | text UNIQUE | URLパス。英数ハイフンのみ |
| name | text | 顧客名 |
| status | enum | draft / published / unpublished |
| owner_user_id | uuid FK | 担当営業。RLSの基準 |
| commitad_client_id | text | CommitAd案件との紐づけキー |
| custom_domain | text NULL | Phase 3 |
| use_custom_domain_as_canonical | boolean | Phase 3: 301+canonical切り替えフラグ |
| meta_pixel_id | text NULL | |
| ga4_id | text NULL | |
| gtm_id | text NULL | |
| line_tag_id | text NULL | |
| meta_domain_verification | text NULL | Phase 3: ドメイン認証メタタグ |
| cv_events | jsonb | CVイベント定義（form_submit / tel_tap / line_tap） |
| created_at / updated_at | timestamptz | |

### submissions（送信ログ・生データのみ）

| カラム | 型 | 備考 |
|---|---|---|
| id | uuid PK | 冪等キーとしてWebhookに載せる |
| client_id | uuid FK | |
| event_type | text | form_submit / tel_tap / line_tap |
| form_data | jsonb | |
| utm | jsonb | source / medium / campaign / content / term |
| user_agent / referrer | text | |
| occurred_at | timestamptz | |

※ CV一覧UIはダッシュボードに作らない（CommitAdで見る）。障害調査用の生ログテーブルという位置づけ。

### pending_webhooks（再送キュー）

| カラム | 型 | 備考 |
|---|---|---|
| id | uuid PK | |
| submission_id | uuid FK | |
| payload | jsonb | |
| attempts | int | 最大リトライ回数超過でアラート |
| next_retry_at | timestamptz | 指数バックオフ |
| status | enum | pending / delivered / failed |

### RLS方針

- 営業ロール: `owner_user_id = auth.uid()` の行のみ全操作可（各営業＝自分の顧客の管理者）
- 管理者ロール（Tomo）: 全行アクセス可
- submissions: 営業は自分の顧客分のみSELECT可、INSERT はEdge Function（service_role）のみ

---

## 6. LPShell / LPForm 仕様

### LPShell（必須ラッパー）

```tsx
<LPShell clientSlug="studio-a">
  {/* 営業が自由に作る領域 */}
</LPShell>
```

- clientsテーブルからタグID群を取得し、Pixel / GA4 / GTM / LINEタグをheadに注入
- `meta_domain_verification` があればメタタグ注入（Phase 3）
- status が published 以外なら noindex + 非公開表示
- UTMパラメータをセッション保持（フォーム送信時に添付）

### LPForm（必須フォームコンポーネント）

- 送信先: Supabase Edge Function `form-submit` の絶対URL（**変更禁止**。HTML納品時も動作させるため）
- 見た目のprops（クラス・フィールド構成）は自由に上書き可
- 送信時: event_id を生成し、Pixelの `Lead` イベントにも同じ event_id を付与（将来のCAPI重複排除に備えた布石。実装コストほぼゼロなので最初から入れる）
- tel: リンク・LINEリンクのタップ計測用に `trackEvent(type)` ヘルパーも同梱

---

## 7. CommitAd連携（Webhook）

### フロー

```
LPForm → Edge Function form-submit
  1. バリデーション・submissions INSERT
  2. CommitAd /api/webhooks/lp-conversion へPOST
  3. 失敗時: pending_webhooks に積む → cron再送（指数バックオフ）
```

### ペイロード

```json
{
  "submission_id": "uuid",
  "commitad_client_id": "xxx",
  "lp_slug": "studio-a",
  "event_type": "form_submit",
  "form_data": { "name": "...", "tel": "..." },
  "utm": { "source": "...", "campaign": "..." },
  "occurred_at": "2026-07-06T12:00:00+09:00"
}
```

### 信頼性要件（手を抜かない）

- **HMAC署名**: 共有シークレットで `X-Signature` ヘッダ付与。CommitAd側で検証
- **冪等性**: submission_id で二重計上防止（CommitAd側でUNIQUE制約）
- **再送**: 最大5回・指数バックオフ。超過時はTomoへアラート（CommitAdのSlack経由）

### CommitAd側の受け入れ実装（別セッションで対応）

- `/api/webhooks/lp-conversion` エンドポイント新設
- 署名検証 + submission_id UNIQUE
- commitad_client_id → 案件解決 → Slack通知・成果集計に接続

---

## 8. ダッシュボード機能（フェーズ別）

### Phase 1 — MVP

- [ ] 顧客レコード作成・一覧（RLS: 担当営業は自分の顧客のみ）
- [ ] タグID登録フォーム → LPShell自動注入
- [ ] 公開/非公開切り替え → Vercel Deploy Hook発火
- [ ] commitad_client_id 紐づけ入力

### Phase 2 — 運用強化

- [ ] Webhook配信ステータス表示（pending_webhooks監視）
- [ ] （オプション・顧客要望ベース）Meta CAPI送信
  - LP基盤側で受信時に即時送信する方式を採用（イベントマッチ品質優先）
  - event_id はLPForm実装済みのものを流用（重複排除対応済み）
  - メール・電話番号のSHA-256ハッシュ化必須
  - 広告費の大きい顧客向け上位プランの営業材料として提案

### Phase 3 — 独自ドメイン対応（該当顧客が現れたら）

- [ ] middleware: ホスト判定 → clientsテーブルでslug解決 → rewrite
- [ ] Vercelドメイン追加API連携 + ステータス表示（設定待ち/確認中/公開済み）
- [ ] DNS設定依頼文テンプレ出力（CNAME/Aレコード2種・スクショ付き・「請求メールを検索」の案内文含む）
- [ ] 301リダイレクト + canonical切り替え（use_custom_domain_as_canonical）
- [ ] Metaドメイン認証メタタグ注入

### Phase 4 — HTML納品（要望が出たら・半日規模）

- [ ] export-html.ts: 対象slugのみ静的ビルド → アセットパス調整 → zip
- [ ] ダッシュボードにダウンロードボタン
- [ ] CORS許可ドメイン登録フロー（Edge Function側）
- [ ] ホスト型 vs HTML納品の顧客向け比較表（営業ツール）

---

## 9. CLAUDE.md（制作規約）に書く内容

1. LPは `apps/lp/clients/{slug}/` 配下に作成。`_template/` をコピーして開始
2. **LPShellで全体をラップすること（削除・迂回禁止）**
3. **フォームはLPFormを使用。送信先URLの変更禁止**。見た目のカスタマイズは自由
4. tel:リンク・LINEリンクには `trackEvent()` を付与
5. それ以外のデザイン・構成・アニメーションは完全に自由
6. 画像は `clients/{slug}/assets/` に配置、next/image使用
7. 公開フロー: PR作成 → プレビューURLで顧客確認 → mainマージ → ダッシュボードで公開ボタン

---

## 10. 月額コスト（営業3名体制）

| 項目 | 月額 |
|---|---|
| Claude Pro ×3 | $60 |
| Vercel Pro ×1シート | $20 |
| Supabase Pro | $25 |
| ドメイン（既存お名前.com活用・按分） | ~$1.5 |
| **合計** | **約$107 ≒ ¥16,000/月** |

- LP追加の限界コストはほぼゼロ
- 顧客6〜7社 × 月5,000円のホスティング費で全額回収
- 営業5名到達時: Claude Team移行を再検討（Pro×5=$100 vs Team=$150）

---

## 11. 実装ロードマップ

1. **Supabaseスキーマ + LPShell/LPForm + form-submit Edge Function**（基盤の心臓部）
2. **CommitAd Webhook連携**（送信側。受信側はCommitAdセッションで）
3. **スターターキット + CLAUDE.md**
4. **既存LP 1本を移植してパイロット**（営業1名で試験運用）
5. **ダッシュボード Phase 1**
6. 以降 Phase 2 → 3 → 4 は必要が生じた順

---

## 12. 未決事項・持ち越し

- CommitAd側の受け入れエンドポイント実装（別セッション）
- 営業向け手順書（1枚もの）の作成
- HTML納品時の料金設定（買い切り価格・更新都度費用）
- ドメイン評判リスクの再評価タイミング（広告配信顧客が増えた段階でパス方式→独自ドメイン推奨への切り替え判断）
