import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";
import { staticPartners, staticProducts, staticSpecials } from "@/lib/staticContent";
import type { PartnerRow, ProductRow, SpecialRow } from "@/lib/supabase/types";
import { DEFAULT_HERO_IMAGE } from "@/lib/constants";

export { DEFAULT_HERO_IMAGE };

export async function getProducts(): Promise<ProductRow[]> {
  if (!isSupabaseConfigured()) return staticProducts;

  const supabase = await createClient();
  const { data, error } = await supabase.from("products").select("*").order("sort_order");

  if (error || !data || data.length === 0) return staticProducts;
  // `images`/`price` багана 0002/0005 migration ажиллуулаагүй хуучин DB дээр байхгүй байж болзошгүй тул нөөцлөнө.
  return data.map((row) => ({
    ...row,
    images: row.images?.length ? row.images : [row.image],
    price: row.price ?? null,
  }));
}

export async function getProductById(id: string): Promise<ProductRow | null> {
  const all = await getProducts();
  return all.find((p) => p.id === id) ?? null;
}

export async function getSpecials(): Promise<SpecialRow[]> {
  if (!isSupabaseConfigured()) return staticSpecials;

  const supabase = await createClient();
  const { data, error } = await supabase.from("specials").select("*").order("sort_order");

  if (error || !data || data.length === 0) return staticSpecials;
  return data;
}

export async function getPartners(): Promise<PartnerRow[]> {
  if (!isSupabaseConfigured()) return staticPartners;

  const supabase = await createClient();
  const { data, error } = await supabase.from("partners").select("*").order("sort_order");

  if (error || !data || data.length === 0) return staticPartners;
  return data;
}

export async function getHeroImage(): Promise<string> {
  if (!isSupabaseConfigured()) return DEFAULT_HERO_IMAGE;

  const supabase = await createClient();
  const { data, error } = await supabase.from("site_settings").select("hero_image").eq("id", 1).maybeSingle();

  if (error || !data?.hero_image) return DEFAULT_HERO_IMAGE;
  return data.hero_image;
}
