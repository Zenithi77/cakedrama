"use client";

export const dynamic = "force-dynamic";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });

    setLoading(false);
    if (error) {
      setError(error.message);
      return;
    }
    router.push("/admin");
    router.refresh();
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-surface px-margin-mobile">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm border border-outline-variant p-8 bg-surface-container-low"
      >
        <h1 className="font-headline-md text-headline-md text-primary mb-8 text-center">
          Cake Drama Admin
        </h1>
        <div className="space-y-4">
          <div>
            <label className="font-label-sm text-label-sm text-secondary uppercase mb-2 block">
              И-мэйл
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-outline-variant bg-surface px-4 py-3 font-body-md focus:outline-none focus:border-primary"
            />
          </div>
          <div>
            <label className="font-label-sm text-label-sm text-secondary uppercase mb-2 block">
              Нууц үг
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-outline-variant bg-surface px-4 py-3 font-body-md focus:outline-none focus:border-primary"
            />
          </div>
          {error && <p className="font-body-md text-error">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-on-primary px-8 py-3 font-label-sm text-label-sm hover:bg-on-background transition-all duration-400 disabled:opacity-50"
          >
            {loading ? "Нэвтэрч байна..." : "Нэвтрэх"}
          </button>
        </div>
      </form>
    </div>
  );
}
