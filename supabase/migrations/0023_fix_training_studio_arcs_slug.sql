-- パーソナルジムARCS みらい平店の clients 行の slug 不一致を修正する。
--
-- 経緯: ダッシュボードでのクライアント作成時、clients.slug が
-- 'arcs-trainingstudio-pilates' で登録された。一方 LP コード
-- （apps/lp/clients/training-studio-arcs/）と URL ルーティング
-- （/training-studio-arcs）は 'training-studio-arcs' を使っている。このため
-- 本番ページの fetchClientRecord('training-studio-arcs') が該当行を見つけ
-- られず、LPShell が config.ts のローカル fallback status: "draft" を
-- 使ってしまい、ダッシュボードで「公開中」にしても本番の非公開プレビュー
-- バナーが消えなかった。
--
-- 0013 の days-pilates、0014 の bee-pilates-ebisu、0015 の
-- pilates-rinne-ebina と同一の不具合クラス。

update public.clients
set slug = 'training-studio-arcs'
where slug = 'arcs-trainingstudio-pilates';
