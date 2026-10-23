-- ヒートマップ分析（自社実装）。
--
-- 外部SaaS（Clarity / Hotjar）を入れずに、クリック位置とスクロール到達を
-- 自分のSupabaseに溜めてダッシュボードで可視化する。セッション録画は撮らない。
-- 保存するのは座標・押された要素の文字・到達深さだけで、入力値は一切送らない。
--
-- 座標系は「キャンバス座標」。LPは幅390pxの1枚のキャンバスとして作られている
-- （CLAUDE.md §16）ので、クリック位置を 390px 設計上の座標に直して保存すれば、
-- 360pxの実機でも1280pxのPCでも同じ1枚の絵に重ねられる。
--   x は 0〜1 の比率（キャンバス幅に対する割合）
--   y は キャンバス座標のpx（キャンバス上端からの距離）
-- 横幅ずれ防止ルールの対象外である既存17本はキャンバスが可変幅なので、
-- y は `heatmap_sessions.page_height_px` で割って比率に直してから使う
-- （ダッシュボード側でそうしている）。
--
-- 書き込みは公開LPから来るので、テーブルへの anon INSERT は開けず
-- SECURITY DEFINER の `record_heatmap` 経由に限定する。関数側で slug を解決し、
-- 値域を丸め、1回あたりのクリック件数に上限を掛ける。

-- clients: 案件ごとのON/OFF ------------------------------------------------
-- 既定ON。LPShell が全LPを包んでいるので、列を足した時点で全案件が計測対象に
-- なる。顧客の要望で止めたい案件だけダッシュボードでOFFにする。
alter table public.clients
  add column if not exists heatmap_enabled boolean not null default true;

comment on column public.clients.heatmap_enabled is
  'ヒートマップ計測のON/OFF。OFFにすると LP から収集スクリプトが出なくなる。';

-- heatmap_sessions ---------------------------------------------------------
-- 1行 = 1ページビュー。クリックが無いセッションも母数として必要なので、
-- スクロール到達率の分母はこのテーブルの件数になる。
create table if not exists public.heatmap_sessions (
  id               uuid primary key default gen_random_uuid(),
  client_id        uuid not null references public.clients (id) on delete cascade,
  -- ブラウザの sessionStorage で発行する識別子。Cookieではないので
  -- タブを閉じれば消える。個人の特定には使わない（名寄せもしない）。
  session_key      text not null,
  device           text not null check (device in ('mobile', 'tablet', 'desktop')),
  viewport_w       int  not null,
  viewport_h       int  not null,
  -- キャンバスのレイアウト幅。新規LPは常に 390。
  canvas_width_px  int  not null,
  -- キャンバス座標でのページ全高。y を比率に直すための分母。
  page_height_px   int  not null check (page_height_px > 0),
  -- 到達した最大の深さ（キャンバス座標）。再送のたびに大きい方で上書きする。
  max_scroll_px    int  not null default 0,
  dwell_ms         int  not null default 0,
  utm              jsonb not null default '{}'::jsonb,
  referrer         text,
  started_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now(),
  unique (client_id, session_key)
);

create index if not exists heatmap_sessions_client_started_idx
  on public.heatmap_sessions (client_id, started_at desc);

-- heatmap_clicks -----------------------------------------------------------
-- client_id は集計のための非正規化（期間絞り込みのたびに join したくない）。
create table if not exists public.heatmap_clicks (
  id          bigint generated always as identity primary key,
  session_id  uuid not null references public.heatmap_sessions (id) on delete cascade,
  client_id   uuid not null references public.clients (id) on delete cascade,
  x_ratio     numeric(6, 5) not null check (x_ratio >= 0 and x_ratio <= 1),
  y_px        int not null check (y_px >= 0),
  -- 押された要素の文字（ボタン名など）。入力値は入れない。
  label       text,
  occurred_at timestamptz not null default now()
);

create index if not exists heatmap_clicks_client_occurred_idx
  on public.heatmap_clicks (client_id, occurred_at desc);

create index if not exists heatmap_clicks_session_idx
  on public.heatmap_clicks (session_id);

-- RLS ----------------------------------------------------------------------
-- submissions と同じ方針（0010_team_shared_clients.sql）。チームの認証ユーザーは
-- 全件読める。INSERT ポリシーは作らない＝書き込みは SECURITY DEFINER 関数だけ。
alter table public.heatmap_sessions enable row level security;
alter table public.heatmap_clicks   enable row level security;

drop policy if exists heatmap_sessions_team_select on public.heatmap_sessions;
create policy heatmap_sessions_team_select on public.heatmap_sessions
  for select using (auth.uid() is not null);

drop policy if exists heatmap_clicks_team_select on public.heatmap_clicks;
create policy heatmap_clicks_team_select on public.heatmap_clicks
  for select using (auth.uid() is not null);

grant select on public.heatmap_sessions to authenticated;
grant select on public.heatmap_clicks   to authenticated;

-- record_heatmap -----------------------------------------------------------
-- LP から anon キーで叩く唯一の書き込み口。1回の呼び出しで
-- セッションの更新（upsert）とクリックの追加をまとめて行う。
create or replace function public.record_heatmap(
  p_slug            text,
  p_session_key     text,
  p_device          text,
  p_viewport_w      int,
  p_viewport_h      int,
  p_canvas_width_px int,
  p_page_height_px  int,
  p_max_scroll_px   int,
  p_dwell_ms        int,
  p_utm             jsonb default '{}'::jsonb,
  p_referrer        text  default null,
  p_clicks          jsonb default '[]'::jsonb
)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  v_client_id  uuid;
  v_session_id uuid;
