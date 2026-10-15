-- sakura-shinjuku-sanchome2（Pilates SAKURA 新宿三丁目店・OPEN記念の短尺LP）の
-- 通知メールを、顧客修正（AUN 2026-10-15）どおりに整える。
--
-- それまで confirmation_meta は未設定（{}）で、送信者宛は共通の既定文面
-- 「〜へのお申し込み・お問い合わせを受け付けました」の2行だけ、
-- 店舗宛は予約型の既定フォーマットで「店舗名:」が常に空欄だった。
--
--   送信者宛:
--     - 件名・本文の「お申し込み・お問い合わせ」を「体験予約」にする（confirmationSubject / confirmationLines）
--     - 本文の下に「体験予約内容」として入力内容の控えを付ける（echoFields / echoHeading）。
--       希望日と時間は1行にまとめる（FormFieldMeta.time）。項目は config.ts の form.fields と一致。
--   店舗宛:
--     - 「店舗名」行を消す（adminHideStore）。単店舗のLPで店舗を選ぶ項目が無いため常に空欄だった。
--       希望日2行・UTMのアトリビューション情報はそのまま残す。
--
-- echoFields / echoHeading / adminHideStore / time は form-submit に足した任意設定。
-- **このマイグレーションより先に form-submit をデプロイすること**
-- （古い関数は未知のキーを無視するので壊れはしないが、文面が変わらない）。
--
-- confirmation_meta はダッシュボードから編集できないため、マイグレーションで設定する（0025・0035 と同じ運用）。
-- 店舗宛の宛先 notify_emails はダッシュボード側の項目で、ここでは触らない。

update public.clients
set confirmation_meta = coalesce(confirmation_meta, '{}'::jsonb) || '{
  "confirmationSubject": "【{{clientName}}】体験予約を受け付けました",
  "confirmationLines": [
    "{{clientName}} への体験予約を受け付けました。",
    "担当より追ってご連絡いたしますので、今しばらくお待ちください。"
  ],
  "echoHeading": "体験予約内容",
  "echoFields": [
    { "name": "name", "label": "お名前" },
    { "name": "tel", "label": "電話番号" },
    { "name": "email", "label": "メールアドレス" },
    { "name": "date1", "label": "ご希望日時（第1希望）", "time": "time1" },
    { "name": "date2", "label": "ご希望日時（第2希望）", "time": "time2" },
    { "name": "note", "label": "ご質問・ご要望" }
  ],
  "adminHideStore": true
}'::jsonb
where slug = 'sakura-shinjuku-sanchome2';
