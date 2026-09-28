-- lold-02（ザ・フォレストオブロルド／ABテストB案, slug=lold-02）の clients 行を作成する。
--
-- LP コードは apps/lp/clients/lold-02/。`lold` の複製で、同じ会場・同じフェアの
-- 別クリエイティブを並走させ、広告のリンク先を出し分けて比較するためのもの。
--
-- ページ表示（/lold-02 ルーティング）だけでなく、LPShell が同じ slug で clients 行を
-- 引いてタグ注入・noindex・CV転送を行うため、この行が無いとタグが一切注入されない
-- （days-pilates / bee-pilates-ebisu で実際に発生した不具合クラス。
-- CLAUDE.md §13 / check-slug-sync 参照）。フォルダ名と clients.slug を必ず一致させること。
--
-- 計測は A案（lold）と同じ Meta ピクセルを共有する（運用の指定）。Meta の管理画面では
-- 同一ピクセルに集約されるので、ABの比較は広告セット側のリンク先URLで分ける。
-- meta_cv_event は null のままにして get_public_client 側の既定（bridal → Purchase）に
-- 委ねる（0022 参照）。
--
-- confirmation_meta / notify_emails は lold と同じ。ABどちらから来た予約も
-- 同じ宛先に同じ書式で届く。
--
-- status は draft。広告を回す前にダッシュボードで公開に切り替えること。

insert into public.clients (slug, name, status, industry, meta_pixel_id, cv_events, confirmation_meta, notify_emails)
values (
  'lold-02',
  'ザ・フォレストオブロルド（B案）',
  'draft',
  'bridal',
  '386500533713258',
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
        "valueLabels": { "2": "2名", "3": "3名", "4over": "4名以上" }
      },
      {
        "name": "tasting",
        "label": "ご試食の有無",
        "valueLabels": { "yes": "試食あり", "no": "試食なし" }
      },
      { "name": "note",         "label": "ご質問・ご相談" }
    ]
  }'::jsonb,
  array['info@bridal-l.com', 'x-aaaath4yeqk6ivbyp2tzgtscza@ru-sk.slack.com']::text[]
)
on conflict (slug) do update
set name              = excluded.name,
    industry          = excluded.industry,
    meta_pixel_id     = excluded.meta_pixel_id,
    cv_events         = excluded.cv_events,
    confirmation_meta = excluded.confirmation_meta,
    notify_emails     = excluded.notify_emails;

-- 確認用:
--   select slug, name, status, industry, meta_pixel_id, cv_events, notify_emails
--   from public.clients where slug in ('lold', 'lold-02') order by slug;
