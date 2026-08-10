"use client";

import { useState } from "react";
import { Lightbox, type LightboxItem } from "./Lightbox";

export type CamodProducto = {
  id: number;
  nombre: string;
  imagen_url: string;
};

export function CamodProductosGaleria({ productos }: { productos: CamodProducto[] }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  if (productos.length === 0) return null;

  const items: LightboxItem[] = productos.map((producto) => ({
    src: producto.imagen_url,
    label: producto.nombre,
  }));

  return (
    <>
      <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
        {productos.map((producto, index) => (
          <button
            key={producto.id}
            type="button"
            onClick={() => setActiveIndex(index)}
            className="group flex flex-col border border-[#FCF5ED]/10 bg-[#FCF5ED]/[0.03] text-left transition-colors duration-300 hover:border-[#C6AB96]/60 hover:bg-[#FCF5ED]/[0.06]"
          >
            <div className="relative aspect-square w-full overflow-hidden">
              <img
                src={producto.imagen_url}
                alt={producto.nombre}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-contain p-6 transition-transform duration-500 ease-out group-hover:scale-105"
              />
            </div>
            <div className="border-t border-[#FCF5ED]/10 px-4 py-3">
              <h3 className="truncate text-[13px] font-medium text-[#FCF5ED]/90">{producto.nombre}</h3>
            </div>
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
