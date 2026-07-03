-- Cake Drama — олон зурагтай бүтээгдэхүүнийг дэмжих migration.
-- Supabase SQL Editor дотор ажиллуул (schema.sql болон seed.sql-ийн дараа).

alter table public.products
  add column if not exists images text[] not null default '{}';

-- Одоо байгаа бараа бүрийн цорын ганц `image`-г шинэ `images` массивын эхний элемент болгож хуулна.
update public.products
  set images = array[image]
  where images = '{}';
