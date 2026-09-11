-- lold のフォームに「ご来館希望日（第三希望）」を追加したことに伴う、通知メール側の追従。
--
-- confirmation_meta.formFields に visit_date_3 が無いと、式場宛メールで
-- 「visit_date_3: 2027-03-14」のように英語キーのまま出力される
-- （forest-terrace-hiroshima の 0018 で実際に起きた不具合クラス）。
--
-- formFields は配列なので、|| マージではキーごと置き換わる。
-- 第三希望を差し込むために全体を再掲する。
--
-- formFields は申込者宛の確認メールからも参照される。このLPは汎用フォールバック文面が
-- 使われるため、本文の後ろに同じ「お問い合わせ内容」ブロックが追記され、送信控えとして機能する。

update public.clients
set confirmation_meta = confirmation_meta || '{
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
}'::jsonb
where slug = 'lold';

-- 確認用（visit_date_3 が入っていること）:
--   select jsonb_pretty(confirmation_meta -> 'formFields') from public.clients where slug = 'lold';