begin
  -- 存在しない slug / 計測OFF の案件は黙って捨てる。公開エンドポイントなので
  -- 失敗理由を返さない（slug の総当たりで案件の有無を探られないようにする）。
  select id into v_client_id
  from public.clients
  where slug = p_slug and heatmap_enabled;
  if v_client_id is null then
    return;
  end if;

  if p_session_key is null or p_session_key = '' then return; end if;
  if p_page_height_px is null or p_page_height_px <= 0 then return; end if;
  if p_canvas_width_px is null or p_canvas_width_px <= 0 then return; end if;

  insert into public.heatmap_sessions as s (
    client_id, session_key, device, viewport_w, viewport_h,
    canvas_width_px, page_height_px, max_scroll_px, dwell_ms, utm, referrer
  )
  values (
    v_client_id,
    left(p_session_key, 64),
    case when p_device in ('mobile', 'tablet', 'desktop') then p_device else 'desktop' end,
    least(greatest(coalesce(p_viewport_w, 0), 0), 20000),
    least(greatest(coalesce(p_viewport_h, 0), 0), 20000),
    least(p_canvas_width_px, 20000),
    least(p_page_height_px, 500000),
    least(greatest(coalesce(p_max_scroll_px, 0), 0), 500000),
    least(greatest(coalesce(p_dwell_ms, 0), 0), 86400000),
    case when jsonb_typeof(p_utm) = 'object' then p_utm else '{}'::jsonb end,
    left(p_referrer, 500)
  )
  on conflict (client_id, session_key) do update
    set max_scroll_px   = greatest(s.max_scroll_px, excluded.max_scroll_px),
        dwell_ms        = greatest(s.dwell_ms, excluded.dwell_ms),
        page_height_px  = excluded.page_height_px,
        viewport_w      = excluded.viewport_w,
        viewport_h      = excluded.viewport_h,
        updated_at      = now()
  returning s.id into v_session_id;

  if jsonb_typeof(p_clicks) <> 'array' then
    return;
  end if;

  -- 数値として読める要素だけ入れる。キャストで例外を出すと
  -- セッションの更新ごと巻き戻ってしまうため、正規表現で先に弾く。
  insert into public.heatmap_clicks (session_id, client_id, x_ratio, y_px, label)
  select
    v_session_id,
    v_client_id,
    least(greatest((c ->> 'x')::numeric, 0), 1),
    least(greatest((c ->> 'y')::int, 0), 500000),
    nullif(left(c ->> 'l', 60), '')
  from jsonb_array_elements(p_clicks) as c
  where (c ->> 'x') ~ '^[0-9]+(\.[0-9]+)?$'
    and (c ->> 'y') ~ '^[0-9]+$'
  limit 300;
end;
$$;

grant execute on function public.record_heatmap(
  text, text, text, int, int, int, int, int, int, jsonb, text, jsonb
) to anon, authenticated;

comment on function public.record_heatmap is
  'LPからヒートマップのクリック／スクロール到達を記録する唯一の書き込み口。anon から叩ける。';

-- prune_heatmap ------------------------------------------------------------
-- 保持期間の掃除。クリックはセッションに ON DELETE CASCADE で付いているので
-- セッションを消せば一緒に消える。pg_cron を有効にしていないので、
-- 当面はダッシュボードから手で、または SQL エディタで実行する想定。
--   select public.prune_heatmap(90);
create or replace function public.prune_heatmap(p_days int default 90)
returns bigint
language plpgsql
security definer
set search_path = public
as $$
declare
  v_deleted bigint;
begin
  delete from public.heatmap_sessions
  where started_at < now() - make_interval(days => greatest(p_days, 1));
  get diagnostics v_deleted = row_count;
  return v_deleted;
end;
$$;

-- PUBLIC には既定で EXECUTE が付くので、そこから落とさないと anon でも叩ける。
revoke all on function public.prune_heatmap(int) from public, anon, authenticated;

-- 公開RPCに heatmap_enabled を足す。LPShell は返り値だけを見て
-- 収集スクリプトを出すかどうかを決める。
-- 返り値の列を変えるので CREATE OR REPLACE は使えず、drop してから作り直す。
drop function if exists public.get_public_client(text);

create function public.get_public_client(p_slug text)
returns table (
  id                              uuid,
  slug                            text,
  name                            text,
  status                          client_status,
  custom_domain                   text,
  use_custom_domain_as_canonical  boolean,
  meta_pixel_id                   text,
  ga4_id                          text,
  gtm_id                          text,
  line_tag_id                     text,
  meta_domain_verification        text,
  cv_events                       jsonb,
  meta_cv_event                   text,
  heatmap_enabled                 boolean
)
language sql
security definer
stable
set search_path = public
as $$
  select id, slug, name, status, custom_domain, use_custom_domain_as_canonical,
         meta_pixel_id, ga4_id, gtm_id, line_tag_id,
         meta_domain_verification, cv_events,
         coalesce(
           meta_cv_event,
           case when industry = 'bridal' then 'Purchase' else 'Lead' end
         ) as meta_cv_event,
         heatmap_enabled
  from public.clients
  where slug = p_slug;
$$;

grant execute on function public.get_public_client(text) to anon, authenticated;

-- 確認用:
--   select slug, heatmap_enabled from public.get_public_client('the-personal-pilates');
--   select count(*) from public.heatmap_sessions;
--   select label, count(*) from public.heatmap_clicks group by 1 order by 2 desc limit 10;
