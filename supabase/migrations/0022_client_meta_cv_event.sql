-- フォーム送信成功時に送る Meta ピクセルのイベント名を案件ごとに設定できるようにする。
--
-- これまでは LPForm 側で 'Lead' 固定だった。ブライダルは運用側の指定で 'Purchase'
-- を使うため、案件ごとに切り替えられるようにする。
--
-- null は「業種の既定に従う」の意味。DBの default では業種を参照できないので、
-- 解決は get_public_client 側で行う（bridal → Purchase / それ以外 → Lead）。
-- こうすると、今後ダッシュボードで作るブライダル案件も設定なしで Purchase になる。

alter table public.clients
  add column if not exists meta_cv_event text;

-- 値は Meta の標準イベント名に限定する。任意文字列を許すと打ち間違いに気づけない
-- （ピクセルは未知のイベント名でもエラーを出さず、ただ計上されないだけ）。
alter table public.clients
  drop constraint if exists clients_meta_cv_event_check;
alter table public.clients
  add constraint clients_meta_cv_event_check
  check (
    meta_cv_event is null
    or meta_cv_event in (
      'Lead',
      'Purchase',
      'CompleteRegistration',
      'Contact',
      'Schedule',
      'SubmitApplication'
    )
  );

comment on column public.clients.meta_cv_event is
  'フォーム送信成功時に送る Meta ピクセルのイベント名。null は業種の既定（bridal=Purchase / その他=Lead）。';

-- 公開RPCに meta_cv_event を足す。返す時点で業種の既定に解決しておくので、
-- LP側は null を意識しなくてよい。
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
  meta_cv_event                   text
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
         ) as meta_cv_event
  from public.clients
  where slug = p_slug;
$$;

grant execute on function public.get_public_client(text) to anon, authenticated;

-- 確認用:
--   select slug, industry, meta_cv_event from public.clients order by industry, slug;
--   select slug, meta_cv_event from public.get_public_client('forest-terrace-hiroshima');
