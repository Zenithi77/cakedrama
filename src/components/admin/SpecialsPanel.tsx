"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { createClient } from "@/lib/supabase/client";
import type { SpecialRow } from "@/lib/supabase/types";
import ImageUploader from "@/components/admin/ImageUploader";

const emptyForm = {
  id: "",
  title: "",
  images: [] as string[],
  tags: "",
  description: "",
  sort_order: 0,
};

export default function SpecialsPanel() {
  const supabase = createClient();
  const [specials, setSpecials] = useState<SpecialRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(emptyForm);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    const { data } = await supabase.from("specials").select("*").order("sort_order");
    setSpecials(data ?? []);
    setLoading(false);
  }, [supabase]);

  useEffect(() => {
    load();
  }, [load]);

  function startCreate() {
    setEditingId(null);
    setForm(emptyForm);
    setShowForm(true);
  }

  function startEdit(s: SpecialRow) {
    setEditingId(s.id);
    setForm({
      id: s.id,
      title: s.title,
      images: [s.image],
      tags: s.tags.join(", "),
      description: s.description,
      sort_order: s.sort_order,
    });
    setShowForm(true);
  }

  function closeForm() {
    setShowForm(false);
    setEditingId(null);
    setForm(emptyForm);
    setError("");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (form.images.length === 0) {
      setError("Зураг оруулна уу.");
      return;
    }
    setSaving(true);
    setError("");

    const payload = {
      title: form.title,
      image: form.images[0],
      tags: form.tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      description: form.description,
      sort_order: Number(form.sort_order) || 0,
    };

    const result = editingId
      ? await supabase.from("specials").update(payload).eq("id", editingId)
      : await supabase.from("specials").insert(payload);

    setSaving(false);
    if (result.error) {
      setError(result.error.message);
      return;
    }
    closeForm();
    load();
  }

  async function handleDelete(id: string) {
    if (!confirm("Устгах уу?")) return;
    await supabase.from("specials").delete().eq("id", id);
    load();
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="font-headline-md text-headline-md text-primary">Онцлох бүтээгдэхүүн</h1>
        <button
          onClick={startCreate}
          className="bg-primary text-on-primary px-6 py-3 font-label-sm text-label-sm hover:bg-on-background transition-all duration-400"
        >
          + Шинэ
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="border border-outline-variant p-6 mb-8 bg-surface-container-low">
          <div className="flex justify-between items-center mb-6">
            <h2 className="font-headline-md text-headline-md text-primary">
              {editingId ? "Засах" : "Шинэ онцлох"}
            </h2>
            <button type="button" onClick={closeForm} className="text-on-surface-variant hover:text-primary">
              ✕
            </button>
          </div>
          <div className="mb-6">
            <label className="font-label-sm text-label-sm text-secondary uppercase mb-2 block">Зураг</label>
            <ImageUploader images={form.images} onChange={(images) => setForm({ ...form, images })} max={1} />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="font-label-sm text-label-sm text-secondary uppercase mb-2 block">Гарчиг</label>
              <input
                required
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="w-full border border-outline-variant bg-surface px-4 py-3"
              />
            </div>
            <div>
              <label className="font-label-sm text-label-sm text-secondary uppercase mb-2 block">
                Tags (таслалаар тусгаарлана)
              </label>
              <input
                value={form.tags}
                onChange={(e) => setForm({ ...form, tags: e.target.value })}
                placeholder="NO SUGAR, NO GLUTEN"
                className="w-full border border-outline-variant bg-surface px-4 py-3"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="font-label-sm text-label-sm text-secondary uppercase mb-2 block">
                Тайлбар
              </label>
              <textarea
                required
                rows={3}
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                className="w-full border border-outline-variant bg-surface px-4 py-3"
              />
            </div>
            <div>
              <label className="font-label-sm text-label-sm text-secondary uppercase mb-2 block">
                Эрэмбэ
              </label>
              <input
                type="number"
                value={form.sort_order}
                onChange={(e) => setForm({ ...form, sort_order: Number(e.target.value) })}
                className="w-full border border-outline-variant bg-surface px-4 py-3"
              />
            </div>
          </div>
          {error && <p className="font-body-md text-error mb-4">{error}</p>}
          <div className="flex gap-3">
            <button
              type="submit"
              disabled={saving}
              className="bg-primary text-on-primary px-8 py-3 font-label-sm text-label-sm hover:bg-on-background transition-all duration-400 disabled:opacity-50"
            >
              {saving ? "Хадгалж байна..." : editingId ? "Хадгалах" : "Нэмэх"}
            </button>
            <button
              type="button"
              onClick={closeForm}
              className="border border-outline-variant px-8 py-3 font-label-sm text-label-sm"
            >
              Цуцлах
            </button>
          </div>
        </form>
      )}

      {loading ? (
        <p className="font-body-md text-on-surface-variant">Ачаалж байна...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {specials.map((s) => (
            <div key={s.id} className="border border-outline-variant bg-surface-container-low flex gap-4 p-4">
              <div className="relative w-20 h-20 shrink-0 bg-surface-container-high overflow-hidden">
                <Image src={s.image} alt={s.title} fill sizes="80px" className="object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-body-lg text-on-surface truncate">{s.title}</p>
                <p className="font-body-md text-on-surface-variant text-sm truncate">
                  {s.tags.join(", ") || "—"}
                </p>
                <div className="flex gap-3 mt-2">
                  <button onClick={() => startEdit(s)} className="font-label-sm text-label-sm text-primary hover:underline">
                    Засах
                  </button>
                  <button onClick={() => handleDelete(s.id)} className="font-label-sm text-label-sm text-error hover:underline">
                    Устгах
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
