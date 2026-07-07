-- Row-level security. See docs/lp-platform-spec.md §5 "RLS方針".
--   Sales role: full access to rows they own (owner_user_id = auth.uid()).
--   Submissions: INSERT only by the Edge Function (service_role, bypasses RLS).
--   Sales may SELECT submissions belonging to their own clients only.

alter table public.clients          enable row level security;
alter table public.submissions      enable row level security;
alter table public.pending_webhooks enable row level security;

-- clients: owner has full control over their own rows --------------------
drop policy if exists clients_owner_all on public.clients;
create policy clients_owner_all on public.clients
  for all
  using (owner_user_id = auth.uid())
  with check (owner_user_id = auth.uid());

-- submissions: owner may read rows for clients they own -------------------
-- No INSERT/UPDATE/DELETE policy for authenticated users: writes come from
-- the Edge Function using the service_role key, which bypasses RLS.
drop policy if exists submissions_owner_select on public.submissions;
create policy submissions_owner_select on public.submissions
  for select
  using (
    exists (
      select 1 from public.clients c
      where c.id = submissions.client_id
        and c.owner_user_id = auth.uid()
    )
  );

-- pending_webhooks: owner may read the retry state of their submissions ---
drop policy if exists pending_webhooks_owner_select on public.pending_webhooks;
create policy pending_webhooks_owner_select on public.pending_webhooks
  for select
  using (
    exists (
      select 1
      from public.submissions s
      join public.clients c on c.id = s.client_id
      where s.id = pending_webhooks.submission_id
        and c.owner_user_id = auth.uid()
    )
  );
