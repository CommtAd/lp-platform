-- 通知先メールアドレスを複数登録できるようにする（0005で追加した単一アドレス列を
-- text[] 配列に置き換え）。ダッシュボードではカンマ区切りで入力してもらい、
-- アプリ側で配列に変換して保存する。

alter table public.clients add column if not exists notify_emails text[] not null default '{}'::text[];

-- 既存の単一アドレス値を配列へ移行
update public.clients
set notify_emails = array[notify_email]
where notify_email is not null and notify_email <> '';

alter table public.clients drop column if exists notify_email;

comment on column public.clients.notify_emails is
  'フォーム送信時の社内通知メール送信先（複数可、未設定なら空配列で通知メールはスキップ）';
