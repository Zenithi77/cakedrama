"use client";

export const dynamic = "force-dynamic";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import type { ProductCategory, ProductRow } from "@/lib/supabase/types";

const categories: { value: ProductCategory; label: string }[] = [
  { value: "castella", label: "Castella" },
  { value: "big_cake", label: "Cheese/Chocolate Cake" },
  { value: "roll_snack", label: "Roll & Snack" },
  { value: "donut", label: "Donut" },
  { value: "mini_donut", label: "Mini Donut" },
  { value: "fatcaron", label: "Fat-Caron" },
];

const emptyForm = {
  id: "",
  category: "castella" as ProductCategory,
  name: "",
  image: "",
  weight: "",
  packaging: "",
  storage: "",
  shelf_life: "",
  thawing: "",
  sort_order: 0,
};

export default function AdminPage() {
  const router = useRouter();
  const supabase = createClient();
  const [products, setProducts] = useState<ProductRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [userEmail, setUserEmail] = useState("");

  const loadProducts = useCallback(async () => {
    setLoading(true);
    const { data } = await supabase.from("products").select("*").order("sort_order");
    setProducts(data ?? []);
    setLoading(false);
  }, [supabase]);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUserEmail(data.user?.email ?? ""));
    loadProducts();
  }, [supabase, loadProducts]);

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/admin/login");
    router.refresh();
  }

  function startEdit(p: ProductRow) {
    setEditingId(p.id);
    setForm({
      id: p.id,
      category: p.category,
      name: p.name,
      image: p.image,
      weight: p.weight ?? "",
      packaging: p.packaging ?? "",
      storage: p.storage ?? "",
      shelf_life: p.shelf_life ?? "",
      thawing: p.thawing ?? "",
      sort_order: p.sort_order,
    });
  }

  function resetForm() {
    setEditingId(null);
    setForm(emptyForm);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");

    const payload = {
      category: form.category,
      name: form.name,
      image: form.image,
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
    resetForm();
    loadProducts();
  }

  async function handleDelete(id: string) {
    if (!confirm("Энэ бүтээгдэхүүнийг устгах уу?")) return;
    await supabase.from("products").delete().eq("id", id);
    loadProducts();
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <div className="flex justify-between items-center mb-10">
        <h1 className="font-headline-md text-headline-md text-primary">
          Cake Drama — Бүтээгдэхүүний удирдлага
        </h1>
        <div className="flex items-center gap-4">
          <span className="font-body-md text-on-surface-variant">{userEmail}</span>
          <button
            onClick={handleLogout}
            className="border border-outline-variant px-4 py-2 font-label-sm text-label-sm hover:border-primary"
          >
            Гарах
          </button>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="border border-outline-variant p-6 mb-10 bg-surface-container-low"
      >
        <h2 className="font-headline-md text-headline-md text-primary mb-6">
          {editingId ? "Бүтээгдэхүүн засах" : "Шинэ бүтээгдэхүүн нэмэх"}
        </h2>
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
          <div className="sm:col-span-2">
            <label className="font-label-sm text-label-sm text-secondary uppercase mb-2 block">
              Зургийн зам (жишээ: /images/products/name.jpg)
            </label>
            <input
              required
              value={form.image}
              onChange={(e) => setForm({ ...form, image: e.target.value })}
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
          {editingId && (
            <button
              type="button"
              onClick={resetForm}
              className="border border-outline-variant px-8 py-3 font-label-sm text-label-sm"
            >
              Цуцлах
            </button>
          )}
        </div>
      </form>

      <h2 className="font-headline-md text-headline-md text-primary mb-6">
        Бүтээгдэхүүний жагсаалт ({products.length})
      </h2>
      {loading ? (
        <p className="font-body-md text-on-surface-variant">Ачаалж байна...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-outline-variant">
                <th className="py-2 pr-4 font-label-sm text-label-sm text-secondary uppercase">
                  Ангилал
                </th>
                <th className="py-2 pr-4 font-label-sm text-label-sm text-secondary uppercase">
                  Нэр
                </th>
                <th className="py-2 pr-4 font-label-sm text-label-sm text-secondary uppercase">
                  Эрэмбэ
                </th>
                <th className="py-2 pr-4 font-label-sm text-label-sm text-secondary uppercase">
                  Үйлдэл
                </th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p.id} className="border-b border-outline-variant/40">
                  <td className="py-3 pr-4 font-body-md text-on-surface-variant">{p.category}</td>
                  <td className="py-3 pr-4 font-body-md text-on-surface">{p.name}</td>
                  <td className="py-3 pr-4 font-body-md text-on-surface-variant">{p.sort_order}</td>
                  <td className="py-3 pr-4">
                    <div className="flex gap-3">
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
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
