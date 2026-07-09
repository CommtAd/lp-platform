-- 予約者向け確認メールを「店舗・希望日時・所要時間・メニュー」入りの詳細フォーマットで
-- 送るためのクライアント別メタデータ。config.ts はフロントのみに存在し
-- form-submit Edge Function からは読めないため、必要な店舗名・住所・メニュー・所要時間
-- はこの列にJSONで持たせる。
--
-- 想定シェイプ（すべて任意。空 '{}' なら旧来の簡易な確認メール文言にフォールバックする）:
-- {
--   "menu": "無料体験90分",
--   "duration": "1時間30分",
--   "stores": {
--     "<フォームのstoreトグルvalue>": { "label": "国分寺店", "address": "〒..." }
--   }
-- }

alter table public.clients
  add column if not exists confirmation_meta jsonb not null default '{}'::jsonb;

comment on column public.clients.confirmation_meta is
  '予約確認メール（顧客宛）の詳細フォーマット用メタデータ（店舗名/住所/メニュー/所要時間）。空なら簡易文言にフォールバック。';
