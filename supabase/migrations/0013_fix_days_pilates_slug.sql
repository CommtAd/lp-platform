-- DAYSピラティス（days-pilates）の clients 行の slug 不一致を修正する。
--
-- 経緯: ダッシュボードでのクライアント作成時、clients.slug が誤って
-- 'dayspilates'（ハイフンなし）で登録された。一方 LP コード
-- （apps/lp/clients/days-pilates/）と URL ルーティング（/days-pilates）は
-- 'days-pilates'（ハイフンあり）を使っている。このため本番ページの
-- fetchClientRecord('days-pilates') が該当行を見つけられず、LPShell が
-- config.ts のローカル fallback status: "draft" を使ってしまい、ダッシュ
-- ボードで「公開中」にしても本番の非公開プレビューバナーが消えなかった。
--
-- この行の slug を 'days-pilates' に修正することで、本番ページが正しく
-- clients 行と紐付き、ダッシュボードの公開状態が反映されるようになる。

update public.clients
set slug = 'days-pilates'
where slug = 'dayspilates';
