"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowDown, ArrowRight } from "lucide-react";

/**
 * Hero de CAMÖD Studio — imagen a sangre completa con efecto Ken Burns sutil,
 * texto anclado abajo-izquierda (estética editorial "modern furniture") y
 * entrada animada por capas al montar el componente.
 */
export function CamodHero() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setVisible(true), 150);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <section
      id="hero"
      className="relative flex h-[92vh] min-h-[680px] w-full items-end overflow-hidden sm:min-h-[760px]"
    >
      <img
        src="/slideshero/slide1.png"
        alt="Recepción corporativa diseñada por CAMÖD Studio"
        className="animate-kenburns absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#13110D]/95 via-[#13110D]/45 to-[#13110D]/10" />

      <div className="relative z-10 w-full px-6 pb-16 sm:px-10 sm:pb-24 lg:px-16">
        <div className="mx-auto max-w-[1440px]">
          <div
            className={`max-w-2xl transition-all duration-1000 ease-out ${
              visible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
          >
            <span className="inline-flex items-center gap-2.5 border-l-2 border-[#C6AB96] bg-white/5 px-4 py-2 text-[11px] font-medium uppercase tracking-[0.3em] text-[#C6AB96] backdrop-blur-md">
              El estudio creativo de Sisteoffic
            </span>
            <h1 className="mt-6 font-serif text-[40px] font-light leading-[1.05] tracking-tight text-[#FCF5ED] sm:text-6xl lg:text-7xl">
              CAMÖD Studio
            </h1>
            <p className="mt-6 max-w-lg text-sm font-light leading-relaxed text-[#FCF5ED]/75 sm:text-base">
              Diseñamos espacios con propósito, donde la funcionalidad, la estética y el bienestar
              se unen para crear experiencias que transforman la forma de trabajar.
            </p>
          </div>

          <div
            className={`mt-10 flex flex-col gap-4 transition-all duration-1000 ease-out sm:flex-row ${
              visible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
            style={{ transitionDelay: visible ? "300ms" : "0ms" }}
          >
            <Link
              href="#quienes-somos"
              className="group/cta inline-flex items-center justify-center gap-3 bg-[#FCF5ED] px-8 py-4 text-[13px] font-medium uppercase tracking-[0.2em] text-[#302416] transition-colors duration-300 hover:bg-[#C6AB96]"
            >
              Quiénes somos
              <ArrowRight className="h-3.5 w-3.5 shrink-0 transition-transform duration-300 group-hover/cta:translate-x-1" />
            </Link>
            <Link
              href="#proyectos"
              className="inline-flex items-center justify-center gap-3 border border-[#FCF5ED]/40 px-8 py-4 text-[13px] font-medium uppercase tracking-[0.2em] text-[#FCF5ED] transition-colors duration-300 hover:border-[#FCF5ED] hover:bg-white/5"
            >
              Ver proyectos
            </Link>
          </div>
        </div>
      </div>

      {/* Indicador de scroll */}
      <div
        className={`absolute inset-x-0 bottom-6 z-10 flex justify-center transition-opacity duration-1000 ${
          visible ? "opacity-100" : "opacity-0"
        }`}
        style={{ transitionDelay: visible ? "900ms" : "0ms" }}
      >
        <ArrowDown className="h-4 w-4 animate-bounce text-[#FCF5ED]/60" />
      </div>
    </section>
  );
}
