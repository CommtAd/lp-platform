-- STUDIO IVY 藤沢店の slug を 'ivy-test' から 'ivy-fujisawa' に変更する。
--
-- 経緯: テスト用の仮名 'ivy-test' のまま制作していたが、広告配信前に
-- 正式な名前へ切り替える（2026-10-15、広告での使用なしを確認済み）。
-- LP コードのフォルダ（apps/lp/clients/ivy-fujisawa/）と画像フォルダ
-- （apps/lp/public/clients/ivy-fujisawa/）は同じ PR でリネーム済み。
--
-- 0013 / 0014 / 0023 と同じく、フォルダ名と clients.slug がずれると
-- ページは表示されるのにタグが注入されなくなるため、この PR のマージと
-- 同じタイミングで適用すること。
-- submissions は client_id で紐付いているので、過去の問い合わせは影響を受けない。

update public.clients
set slug = 'ivy-fujisawa'
where slug = 'ivy-test';
