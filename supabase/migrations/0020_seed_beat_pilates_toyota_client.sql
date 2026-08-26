-- Beat Pilates 豊田店（女性専用・暗闇マシンピラティス, slug=beat-pilates-toyota）の
-- clients 行を作成する。名古屋伏見店とは別オーナー・別LP。
--
-- LP コードは apps/lp/clients/beat-pilates-toyota/。ページ表示（/beat-pilates-toyota
-- ルーティング）だけでなく、LPShell が同じ slug で clients 行を引いてタグ注入・noindex・
-- CV転送を行うため、この行が無いとタグが一切注入されない（days-pilates / bee-pilates-ebisu
-- で実際に発生した不具合クラス。CLAUDE.md §13 / check-slug-sync 参照）。
-- フォルダ名 beat-pilates-toyota と clients.slug を必ず一致させること。
--
-- 予約導線は外部 Hacomono 予約（apps/lp/clients/beat-pilates-toyota/config.ts の reserve.url）に
-- 接続し、基盤フォーム（LPForm）は使わない。したがって form_submit CV は基盤側に届かず、
-- 予約確認メールも Hacomono 側が送るため confirmation_meta は持たせない。
--
-- タグ: 現状なし（meta_pixel_id = null）。オーナーから Pixel ID の提供があれば、
-- ダッシュボードまたは後続マイグレーションで設定する。
--
-- notify_emails は空。運営者宛の通知が必要になった場合はダッシュボードで設定する。

insert into public.clients (slug, name, status, industry, meta_pixel_id, cv_events, notify_emails)
values (
  'beat-pilates-toyota',
  'Beat Pilates 豊田店',
  'draft',
  'fitness',
  null,
  '{"form_submit": false, "tel_tap": false, "line_tap": false}'::jsonb,
  '{}'::text[]
)
on conflict (slug) do update
set name          = excluded.name,
    status        = excluded.status,
    industry      = excluded.industry,
    meta_pixel_id = excluded.meta_pixel_id,
    cv_events     = excluded.cv_events;
