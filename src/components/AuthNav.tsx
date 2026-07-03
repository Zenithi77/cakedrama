"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function AuthNav() {
  const router = useRouter();
  const supabase = createClient();
  const [email, setEmail] = useState<string | null | undefined>(undefined);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setEmail(data.user?.email ?? null));
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      setEmail(session?.user?.email ?? null);
    });
    return () => sub.subscription.unsubscribe();
  }, [supabase]);

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  }

  if (email === undefined) {
    return <span className="w-24" />;
  }

  if (email) {
    return (
      <div className="flex items-center gap-4">
        <Link
          href="/account"
          className="nav-underline relative font-label-sm text-label-sm text-on-surface-variant hover:text-primary transition-all duration-400"
        >
          {email.split("@")[0]}
        </Link>
        <button
          onClick={handleLogout}
          className="font-label-sm text-label-sm text-on-surface-variant hover:text-primary transition-all duration-400"
        >
          Гарах
        </button>
      </div>
    );
  }

  return (
    <Link
      href="/login"
      className="nav-underline relative font-label-sm text-label-sm text-on-surface-variant hover:text-primary transition-all duration-400"
    >
      Нэвтрэх
    </Link>
  );
}
