-- ザ・フォレストオブロルド（ブライダルフェアLP・パターンC, slug=lold）の clients 行を作成する。
--
-- LP コードは apps/lp/clients/lold/。ページ表示（/lold ルーティング）だけでなく、
-- LPShell が同じ slug で clients 行を引いてタグ注入・noindex・CV転送を行うため、
-- この行が無いとタグが一切注入されない（days-pilates / bee-pilates-ebisu で実際に発生した
-- 不具合クラス。CLAUDE.md §13 / check-slug-sync 参照）。
-- フォルダ名 lold と clients.slug を必ず一致させること。
--
-- industry = 'bridal'。ダッシュボードの「ブライダル」タブに出すためと、
-- meta_cv_event を null のままにして get_public_client 側の既定（bridal → Purchase）に
-- 委ねるため（0022 参照）。
--
-- タグ: 現状なし（meta_pixel_id = null）。Pixel ID が届いたらダッシュボードで設定する。
--
-- confirmation_meta: forest-terrace-hiroshima（0018 / 0019）と同じフォーム構成を写して
-- いるので、通知メールの項目ラベルも同じものを持たせる。config.ts の form.fields を
-- 変えたら、ここ（formFields / valueLabels）も追従させること。
--
-- notify_emails は空。式場宛の通知が1通も送られない状態なので、通知先が決まり次第
-- ダッシュボードから設定する（入力者宛の確認メールと送信自体は動作する）。

insert into public.clients (slug, name, status, industry, meta_pixel_id, cv_events, confirmation_meta, notify_emails)
values (
  'lold',
  'ザ・フォレストオブロルド',
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
      {
        "name": "guests",
        "label": "ご来館人数",
        "valueLabels": {
          "1":     "1名",
          "2":     "2名",
          "3":     "3名",
          "4over": "4名以上"
        }
      },
      {
        "name": "tasting",
        "label": "ご試食の有無",
        "valueLabels": {
          "yes": "試食あり",
          "no":  "試食なし"
        }
      },
      { "name": "note",         "label": "ご質問・ご相談" }
    ]
  }'::jsonb,
  '{}'::text[]
)
on conflict (slug) do update
set name              = excluded.name,
    industry          = excluded.industry,
    confirmation_meta = excluded.confirmation_meta;

-- 確認用:
--   select slug, name, status, industry from public.clients where slug = 'lold';
--   select slug, meta_cv_event from public.get_public_client('lold');
