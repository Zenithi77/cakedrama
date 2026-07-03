"use client";

import { useState } from "react";
import Image from "next/image";

export default function ProductGallery({ images, name }: { images: string[]; name: string }) {
  const [active, setActive] = useState(0);
  const gallery = images.length > 0 ? images : [];

  if (gallery.length === 0) return null;

  return (
    <div className="reveal active">
      <div className="relative aspect-square bg-surface-container-high overflow-hidden mb-4">
        <Image
          src={gallery[active]}
          alt={name}
          fill
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover"
        />
      </div>
      {gallery.length > 1 && (
        <div className="grid grid-cols-5 gap-2">
          {gallery.map((src, i) => (
            <button
              key={src + i}
              onClick={() => setActive(i)}
              className={`relative aspect-square overflow-hidden border transition-colors ${
                i === active ? "border-primary" : "border-outline-variant/60 hover:border-primary/50"
              }`}
            >
              <Image src={src} alt={`${name} ${i + 1}`} fill sizes="80px" className="object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
