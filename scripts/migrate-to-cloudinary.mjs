import { config } from "dotenv";
import { v2 as cloudinary } from "cloudinary";
import { createClient } from "@supabase/supabase-js";
import { readdirSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");

config({ path: path.join(root, ".env.local") });

const {
  NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
  CLOUDINARY_UPLOAD_FOLDER,
  NEXT_PUBLIC_SUPABASE_URL,
  SUPABASE_SERVICE_ROLE_KEY,
} = process.env;

if (!NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || !CLOUDINARY_API_KEY || !CLOUDINARY_API_SECRET) {
  console.error("Cloudinary env variables дутуу байна. .env.local шалгана уу.");
  process.exit(1);
}
if (!NEXT_PUBLIC_SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error("Supabase env variables дутуу байна. .env.local шалгана уу.");
  process.exit(1);
}

cloudinary.config({
  cloud_name: NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
});

const folder = CLOUDINARY_UPLOAD_FOLDER || "cake-drama";
const supabase = createClient(NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

const imagesDir = path.join(root, "public", "images");

function walk(dir) {
  const entries = readdirSync(dir, { withFileTypes: true });
  let files = [];
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) files = files.concat(walk(full));
    else if (/\.(jpe?g|png|webp)$/i.test(entry.name)) files.push(full);
  }
  return files;
}

const files = walk(imagesDir);
console.log(`${files.length} зураг олдлоо. Cloudinary руу байршуулж эхэлж байна...`);

// localPath (e.g. "/images/products/foo.jpg") -> cloudinary secure_url
const urlMap = new Map();

for (const filePath of files) {
  const relative = path.relative(imagesDir, filePath).replace(/\\/g, "/");
  const localRef = `/images/${relative}`;
  const subfolder = path.dirname(relative) === "." ? "" : "/" + path.dirname(relative);
  const publicId = path.basename(relative, path.extname(relative));

  process.stdout.write(`  ${localRef} ... `);
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder: `${folder}${subfolder}`,
      public_id: publicId,
      overwrite: true,
    });
    urlMap.set(localRef, result.secure_url);
    console.log("OK");
  } catch (err) {
    console.log("FAIL:", err.message);
  }
}

console.log(`\n${urlMap.size}/${files.length} зураг амжилттай байршуулагдлаа.\n`);

function remap(localRef) {
  return urlMap.get(localRef) || localRef;
}

// ---------- products ----------
console.log("products хүснэгтийг шинэчилж байна...");
const { data: products, error: productsError } = await supabase.from("products").select("*");
if (productsError) {
  console.error("products уншихад алдаа:", productsError.message);
} else {
  const hasImagesColumn = products.length === 0 || "images" in products[0];
  if (!hasImagesColumn) {
    console.warn(
      "  ! 'images' багана олдсонгүй — supabase/migrations/0002_product_images_array.sql-ыг эхлээд ажиллуулна уу."
    );
  }
  for (const p of products) {
    const newImage = remap(p.image);
    const oldImages = hasImagesColumn && p.images?.length ? p.images : [p.image];
    const newImages = oldImages.map(remap);
    const { error } = await supabase
      .from("products")
      .update(hasImagesColumn ? { image: newImage, images: newImages } : { image: newImage })
      .eq("id", p.id);
    if (error) console.log(`  ! ${p.name}: ${error.message}`);
  }
  console.log(`  ${products.length} бүтээгдэхүүн шинэчлэгдлээ.`);
}

// ---------- specials ----------
console.log("specials хүснэгтийг шинэчилж байна...");
const { data: specials, error: specialsError } = await supabase.from("specials").select("*");
if (specialsError) {
  console.error("specials уншихад алдаа:", specialsError.message);
} else {
  for (const s of specials) {
    const { error } = await supabase
      .from("specials")
      .update({ image: remap(s.image) })
      .eq("id", s.id);
    if (error) console.log(`  ! ${s.title}: ${error.message}`);
  }
  console.log(`  ${specials.length} онцлох зүйл шинэчлэгдлээ.`);
}

// ---------- partners ----------
console.log("partners хүснэгтийг шинэчилж байна...");
const { data: partners, error: partnersError } = await supabase.from("partners").select("*");
if (partnersError) {
  console.error("partners уншихад алдаа:", partnersError.message);
} else {
  for (const p of partners) {
    const localRef = `/images/partners/${p.logo}.png`;
    const newUrl = urlMap.get(localRef);
    if (!newUrl) continue;
    const { error } = await supabase.from("partners").update({ logo: newUrl }).eq("id", p.id);
    if (error) console.log(`  ! ${p.name}: ${error.message}`);
  }
  console.log(`  ${partners.length} түнш шинэчлэгдлээ.`);
}

// ---------- hero / about images (not in DB, used directly in code) ----------
console.log("\nКод дотор шууд бичигдсэн зам (hero, about):");
for (const ref of ["/images/hero_tiramisu.jpg", "/images/building.jpg"]) {
  console.log(`  ${ref} -> ${remap(ref)}`);
}

console.log("\nДууслаа.");
