import type { Metadata } from "next";
import { redirect } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AccountActions from "@/components/AccountActions";
import { createClient } from "@/lib/supabase/server";
import type { UserRole } from "@/lib/supabase/types";

export const metadata: Metadata = {
  title: "Миний бүртгэл | Cake Drama",
};

function initials(name: string, email: string) {
  const source = name.trim() || email;
  const parts = source.split(/\s+/).filter(Boolean);
  if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
  return source.slice(0, 2).toUpperCase();
}

export default async function AccountPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .maybeSingle();

  const fullName = profile?.full_name || (user.user_metadata?.full_name as string | undefined) || "";
  const role: UserRole = profile?.role ?? "customer";

  return (
    <>
      <Navbar />
      <div className="min-h-[calc(100vh-80px)] bg-surface wheat-watermark px-margin-mobile py-20">
        <div className="max-w-lg mx-auto">
          <div className="text-center mb-10">
            <p className="font-label-sm text-label-sm text-secondary tracking-[0.3em] mb-2">
              SINCE 2000
            </p>
            <h1 className="font-headline-lg text-headline-lg-mobile text-primary">
              Миний бүртгэл
            </h1>
            <div className="w-16 h-px bg-outline-variant mx-auto mt-6" />
          </div>

          <div className="border border-outline-variant bg-surface-container-low p-8 sm:p-10">
            {/* Avatar + identity */}
            <div className="flex flex-col items-center text-center mb-8 pb-8 border-b border-outline-variant/60">
              <div className="w-20 h-20 rounded-full bg-primary text-on-primary flex items-center justify-center font-headline-md text-headline-md mb-4">
                {initials(fullName, user.email ?? "")}
              </div>
              <p className="font-headline-md text-headline-md text-primary">
                {fullName || "Нэргүй хэрэглэгч"}
              </p>
              <p className="font-body-md text-on-surface-variant">{user.email}</p>
              <span
                className={`mt-3 inline-flex items-center gap-1.5 px-3 py-1 font-label-sm text-label-sm uppercase tracking-widest ${
                  role === "admin"
                    ? "bg-primary text-on-primary"
                    : "bg-surface-container-high text-on-surface-variant"
                }`}
              >
                <span className="material-symbols-outlined text-sm">
                  {role === "admin" ? "verified" : "person"}
                </span>
                {role === "admin" ? "Admin" : "Харилцагч"}
              </span>
            </div>

            {/* Details */}
            <div className="space-y-5 mb-8">
              <div className="flex justify-between items-center">
                <h4 className="font-label-sm text-label-sm text-secondary uppercase">
                  Бүртгүүлсэн огноо
                </h4>
                <p className="font-body-md text-on-surface">
                  {new Date(user.created_at).toLocaleDateString("mn-MN")}
                </p>
              </div>
              <div className="flex justify-between items-center">
                <h4 className="font-label-sm text-label-sm text-secondary uppercase">
                  И-мэйл баталгаажилт
                </h4>
                <p className="font-body-md text-on-surface">
                  {user.email_confirmed_at ? "Баталгаажсан" : "Хүлээгдэж байна"}
                </p>
              </div>
            </div>

            <AccountActions role={role} />
          </div>

          <p className="text-center mt-8">
            <a href="/" className="font-label-sm text-label-sm text-on-surface-variant hover:text-primary">
              ← Нүүр хуудас руу буцах
            </a>
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
}
