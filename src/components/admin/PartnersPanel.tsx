"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { createClient } from "@/lib/supabase/client";
import type { PartnerRow } from "@/lib/supabase/types";
import ImageUploader from "@/components/admin/ImageUploader";
import { partnerLogoSrc } from "@/lib/partnerLogo";

const emptyForm = { id: "", name: "", images: [] as string[], sort_order: 0 };

export default function PartnersPanel() {
  const supabase = createClient();
  const [partners, setPartners] = useState<PartnerRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(emptyForm);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    const { data } = await supabase.from("partners").select("*").order("sort_order");
    setPartners(data ?? []);
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

  function startEdit(p: PartnerRow) {
    setEditingId(p.id);
    setForm({ id: p.id, name: p.name, images: p.logo ? [partnerLogoSrc(p.logo)] : [], sort_order: p.sort_order });
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
      setError("Лого зураг оруулна уу.");
      return;
    }
    setSaving(true);
    setError("");

    const payload = {
      name: form.name,
      logo: form.images[0],
      sort_order: Number(form.sort_order) || 0,
    };

    const result = editingId
      ? await supabase.from("partners").update(payload).eq("id", editingId)
      : await supabase.from("partners").insert(payload);

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
    await supabase.from("partners").delete().eq("id", id);
    load();
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="font-headline-md text-headline-md text-primary">Түншүүд</h1>
        <button
          onClick={startCreate}
          className="bg-primary text-on-primary px-6 py-3 font-label-sm text-label-sm hover:bg-on-background transition-all duration-400"
        >
          + Шинэ түнш
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="border border-outline-variant p-6 mb-8 bg-surface-container-low">
          <div className="flex justify-between items-center mb-6">
            <h2 className="font-headline-md text-headline-md text-primary">
              {editingId ? "Засах" : "Шинэ түнш"}
            </h2>
            <button type="button" onClick={closeForm} className="text-on-surface-variant hover:text-primary">
              ✕
            </button>
          </div>
          <div className="mb-6">
            <label className="font-label-sm text-label-sm text-secondary uppercase mb-2 block">Лого</label>
            <ImageUploader images={form.images} onChange={(images) => setForm({ ...form, images })} max={1} />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="font-label-sm text-label-sm text-secondary uppercase mb-2 block">Нэр</label>
              <input
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
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
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {partners.map((p) => (
            <div key={p.id} className="border border-outline-variant bg-surface-container-low p-4 text-center">
              <div className="relative w-full aspect-3/2 bg-white mb-3">
                <Image src={partnerLogoSrc(p.logo)} alt={p.name} fill sizes="150px" className="object-contain p-2" />
              </div>
              <p className="font-body-md text-on-surface truncate">{p.name}</p>
              <div className="flex justify-center gap-3 mt-2">
                <button onClick={() => startEdit(p)} className="font-label-sm text-label-sm text-primary hover:underline">
                  Засах
                </button>
                <button onClick={() => handleDelete(p.id)} className="font-label-sm text-label-sm text-error hover:underline">
                  Устгах
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
