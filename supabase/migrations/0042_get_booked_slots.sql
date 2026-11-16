-- LPのフォームで予約が入った日時（希望日＋時間）を、公開LPから読めるようにする。
--
-- 最初の利用者は sakura-shinjuku-sanchome2（Pilates SAKURA 新宿三丁目店）。
-- フォームの時間選択肢は hacomono の空き枠を写したもの（config.ts の HACOMONO_OPEN_SLOTS）で、
-- 「LPで予約が入った枠は、次の訪問者には出さない」ためにこの関数を使う（2026-11-16 顧客要望）。
--
-- submissions には氏名・電話・メールが入っているので、anon には絶対に直接読ませない。
-- SECURITY DEFINER で「日付と時刻の組」だけを返す（get_public_client と同じ考え方）。
--   - 対象は form_submit のみ。tel_tap / line_tap は除外。
--   - 第1希望（date1/time1）と第2希望（date2/time2）の両方を「埋まった枠」として返す。
--     店舗がどちらで確定させるか分からないため、二重予約を避ける側に倒す。
--   - 今日（日本時間）より前の日付は返さない。
--   - 返すのは文字列のまま（フォームの value と完全一致で突き合わせるため）。
--
-- **Supabase への反映は手動**（CIでは流れない）。
--   supabase db query --linked -f supabase/migrations/0042_get_booked_slots.sql
-- 未適用でもLPは壊れない（取得に失敗したら写した空き枠をそのまま出す）。

create or replace function public.get_booked_slots(p_slug text)
returns table (slot_date text, slot_time text)
language sql
security definer
stable
set search_path = public
as $$
  with subs as (
    select s.form_data
    from public.submissions s
    join public.clients c on c.id = s.client_id
    where c.slug = p_slug
      and s.event_type = 'form_submit'
      and s.occurred_at > now() - interval '120 days'
  ),
  pairs as (
    select form_data ->> 'date1' as d, form_data ->> 'time1' as t from subs
    union
    select form_data ->> 'date2', form_data ->> 'time2' from subs
  )
  select d, t
  from pairs
  where d ~ '^\d{4}-\d{2}-\d{2}$'
    and coalesce(t, '') <> ''
    and d >= to_char(now() at time zone 'Asia/Tokyo', 'YYYY-MM-DD');
$$;

revoke all on function public.get_booked_slots(text) from public;
grant execute on function public.get_booked_slots(text) to anon, authenticated;

-- 確認用:
--   select * from public.get_booked_slots('sakura-shinjuku-sanchome2');
