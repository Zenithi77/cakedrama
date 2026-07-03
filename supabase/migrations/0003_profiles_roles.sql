-- Cake Drama — хэрэглэгчийн эрх (role) удирдах migration.
-- Supabase SQL Editor дотор ажиллуул.

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  full_name text,
  role text not null default 'customer' check (role in ('customer', 'admin')),
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

-- Хэрэглэгч зөвхөн өөрийн профайлыг л уншиж, засаж болно (role-оо өөрчилж чадахгүй, доор нь харна уу).
create policy "user can read own profile" on public.profiles for select
  using (auth.uid() = id);

create policy "user can update own profile" on public.profiles for update
  using (auth.uid() = id)
  with check (auth.uid() = id);

-- Шинэ хэрэглэгч бүртгүүлэх бүрд автоматаар profiles мөр үүсгэнэ (role='customer' анхны утга).
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, email, full_name, role)
  values (new.id, new.email, new.raw_user_meta_data->>'full_name', 'customer')
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Одоо байгаа (migration-аас өмнө бүртгүүлсэн) хэрэглэгчдэд profiles мөр үүсгэж өгнө.
insert into public.profiles (id, email, full_name, role)
select id, email, raw_user_meta_data->>'full_name', 'customer'
from auth.users
on conflict (id) do nothing;

-- ЗАНГИЛАА: доорх мөрийг өөрийн admin и-мэйлээр солиод тусад нь ажиллуулж, admin эрх олго.
-- update public.profiles set role = 'admin' where email = 'YOUR-ADMIN-EMAIL@example.com';
