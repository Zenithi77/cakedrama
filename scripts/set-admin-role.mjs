// Ашиглах заавар: node scripts/set-admin-role.mjs someone@example.com
// Migration 0003_profiles_roles.sql-ыг эхлээд Supabase SQL Editor дотор ажиллуулсан байх ёстой.
import { config } from "dotenv";
import { createClient } from "@supabase/supabase-js";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
config({ path: path.join(root, ".env.local") });

const email = process.argv[2];
if (!email) {
  console.error("Ашиглалт: node scripts/set-admin-role.mjs someone@example.com");
  process.exit(1);
}

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

const { data, error } = await supabase
  .from("profiles")
  .update({ role: "admin" })
  .eq("email", email)
  .select();

if (error) {
  console.error("Алдаа:", error.message);
  console.error(
    "Хэрэв 'relation \"profiles\" does not exist' гэсэн алдаа гарвал эхлээд supabase/migrations/0003_profiles_roles.sql-ыг Supabase SQL Editor дотор ажиллуулна уу."
  );
  process.exit(1);
}

if (!data || data.length === 0) {
  console.error(`'${email}' и-мэйлтэй профайл олдсонгүй. Тухайн хэрэглэгч эхлээд бүртгүүлсэн байх ёстой.`);
  process.exit(1);
}

console.log(`${email} -> role: admin боллоо.`);
