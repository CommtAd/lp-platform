-- Beat Pilates 名古屋伏見店の予約確認メールに、キャンセル規定の文言を追加する。
-- confirmation_meta.letter.closingLines（未設定時は form-submit/index.ts の
-- DEFAULT_LETTER_CLOSING_LINES を使う）を明示的に上書きし、この店舗のメールにのみ
-- キャンセル料の案内を差し込む。他クライアント（estudio 等）はデフォルトのままなので
-- 影響しない。
--
-- jsonb の || は浅いマージのため、"letter": {...} をまるごと || すると
-- 0010で設定した letter.menu / storeLabel / storeAddressLines / items /
-- directionsNote が消えてしまう。jsonb_set で letter.closingLines だけを
-- 差し込み、既存の letter の他フィールドを保持する。

update public.clients
set confirmation_meta = jsonb_set(
  confirmation_meta,
  '{letter,closingLines}',
  '[
    "当日は、{{name}}の体調やお悩みに合わせて心地よく身体を動かせるよう、心を込めてサポートさせていただきます。",
    "ピラティスが初めての場合でも、どうぞリラックスしてお越しくださいませ。",
    "",
    "もし事前にご不明な点や、お身体について相談したいことなどがございましたら、お気軽にお問い合わせください。",
    "",
    "【キャンセルについて】",
    "ご予約のキャンセル・変更は前日までにお願いいたします。当日キャンセル・無断キャンセルの場合は、キャンセル料として本来の体験レッスン料3,300円（税込）を頂戴いたします。あらかじめご了承ください。",
    "",
    "それでは、{{datetime}}に{{name}}にお会いできることを、スタッフ一同楽しみにお待ちしております。",
    "どうぞよろしくお願いいたします。"
  ]'::jsonb,
  true
)
where slug = 'beat-pilates-nagoyafushimi';
