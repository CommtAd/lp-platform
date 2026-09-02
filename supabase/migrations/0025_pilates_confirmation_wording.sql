-- pilates（コミットアド for ピラティス｜集客シミュレーション）の
-- **送信者宛**サンクスメールの件名・本文を、このLPの導線に合わせた文面にする。
--
-- 0024 では管理者宛（adminSubject / adminGreeting）だけを差し替えていたため、
-- 送信者宛は共通の既定文面「〜へのお申し込み・お問い合わせを受け付けました」
-- のままだった。フォーム送信＝申込みだった旧フロー向けの文面で、
-- 「送信直後に予測が出て、訪問者が自分でTimeRexから日程を選ぶ」現在の導線
-- （2026-09-02 の #142 で変更）とは噛み合っていない。
--
-- confirmation_meta はダッシュボードから編集できないため、マイグレーションで設定する
-- （0012 / 0014 / 0024 と同じ運用）。
--
-- confirmationSubject / confirmationLines は #142 で form-submit に追加した
-- 送信者宛の上書き。既定文面は他LPのために変えていない。
--
-- **注意: メールアドレスは任意項目**（#142）。空で送信された場合、
-- 送信者宛メールはそもそも送られない（form-submit の submitterEmail 分岐）。

update public.clients
set confirmation_meta = coalesce(confirmation_meta, '{}'::jsonb) || '{
  "confirmationSubject": "【{{clientName}}】集客シミュレーションありがとうございます。",
  "confirmationLines": [
    "この度は、{{clientName}}の",
    "集客シミュレーションをご利用いただきありがとうございます。",
    "担当より追ってご連絡いたしますので、今しばらくお待ちください。"
  ]
}'::jsonb
where slug = 'pilates';

-- 確認用:
--   select slug, confirmation_meta -> 'confirmationSubject',
--          confirmation_meta -> 'confirmationLines'
--   from public.clients where slug = 'pilates';
