-- LP platform core schema: clients / submissions / pending_webhooks
-- See docs/lp-platform-spec.md §5.

create extension if not exists "pgcrypto";

-- Enums --------------------------------------------------------------------
do $$ begin
  create type client_status as enum ('draft', 'published', 'unpublished');
exception when duplicate_object then null; end $$;

do $$ begin
  create type webhook_status as enum ('pending', 'delivered', 'failed');
exception when duplicate_object then null; end $$;

-- clients ------------------------------------------------------------------
create table if not exists public.clients (
  id                              uuid primary key default gen_random_uuid(),
  slug                            text not null unique
                                    check (slug ~ '^[a-z0-9-]+$'),
  name                            text not null,
  status                          client_status not null default 'draft',
  owner_user_id                   uuid references auth.users (id) on delete set null,
  commitad_client_id              text,
  custom_domain                   text,
  use_custom_domain_as_canonical  boolean not null default false,
  meta_pixel_id                   text,
  ga4_id                          text,
  gtm_id                          text,
  line_tag_id                     text,
  meta_domain_verification        text,
  cv_events                       jsonb not null default '{}'::jsonb,
  created_at                      timestamptz not null default now(),
  updated_at                      timestamptz not null default now()
);

create index if not exists clients_owner_user_id_idx on public.clients (owner_user_id);

-- submissions (raw event log; CV UI lives in CommitAd) ----------------------
create table if not exists public.submissions (
  id           uuid primary key default gen_random_uuid(),
  client_id    uuid not null references public.clients (id) on delete cascade,
  event_type   text not null check (event_type in ('form_submit', 'tel_tap', 'line_tap')),
  form_data    jsonb not null default '{}'::jsonb,
  utm          jsonb not null default '{}'::jsonb,
  user_agent   text,
  referrer     text,
  occurred_at  timestamptz not null default now()
);

create index if not exists submissions_client_id_idx on public.submissions (client_id);

-- pending_webhooks (retry queue, exponential backoff) ----------------------
create table if not exists public.pending_webhooks (
  id             uuid primary key default gen_random_uuid(),
  submission_id  uuid not null references public.submissions (id) on delete cascade,
  payload        jsonb not null,
  attempts       int not null default 0,
  next_retry_at  timestamptz not null default now(),
  status         webhook_status not null default 'pending',
  created_at     timestamptz not null default now(),
  updated_at     timestamptz not null default now()
);

create index if not exists pending_webhooks_status_idx
  on public.pending_webhooks (status, next_retry_at);

-- updated_at trigger -------------------------------------------------------
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end $$;

drop trigger if exists clients_set_updated_at on public.clients;
create trigger clients_set_updated_at
  before update on public.clients
  for each row execute function public.set_updated_at();

drop trigger if exists pending_webhooks_set_updated_at on public.pending_webhooks;
create trigger pending_webhooks_set_updated_at
  before update on public.pending_webhooks
  for each row execute function public.set_updated_at();
