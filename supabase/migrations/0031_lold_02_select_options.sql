-- lold-02（ABテストB案）の「挙式時期」「挙式人数」の選択肢を案件指定の4択に差し替える。
--
-- 0030 では汎用の刻みで入れたが、指定は下記の通り
-- （apps/lp/clients/lold-02/config.ts）:
--   挙式時期: 3ヶ月以内 / 6ヶ月以内 / 1年以内 / 未定
--   挙式人数: 20名以上 / 30名以上 / 40名以上 / 未定
--
-- valueLabels を直さないと、通知メールに "o20" のような生の値がそのまま載る
-- （supabase/functions/form-submit/index.ts の renderFormFieldRows 参照）。
--
-- formFields 全体を書き直す。0030 と同じ並び・同じラベルで、選択肢だけが変わる。
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
        "3m": "3ヶ月以内",
        "6m": "6ヶ月以内",
        "1y": "1年以内",
        "unset": "未定"
      }
    },
    {
      "name": "guests",
      "label": "挙式人数",
      "valueLabels": {
        "o20": "20名以上",
        "o30": "30名以上",
        "o40": "40名以上",
        "unset": "未定"
      }
    }
  ]'::jsonb
)
where slug = 'lold-02';

-- 確認用:
--   select jsonb_pretty(confirmation_meta->'formFields')
--   from public.clients where slug = 'lold-02';
