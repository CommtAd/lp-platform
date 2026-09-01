-- pilates（コミットアド for ピラティス｜集客シミュレーション）の通知メール2通
-- （管理者宛・入力者宛）を、このLPのフォーム項目に合わせた文面にする。
--
-- confirmation_meta はダッシュボードから編集できないため、マイグレーションで設定する
-- （kaigyo-support の 0012 / 0014 と同じ運用）。
--
-- 未設定のままだと、予約系LPを前提にした固定フォーマットが使われるため:
--   ・「体験日時：」「店舗名：」— このフォームに該当項目が無く常に空行になる
--   ・「style: マシンピラティス」「taiken: あり」— formFields で宣言していない項目は
--     extras として英語キーのまま出力される（営業が読みづらい）
--
-- formFields は adminSimple より優先されるので adminSimple は設定していない。
--
-- **重要（このLP特有の事情）**
-- このLPの最終CVは「TimeRexでの日程予約完了」であって、フォーム送信ではない。
-- フォーム送信＝シミュレーション入力の時点でこの通知が飛ぶため、件名・本文で
-- 「予約は未確定」と明示している。ここを予約完了と読める文面にすると、
-- 営業が来ていない商談を待つことになる。実際の予約確定は TimeRex 側の通知で届く。

update public.clients
set confirmation_meta = coalesce(confirmation_meta, '{}'::jsonb) || '{
  "adminSubject": "{{name}}様が集客シミュレーションに入力しました（予約は未確定）",
  "adminGreeting": "{{name}}様が集客シミュレーションに入力しました。この時点では日程予約は完了していません。予約が確定した場合は TimeRex から別途通知が届きます。",
  "formFields": [
    { "name": "company",    "label": "企業名・店舗名" },
    { "name": "name",       "label": "ご担当者名" },
    { "name": "tel",        "label": "電話番号" },
    { "name": "email",      "label": "メールアドレス" },
    { "name": "style",      "label": "ピラティスのタイプ" },
    { "name": "prefecture", "label": "店舗のエリア（都道府県）" },
    { "name": "city",       "label": "市区町村" },
    { "name": "taiken",     "label": "無料体験の有無" }
  ]
}'::jsonb
where slug = 'pilates';

-- 確認用:
--   select slug, confirmation_meta from public.clients where slug = 'pilates';
--
-- NOTE: notify_emails（管理者宛通知の宛先）はここでは設定していない。
-- ダッシュボードから編集できる項目であり、宛先をこちらで推測して入れるべきでは
-- ないため。**空のままだと管理者宛の通知が誰にも届かない**ので、公開前に
-- ダッシュボードで設定すること。
