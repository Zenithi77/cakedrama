"use client";

import { useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const supabase = createClient();
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: name } },
    });

    setLoading(false);
    if (error) {
      setError(error.message);
      return;
    }
    setDone(true);
  }

  if (done) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface wheat-watermark px-margin-mobile py-20">
        <div className="w-full max-w-md text-center border border-outline-variant bg-surface-container-low p-10">
          <h1 className="font-headline-md text-headline-md text-primary mb-4">Баярлалаа!</h1>
          <p className="font-body-lg text-on-surface-variant mb-8">
            Таны бүртгэл үүслээ. И-мэйл хаягаа шалгаж, баталгаажуулах холбоос дээр дарна уу.
          </p>
          <Link
            href="/login"
            className="inline-block border border-primary text-primary px-8 py-3 font-label-sm text-label-sm hover:bg-primary hover:text-on-primary transition-all duration-400"
          >
            Нэвтрэх хуудас руу
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-surface wheat-watermark px-margin-mobile py-20">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <p className="font-label-sm text-label-sm text-secondary tracking-[0.3em] mb-2">
            SINCE 2000
          </p>
          <h1 className="font-headline-lg text-headline-lg-mobile text-primary">Cake Drama</h1>
          <div className="w-16 h-px bg-outline-variant mx-auto mt-6" />
        </div>

        <form
          onSubmit={handleSubmit}
          className="border border-outline-variant bg-surface-container-low p-8 sm:p-10"
        >
          <h2 className="font-headline-md text-headline-md text-primary mb-8 text-center">
            Бүртгүүлэх
          </h2>
          <div className="space-y-5">
            <div>
              <label className="font-label-sm text-label-sm text-secondary uppercase mb-2 block">
                Нэр
              </label>
              <input
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border border-outline-variant bg-surface px-4 py-3 font-body-md text-on-surface focus:outline-none focus:border-primary transition-colors"
              />
            </div>
            <div>
              <label className="font-label-sm text-label-sm text-secondary uppercase mb-2 block">
                И-мэйл
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-outline-variant bg-surface px-4 py-3 font-body-md text-on-surface focus:outline-none focus:border-primary transition-colors"
              />
            </div>
            <div>
              <label className="font-label-sm text-label-sm text-secondary uppercase mb-2 block">
                Нууц үг
              </label>
              <input
                type="password"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-outline-variant bg-surface px-4 py-3 font-body-md text-on-surface focus:outline-none focus:border-primary transition-colors"
              />
            </div>
            {error && <p className="font-body-md text-error">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-on-primary px-8 py-4 font-label-sm text-label-sm hover:bg-on-background transition-all duration-400 disabled:opacity-50"
            >
              {loading ? "Бүртгэж байна..." : "Бүртгүүлэх"}
            </button>
          </div>
        </form>

        <p className="text-center font-body-md text-on-surface-variant mt-8">
          Бүртгэлтэй юу?{" "}
          <Link href="/login" className="text-primary hover:underline">
            Нэвтрэх
          </Link>
        </p>
        <p className="text-center mt-4">
          <Link href="/" className="font-label-sm text-label-sm text-on-surface-variant hover:text-primary">
            ← Нүүр хуудас руу буцах
          </Link>
        </p>
      </div>
    </div>
  );
}
