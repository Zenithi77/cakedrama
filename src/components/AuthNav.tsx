"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

export default function AuthNav() {
  const supabase = createClient();
  const [email, setEmail] = useState<string | null | undefined>(undefined);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setEmail(data.user?.email ?? null));
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      setEmail(session?.user?.email ?? null);
    });
    return () => sub.subscription.unsubscribe();
  }, [supabase]);

  if (email === undefined) {
    return <span className="w-9 h-9" />;
  }

  return (
    <Link
      href={email ? "/account" : "/login"}
      aria-label={email ? "Миний бүртгэл" : "Нэвтрэх"}
      title={email ? "Миний бүртгэл" : "Нэвтрэх"}
      className="flex items-center justify-center w-9 h-9 rounded-full border border-outline-variant text-on-surface-variant hover:border-primary hover:text-primary transition-all duration-300"
    >
      <span className="material-symbols-outlined text-xl">person</span>
    </Link>
  );
}
