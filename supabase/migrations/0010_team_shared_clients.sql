-- Team-shared access model.
--
-- Original 0002_rls.sql scoped every row to its creating user
-- (owner_user_id = auth.uid()), so a newly invited member saw an empty
-- dashboard. For this small, trusted sales team every authenticated user
-- should be able to view / edit / publish ALL client LPs.
--
-- We relax the policies to "any authenticated user" (auth.uid() is not null).
-- Only people with a Supabase Auth account can log in, so this still keeps
-- the data private to the team. owner_user_id is retained purely as an
-- audit/creator record.

-- clients: any authenticated team member has full control -------------------
drop policy if exists clients_owner_all on public.clients;
create policy clients_team_all on public.clients
  for all
  using (auth.uid() is not null)
  with check (auth.uid() is not null);

-- submissions: any authenticated team member may read all rows --------------
drop policy if exists submissions_owner_select on public.submissions;
create policy submissions_team_select on public.submissions
  for select
  using (auth.uid() is not null);

-- pending_webhooks: any authenticated team member may read retry state ------
drop policy if exists pending_webhooks_owner_select on public.pending_webhooks;
create policy pending_webhooks_team_select on public.pending_webhooks
  for select
  using (auth.uid() is not null);
