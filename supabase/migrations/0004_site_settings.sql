-- Cake Drama — сайтын банер (hero) зургийг admin-аас удирдах migration.
-- Supabase SQL Editor дотор ажиллуул.

create table if not exists public.site_settings (
  id smallint primary key default 1 check (id = 1),
  hero_image text not null default 'https://res.cloudinary.com/zafglzry/image/upload/v1783020440/cake-drama/hero_tiramisu.jpg',
  updated_at timestamptz not null default now()
);

insert into public.site_settings (id, hero_image)
values (1, 'https://res.cloudinary.com/zafglzry/image/upload/v1783020440/cake-drama/hero_tiramisu.jpg')
on conflict (id) do nothing;

alter table public.site_settings enable row level security;

create policy "public read site settings" on public.site_settings for select
  using (true);

create policy "admin write site settings" on public.site_settings for update
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');
