-- Public read path for LP rendering.
--
-- The `clients` RLS policies restrict row access to the owning sales user, which
-- is correct for the dashboard. But the published LP is rendered server-side
-- with the anon key and needs its own tag config (pixel/ga4/gtm/line, status,
-- domain verification) to inject tags and decide noindex.
--
-- We expose ONLY render-safe columns via a SECURITY DEFINER function rather than
-- a blanket SELECT policy, so sales users still cannot read each other's rows.
-- owner_user_id and commitad_client_id are intentionally NOT returned.

create or replace function public.get_public_client(p_slug text)
returns table (
  id                        uuid,
  slug                      text,
  name                      text,
  status                    client_status,
  meta_pixel_id             text,
  ga4_id                    text,
  gtm_id                    text,
  line_tag_id               text,
  meta_domain_verification  text,
  cv_events                 jsonb
)
language sql
security definer
stable
set search_path = public
as $$
  select id, slug, name, status, meta_pixel_id, ga4_id, gtm_id, line_tag_id,
         meta_domain_verification, cv_events
  from public.clients
  where slug = p_slug;
$$;

grant execute on function public.get_public_client(text) to anon, authenticated;
