"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import ProductsPanel from "@/components/admin/ProductsPanel";
import SpecialsPanel from "@/components/admin/SpecialsPanel";
import PartnersPanel from "@/components/admin/PartnersPanel";
import MessagesPanel from "@/components/admin/MessagesPanel";
import SiteSettingsPanel from "@/components/admin/SiteSettingsPanel";

type Tab = "products" | "specials" | "partners" | "messages" | "settings";

const tabs: { value: Tab; label: string; icon: string }[] = [
  { value: "products", label: "Бүтээгдэхүүн", icon: "cake" },
  { value: "specials", label: "Онцлох", icon: "star" },
  { value: "partners", label: "Түншүүд", icon: "handshake" },
  { value: "messages", label: "Зурвасууд", icon: "mail" },
  { value: "settings", label: "Банер", icon: "image" },
];

export default function AdminShell() {
  const router = useRouter();
  const supabase = createClient();
  const [tab, setTab] = useState<Tab>("products");
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUserEmail(data.user?.email ?? ""));
  }, [supabase]);

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Sidebar (desktop) / Top bar (mobile) */}
      <aside className="w-full md:w-64 shrink-0 bg-primary text-surface flex flex-col md:sticky md:top-0 md:h-screen">
        <div className="flex items-center justify-between px-4 py-4 md:block md:px-6 md:py-8 md:border-b md:border-surface/10">
          <div>
            <p className="hidden md:block font-label-sm text-label-sm tracking-[0.3em] text-secondary-fixed-dim">
              SINCE 2000
            </p>
            <p className="font-headline-md text-lg md:text-headline-md">Cake Drama</p>
            <p className="font-label-sm text-label-sm uppercase tracking-widest text-surface/60 mt-0.5 md:mt-1">
              Admin
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="md:hidden border border-surface/30 text-surface px-3 py-1.5 font-label-sm text-label-sm hover:bg-surface/10 transition-all duration-300"
          >
            Гарах
          </button>
        </div>

        <nav className="flex md:flex-1 md:flex-col overflow-x-auto md:overflow-visible border-t border-b md:border-t-0 border-surface/10 md:py-4 no-scrollbar">
          {tabs.map((t) => (
            <button
              key={t.value}
              onClick={() => setTab(t.value)}
              className={`shrink-0 md:w-full text-left px-5 md:px-6 py-3 font-body-md flex items-center gap-2 md:gap-3 whitespace-nowrap transition-colors duration-300 ${
                tab === t.value
                  ? "bg-surface/10 text-surface border-b-2 md:border-b-0 md:border-l-2 border-secondary-fixed-dim"
                  : "text-surface/70 hover:bg-surface/5 hover:text-surface"
              }`}
            >
              <span className="material-symbols-outlined text-xl">{t.icon}</span>
              <span className="text-sm md:text-base">{t.label}</span>
            </button>
          ))}
        </nav>

        <div className="hidden md:block px-6 py-6 border-t border-surface/10">
          <p className="font-body-md text-surface/70 text-sm truncate mb-3">{userEmail}</p>
          <button
            onClick={handleLogout}
            className="w-full border border-surface/30 text-surface px-4 py-2 font-label-sm text-label-sm hover:bg-surface/10 transition-all duration-300"
          >
            Гарах
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 bg-surface wheat-watermark px-4 py-6 sm:px-6 md:px-10 md:py-10 pb-24">
        <div className="max-w-6xl mx-auto">
          {tab === "products" && <ProductsPanel />}
          {tab === "specials" && <SpecialsPanel />}
          {tab === "partners" && <PartnersPanel />}
          {tab === "messages" && <MessagesPanel />}
          {tab === "settings" && <SiteSettingsPanel />}
        </div>
      </main>

      {/* Дэлгүүр рүү буцах — үргэлж харагдах floating товч */}
      <a
        href="/"
        className="fixed bottom-5 right-5 z-50 flex items-center gap-2 bg-on-background text-surface pl-3 pr-5 py-3 shadow-lg hover:bg-primary transition-all duration-300"
      >
        <span className="material-symbols-outlined text-xl">storefront</span>
        <span className="font-label-sm text-label-sm whitespace-nowrap">Дэлгүүр рүү буцах</span>
      </a>
    </div>
  );
}
