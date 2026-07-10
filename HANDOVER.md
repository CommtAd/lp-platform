# HANDOVER — lp-platform 引き継ぎメモ

最終更新: 2026-07-08（フォーム通知メール〈Brevo〉実装・複数宛先対応済み）

営業向けLP制作・公開プラットフォーム。仕様は `docs/lp-platform-spec.md`、制作規約は `CLAUDE.md`、初期ブリーフは `docs/implementation-brief-01.md`。

## 完成済み

### 1. LP移植（パターンA / THE PERSONAL PILATES）
- `apps/lp/clients/the-personal-pilates/` — 実顧客LP。375px でデザイン参照（`design-refs/pattern-a/`）と一致確認済み。
- `apps/lp/clients/_base-a/` — パターンA原型テンプレ（ダミーテキスト＋プレースホルダ画像）。新規顧客はこれをコピーして `config.ts` を差し替える。
- `page.tsx` / `FaqList.tsx` は両者で同一。差分は `config.ts` のみ。

### 2. Supabase 実接続（クラウド）
- プロジェクト: `iqnpypvlpvhneiveihns`（詳細はメモリ `project_supabase.md`）。Docker未使用のクラウド運用。
- マイグレーション適用済み: `supabase/migrations/0001_init.sql`（clients / submissions / pending_webhooks）、`0002_rls.sql`（RLS：営業は自分の顧客のみ）、`0003_public_client_fn.sql`（匿名LP描画用の `get_public_client` RPC = SECURITY DEFINER、描画に必要な列のみ返す）。
- Edge Function `form-submit` デプロイ済み（`--no-verify-jwt`）。フォーム送信→submissions行→CommitAd webhook（未設定ならskip+log）を検証済み。
- Pixel注入・実DB送信をブラウザでE2E確認済み（`fbq('init','000000000000000')`）。

### 3. ダッシュボード Phase 1（`apps/dashboard/`、port 3001）
- 認証: `@supabase/ssr` + `middleware.ts`（未ログインは `/login` へ307）。ログインページ実装済み。
- 顧客一覧 `/`（RLSで自分担当のみ）、新規作成 `/new`（slug検証・`owner_user_id=自分`）。
- 顧客詳細 `/clients/[id]`: タグID（Pixel/GA4/GTM/LINE/ドメイン認証）・CVイベント・CommitAd連携の編集フォーム。
- 公開/非公開トグル → Vercel Deploy Hook 発火（`VERCEL_DEPLOY_HOOK_URL` 未設定ならskip+log）。
- `npm run build` 成功（5ルート）、auth リダイレクト検証済み。

### 4. 基盤
- `CLAUDE.md`（LP制作規約）、`scripts/check-rules.ts`（LPShell/LPForm 使用チェック、pass）、`.github/workflows/ci.yml`（check-rules + build）。

### 5. 本番デプロイ（Vercel + GitHub）完了
- GitHub: `CommtAd/lp-platform`（private）。このリポジトリの `git config user.email` はVercelチームへのアクセス権がある `tomohiro.uesugi@ru-sk.co.jp` に設定済み（グローバル設定は別アカウント `info@3jino-oyatsu.com` のままなので注意。他リポジトリでVercelデプロイする際は同様の「Git author must have access to the team」ブロックに要注意）。
- Vercel: `commtads-projects` チーム配下に `lp-platform-lp`（Root Directory: `apps/lp`）と `lp-platform-dashboard`（Root Directory: `apps/dashboard`）を作成。両方GitHub連携済み（mainブランチ、pushで自動デプロイ）。
  - 本番URL: LP = https://lp-platform-lp.vercel.app 、Dashboard = https://lp-platform-dashboard.vercel.app
  - Production環境変数設定済み: 両方に `NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_ANON_KEY`。dashboardには `VERCEL_DEPLOY_HOOK_URL`（lp-platform-lpのDeploy Hook、ref=main）も設定済み。
  - 営業テストユーザー作成済み（Supabase Auth）: `tomohiro.uesugi@ru-sk.co.jp`（パスワードは作成時のみ共有、要保管・忘れた場合はSupabase管理画面からリセット）。
  - E2E確認済み: ログイン→新規作成→タグ編集→公開トグル→Deploy Hook発火→lp-platform-lpの自動再デプロイ（READY）まで動作。

