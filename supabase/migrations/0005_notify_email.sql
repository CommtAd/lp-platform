-- フォーム通知メール機能: 管理者(社内担当)へのフォーム送信通知メール送信先を
-- クライアントごとに設定できるようにする。
-- form-submit Edge Function がこの列を読み、Brevo経由で通知メールを送る。
-- 顧客(フォーム入力者)向けの確認メールは form_data.email 宛に送るため列は不要。

alter table public.clients
  add column if not exists notify_email text;

comment on column public.clients.notify_email is
  'フォーム送信時の社内通知メール送信先（未設定なら通知メールはスキップ）';
