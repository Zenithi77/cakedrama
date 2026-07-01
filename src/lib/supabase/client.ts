import { createBrowserClient } from "@supabase/ssr";
import type { Database } from "./types";

export function createClient() {
  // Build/SSR fallback placeholders so this never throws when env vars are
  // unset (e.g. static prerendering before Supabase is configured).
  return createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co",
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder-anon-key"
  );
}