### 6. Phase 3 — 独自ドメイン対応 実装完了（spec.md §8 チェックリスト準拠）
- `supabase/migrations/0004_custom_domain.sql`: `get_public_client` に `custom_domain`/`use_custom_domain_as_canonical` を追加、新規RPC `get_client_slug_by_domain(p_host)` を追加。適用済み（`supabase db push`済み、本番DBで動作確認済み）。
- `apps/lp/middleware.ts`（新規）: ルート `/` へのリクエストのみHostヘッダーを見て `get_client_slug_by_domain` を呼び、独自ドメインなら該当slugへ内部rewrite。`*.vercel.app`/`localhost` は素通し。
- `apps/lp/components/LPShell.tsx`: `use_custom_domain_as_canonical=true` かつ現在のHostが `custom_domain` と異なる場合、`https://{custom_domain}/` へ308リダイレクト（canonical切替）。
- `apps/dashboard/lib/vercel-domains.ts`（新規）: Vercel Domains API（`v10 POST domains` / `v9 DELETE domains/{domain}` / `v9 GET domains/{domain}` / `v6 GET domains/{domain}/config`）のラッパー。`VERCEL_API_TOKEN` 未設定時はスキップ+ログ（既存の Deploy Hook と同じ設計方針）。
- `apps/dashboard/app/actions.ts`: `updateCustomDomain` アクション追加（ドメイン変更時にVercelへ追加/削除を同期し、DB保存後にDeploy Hookも発火）。
- `apps/dashboard/app/clients/[id]/page.tsx`: 「独自ドメイン」セクション追加（ドメイン入力・canonicalトグル・ステータス表示・DNS設定手順の自動生成〈CNAME/Aレコード、お名前.com等での確認方法を案内〉）。
- 両アプリ `npm run build` 成功、プレビューでダッシュボードUIの表示・保存アクション（未設定時のエラーメッセージ表示）を確認済み。
- **`VERCEL_API_TOKEN` はユーザーが手動発行・`apps/dashboard/.env.local` に設定済み（2026-07-08）**。`GET /v2/user`（HTTP 200）・ドメイン一覧APIで疎通確認済み、ローカルでは独自ドメイン機能が動作する状態。
- **本番環境にも反映済み（2026-07-08）**: `lp-platform-dashboard` プロジェクト（`prj_rqxB15k17vysqiZ1fUQSC9bKJysh`）の Environment Variables に `VERCEL_API_TOKEN` / `VERCEL_TEAM_ID` / `VERCEL_LP_PROJECT_ID` を Production/Preview 対象で追加し、Redeployで反映済み（Vercel APIで3変数の設定・デプロイREADYを確認済み）。これでPhase 3の独自ドメイン機能はローカル・本番とも完全に動作する状態。
- 「公開完了のSlack通知」はユーザー判断により不要と決定し、spec.md §8 Phase 3のチェックリストから削除済み（2026-07-08）。実装しない。

### 7. プラットフォーム自体の独自ドメイン設定（2026-07-08）
- `lp-platform-lp` Vercelプロジェクトに `fitness-lp.commitad.com` を追加。DNSは既に設定済みで即座に `verified: true`。
- 動作確認済み: `https://fitness-lp.commitad.com/the-personal-pilates` → 200。ルート `/` は元々ページが無いため404（想定通り）。
- **注意**: このドメインは元々 `commitad-app`（CommitAd本体アプリ、別Vercelプロジェクト `prj_gSTWkAGWvQ5Z8kbwSHkEKpNGgXxf`）に設定されていたが、アクセスすると404を返しており実際には使われていなかったため、`lp-platform-lp` 側へ付け替えた（ユーザー承認済み）。commitad-app側で将来このサブドメインを使う予定がある場合は要調整。
- `https://lp-platform-lp.vercel.app/*` → `https://fitness-lp.commitad.com/*` へ308リダイレクト設定済み（`PATCH /v9/projects/{id}/domains/lp-platform-lp.vercel.app` に `redirect`/`redirectStatusCode:308`）。動作確認済み（308 → 200）。これにより `fitness-lp.commitad.com` が実質唯一の正式URLになった。
- これは各顧客LP個別の独自ドメイン（Phase 3・DB駆動の`custom_domain`列）とは別物。プラットフォーム全体のベースドメインの設定であることに注意。

