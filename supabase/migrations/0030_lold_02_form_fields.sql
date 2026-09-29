-- lold-02（ABテストB案）のフォーム項目変更を通知メール側に反映する。
--
-- B案は来館希望日・来館人数・試食の有無をフォームから外し、代わりに
-- 「結婚式への想い」（必須）と、任意の挙式時期・挙式人数を聞く形に変えた
-- （apps/lp/clients/lold-02/config.ts）。日程はプランナーからの折り返しで調整する。
--
-- confirmation_meta.formFields を直さないと、管理者メールに
-- 「ご来館希望日（第一希望）：」のような空行が残り、新しい wedding_wish /
-- wedding_timing は未宣言フィールドとして生キーのまま extras に落ちる
-- （supabase/functions/form-submit/index.ts の renderFormFieldRows /
--  undeclaredFormEntries 参照）。
--
-- 影響は lold-02 のみ。A案（lold）の行は触らない。

update public.clients
set confirmation_meta = jsonb_set(
  confirmation_meta,
  '{formFields}',
  '[
    { "name": "name",           "label": "お名前" },
    { "name": "tel",            "label": "電話番号" },
    { "name": "email",          "label": "メールアドレス" },
    { "name": "wedding_wish",   "label": "結婚式への想い" },
    {
      "name": "wedding_timing",
      "label": "挙式時期",
      "valueLabels": {
        "6m": "6ヶ月以内",
        "1y": "1年以内",
        "1y5y": "1年半以内",
        "2y": "2年以内",
        "unset": "未定・検討中"
      }
    },
    {
      "name": "guests",
      "label": "挙式人数",
      "valueLabels": {
        "u30": "〜30名",
        "u50": "31〜50名",
        "u80": "51〜80名",
        "o80": "81名以上",
        "unset": "未定"
      }
    }
  ]'::jsonb
)
where slug = 'lold-02';

-- 確認用:
--   select slug, confirmation_meta->'formFields'
--   from public.clients where slug in ('lold', 'lold-02') order by slug;
