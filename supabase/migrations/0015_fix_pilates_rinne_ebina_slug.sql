-- ピラティスRINNE海老名店の clients 行の slug 不一致を修正する。
--
-- 経緯: ダッシュボードでのクライアント作成時、clients.slug が 'rinne' で
-- 登録された。一方 LP コード（apps/lp/clients/pilates-rinne-ebina/）と
-- URL ルーティング（/pilates-rinne-ebina）は 'pilates-rinne-ebina' を使っている。
-- このため本番ページの fetchClientRecord('pilates-rinne-ebina') が該当行を
-- 見つけられず、/pilates-rinne-ebina へのアクセスが公開扱いされない
-- （ダッシュボードでは「公開中」と表示されるにもかかわらず本番URLが開けない）。
--
-- 0013 の days-pilates、0014 の bee-pilates-ebisu と同一の不具合クラス。

update public.clients
set slug = 'pilates-rinne-ebina'
where slug = 'rinne';
