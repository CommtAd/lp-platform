-- 業種（industry）による顧客LPの分類。
--
-- ブライダルフェアLP（パターンC）を追加するにあたり、ダッシュボードの一覧が
-- フィットネスと混ざると運用しづらいため、行に業種を持たせてタブ分けできるようにする。
--
-- LP配信側（get_public_client）は業種を一切参照しない。タグ注入・公開判定は
-- 業種非依存のままなので、RPCの戻り値は変更しない（差し替え不要）。
--
-- 既存行はすべてフィットネス系として作られているため default 'fitness' で埋め、
-- 唯一の非フィットネス案件である kaigyo-support だけ 'other' に寄せる。

alter table public.clients
  add column if not exists industry text not null default 'fitness';

do $$ begin
  alter table public.clients
    add constraint clients_industry_check
    check (industry in ('fitness', 'bridal', 'other'));
exception when duplicate_object then null; end $$;

update public.clients set industry = 'other' where slug = 'kaigyo-support';

create index if not exists clients_industry_idx on public.clients (industry);

comment on column public.clients.industry is
  '業種タブ（fitness / bridal / other）。ダッシュボードの一覧分類にのみ使用し、LP配信側は参照しない。';
