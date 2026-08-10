"use client";

import { useState } from "react";
import { Lightbox, type LightboxItem } from "./Lightbox";

export function ProyectoGaleria({ nombre, imagenes }: { nombre: string; imagenes: string[] }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const items: LightboxItem[] = imagenes.map((src, index) => ({
    src,
    label: `${nombre} ${index + 1}/${imagenes.length}`,
  }));

  return (
    <>
      <div className="grid grid-cols-2 gap-px bg-[#C6AB96]/25 sm:grid-cols-3">
        {items.map((item, index) => (
          <button
            key={item.src}
            type="button"
            onClick={() => setActiveIndex(index)}
            className="group relative aspect-[4/3] overflow-hidden bg-[#FCF5ED]"
          >
            <img
              src={item.src}
              alt={item.label}
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
            />
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
