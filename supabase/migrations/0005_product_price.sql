-- Cake Drama — бүтээгдэхүүнд үнэ (төгрөгөөр) нэмэх migration.
-- Supabase SQL Editor дотор ажиллуул. Дахин ажиллуулахад ч алдаа өгөхгүй (idempotent).

alter table public.products
  add column if not exists price integer;

notify pgrst, 'reload schema';
