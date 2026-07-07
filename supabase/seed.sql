-- Local/dev seed. Applied by `supabase db reset`.
-- Inserts the pilot client with a DUMMY Meta Pixel ID so tag injection can be
-- verified end-to-end without a real ad account. owner_user_id is left null
-- (no auth user exists in a fresh local stack).

insert into public.clients (slug, name, status, meta_pixel_id, cv_events)
values (
  'the-personal-pilates',
  'THE PERSONAL PILATES',
  'published',
  '000000000000000',
  '{"form_submit": true, "tel_tap": true, "line_tap": true}'::jsonb
)
on conflict (slug) do update
  set name          = excluded.name,
      status        = excluded.status,
      meta_pixel_id = excluded.meta_pixel_id,
      cv_events     = excluded.cv_events;
