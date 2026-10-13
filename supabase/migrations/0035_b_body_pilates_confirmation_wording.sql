-- b-body-pilates（base BODY ピラティス）の**送信者宛**サンクスメールの件名・本文を、
-- 顧客指定の文面（2026-10-13）にする。
--
-- それまで confirmation_meta は未設定（{}）で、共通の既定文面
-- 「〜へのお申し込み・お問い合わせを受け付けました」の2行だけが届いていた。
--
-- confirmation_meta はダッシュボードから編集できないため、マイグレーションで設定する
-- （0025 と同じ運用）。store / letter を持たないので、文面は汎用フォーマット
-- （confirmationLines）で出る。宛名「〇〇 様」は form-submit が自動で先頭に付ける。
--
-- confirmationFooter は文末の「※このメールは送信専用です。…」の差し替え。
-- 顧客文面に独自の※注記があるため、既定の注記と二重にならないようこれで置き換える。
--
-- formFields は**店舗宛**通知メールの項目一覧（config.ts の form.fields と一致させてある）。
-- 未設定だと予約型の既定フォーマットになり、店舗名・ご質問欄が常に空欄、
-- kana / concerns / message が内部名のまま末尾に並んでいた。
--
-- formFields は送信者宛の汎用フォーマットにも「お問い合わせ内容」の控えを追記するが、
-- 送信者宛は顧客指定の文面どおりにするため confirmationEcho: false で止めている。

update public.clients
set confirmation_meta = coalesce(confirmation_meta, '{}'::jsonb) || '{
  "confirmationSubject": "【base BODY】体験レッスンのお申し込みを受け付けました",
  "confirmationLines": [
    "この度は、base BODY ピラティスの体験レッスンにお申し込みいただき、誠にありがとうございます！",
    "",
    "お申し込み内容を確認のうえ、担当スタッフより体験日時についてご連絡いたします。",
    "",
    "【体験レッスンのご案内】",
    "",
    "■ 体験料金：通常11,000円 → 1,000円（税込）",
    "■ 所要時間：約90分（カウンセリング含む）",
    "",
    "【店舗情報】",
    "",
    "base BODY",
    "住所：東京都港区赤坂3-9-1 紀陽ビル6F",
    "アクセス：赤坂見附駅 徒歩30秒",
    "",
    "スタッフ一同、お会いできることを楽しみにしております！",
    "",
    "引き続きよろしくお願いいたします。",
    "",
    "base BODY"
  ],
  "confirmationFooter": "※本メールは自動送信です。体験日時は担当スタッフからのご連絡をもって確定となります。",
  "confirmationEcho": false,
  "formFields": [
    { "name": "name",     "label": "お名前" },
    { "name": "kana",     "label": "フリガナ" },
    { "name": "tel",      "label": "電話番号" },
    { "name": "email",    "label": "メールアドレス" },
    { "name": "date1",    "label": "体験希望日（第1希望）" },
    { "name": "time1",    "label": "希望時間（第1希望）" },
    { "name": "date2",    "label": "体験希望日（第2希望）" },
    { "name": "time2",    "label": "希望時間（第2希望）" },
    { "name": "concerns", "label": "気になっていること" },
    { "name": "message",  "label": "ご質問・お身体について伝えておきたいこと" }
  ]
}'::jsonb
where slug = 'b-body-pilates';

-- 確認用:
--   select slug, confirmation_meta -> 'confirmationSubject',
--          confirmation_meta -> 'confirmationLines',
--          confirmation_meta -> 'confirmationFooter'
--   from public.clients where slug = 'b-body-pilates';
