"use client";

import { useState } from "react";
import { Lightbox, type LightboxItem } from "./Lightbox";

/**
 * Composición editorial de moodboard: columna izquierda dividida en dos
 * bloques apilados (paisaje arriba, retrato horizontal abajo) y columna
 * derecha con una imagen vertical a toda la altura — sin bordes ni esquinas
 * redondeadas, imágenes a sangre sobre un marco color arena.
 */
export function CamodMoodboardGaleria({ imagenes }: { imagenes: string[] }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  if (imagenes.length < 3) return null;

  const [paisaje, retrato, vertical] = imagenes;
  const items: LightboxItem[] = [
    { src: paisaje, label: "Moodboard CAMÖD Studio 1" },
    { src: retrato, label: "Moodboard CAMÖD Studio 2" },
    { src: vertical, label: "Moodboard CAMÖD Studio 3" },
  ];

  return (
    <>
      <div className="bg-[#F3E9DC] p-3 sm:p-5">
        <div className="grid h-[820px] grid-cols-1 grid-rows-3 gap-3 sm:h-[620px] sm:grid-cols-2 sm:grid-rows-2 sm:gap-4 lg:h-[720px]">
          <button
            type="button"
            onClick={() => setActiveIndex(0)}
            aria-label={items[0].label}
            className="group relative overflow-hidden sm:col-start-1 sm:row-start-1"
          >
            <img
              src={paisaje}
              alt=""
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
          </button>

          <button
            type="button"
            onClick={() => setActiveIndex(1)}
            aria-label={items[1].label}
            className="group relative overflow-hidden sm:col-start-1 sm:row-start-2"
          >
            <img
              src={retrato}
              alt=""
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
          </button>

          <button
            type="button"
            onClick={() => setActiveIndex(2)}
            aria-label={items[2].label}
            className="group relative overflow-hidden sm:col-start-2 sm:row-start-1 sm:row-span-2"
          >
            <img
              src={vertical}
              alt=""
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
          </button>
        </div>
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
