-- Beat Pilates 名古屋伏見店の予約確認メールを、顧客提供の専用テンプレート
-- （ご予約内容・当日のお持ち物・道に迷われた際のお願い等）で送るための
-- confirmation_meta.letter を設定する。本文の固定文言は
-- supabase/functions/form-submit/index.ts の buildConfirmationHtml 側にあり、
-- ここでは日時・名前以外の可変部分（メニュー・店舗名・住所・持ち物・道案内文）のみ持たせる。

update public.clients
set confirmation_meta = '{
  "letter": {
    "menu": "体験レッスン",
    "storeLabel": "Beat Pilates 名古屋伏見店",
    "storeAddressLines": [
      "〒460-0008",
      "愛知県名古屋市中区栄1-18-1",
      "ハイツサンライズ2F号室"
    ],
    "items": [
      "動きやすい服装（ウェア）",
      "水分補給用のお飲み物",
      "滑り止め靴下"
    ],
    "directionsNote": "当日、スタジオの場所が分からないなど道に迷われた場合は、どうぞお気軽にお問い合わせください。"
  }
}'::jsonb
where slug = 'beat-pilates-nagoyafushimi';