### 9. THE PERSONAL GYM（`the-personal-gym`）LP作成（2026-07-08）
- 前提の訂正: THE PERSONAL GYMは the-personal-pilates とは別の顧客ではなく、**同一事業がブランド名を「THE PERSONAL GYM」に統一する形でリブランディングしたもの**（ユーザー確認済み）。そのためトレーナー紹介・店舗住所・料金・画像などの実データはそのまま正しい内容であり、差し替え不要。
- ダッシュボードで作成済みだったDB行（slug: `the-personal-gym`、status: 下書き）に対応するLPコードを追加。
- `the-personal-pilates/` を丸ごとコピーして作成（実データ流用）: `apps/lp/clients/the-personal-gym/`（page.tsx / FaqList.tsx / config.ts）＋ `apps/lp/public/clients/the-personal-gym/`（画像一式）。`clients/registry.ts` に登録済み。
- `config.ts` で変更したのは識別子・ブランド名表記のみ: `slug`・`ASSET`パス・`status`（draft）・"THE PERSONAL PILATES" → "THE PERSONAL GYM"（該当箇所すべて）。grepで確認済み、コード内コメント以外にPILATES表記は残っていない。
- ビルド成功・プレビューでdraft表示（非公開バナー）とブランド名反映を確認済み。
- 未確認事項: 「マシンピラティス」等のサービス種別を表す文言（`header.brandSub`・`meta.description`・FVカード・オファー欄など）は事業内容としてそのまま正しいのか、それともブランド刷新に伴いサービス訴求文言自体も変更するのか、ユーザーへの確認が必要（会社名の統一のみ確認済みで、サービス説明文言の扱いは未確認）。
- 2026-07-08、ユーザー指示によりダッシュボードの「公開する」ボタンから公開済み（status: published）。コード一式もコミット・push・本番デプロイ済み。本番 `https://fitness-lp.commitad.com/the-personal-gym` で200・ブランド名・ロゴ表示を確認済み。
- **ヘッダーロゴ画像対応（共通仕様として追加）**: ユーザーから提供された `THE PERSONAL GYM` ロゴ画像を左上ヘッダーに反映。`pattern-a.types.ts` の `header` 型に `logo?: string` / `logoAlt?: string` を追加し、`page.tsx`（`_base-a` / `the-personal-pilates` / `the-personal-gym` の3コピー全てに同一変更を適用、常に同一内容を保つ規約のため）で `logo` が設定されていればテキストブランド名の代わりに `<img>` ロゴを表示、未設定なら従来通りテキスト表示（後方互換あり、他クライアントは無影響）。画像本体は `apps/lp/public/clients/the-personal-gym/logo.png` に配置し、`config.ts` の `header.logo` から参照。ビルド成功・プレビューで表示確認済み。

### 10. CommitAd webhook連携（CV送信）実装・本番稼働確認済み（2026-07-08）
- lp-platform側の送信部分（Edge Function `form-submit` → HMAC-SHA256署名付きPOST）は既存実装済みだったものを、受け手であるCommitAd本体（別リポジトリ `CommtAd/commitad-app`）側に実装。
- CommitAd側の実装内容（PR #404, #405 でmainにマージ済み）:
  - `app/api/webhooks/lp-conversion/route.ts`（新規）: 署名検証 → payload validate → `commitad_client_id` で顧客特定 → 業種別に稼働中の契約（成果保証）→ 無ければ稼働中bridal_fair（成果報酬、フィットネスのみ）の順で紐付け解決 → `cv_records` へINSERT（`form_data.message_id = "lp-platform:<submission_id>"` で冪等性担保）→ 紐付けが解決できた場合のみ既存の `postCvNotification` でSlack通知。tel_tap/line_tapはCVとしては記録せず200 ackのみ。
  - `lib/webhooks/verify-lp-platform.ts`（新規）: 生ボディをHMAC-SHA256 hexで検証する専用関数（Slack用の `v0:timestamp:body` 方式とは別ロジック）。
  - `lib/cv/parser.ts`: 既存の private 関数 `findActiveContract` / `findActiveBridalFair` をexportに変更し、新webhookからも再利用。
  - `lib/supabase/middleware.ts`: **重要なバグ修正** — `PUBLIC_PATHS` に `/api/webhook`（単数、SendGrid用）はあったが `/api/webhooks/lp-conversion`（複数形）はprefixマッチせず、未ログイン扱いで `/login` に307リダイレクトされていた。`/api/webhooks` をホワイトリストに追加して解消（PR #405）。
