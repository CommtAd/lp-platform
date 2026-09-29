-- lavantscene（ベルヴィ ラヴァンセーヌ, slug=lavantscene）の clients 行を作成する。
--
-- LP コードは apps/lp/clients/lavantscene/（lold の複製から原稿・写真を差し替えたもの）。
-- LPShell が同じ slug で clients 行を引いてタグ注入・noindex・CV転送を行うため、
-- この行が無いとタグが一切注入されない（CLAUDE.md §13 / check-slug-sync 参照）。
--
-- Meta ピクセルは未支給のため null。支給されたらダッシュボードで設定する。
-- notify_emails は社内Slackチャンネルのみ。式場側の通知先メールは未確定なので、
-- 決まったら 0027 と同じ形で追加すること（空だと式場宛の通知は送られない）。
-- confirmation_meta のフォーム項目は config.ts の form.fields と一致させてある。
--
-- status は draft。広告を回す前にダッシュボードで公開に切り替えること。

insert into public.clients (slug, name, status, industry, meta_pixel_id, cv_events, confirmation_meta, notify_emails)
values (
  'lavantscene',
  'ベルヴィ ラヴァンセーヌ',
  'draft',
  'bridal',
  null,
  '{"form_submit": true, "tel_tap": false, "line_tap": false}'::jsonb,
  '{
    "adminSubject": "{{name}}様からブライダルフェアのご予約があります",
    "adminGreeting": "{{name}}様からブライダルフェアのご予約を承りました。担当者はご対応をお願いいたします。",
    "formFields": [
      { "name": "name",         "label": "お名前" },
      { "name": "tel",          "label": "電話番号" },
      { "name": "email",        "label": "メールアドレス" },
      { "name": "visit_date_1", "label": "ご来館希望日（第一希望）" },
      { "name": "visit_date_2", "label": "ご来館希望日（第二希望）" },
      { "name": "visit_date_3", "label": "ご来館希望日（第三希望）" },
      {
        "name": "guests",
        "label": "ご来館人数",
        "valueLabels": { "1": "1名", "2": "2名", "3": "3名", "4over": "4名以上" }
      },
      {
        "name": "tasting",
        "label": "ご試食の有無",
        "valueLabels": { "yes": "試食あり", "no": "試食なし" }
      },
      { "name": "note",         "label": "ご質問・ご相談" }
    ]
  }'::jsonb,
  array['x-aaaath4yeqk6ivbyp2tzgtscza@ru-sk.slack.com']::text[]
)
on conflict (slug) do nothing;

-- 確認用:
--   select slug, name, status, industry, meta_pixel_id, notify_emails
--   from public.clients where slug = 'lavantscene';
