"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { createClient } from "@/lib/supabase/client";
import ImageUploader from "@/components/admin/ImageUploader";
import { DEFAULT_HERO_IMAGE } from "@/lib/constants";

export default function SiteSettingsPanel() {
  const supabase = createClient();
  const [heroImage, setHeroImage] = useState<string>(DEFAULT_HERO_IMAGE);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    const { data } = await supabase.from("site_settings").select("hero_image").eq("id", 1).maybeSingle();
    if (data?.hero_image) setHeroImage(data.hero_image);
    setLoading(false);
  }, [supabase]);

  useEffect(() => {
    load();
  }, [load]);

  async function handleSave() {
    setSaving(true);
    setError("");
    setSaved(false);

    const nextImage = heroImage || DEFAULT_HERO_IMAGE;
    const { error } = await supabase
      .from("site_settings")
      .upsert({ id: 1, hero_image: nextImage, updated_at: new Date().toISOString() });

    setSaving(false);
    if (error) {
      setError(error.message);
      return;
    }
    setHeroImage(nextImage);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  return (
    <div>
      <h1 className="font-headline-md text-headline-md text-primary mb-2">Сайтын банер</h1>
      <p className="font-body-md text-on-surface-variant mb-8">
        Нүүр хуудасны hero (гарчгийн доорх томоохон) зургийг энд солино.
      </p>

      {loading ? (
        <p className="font-body-md text-on-surface-variant">Ачаалж байна...</p>
      ) : (
        <div className="border border-outline-variant p-6 bg-surface-container-low max-w-2xl">
          <div className="relative w-full aspect-video mb-6 bg-surface-container-high overflow-hidden">
            <Image
              src={heroImage || DEFAULT_HERO_IMAGE}
              alt="Hero banner"
              fill
              sizes="700px"
              className="object-cover"
            />
            <span className="absolute top-2 left-2 bg-primary text-on-primary text-[10px] px-2 py-1 uppercase tracking-wide">
              Одоогийн банер
            </span>
          </div>

          <label className="font-label-sm text-label-sm text-secondary uppercase mb-2 block">
            Шинэ банер зураг байршуулах
          </label>
          <ImageUploader
            images={heroImage ? [heroImage] : []}
            onChange={(images) => setHeroImage(images[0] ?? "")}
            max={1}
          />
          {!heroImage && (
            <p className="font-body-md text-error text-sm mt-1">
              Зураггүй бол хадгалахад өгөгдмөл банер сэргэнэ.
            </p>
          )}

          {error && <p className="font-body-md text-error mt-4">{error}</p>}
          {saved && <p className="font-body-md text-secondary mt-4">Амжилттай хадгалагдлаа.</p>}

          <button
            onClick={handleSave}
            disabled={saving}
            className="mt-6 bg-primary text-on-primary px-8 py-3 font-label-sm text-label-sm hover:bg-on-background transition-all duration-400 disabled:opacity-50"
          >
            {saving ? "Хадгалж байна..." : "Хадгалах"}
          </button>
        </div>
      )}
    </div>
  );
}