- 両システムでの設定作業:
  - lp-platform: Supabase Edge Function secrets に `COMMITAD_WEBHOOK_URL=https://commitad-app.vercel.app/api/webhooks/lp-conversion` / `COMMITAD_WEBHOOK_SECRET` を設定済み（`npx supabase secrets set --project-ref iqnpypvlpvhneiveihns`）。
  - CommitAd: `.env.local` と Vercel本番環境変数の両方に同じ `COMMITAD_WEBHOOK_SECRET` を設定済み（値は32byte hex、両システムで共有）。
  - ダッシュボード（lp-platform）の顧客詳細画面で、THE PERSONAL GYM / Beat Pilates 名古屋伏見店 双方に `commitad_client_id`（CommitAd側 `customers.id`）を設定済み。
- **E2E疎通確認済み**（2026-07-08）: 実際にlp-platformの `form-submit` へテスト送信 → 署名付きwebhookがCommitAdへ配送 → `cv_records` へ正しくINSERTされることを確認。ただしテスト時点でTHE PERSONAL GYMの稼働中案件（`bridal_fairs`）が期限切れ（2026-05-31まで）だったため、当該テストでは `contract_id`/`bridal_fair_id` が未割当のまま記録された（データ欠損ではなく、CommitAd側で新しい案件登録がされ次第、以降のCVは自動で正しく紐付けされる）。**THE PERSONAL GYMの新規案件登録はCommitAd運用側で対応予定**（ユーザー確認済み）。
- 署名なし/不正署名リクエストは401を返すことを確認済み（fail closed: `COMMITAD_WEBHOOK_SECRET` 未設定時も常に401）。

### 11. フォーム通知メール（Brevo連携）実装・複数宛先対応済み（2026-07-08）
- 従来、フォーム送信時の通知メール（管理者宛・入力者宛とも）は一切実装されていなかった（ユーザー確認により発覚）。ユーザー指示「両方必要です！」に基づき実装。
- メール配信サービスは **Brevo**（旧Sendinblue）。送信元ドメインは `mail.commitad.com`（Brevo側で認証済み〈Authenticated〉のものをそのまま利用、DNS設定済み）。
- 実装箇所は `supabase/functions/form-submit/index.ts` の `sendNotificationEmails()`。`event_type === "form_submit"` かつ **今回はじめて記録された送信のみ**（`submissions` upsertを `.select("id")` 付きにして冪等判定、リトライ時の二重送信を防止）に対して以下2種を送信。失敗してもWebhook配送等の本処理は継続（best-effort、リトライなし）:
  1. **管理者宛 新規送信通知**（`【新規フォーム送信】{顧客名}`）: フォーム全項目・受信日時（JST）・流入UTMを記載。
  2. **入力者宛 確認メール**（`【{顧客名}】お申し込みを受け付けました`）: `form_data.email` が存在する場合のみ送信。
- **通知先は複数登録可能**（当初は単一だったが、ユーザー指示「本番アドレスは複数登録できるようにしておきたいです！」により即日リファクタ）。
  - DBは `clients.notify_emails text[]`（`supabase/migrations/0006_notify_emails_array.sql`。単一列だった旧 `0005_notify_email.sql` の `notify_email` から移行、既存値は配列化して引き継ぎ済み）。
  - ダッシュボード（`apps/dashboard/app/clients/[id]/page.tsx`）はカンマ区切りの1テキスト入力（`notify_emails`）で複数アドレスを受け付け、`actions.ts` の `updateClientRecord` でtrim・空要素除去・形式検証（不正な値があれば該当アドレスを名指しでエラー表示）した上で配列として保存。
  - 送信時は宛先ごとに**個別にメールを1通ずつ送信**（`to:[]` にまとめて複数指定はしない）。理由: 宛先同士に互いのメールアドレスが見えてしまうのを防ぐため。
  - 未設定（空配列）の場合は管理者宛メールはスキップ（入力者宛の確認メールには影響しない）。
