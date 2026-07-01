import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";
import { staticPartners, staticProducts, staticSpecials } from "@/lib/staticContent";
import type { PartnerRow, ProductRow, SpecialRow } from "@/lib/supabase/types";

export async function getProducts(): Promise<ProductRow[]> {
  if (!isSupabaseConfigured()) return staticProducts;

  const supabase = await createClient();
  const { data, error } = await supabase.from("products").select("*").order("sort_order");

  if (error || !data || data.length === 0) return staticProducts;
  return data;
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
