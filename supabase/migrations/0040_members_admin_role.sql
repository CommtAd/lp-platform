-- ダッシュボードにログインできるメンバーの「管理者ロール」を持つテーブル。
--
-- 背景: 0010 で RLS を「認証済みユーザーなら clients / submissions を全件操作可」
-- に緩めた（小さな営業チームで担当の壁を作る意味がなかった）。その方針は変えない。
-- 変えたいのは「ログインできる人を増やす／消す」操作だけで、これは全員が
-- できると危ない（誰でも他人のアカウントを消せる状態になる）。
-- そこで members.role = 'admin' の人だけがメンバー管理を行えるようにする。
--
-- なぜ auth.users.raw_app_meta_data ではなく public のテーブルなのか:
--   1. auth スキーマは Supabase の管理領域。raw_app_meta_data を直接 UPDATE する
--      のは行儀が悪く、最初の管理者を立てるときも auth.users を手で書き換える
--      ことになる（SQLエディタでの WHERE 忘れが怖い場所）。
--   2. public.members なら RLS で「認証済みは読める」にできるので、
--      「自分は管理者か？」の判定に service_role キーが要らない。
--      service_role を使う箇所を「追加・削除・パスワード再発行」だけに閉じ込められる。
--   3. clients.owner_user_id と join できる。将来「誰が作ったLPか」を
--      表示名で出したり、メモ欄を足したりする余地が残る。
--   4. ロール変更が即時に効く（app_metadata はJWTに載るため、載せ替えの
--      タイミングを気にする必要が出る）。

create table if not exists public.members (
  user_id    uuid primary key references auth.users(id) on delete cascade,
  role       text not null default 'member' check (role in ('admin', 'member')),
  created_at timestamptz not null default now()
);

comment on table public.members is
  'ダッシュボードのログインユーザーごとのロール。auth.users と1:1。メンバー管理操作の可否にのみ使う（clients / submissions の権限は 0010 のまま全員同じ）。';
comment on column public.members.role is
  'admin = メンバーの追加・削除・ロール変更・パスワード再発行ができる。member = それ以外は全部できる（LPの作成・編集・公開）。';

alter table public.members enable row level security;

-- 認証済みユーザーは全件読める。
-- 一覧でのロール表示と「自分は管理者か」の判定に使うため、
-- ここだけは anon キー（＝ログインセッション）で読めるようにしておく。
drop policy if exists members_team_select on public.members;
create policy members_team_select on public.members
  for select
  using (auth.uid() is not null);

-- INSERT / UPDATE / DELETE のポリシーは **意図的に作らない**。
-- 書き込みはサーバー側の service_role（RLSをバイパスする）だけが行い、
-- そのサーバー側で role = 'admin' を検証する。
-- ポリシーを足すと「認証済みなら自分を管理者に昇格できる」穴になるので足さないこと。

-- auth.users に行が増えたら members も自動で作る。
-- Supabase の管理コンソールから直接ユーザーを作った場合もロールが付くように
-- トリガーで寄せる（ダッシュボード経由の追加は server action 側でも入れるが、
-- 入口が2つあるのでDB側で揃えておく）。
create or replace function public.handle_new_member()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.members (user_id, role)
  values (new.id, 'member')
  on conflict (user_id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created_member on auth.users;
create trigger on_auth_user_created_member
  after insert on auth.users
  for each row execute function public.handle_new_member();

-- 既存ユーザーの埋め戻し。全員いったん member にする。
insert into public.members (user_id, role)
select id, 'member' from auth.users
on conflict (user_id) do nothing;

-- ▼ 適用後に手で1回だけ実行すること（最初の管理者を立てる）
--   update public.members m
--   set role = 'admin'
--   from auth.users u
--   where u.id = m.user_id
--     and u.email = 'ここに管理者のメールアドレス';
--
-- 確認用:
--   select u.email, m.role
--   from public.members m
--   join auth.users u on u.id = m.user_id
--   order by m.role, u.email;
