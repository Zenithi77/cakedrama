"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { extractPublicId } from "@/lib/cloudinaryUrl";

type Props = {
  images: string[];
  onChange: (images: string[]) => void;
  max?: number;
};

export default function ImageUploader({ images, onChange, max }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  async function uploadOne(file: File): Promise<string> {
    const signRes = await fetch("/api/admin/cloudinary-sign", { method: "POST" });
    const signData = await signRes.json();
    if (!signRes.ok) throw new Error(signData.error || "Signature авахад алдаа гарлаа");

    const form = new FormData();
    form.append("file", file);
    form.append("api_key", signData.apiKey);
    form.append("timestamp", String(signData.timestamp));
    form.append("signature", signData.signature);
    form.append("folder", signData.folder);

    const uploadRes = await fetch(
      `https://api.cloudinary.com/v1_1/${signData.cloudName}/image/upload`,
      { method: "POST", body: form }
    );
    const uploadData = await uploadRes.json();
    if (!uploadRes.ok) throw new Error(uploadData.error?.message || "Cloudinary upload алдаа");
    return uploadData.secure_url as string;
  }

  async function handleFiles(fileList: FileList | null) {
    if (!fileList || fileList.length === 0) return;
    setUploading(true);
    setError("");
    try {
      const files = max ? Array.from(fileList).slice(0, Math.max(0, max - images.length)) : Array.from(fileList);
      const urls = await Promise.all(files.map(uploadOne));
      onChange(max ? [...images, ...urls].slice(0, max) : [...images, ...urls]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Байршуулахад алдаа гарлаа");
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  async function handleRemove(index: number) {
    const url = images[index];
    onChange(images.filter((_, i) => i !== index));
    const publicId = extractPublicId(url);
    if (publicId) {
      fetch("/api/admin/cloudinary-delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ publicId }),
      }).catch(() => {});
    }
  }

  function move(index: number, dir: -1 | 1) {
    const target = index + dir;
    if (target < 0 || target >= images.length) return;
    const next = [...images];
    [next[index], next[target]] = [next[target], next[index]];
    onChange(next);
  }

  return (
    <div>
      <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 mb-3">
        {images.map((url, i) => (
          <div key={url + i} className="relative aspect-square border border-outline-variant bg-surface-container-high overflow-hidden">
            <Image src={url} alt={`Зураг ${i + 1}`} fill sizes="150px" className="object-cover" />
            {i === 0 && (
              <span className="absolute top-1 left-1 bg-primary text-on-primary text-[10px] px-2 py-0.5 uppercase tracking-wide">
                Cover
              </span>
            )}
            {/* Устгах товч — байнга харагдана (mobile дээр hover ажилладаггүй тул) */}
            <button
              type="button"
              onClick={() => handleRemove(i)}
              className="absolute top-1 right-1 w-6 h-6 flex items-center justify-center bg-error text-on-error text-xs shadow"
              title="Устгах"
            >
              ✕
            </button>
            {images.length > 1 && (
              <div className="absolute bottom-1 inset-x-1 flex justify-center gap-1.5">
                <button
                  type="button"
                  onClick={() => move(i, -1)}
                  disabled={i === 0}
                  className="w-6 h-6 flex items-center justify-center bg-white/90 text-on-background text-xs disabled:opacity-30 shadow"
                  title="Зүүн тийш зөөх"
                >
                  ←
                </button>
                <button
                  type="button"
                  onClick={() => move(i, 1)}
                  disabled={i === images.length - 1}
                  className="w-6 h-6 flex items-center justify-center bg-white/90 text-on-background text-xs disabled:opacity-30 shadow"
                  title="Баруун тийш зөөх"
                >
                  →
                </button>
              </div>
            )}
          </div>
        ))}
        {(!max || images.length < max) && (
          <label className="aspect-square border border-dashed border-outline-variant flex items-center justify-center cursor-pointer hover:border-primary transition-colors text-on-surface-variant">
            <input
              ref={inputRef}
              type="file"
              accept="image/*"
              multiple={!max || max > 1}
              className="hidden"
              onChange={(e) => handleFiles(e.target.files)}
              disabled={uploading}
            />
            <span className="font-label-sm text-label-sm text-center px-2">
              {uploading ? "Ачааллаж байна..." : "+ Зураг нэмэх"}
            </span>
          </label>
        )}
      </div>
      {error && <p className="font-body-md text-error text-sm">{error}</p>}
      <p className="font-body-md text-on-surface-variant text-xs">
        Эхний зураг (Cover) нь картын үндсэн зураг болно. Сумаар дараалал өөрчилнө.
      </p>
    </div>
  );
}
