-- Pilates Studio Beê 恵比寿店の clients 行の slug 不一致を修正する。
--
-- 経緯: ダッシュボードでのクライアント作成時、clients.slug が 'bee-ebisu' で
-- 登録された。一方 LP コード（apps/lp/clients/bee-pilates-ebisu/）と
-- URL ルーティング（/bee-pilates-ebisu）は 'bee-pilates-ebisu' を使っている。
-- このため本番ページの fetchClientRecord('bee-pilates-ebisu') が該当行を
-- 見つけられず、この行に設定済みの Meta Pixel（442942365192196）と
-- GTM（GTM-M2VTVF74）が本番LPに一切注入されていなかった
-- （2026-07-29 時点の本番HTMLで注入なしを確認）。
--
-- 0013 の days-pilates と同一の不具合クラス。

update public.clients
set slug = 'bee-pilates-ebisu'
where slug = 'bee-ebisu';
