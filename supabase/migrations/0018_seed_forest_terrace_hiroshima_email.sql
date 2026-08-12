-- forest-terrace-hiroshima（ザ・フォレストテラス広島・ブライダルフェア）の
-- 通知メール2通（式場宛・申込者宛）を、このLPのフォーム項目に合わせる。
--
-- confirmation_meta が未設定のままだと、予約系LP（ピラティス体験）を前提にした
-- 固定フォーマットが使われるため、実際に届くメールが次のようになっていた:
--   ・「店舗名:」「体験希望日 第一希望:」「体験希望日 第ニ希望:」— このフォームに
--     該当項目が無いため常に空行
--   ・「visit_date_1: 2027-03-14」「guests: u40」「tasting: yes」— 未知フィールドが
--     extras として英語キーのまま、select/toggle は option の value のまま出力される
--     （＝肝心の来館希望日が空行の下に生キーで落ちる）
--   ・申込者宛は「お申し込み・お問い合わせを受け付けました」の一文のみで、
--     申込内容の控えが一切入らない
--
-- formFields に config.ts の form.fields と同じ順序・同じ日本語ラベルを明示し、
-- guests / tasting は valueLabels で option ラベルに変換する。
-- formFields は式場宛の固定フォーマットより優先される。
--
-- formFields は申込者宛の確認メールからも参照される。このLPは店舗・日時・メニューが
-- 揃わず汎用フォールバック文面が使われるため、本文の後ろに同じ「お問い合わせ内容」
-- ブロックが追記され、送信控えとして機能する。
--
-- 日付は "2027-03-14" のまま出力される（和暦整形は date1/date2 キー専用の経路で、
-- formFields 経路は通らない）。曖昧さは無いのでこのまま運用する。

update public.clients
set confirmation_meta = confirmation_meta || '{
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
      "label": "ご人数",
      "valueLabels": {
        "u20":   "〜20名",
        "u40":   "21〜40名",
        "u60":   "41〜60名",
        "u80":   "61〜80名",
        "o80":   "81名以上",
        "unset": "未定"
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

-- 通知先。未設定だと式場宛のメールが1通も送信されない（送信処理ごとスキップされる）。
-- まずは代理店側で受け、式場担当者のアドレスは決まり次第ダッシュボードから追加する。
update public.clients
set notify_emails = array['kana.hashimoto@ru-sk.co.jp']
where slug = 'forest-terrace-hiroshima'
  and coalesce(array_length(notify_emails, 1), 0) = 0;
