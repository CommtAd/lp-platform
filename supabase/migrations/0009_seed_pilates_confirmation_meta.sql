-- THE PERSONAL PILATES にも詳細フォーマットの予約確認メールを適用する。
-- THE PERSONAL GYM と同一事業者・同一店舗（国分寺店/吉祥寺店）のため、
-- confirmation_meta の内容は the-personal-gym と同じ値を使う。
-- store キーは apps/lp/clients/the-personal-pilates/config.ts の
-- form.fields 内 store トグルの value と一致させること。

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
where slug = 'the-personal-pilates';
