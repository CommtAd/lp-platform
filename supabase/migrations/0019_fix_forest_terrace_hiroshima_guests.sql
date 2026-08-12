-- forest-terrace-hiroshima の「ご人数」を、挙式の招待人数ではなく
-- フェア当日の来館人数に直したことに伴う、通知メール側の追従。
--
-- 0018 では config.ts の当時の選択肢（〜20名 / 21〜40名 / …）をそのまま
-- valueLabels に写していた。LP側を 1名 / 2名 / 3名 / 4名以上 に変更したため、
-- 追従しないと送信値（"2" など）が valueLabels に無く、メールに生の値が出る。
--
-- formFields は配列なので、|| マージではキーごと置き換わる。ラベル変更
-- （ご人数 → ご来館人数）も含めて全体を再掲する。

update public.clients
set confirmation_meta = confirmation_meta || '{
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
}'::jsonb
where slug = 'forest-terrace-hiroshima';
