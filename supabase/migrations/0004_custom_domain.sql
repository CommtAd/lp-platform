-- Phase 3: custom domain support.
--
-- get_public_client must also expose custom_domain / use_custom_domain_as_canonical
-- so LPShell can decide whether to 301/308 redirect to the client's own domain.
-- Postgres won't let CREATE OR REPLACE change a function's return columns, so drop first.
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
  cv_events                       jsonb
)
language sql
security definer
stable
set search_path = public
as $$
  select id, slug, name, status, custom_domain, use_custom_domain_as_canonical,
         meta_pixel_id, ga4_id, gtm_id, line_tag_id,
         meta_domain_verification, cv_events
  from public.clients
  where slug = p_slug;
$$;

grant execute on function public.get_public_client(text) to anon, authenticated;

-- Reverse lookup for apps/lp/middleware.ts: given the Host header of an incoming
-- request, resolve which client slug owns that custom domain (or null).
create or replace function public.get_client_slug_by_domain(p_host text)
returns text
language sql
security definer
stable
set search_path = public
as $$
  select slug
  from public.clients
  where custom_domain = p_host
  limit 1;
$$;

grant execute on function public.get_client_slug_by_domain(text) to anon, authenticated;
