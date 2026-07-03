"use client";

import { useEffect, useState, useCallback, useMemo } from "react";
import Image from "next/image";
import { createClient } from "@/lib/supabase/client";
import type { ProductCategory, ProductRow } from "@/lib/supabase/types";
import ImageUploader from "@/components/admin/ImageUploader";

const categories: { value: ProductCategory; label: string }[] = [
  { value: "castella", label: "Castella" },
  { value: "big_cake", label: "Cheese / Chocolate Cake" },
  { value: "roll_snack", label: "Roll & Snack" },
  { value: "donut", label: "Donut" },
  { value: "mini_donut", label: "Mini Donut" },
  { value: "fatcaron", label: "Fat-Caron" },
];

const categoryLabel = (c: ProductCategory) => categories.find((x) => x.value === c)?.label ?? c;

const emptyForm = {
  id: "",
  category: "castella" as ProductCategory,
  name: "",
  images: [] as string[],
  weight: "",
  packaging: "",
  storage: "",
  shelf_life: "",
  thawing: "",
  sort_order: 0,
};

export default function ProductsPanel() {
  const supabase = createClient();
  const [products, setProducts] = useState<ProductRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(emptyForm);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<ProductCategory | "all">("all");

  const loadProducts = useCallback(async () => {
    setLoading(true);
    const { data } = await supabase.from("products").select("*").order("sort_order");
    setProducts(
      (data ?? []).map((row) => ({ ...row, images: row.images?.length ? row.images : [row.image] }))
    );
    setLoading(false);
  }, [supabase]);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchesCategory = categoryFilter === "all" || p.category === categoryFilter;
      const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [products, search, categoryFilter]);

  function startCreate() {
    setEditingId(null);
    setForm(emptyForm);
    setShowForm(true);
  }

  function startEdit(p: ProductRow) {
    setEditingId(p.id);
    setForm({
      id: p.id,
      category: p.category,
      name: p.name,
      images: p.images?.length ? p.images : [p.image],
      weight: p.weight ?? "",
      packaging: p.packaging ?? "",
      storage: p.storage ?? "",
      shelf_life: p.shelf_life ?? "",
      thawing: p.thawing ?? "",
      sort_order: p.sort_order,
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
      setError("Дор хаяж нэг зураг оруулна уу.");
      return;
    }
    setSaving(true);
    setError("");

    const payload = {
      category: form.category,
      name: form.name,
      image: form.images[0],
      images: form.images,
      weight: form.weight || null,
      packaging: form.packaging || null,
      storage: form.storage || null,
      shelf_life: form.shelf_life || null,
      thawing: form.thawing || null,
      sort_order: Number(form.sort_order) || 0,
    };

    const result = editingId
      ? await supabase.from("products").update(payload).eq("id", editingId)
      : await supabase.from("products").insert(payload);

    setSaving(false);
    if (result.error) {
      setError(result.error.message);
      return;
    }
    closeForm();
    loadProducts();
  }

  async function handleDelete(id: string) {
    if (!confirm("Энэ бүтээгдэхүүнийг устгах уу?")) return;
    await supabase.from("products").delete().eq("id", id);
    loadProducts();
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="font-headline-md text-headline-md text-primary">Бүтээгдэхүүн</h1>
          <p className="font-body-md text-on-surface-variant mt-1">{products.length} нийт бараа</p>
        </div>
        <button
          onClick={startCreate}
          className="bg-primary text-on-primary px-6 py-3 font-label-sm text-label-sm hover:bg-on-background transition-all duration-400 whitespace-nowrap"
        >
          + Шинэ бүтээгдэхүүн
        </button>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <input
          placeholder="Нэрээр хайх..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 border border-outline-variant bg-surface px-4 py-2.5 font-body-md text-on-surface focus:outline-none focus:border-primary"
        />
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value as ProductCategory | "all")}
          className="border border-outline-variant bg-surface px-4 py-2.5 font-body-md text-on-surface"
        >
          <option value="all">Бүх ангилал</option>
          {categories.map((c) => (
            <option key={c.value} value={c.value}>
              {c.label}
            </option>
          ))}
        </select>
      </div>

      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="border border-outline-variant p-6 mb-8 bg-surface-container-low"
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="font-headline-md text-headline-md text-primary">
              {editingId ? "Бүтээгдэхүүн засах" : "Шинэ бүтээгдэхүүн"}
            </h2>
            <button type="button" onClick={closeForm} className="text-on-surface-variant hover:text-primary">
              ✕
            </button>
          </div>

          <div className="mb-6">
            <label className="font-label-sm text-label-sm text-secondary uppercase mb-2 block">
              Зургууд (эхнийх нь cover болно)
            </label>
            <ImageUploader
              images={form.images}
              onChange={(images) => setForm({ ...form, images })}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="font-label-sm text-label-sm text-secondary uppercase mb-2 block">
                Ангилал
              </label>
              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value as ProductCategory })}
                className="w-full border border-outline-variant bg-surface px-4 py-3"
              >
                {categories.map((c) => (
                  <option key={c.value} value={c.value}>
                    {c.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="font-label-sm text-label-sm text-secondary uppercase mb-2 block">
                Нэр
              </label>
              <input
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full border border-outline-variant bg-surface px-4 py-3"
              />
            </div>
            <div>
              <label className="font-label-sm text-label-sm text-secondary uppercase mb-2 block">
                Жин
              </label>
              <input
                value={form.weight}
                onChange={(e) => setForm({ ...form, weight: e.target.value })}
                className="w-full border border-outline-variant bg-surface px-4 py-3"
              />
            </div>
            <div>
              <label className="font-label-sm text-label-sm text-secondary uppercase mb-2 block">
                Савлагаа
              </label>
              <input
                value={form.packaging}
                onChange={(e) => setForm({ ...form, packaging: e.target.value })}
                className="w-full border border-outline-variant bg-surface px-4 py-3"
              />
            </div>
            <div>
              <label className="font-label-sm text-label-sm text-secondary uppercase mb-2 block">
                Хадгалах нөхцөл
              </label>
              <input
                value={form.storage}
                onChange={(e) => setForm({ ...form, storage: e.target.value })}
                className="w-full border border-outline-variant bg-surface px-4 py-3"
              />
            </div>
            <div>
              <label className="font-label-sm text-label-sm text-secondary uppercase mb-2 block">
                Хадгалах хугацаа
              </label>
              <input
                value={form.shelf_life}
                onChange={(e) => setForm({ ...form, shelf_life: e.target.value })}
                className="w-full border border-outline-variant bg-surface px-4 py-3"
              />
            </div>
            <div>
              <label className="font-label-sm text-label-sm text-secondary uppercase mb-2 block">
                Гэсгээх заавар
              </label>
              <input
                value={form.thawing}
                onChange={(e) => setForm({ ...form, thawing: e.target.value })}
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
          {filtered.map((p) => (
            <div key={p.id} className="border border-outline-variant bg-surface-container-low flex gap-4 p-4">
              <div className="relative w-20 h-20 shrink-0 bg-surface-container-high overflow-hidden">
                <Image src={p.image} alt={p.name} fill sizes="80px" className="object-cover" />
                {p.images.length > 1 && (
                  <span className="absolute bottom-0 right-0 bg-primary text-on-primary text-[10px] px-1.5">
                    {p.images.length}
                  </span>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-label-sm text-label-sm text-secondary uppercase">
                  {categoryLabel(p.category)}
                </p>
                <p className="font-body-lg text-on-surface truncate">{p.name}</p>
                <p className="font-body-md text-on-surface-variant text-sm">Эрэмбэ: {p.sort_order}</p>
                <div className="flex gap-3 mt-2">
                  <button
                    onClick={() => startEdit(p)}
                    className="font-label-sm text-label-sm text-primary hover:underline"
                  >
                    Засах
                  </button>
                  <button
                    onClick={() => handleDelete(p.id)}
                    className="font-label-sm text-label-sm text-error hover:underline"
                  >
                    Устгах
                  </button>
                </div>
              </div>
            </div>
          ))}
          {filtered.length === 0 && (
            <p className="font-body-md text-on-surface-variant col-span-full">Илэрц олдсонгүй.</p>
          )}
        </div>
      )}
    </div>
  );
}
