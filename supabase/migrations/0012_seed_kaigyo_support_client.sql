-- フィットネス開業支援パック（kaigyo-support）の clients 行を作成する。
--
-- LP コード（apps/lp/clients/kaigyo-support/）は本番デプロイ済みでページは
-- 表示されていたが、clients テーブルに対応行が無かったため form-submit Edge
-- Function が 404 "unknown client_slug" を返し、フォーム送信がエラーになっていた。
-- この行を作成することで slug 検索がヒットし、送信・確認メール・Webhook 転送が動く。
--
-- confirmation_meta は adminSimple のみ指定。このLPのフォームは
-- name / company / tel / email / timing / note のみで店舗・希望日時が無いため、
-- 店舗名・希望日時・UTM ブロックを省いた簡易フォーマットの管理者通知にする。
-- 未知フィールド（company / timing）は extras として自動的に追記される。
-- 入力者宛の確認メールは、店舗・日時・メニューが揃わないため汎用フォールバック
-- 文面（「お申し込みを受け付けました」）が使われる。
--
-- NOTE: notify_emails は空のまま。管理者宛の新規送信通知を受け取るには、
-- ダッシュボードまたは下記 SQL の配列に通知先メールアドレスを設定すること。
-- 空のままでも入力者宛の確認メールとフォーム送信自体は正常に動作する。

insert into public.clients (slug, name, status, cv_events, confirmation_meta, notify_emails)
values (
  'kaigyo-support',
  'フィットネス開業支援パック',
  'published',
  '{"form_submit": true, "tel_tap": false, "line_tap": false}'::jsonb,
  '{"adminSimple": true}'::jsonb,
  '{}'::text[]
)
on conflict (slug) do update
set name             = excluded.name,
    status           = excluded.status,
    cv_events        = excluded.cv_events,
    confirmation_meta = excluded.confirmation_meta;
