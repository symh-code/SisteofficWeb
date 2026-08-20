"use client";

import { useState } from "react";
import { Lightbox, type LightboxItem } from "./Lightbox";

type GaleriaItem = LightboxItem;

const PROYECTOS: GaleriaItem[] = [
  { src: "/espacios/nuevos/proyecto-11.webp", label: "Oficina ejecutiva" },
  { src: "/espacios/nuevos/proyecto-12.webp", label: "Escritorio en L" },
  { src: "/espacios/nuevos/proyecto-13.webp", label: "Estaciones de trabajo" },
  { src: "/espacios/nuevos/proyecto-14.webp", label: "Estaciones de trabajo" },
  { src: "/espacios/ENTRADA.jfif", label: "Recepción" },
  { src: "/espacios/CUBICULO.jfif", label: "Cubículo" },
  { src: "/espacios/CAFETERIA.jfif", label: "Cafetería" },
  { src: "/espacios/ARCHIVO RODANTE.jfif", label: "Archivo rodante" },
  { src: "/espacios/01.jfif", label: "Proyecto ejecutado" },
  { src: "/espacios/02.jpg", label: "Proyecto ejecutado" },
  { src: "/espacios/03.jfif", label: "Proyecto ejecutado" },
  { src: "/espacios/04.jfif", label: "Proyecto ejecutado" },
  { src: "/espacios/05.jfif", label: "Proyecto ejecutado" },
  { src: "/espacios/07.jfif", label: "Proyecto ejecutado" },
];

const RENDERS: GaleriaItem[] = [
  { src: "/espacios/ISOMETRIC.jfif", label: "Vista isométrica" },
  { src: "/espacios/PLANT.jfif", label: "Planta arquitectónica" },
  { src: "/espacios/planta oficina.jpg", label: "Distribución de planta" },
  { src: "/espacios/modelo1.webp", label: "Modelo 3D" },
  { src: "/espacios/escen03.webp", label: "Render de escena" },
  { src: "/espacios/escena opcion02.webp", label: "Render de escena" },
  { src: "/espacios/img01.webp", label: "Render" },
  { src: "/espacios/img02.webp", label: "Render" },
  { src: "/espacios/render2.webp", label: "Render" },
  { src: "/espacios/render4.webp", label: "Render" },
  { src: "/espacios/v1.jpg", label: "Visualización" },
  { src: "/espacios/visual.jpg", label: "Visualización" },
  { src: "/espacios/visual3.jpg", label: "Visualización" },
  { src: "/espacios/nuevos/render-15.webp", label: "Vista isométrica" },
  { src: "/espacios/nuevos/render-16.webp", label: "Planta 3D" },
];

function GaleriaGrid({
  items,
  onOpen,
}: {
  items: GaleriaItem[];
  onOpen: (index: number) => void;
}) {
  return (
    <div className="grid grid-cols-2 gap-px bg-[#e5dfd8] sm:grid-cols-3 lg:grid-cols-4">
      {items.map((item, index) => (
        <button
          key={item.src}
          type="button"
          onClick={() => onOpen(index)}
          className="group relative flex aspect-[4/3] w-full flex-col justify-end overflow-hidden bg-white text-left"
        >
          <img
            src={item.src}
            alt={item.label}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1f0f10]/70 via-[#1f0f10]/0 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          <span className="relative z-10 translate-y-2 px-4 py-3 text-[10px] font-medium uppercase tracking-[0.18em] text-white opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
            {item.label}
          </span>
        </button>
      ))}
    </div>
  );
}

export function EspaciosGaleria() {
  const [activeSet, setActiveSet] = useState<GaleriaItem[] | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <>
      {/* ─── Proyectos ─── */}
      <section className="w-full bg-white px-6 py-24 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-[1440px]">
          <span className="mb-4 inline-block text-xs font-semibold uppercase tracking-[0.2em] text-[#7A1E2B]">
            Galería
          </span>
          <h2 className="max-w-2xl font-serif text-3xl leading-[1.25] text-[#1a1a1a] sm:text-4xl">
            Proyectos ejecutados
          </h2>
          <p className="mt-4 max-w-xl text-base font-light leading-relaxed text-gray-600">
            Espacios reales entregados a nuestros clientes: recepciones, cubículos, cafeterías y
            áreas de archivo diseñados y fabricados a la medida.
          </p>

          <div className="mt-14">
            <GaleriaGrid
              items={PROYECTOS}
              onOpen={(index) => {
                setActiveSet(PROYECTOS);
                setActiveIndex(index);
              }}
            />
          </div>
        </div>
      </section>

      {/* ─── Renders ─── */}
      <section className="w-full bg-[#FAF8F6] px-6 py-24 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-[1440px]">
          <span className="mb-4 inline-block text-xs font-semibold uppercase tracking-[0.2em] text-[#7A1E2B]">
            Visualización
          </span>
          <h2 className="max-w-2xl font-serif text-3xl leading-[1.25] text-[#1a1a1a] sm:text-4xl">
            Renders y proyección 3D
          </h2>
          <p className="mt-4 max-w-xl text-base font-light leading-relaxed text-gray-600">
            Antes de construir, visualizamos: plantas arquitectónicas, modelos 3D y escenas
            renderizadas que anticipan cada proyecto.
          </p>

          <div className="mt-14">
            <GaleriaGrid
              items={RENDERS}
              onOpen={(index) => {
                setActiveSet(RENDERS);
                setActiveIndex(index);
              }}
            />
          </div>
        </div>
      </section>

      {activeSet && (
        <Lightbox
          items={activeSet}
          index={activeIndex}
          onClose={() => setActiveSet(null)}
          onNavigate={setActiveIndex}
        />
      )}
    </>
  );
}
