"use client";

import { useEffect, useRef, useState } from "react";

type Paso = {
  numero: string;
  titulo: string;
  descripcion: string;
};

/**
 * Línea de tiempo animada del proceso CAMÖD: una línea conectora que se
 * dibuja al entrar en el viewport y cada paso aparece con un desfase
 * escalonado — sin cajas ni esquinas redondeadas, solo tipografía y trazos.
 */
export function CamodProceso({ pasos }: { pasos: Paso[] }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="relative">
      {/* Línea conectora (solo desktop) */}
      <div className="absolute left-0 right-0 top-[13px] hidden h-px bg-[#FCF5ED]/15 lg:block" />
      <div
        className="absolute left-0 top-[13px] hidden h-px bg-[#C6AB96] transition-[width] duration-[1400ms] ease-out lg:block"
        style={{ width: visible ? "100%" : "0%" }}
      />

      <div className="relative grid grid-cols-2 gap-x-6 gap-y-12 sm:grid-cols-3 lg:grid-cols-5">
        {pasos.map((paso, index) => (
          <div
            key={paso.numero}
            className={`transition-all duration-700 ease-out ${
              visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
            }`}
            style={{ transitionDelay: visible ? `${index * 150}ms` : "0ms" }}
          >
            <span className="relative z-10 flex h-[26px] w-[26px] items-center justify-center border border-[#C6AB96] bg-[#302416] text-[10px] font-semibold text-[#C6AB96]">
              {paso.numero}
            </span>
            <h4 className="mt-6 text-sm font-semibold uppercase tracking-wide text-[#FCF5ED]">
              {paso.titulo}
            </h4>
            <p className="mt-2 text-xs font-light leading-relaxed text-[#FCF5ED]/60">
              {paso.descripcion}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
