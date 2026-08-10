"use client";

import { useState } from "react";
import { Lightbox, type LightboxItem } from "./Lightbox";

export function CamodRendersGaleria({ renders }: { renders: string[] }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  if (renders.length === 0) return null;

  const items: LightboxItem[] = renders.map((src, index) => ({
    src,
    label: `Render CAMÖD Studio ${index + 1}`,
  }));

  return (
    <>
      <div className="grid grid-cols-1 gap-px bg-[#302416]/10 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item, index) => (
          <button
            key={item.src}
            type="button"
            onClick={() => setActiveIndex(index)}
            className="group relative flex aspect-[16/10] w-full flex-col justify-end overflow-hidden bg-[#F3E9DC]"
          >
            <img
              src={item.src}
              alt={item.label}
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#13110D]/70 via-[#13110D]/0 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <span className="relative z-10 translate-y-2 px-4 py-3 text-[10px] font-medium uppercase tracking-[0.18em] text-[#FCF5ED] opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
              {item.label}
            </span>
          </button>
        ))}
      </div>

      {activeIndex !== null && (
        <Lightbox
          items={items}
          index={activeIndex}
          onClose={() => setActiveIndex(null)}
          onNavigate={setActiveIndex}
        />
      )}
    </>
  );
}
