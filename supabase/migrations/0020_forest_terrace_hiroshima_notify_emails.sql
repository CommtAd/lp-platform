-- forest-terrace-hiroshima の通知先メールに式場担当者2名とSlack連携アドレスを追加する。
--
-- 0018 では代理店側の1件だけを入れていた。式場側で受ける体制ができたため、
-- 担当者2名と、Slackのチャンネル宛メールアドレスを足す。
-- Slackアドレスは「メールをチャンネルに転送する」機能のもので、
-- 通常のメールアドレスと同じ扱いで送れる（送信側の変更は不要）。
--
-- 既存の値は残したまま追加する（上書きすると代理店側に届かなくなる）。
-- unnest + union で重複を除いてから配列に戻しているので、
-- このマイグレーションを複数回流しても増殖しない。

update public.clients
set notify_emails = (
  select array_agg(distinct email order by email)
  from (
    select unnest(coalesce(notify_emails, array[]::text[])) as email
    union
    select unnest(array[
      'muranaka@forestterrace-km.jp',
      'takita@forestterrace-km.jp',
      'x-aaaavmaxo4e2nswwyeuza6qgry@ru-sk.slack.com'
    ])
  ) as merged
)
where slug = 'forest-terrace-hiroshima';

-- 確認用（実行後に4件になっていること）:
--   select slug, notify_emails from public.clients where slug = 'forest-terrace-hiroshima';
