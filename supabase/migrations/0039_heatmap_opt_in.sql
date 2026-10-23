-- ヒートマップ計測をオプトイン（既定OFF）にする。
--
-- 0038 では既定ONにしていたが、実際に分析したいLPは一部だけという運用方針
-- （2026-10-22）。全案件で回し続けると、使わないデータで無料枠の500MBを
-- 削ることになる。同じDBに submissions（CV）が入っているので、容量が詰まると
-- 一番落としてはいけないフォーム送信の記録まで止まる。
--
-- 「使う案件だけONにする」ほうが、止め忘れが起きないぶん運用も素直になる。

alter table public.clients
  alter column heatmap_enabled set default false;

comment on column public.clients.heatmap_enabled is
  'ヒートマップ計測のON/OFF。既定OFF（オプトイン）。分析したい案件だけダッシュボードでONにする。';

-- 既存の全案件をOFFに戻す。0038 の適用直後で、まだどの案件も意図的にONに
-- していない前提。ONにしたい案件はダッシュボードから入れ直す。
update public.clients
set heatmap_enabled = false
where heatmap_enabled;

-- 確認用:
--   select slug, heatmap_enabled from public.clients where heatmap_enabled order by slug;
--   -- ↑ ONにした案件だけが並ぶ（最初は0件）
