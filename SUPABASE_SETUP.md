# Supabase холболт хийх заавар

Сайт одоо Supabase холбогдоогүй үед статик өгөгдлөөр (`src/lib/staticContent.ts`) ажиллаж
байгаа тул юу ч эвдэхгүйгээр дараах алхмуудыг хийж болно.

## 1. Supabase төсөл үүсгэх

1. https://supabase.com дээр төсөл (project) үүсгэ.
2. **Project Settings → API** хэсгээс дараах утгуудыг ав:
   - `Project URL`
   - `anon public` key
   - `service_role` key (нууц, зөвхөн сервер талд ашиглана)

## 2. Орчны хувьсагч тохируулах

`.env.local.example` файлыг хуулж `.env.local` нэрээр хадгал, дараа нь утгуудыг бөглө:

```bash
cp .env.local.example .env.local
```

```
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...
```

`.env.local` нь git-д commit хийгдэхгүй (`.gitignore` дотор аль хэдийн байгаа).

## 3. Хүснэгт (schema) үүсгэх

Supabase Dashboard → **SQL Editor** руу орж `supabase/schema.sql` файлын агуулгыг бүхлээр нь
paste хийж **Run** дар. Энэ нь дараах хүснэгтүүдийг үүсгэнэ:

- `products` — Castella, cheese cake, roll cake, donut гэх мэт бүх бүтээгдэхүүн
- `specials` — Zero Sugar Tiramisu, Croffle, Condensed Milk Butter Roll
- `partners` — Homeplus, Starbucks, Emart гэх мэт түншүүдийн лого
- `contact_messages` — вэбсайтын "Захиалга илгээх" маягтаас ирсэн зурвасууд

мөн эдгээр дээр Row Level Security (RLS) идэвхжинэ:
- `products`, `specials`, `partners` — хэн ч (зочин) уншиж болно, зөвхөн нэвтэрсэн admin бичнэ
- `contact_messages` — хэн ч бичиж (insert) болно, зөвхөн нэвтэрсэн admin уншина

## 4. Одоогийн агуулгаар DB-г дүүргэх (seed)

Мөн SQL Editor дотор `supabase/seed.sql` файлын агуулгыг ажиллуул. Энэ нь одоогийн вэбсайт
дээрх бүх бүтээгдэхүүн, онцлох зүйл, түншийн жагсаалтыг DB-рүү хуулна (зургууд нь
`public/images/...` замаараа хэвээр үлдэнэ, зөвхөн metadata л DB-д хадгалагдана).

## 5. Admin хэрэглэгч үүсгэх

Supabase Dashboard → **Authentication → Users → Add user** дотроос admin-аар
нэвтрэх и-мэйл/нууц үг үүсгэ (жишээ нь `temka1202@gmail.com`).

## 6. Ажиллуулах

```bash
npm run dev
```

- Нүүр хуудас (`/`) — Supabase холбогдсон бол DB-ээс, холбогдоогүй бол статик
  өгөгдлөөс автоматаар уншина (`src/lib/data.ts` дотор энэ логик байгаа).
- `/admin/login` — admin нэвтрэх хуудас.
- `/admin` — бүтээгдэхүүн нэмэх/засах/устгах (CRUD) удирдлагын самбар.
- `/api/contact` — вэбсайтын "Захиалга илгээх" маягт энэ route руу POST хийж
  `contact_messages` хүснэгтэд бичнэ.

## Архитектур товч

```
src/lib/supabase/client.ts   — browser талын Supabase client (admin CRUD-д ашиглана)
src/lib/supabase/server.ts   — server талын Supabase client (Server Component, API route-д)
src/lib/supabase/types.ts    — Database TypeScript төрлүүд
src/lib/data.ts              — getProducts/getSpecials/getPartners (DB эсвэл fallback)
src/lib/staticContent.ts     — Supabase холбогдоогүй үеийн нөөц агуулга
src/middleware.ts            — /admin замыг нэвтрээгүй хэрэглэгчээс хамгаална
supabase/schema.sql          — хүснэгт + RLS policy
supabase/seed.sql            — одоогийн агуулгыг DB рүү дүүргэх seed өгөгдөл
```
