-- メンバーごとに「見られる業種」を絞れるようにする。
--
-- 背景: 0010 で RLS を「認証済みなら全件」に緩めた。小さなチームではそれで
-- よかったが、ブライダル専任・フィットネス専任といった担当分けが出てきた
-- （2026-10-22）。担当外の案件まで一覧に並ぶのは扱いづらいうえ、
-- submissions には顧客の氏名・電話・メールが入っているので、
-- 見せる範囲は絞れたほうがよい。
--
-- **画面側でタブを隠すだけでは意味がない**（ブラウザにはデータが届いている）。
-- 必ずRLSで絞る。そのため clients だけでなく、clients にぶら下がる
-- submissions / pending_webhooks / heatmap_* も同じ条件で絞る。
-- ここを揃え忘れると「一覧には出ないがCVデータは読める」という
-- 中途半端な状態になる。

-- members.industries -------------------------------------------------------
-- NULL = 制限なし（全業種）。既存メンバーは NULL のままなので、
-- このマイグレーションを当てても**今までどおり全部見える**。
-- 絞りたい人にだけ配列を入れる。
alter table public.members
  add column if not exists industries text[];

alter table public.members
  drop constraint if exists members_industries_valid;
alter table public.members
  add constraint members_industries_valid check (
    industries is null
    or (
      -- 空配列は「何も見えない」という無意味な状態になるので禁止。
      -- 全部見せたいなら NULL にする。
      -- coalesce が要る: 空配列の array_length は NULL を返し、
      -- CHECK は NULL を「違反なし」として通してしまうため。
      coalesce(array_length(industries, 1), 0) >= 1
      and industries <@ array['fitness', 'bridal', 'other']::text[]
    )
  );

comment on column public.members.industries is
  '見られる業種。NULL = 全業種（制限なし）。例: {bridal} でブライダル専任。clients.industry と突き合わせる。';

-- 判定関数 -----------------------------------------------------------------
-- security definer にしているのは、members を読むときに RLS を経由させない
-- ため（ポリシーの中からポリシーを引くと、条件が増えたときに追いにくくなる）。
-- 5つのポリシーから同じ関数を呼ぶ形にして、判定ロジックを1箇所に集める。
create or replace function public.member_can_access_industry(p_industry text)
returns boolean
language plpgsql
stable
security definer
set search_path = public
as $$
declare
  allowed text[];
begin
  if auth.uid() is null then
    return false;
  end if;

  select m.industries into allowed
  from public.members m
  where m.user_id = auth.uid();

  -- NULL = 制限なし。members 行がまだ無いユーザーも同じ扱いにする
  -- （0040 のトリガー導入前に作られたユーザーを締め出さないため）。
  if allowed is null then
    return true;
  end if;

  -- industry が入っていない古い行は fitness 扱い。
  -- ダッシュボードの一覧（apps/dashboard/app/page.tsx）と同じ既定値に揃える。
  return coalesce(p_industry, 'fitness') = any (allowed);
end;
$$;

comment on function public.member_can_access_industry(text) is
  'ログイン中のユーザーがその業種を見られるか。members.industries が NULL なら全業種。RLSポリシーから呼ぶ。';

grant execute on function public.member_can_access_industry(text) to authenticated;

-- clients ------------------------------------------------------------------
-- with check も同じ条件にしているので、自分が見られない業種のLPを
-- 作る・その業種に付け替える、ができない（作った瞬間に自分から見えなくなる
-- という事故を防ぐ）。
drop policy if exists clients_team_all on public.clients;
create policy clients_team_all on public.clients
  for all
  using (public.member_can_access_industry(industry))
  with check (public.member_can_access_industry(industry));

-- submissions --------------------------------------------------------------
-- ここが本丸。顧客の氏名・電話・メールが入っているので、
-- clients と必ず同じ条件で絞る。
drop policy if exists submissions_team_select on public.submissions;
create policy submissions_team_select on public.submissions
  for select
  using (
    exists (
      select 1 from public.clients c
      where c.id = submissions.client_id
        and public.member_can_access_industry(c.industry)
    )
  );

-- pending_webhooks ---------------------------------------------------------
drop policy if exists pending_webhooks_team_select on public.pending_webhooks;
create policy pending_webhooks_team_select on public.pending_webhooks
  for select
  using (
    exists (
      select 1
      from public.submissions s
      join public.clients c on c.id = s.client_id
      where s.id = pending_webhooks.submission_id
        and public.member_can_access_industry(c.industry)
    )
  );

-- heatmap ------------------------------------------------------------------
-- どちらのテーブルも client_id を直接持っているので join は1段で済む。
drop policy if exists heatmap_sessions_team_select on public.heatmap_sessions;
create policy heatmap_sessions_team_select on public.heatmap_sessions
  for select
  using (
    exists (
      select 1 from public.clients c
      where c.id = heatmap_sessions.client_id
        and public.member_can_access_industry(c.industry)
    )
  );

drop policy if exists heatmap_clicks_team_select on public.heatmap_clicks;
create policy heatmap_clicks_team_select on public.heatmap_clicks
  for select
  using (
    exists (
      select 1 from public.clients c
      where c.id = heatmap_clicks.client_id
        and public.member_can_access_industry(c.industry)
    )
  );

-- 注意: LP配信側は影響を受けない。
-- 公開LPは get_public_client(p_slug)（SECURITY DEFINER）経由で読んでいるので、
-- ここでRLSを厳しくしても公開ページは従来どおり表示される。

-- ▼ 業種を絞る例（適用後、必要になったら実行する）
--   update public.members m
--   set industries = array['bridal']
--   from auth.users u
--   where u.id = m.user_id
--     and u.email = 'ブライダル専任にする人のメールアドレス';
--
--   -- 制限を外して全業種に戻す場合:
--   --   update public.members set industries = null where user_id = '...';
--
-- 確認用:
--   select u.email, m.role, coalesce(m.industries::text, '全業種') as industries
--   from public.members m
--   join auth.users u on u.id = m.user_id
--   order by m.role, u.email;
