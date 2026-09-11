-- lold（ザ・フォレストオブロルド）の通知先メールを設定する。
--
-- ダッシュボードで枠を作った時点では notify_emails が空で、その状態だと
-- 式場宛の新規予約通知が1通も送信されない（送信処理ごとスキップされる）。
-- 申込者宛の確認メールと submissions への記録は空でも動く。
--
-- Slackアドレスは「メールをチャンネルに転送する」機能のもので、
-- 通常のメールアドレスと同じ扱いで送れる（送信側の変更は不要）。
--
-- 既存の値は残したまま追加する。unnest + union で重複を除いてから配列に戻すので、
-- このマイグレーションを複数回流しても増殖しない。

update public.clients
set notify_emails = (
  select array_agg(distinct email order by email)
  from (
    select unnest(coalesce(notify_emails, array[]::text[])) as email
    union
    select unnest(array[
      'info@bridal-l.com',
      'x-aaaath4yeqk6ivbyp2tzgtscza@ru-sk.slack.com'
    ])
  ) as merged
)
where slug = 'lold';

-- 確認用（実行後に2件になっていること）:
--   select slug, notify_emails from public.clients where slug = 'lold';
