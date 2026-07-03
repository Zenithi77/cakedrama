"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import type { UserRole } from "@/lib/supabase/types";

export default function AccountActions({ role }: { role: UserRole }) {
  const router = useRouter();
  const supabase = createClient();

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  }

  return (
    <div className="space-y-3">
      {role === "admin" && (
        <Link
          href="/admin"
          className="flex items-center justify-center gap-2 w-full bg-primary text-on-primary px-8 py-4 font-label-sm text-label-sm hover:bg-on-background transition-all duration-400"
        >
          <span className="material-symbols-outlined text-lg">admin_panel_settings</span>
          Admin самбар руу очих
        </Link>
      )}
      <button
        onClick={handleLogout}
        className="w-full border border-outline-variant text-on-surface px-8 py-4 font-label-sm text-label-sm hover:border-primary hover:text-primary transition-all duration-400"
      >
        Гарах
      </button>
    </div>
  );
}
