-- THE PERSONAL GYM の予約確認メールを詳細フォーマット（店舗名・希望日時・所要時間・
-- メニュー入り）で送るための confirmation_meta を設定する。
-- store キーは apps/lp/clients/the-personal-gym/config.ts の form.fields 内
-- store トグルの value（"kokubunji" / "kichijoji"）と一致させること。

update public.clients
set confirmation_meta = '{
  "menu": "無料体験90分",
  "duration": "1時間30分",
  "stores": {
    "kokubunji": {
      "label": "国分寺店",
      "address": "〒185-0021 東京都国分寺市南町3-18-17 第4サイトウビル4階"
    },
    "kichijoji": {
      "label": "吉祥寺店",
      "address": "〒180-0004 東京都武蔵野市吉祥寺本町2丁目25-12 Santa Fe1-B"
    }
  }
}'::jsonb
where slug = 'the-personal-gym';
