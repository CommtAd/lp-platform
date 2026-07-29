-- kaigyo-support（フィットネス開業支援パック）の通知メール2通（管理者宛・
-- 申込者宛）を、このLPのフォーム項目に合わせた文面にする。
--
-- 0012 で設定した adminSimple のみの状態では、予約系LPを前提にした固定
-- フォーマットが使われるため、実際に届くメールが次のようになっていた:
--   ・件名／本文が「予約申し込み」— このLPは予約ではなく無料相談・お見積りの依頼
--   ・「体験日時：」— このフォームに日時項目が無いため常に空行
--   ・「company: 株式会社◯◯」「timing: unset」— 未知フィールドが extras として
--     英語キーのまま、select は option の value のまま出力されていた
--
-- formFields で config.ts の form.fields と同じ順序・同じ日本語ラベルを明示し、
-- timing は valueLabels で option ラベル（未定 など）に変換する。
-- formFields は adminSimple より優先されるため、0012 の adminSimple は
-- 実質無効になるが、キー自体は || マージで残しておく（削除の副作用を避ける）。
--
-- formFields は申込者宛の確認メールからも参照される。このLPは店舗・日時・
-- メニューが無く汎用フォールバック文面が使われるため、本文の後ろに同じ
-- 「お問い合わせ内容」ブロックが追記され、送信控えとして機能する。

update public.clients
set confirmation_meta = confirmation_meta || '{
  "adminSubject": "{{name}}様から無料相談・お見積りのご依頼があります",
  "adminGreeting": "{{name}}様から無料相談・お見積りのご依頼を承りました。担当者はご対応をお願いいたします。",
  "formFields": [
    { "name": "name",    "label": "お名前" },
    { "name": "company", "label": "会社名・屋号" },
    { "name": "tel",     "label": "電話番号" },
    { "name": "email",   "label": "メールアドレス" },
    {
      "name": "timing",
      "label": "開業予定時期",
      "valueLabels": {
        "asap":  "できるだけ早く",
        "3m":    "3ヶ月以内",
        "6m":    "6ヶ月以内",
        "1y":    "1年以内",
        "unset": "未定"
      }
    },
    { "name": "note",    "label": "ご相談内容" }
  ]
}'::jsonb
where slug = 'kaigyo-support';