- Supabase Edge Function Secrets: `BREVO_API_KEY`（設定済み）、`EMAIL_FROM_ADDRESS`（未設定時デフォルト `no-reply@mail.commitad.com`）。
- **E2E確認済み**（2026-07-08）: THE PERSONAL GYMの `notify_emails` に2アドレスを設定し `form-submit` へテスト送信 → Brevo配信イベントAPI（`GET /v3/smtp/statistics/events`）で、管理者宛メールが2アドレスそれぞれに個別送信・配信（`delivered`）・開封（`opened`）されたこと、および入力者宛確認メールも配信されたことを確認済み。
- THE PERSONAL GYMの `notify_emails` は現在テスト用アドレスが入っている状態（本番の通知先アドレスへの差し替えが未対応）。Beat Pilates 名古屋伏見店は未設定（空配列）。

## 未着手 / 次にやること

1. **THE PERSONAL GYMのサービス説明文言の扱い確認**: 上記9参照。ブランド名（会社名）の統一・公開は完了済み。「マシンピラティス」等のサービス訴求文言も変更対象か要ユーザー確認（未対応のままでも公開自体には支障なし）。
2. **新テンプレート（パターンB）LP `beat-pilates-nagoyafushimi`**: パターンA以外の新デザインが進行中、2026-07-08頃完成見込み。デザイン確定後、`docs/implementation-brief-02.md` + `design-refs/pattern-b/` を用意し、`_base-b/` を新設 → `apps/lp/clients/beat-pilates-nagoyafushimi/` を作成 → `clients/registry.ts` に登録、の流れで着手する（CLAUDE.md §8-10のルール厳守、Claude Design出力を直接持ち込まない）。ダッシュボード側には既にこのslugのDB行（タグ設定・publish ON）が存在するが、LPコードが無いため現状404。
3. **seed行のowner未割当**: `supabase/seed.sql` の the-personal-pilates は `owner_user_id=null`。作成した営業ユーザーに割り当てるか、ダッシュボードから作り直すか要判断。RLSにより現状どの営業ユーザーの一覧にも出ない。
4. **CommitAd webhook連携の残タスク**: THE PERSONAL GYMの新規案件（`bridal_fairs`または`contracts`）登録後、実リードでSlack通知まで飛ぶことを改めて確認する（現状は配送〜DB記録までのみ確認済み）。CAPI（Phase 2）、HTML納品（Phase 4）は引き続き未着手。
5. **フォーム通知メールの本番アドレス設定**: THE PERSONAL GYM（現在テスト値）・Beat Pilates 名古屋伏見店（未設定）とも、実際の通知先メールアドレス（複数可）をユーザーから受け取り次第ダッシュボードで設定する。

## 環境メモ（メモリ `project_env.md` 参照）
- Node は nodenv 管理。node/npm 実行前に必ず:
  `export PATH="$HOME/.nodenv/bin:$HOME/.progate/bin:$PATH"; eval "$(nodenv init -)"`
- Docker 未インストール（Supabaseはクラウドのみ）。
- このディレクトリはまだ git リポジトリではない。
- プレビューは `.claude/launch.json`（npm絶対パスのshim指定、LP=port3000）。dashboardは port3001。
- `.env.local` は `apps/lp/` と `apps/dashboard/` の両方にSupabaseのURL/anonキーを設定済み。

## 引き継ぎ後の再開方法
- 同じ会話を続ける: `claude --continue`（履歴はローカル保存、アカウント非依存）。
- 新規会話: 冒頭で「lp-platform の続き。HANDOVER.md とメモリと CLAUDE.md を読んで現状把握して」と指示。
