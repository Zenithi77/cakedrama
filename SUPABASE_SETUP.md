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

## 5. Олон зурагтай бүтээгдэхүүн (migration)

Хэрэв та `schema.sql`-ыг өмнө нь аль хэдийн ажиллуулсан бол дараах migration-ыг нэмж
ажиллуулна (шинээр эхэлж байгаа бол шаардлагагүй, `schema.sql`-д аль хэдийн орсон):

SQL Editor дотор `supabase/migrations/0002_product_images_array.sql` файлын агуулгыг paste
хийж ажиллуул. Энэ нь `products.images text[]` багана нэмж, одоо байгаа `image`-г шинэ
массивын эхний элемент болгож хуулна (өгөгдөл алдагдахгүй).

## 6. Cloudinary тохируулах (зургийн сан)

Admin панелаас байршуулсан бүх шинэ зураг (бүтээгдэхүүн, онцлох, түншийн лого) Cloudinary
дээр хадгалагдана.

1. https://cloudinary.com дээр акаунт үүсгэ (үнэгүй төлөвлөгөө хангалттай).
2. Dashboard нүүр хуудасны **Product Environment Credentials** хэсгээс дараах утгуудыг ав:
   - `Cloud name`
   - `API Key`
   - `API Secret`
3. `.env.local` файлд бөглө:

```
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
CLOUDINARY_UPLOAD_FOLDER=cake-drama
```

Тусгай "unsigned upload preset" үүсгэх шаардлагагүй — байршуулалт нь сервер талд
(`/api/admin/cloudinary-sign`) гарын үсэг зурагдсан (signed) байдлаар хийгддэг тул
`API Secret`-ийг хэзээ ч клиент рүү дамжуулдаггүй, зөвхөн нэвтэрсэн admin хэрэглэгч
байршуулах эрхтэй.

## 7. Admin хэрэглэгч үүсгэх

Supabase Dashboard → **Authentication → Users → Add user** дотроос admin-аар
нэвтрэх и-мэйл/нууц үг үүсгэ (жишээ нь `temka1202@gmail.com`).

## 8. Ажиллуулах

```bash
npm run dev
```

- Нүүр хуудас (`/`) — Supabase холбогдсон бол DB-ээс, холбогдоогүй бол статик
  өгөгдлөөс автоматаар уншина (`src/lib/data.ts` дотор энэ логик байгаа).
- `/admin/login` — admin нэвтрэх хуудас.
- `/admin` — мэргэжлийн CRUD dashboard: **Бүтээгдэхүүн** (олон зурагтай, ангилал сольж
  болно, хайлт/шүүлтүүртэй), **Онцлох**, **Түншүүд**, **Зурвасууд** (contact form-оос ирсэн
  захиалгууд) гэсэн tab-тай.
- `/api/contact` — вэбсайтын "Захиалга илгээх" маягт энэ route руу POST хийж
  `contact_messages` хүснэгтэд бичнэ.
- `/api/admin/cloudinary-sign`, `/api/admin/cloudinary-delete` — зөвхөн нэвтэрсэн admin-д
  зориулсан Cloudinary upload/delete route-ууд.

## Архитектур товч

```
src/lib/supabase/client.ts        — browser талын Supabase client (admin CRUD-д ашиглана)
src/lib/supabase/server.ts        — server талын Supabase client (Server Component, API route-д)
src/lib/supabase/types.ts         — Database TypeScript төрлүүд
src/lib/data.ts                   — getProducts/getSpecials/getPartners (DB эсвэл fallback)
src/lib/staticContent.ts          — Supabase холбогдоогүй үеийн нөөц агуулга
src/lib/cloudinary.ts             — signed upload/delete логик (зөвхөн серверт)
src/lib/cloudinaryUrl.ts          — Cloudinary URL-с public_id ялгах helper
src/lib/partnerLogo.ts            — хуучин local лого болон шинэ Cloudinary URL хоёуланг дэмжинэ
src/middleware.ts                 — /admin, /account замуудыг нэвтрээгүй хэрэглэгчээс хамгаална
src/components/admin/             — AdminShell (sidebar tabs) + Products/Specials/Partners/MessagesPanel + ImageUploader
supabase/schema.sql               — хүснэгт (images баганатай) + RLS policy
supabase/seed.sql                 — одоогийн агуулгыг DB рүү дүүргэх seed өгөгдөл
supabase/migrations/0002_*.sql    — хуучин DB-д images багана нэмэх migration
```
