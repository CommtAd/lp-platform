-- hotel-racine（ホテル ラシーネ新前橋, slug=hotel-racine）の clients 行を整える。
--
-- 枠はダッシュボードで作成済み・公開済み（2026-10-02, name / industry / status はダッシュボードの値を正とする）。
-- ダッシュボードの枠作成では入らない項目だけをここで埋める:
--   - confirmation_meta … 通知メールの件名・項目ラベル（config.ts の form.fields と一致させてある）。
--                         未設定だと通知メールの項目名が visit_date_1 / 4over のような内部名のまま届く
--   - cv_events         … 空なら form_submit を立てる（2026-10-08 時点で既に立っている。上書きはしない）
--   - notify_emails     … 式場・代理店・Slack転送の4件を追加（2026-10-08 顧客指定。既存の値は残す）
-- 行が無い環境（ローカル等）でも通るよう insert ... on conflict にしてある。
-- Meta ピクセルは未支給のため触らない（ダッシュボードで設定する）。

insert into public.clients (slug, name, status, industry, meta_pixel_id, cv_events, confirmation_meta, notify_emails)
values (
  'hotel-racine',
  'ホテルラシーネ新前橋',
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
  array[
    'bridal-info@hotel-racine.co.jp',
    'nobuo-yamamoto@sympathy11.jp',
    'shohei-okamoto@sympathy11.jp',
    -- Slack の「メールをチャンネルに転送する」アドレス。通常のメールと同じ扱いで送れる。
    'x-aaaatirvvqljda7izi5xflf62e@ru-sk.slack.com'
  ]::text[]
)
on conflict (slug) do update
set confirmation_meta = excluded.confirmation_meta,
    cv_events         = case
                          when public.clients.cv_events is null or public.clients.cv_events = '{}'::jsonb
                          then excluded.cv_events
                          else public.clients.cv_events
                        end,
    notify_emails     = (
      select array_agg(distinct email order by email)
      from (
        select unnest(coalesce(public.clients.notify_emails, array[]::text[])) as email
        union
        select unnest(excluded.notify_emails)
      ) as merged
    );

-- 確認用（notify_emails に上の4件が入っていること）:
--   select slug, name, status, notify_emails, confirmation_meta->>'adminSubject'
--   from public.clients where slug = 'hotel-racine';
