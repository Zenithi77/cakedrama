-- Cake Drama — Supabase schema
-- Ажиллуулах заавар: Supabase Dashboard > SQL Editor дотор бүхлээр нь paste хийж Run дар.

create extension if not exists "pgcrypto";

-- ---------- products ----------
create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  category text not null check (category in ('castella', 'big_cake', 'roll_snack', 'donut', 'mini_donut', 'fatcaron')),
  name text not null,
  image text not null,
  images text[] not null default '{}',
  price integer,
  weight text,
  packaging text,
  storage text,
  shelf_life text,
  thawing text,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

-- ---------- specials (Zero Sugar Tiramisu, Croffle, ...) ----------
create table if not exists public.specials (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  image text not null,
  tags text[] not null default '{}',
  description text not null,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

-- ---------- partners ----------
create table if not exists public.partners (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  logo text not null,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

-- ---------- contact messages (захиалга / contact form) ----------
create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text,
  email text,
  message text not null,
  created_at timestamptz not null default now()
);

-- ================= Row Level Security =================
alter table public.products enable row level security;
alter table public.specials enable row level security;
alter table public.partners enable row level security;
alter table public.contact_messages enable row level security;

-- Хэн ч (нэвтрээгүй зочин ч гэсэн) бүтээгдэхүүн, онцлох, түншийн мэдээллийг унших боломжтой.
create policy "public read products" on public.products for select using (true);
create policy "public read specials" on public.specials for select using (true);
create policy "public read partners" on public.partners for select using (true);

-- Зөвхөн нэвтэрсэн (admin) хэрэглэгч бичиж/засаж/устгаж болно.
create policy "admin write products" on public.products for all
  using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "admin write specials" on public.specials for all
  using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "admin write partners" on public.partners for all
  using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

-- Хэн ч (зочин) захиалгын/contact мессеж илгээж (insert) болно, гэхдээ уншиж болохгүй.
create policy "anyone can submit contact message" on public.contact_messages for insert
  with check (true);
create policy "admin read contact messages" on public.contact_messages for select
  using (auth.role() = 'authenticated');
