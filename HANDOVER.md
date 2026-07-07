# HANDOVER — lp-platform 引き継ぎメモ

最終更新: 2026-07-07

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

## 未着手 / 次にやること

1. **営業ユーザー作成 → ダッシュボード動作確認（最優先）**
   Supabase の Authentication → Users → Add user でメール+パスワードを作成（Auto Confirm ON）。ログイン→新規作成→タグ編集→公開トグルを通しで確認。
2. **seed行のowner未割当**: `supabase/seed.sql` の the-personal-pilates は `owner_user_id=null`。作成した営業ユーザーに割り当てるか、ダッシュボードから作り直すか要判断。RLSにより現状どの営業ユーザーの一覧にも出ない。
3. **Vercel 連携**: プロジェクト接続 + Deploy Hook URL を dashboard の `.env.local` に設定。
4. **（Phase外・ブリーフ§9で後回し）** CommitAd webhook受信側、CAPI（Phase 2）、独自ドメイン（Phase 3）、HTML納品（Phase 4）。

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
