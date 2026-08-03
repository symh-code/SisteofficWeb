import type { Metadata } from "next";
import Image from "next/image";
import { Flag, Eye, Star } from "lucide-react";
import { buildMetadata } from "../lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Sobre Nosotros",
  description:
    "12 años fabricando mobiliario de oficina a la medida en Barranquilla. Conoce a SisteOffic: producción propia, diseño de interiores y proyectos corporativos en la Costa Caribe colombiana.",
  path: "/sobre-nosotros",
});

const testimonials = [
  {
    initials: "AM",
    name: "Alejandro Mendoza",
    role: "Director de Operaciones, TechNova",
    text: "El nivel de detalle y profesionalismo de SisteOffic es incomparable. Lograron capturar exactamente la esencia de nuestra marca y traducirla en un espacio funcional y estéticamente superior.",
  },
  {
    initials: "SV",
    name: "Sofía Villalobos",
    role: "HR Manager, GlobalFinance",
    text: "La ergonomía del mobiliario ha tenido un impacto notable en el bienestar de nuestro equipo. SisteOffic no solo vende muebles, ofrece verdaderas soluciones para el trabajo moderno.",
  },
  {
    initials: "RC",
    name: "Roberto Castellanos",
    role: "CEO, Creative Studio",
    text: "Desde la fase de diseño hasta la instalación final, el servicio fue impecable. Transformaron nuestras antiguas oficinas en un hub colaborativo que atrae y retiene al mejor talento.",
  },
];

const partners = [
  { name: "TechNova", icon: "T" },
  { name: "CloudSystems", icon: "☁" },
  { name: "ArcDesign", icon: "🏛" },
  { name: "GlobalLogistics", icon: "🌐" },
  { name: "EcoEnergy", icon: "⚡" },
];

// Multiplicamos los partners para asegurarnos de que cubran todo el ancho en pantallas grandes
const extendedPartners = [...partners, ...partners, ...partners];

export default function SobreNosotrosPage() {
  return (
    <main className="w-full bg-white">
      {/* ─── Hero ─── */}
      <section className="relative flex h-[380px] items-center justify-center overflow-hidden sm:h-[420px]">
        <Image
          src="/banner_2.jpg"
          alt="Oficina moderna fabricada por SisteOffic en Barranquilla"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
          <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-white/80">
            SisteOffic · Barranquilla, Atlántico
          </span>
          <h1 className="mt-4 text-3xl font-light tracking-tight text-white sm:text-5xl">
            12 años fabricando mobiliario de oficina a la medida en Barranquilla
          </h1>
        </div>
      </section>

      {/* ─── Diseñando el futuro del trabajo ─── */}
      <section className="mx-auto max-w-7xl px-6 py-12 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-24 items-start">
          
          {/* Texto izquierda */}
          <div className="lg:col-span-6 space-y-6">
            <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#7A1E2B]">
              Nuestra Esencia
            </span>
            <h2 className="text-3xl font-light tracking-tight text-slate-900 sm:text-4xl leading-tight">
              Diseñando el futuro del trabajo
            </h2>
            <div className="space-y-4 text-xs font-light leading-relaxed text-slate-600">
              <p>
                Somos una compañía consolidada que abrió sus puertas hace 12 años en el norte de Barranquilla. Nuestro sello nos identifica porque nuestros productos son de alta calidad y además cuentan con garantía.
              </p>
              <p>
                En SisteOffic, buscamos que en cada proyecto se obtenga la mayor eficiencia del espacio, aprovechando cada centímetro del área de trabajo. Por esto, nuestros muebles son fabricados a la medida del cliente, brindando así flexibilidad y la oportunidad de crear espacios más productivos en oficinas de Barranquilla y de toda la Costa Caribe colombiana.
              </p>
            </div>
          </div>

          {/* Tarjetas Misión y Visión derecha */}
          <div className="lg:col-span-6 grid gap-6 sm:grid-cols-2">
            {/* Misión */}
            <div className="rounded-3xl border border-slate-200/80 bg-white p-8 shadow-xl shadow-slate-900/[0.01] transition-all hover:border-slate-300">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#7A1E2B]/10 text-[#7A1E2B]">
                <Flag className="h-4 w-4" />
              </div>
              <h3 className="mt-6 text-sm font-medium tracking-wide text-slate-900 uppercase">Misión</h3>
              <p className="mt-3 text-xs font-light leading-relaxed text-slate-500">
                Proporcionar soluciones integrales de mobiliario y diseño de espacios que potencien la productividad, el confort y la colaboración, superando las expectativas a través de la innovación y calidad.
              </p>
            </div>

            {/* Visión */}
            <div className="rounded-3xl border border-slate-200/80 bg-white p-8 shadow-xl shadow-slate-900/[0.01] transition-all hover:border-slate-300">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#7A1E2B]/10 text-[#7A1E2B]">
                <Eye className="h-4 w-4" />
              </div>
              <h3 className="mt-6 text-sm font-medium tracking-wide text-slate-900 uppercase">Visión</h3>
              <p className="mt-3 text-xs font-light leading-relaxed text-slate-500">
                Ser reconocidos como el socio estratégico líder a nivel nacional en la creación de entornos corporativos, estableciendo el estándar de excelencia en diseño funcional, sostenibilidad y servicio premium.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* ─── Testimonios ─── */}
      <section className="mx-auto max-w-7xl px-6 py-20 sm:px-8 lg:px-12">
        <div className="space-y-3 max-w-xl mb-12">
          <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#7A1E2B]">
            Testimonios
          </span>
          <h2 className="text-3xl font-light tracking-tight text-slate-900">
            Lo que dicen nuestros clientes
          </h2>
          <p className="text-xs font-light text-slate-500">
            Experiencias reales de corporaciones que han transformado sus espacios con SisteOffic.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t) => (
            <div
              key={t.initials}
              className="flex flex-col justify-between rounded-3xl border border-slate-200/80 bg-white p-8 shadow-xl shadow-slate-900/[0.01]"
            >
              <div>
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-3.5 w-3.5 fill-[#7A1E2B] text-[#7A1E2B]"
                    />
                  ))}
                </div>
                <p className="mt-6 text-xs font-light italic leading-relaxed text-slate-600">
                  &ldquo;{t.text}&rdquo;
                </p>
              </div>
              <div className="mt-8 flex items-center gap-3 pt-6 border-t border-slate-100">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#7A1E2B]/10 text-[10px] font-medium text-[#7A1E2B]">
                  {t.initials}
                </div>
                <div>
                  <p className="text-xs font-medium text-slate-900">{t.name}</p>
                  <p className="text-[10px] font-light text-slate-400">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Empresas que confían (Carrusel Infinito) ─── */}
      <section className="py-16 overflow-hidden border-t border-slate-200/60 bg-white/40">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <p className="text-center text-[10px] font-semibold uppercase tracking-[0.3em] text-slate-400 mb-10">
            Empresas que confían en nosotros
          </p>
          
          <style>{`
            @keyframes infinite-scroll {
              0% { transform: translateX(0); }
              100% { transform: translateX(-100%); }
            }
            .animate-infinite-scroll {
              animation: infinite-scroll 35s linear infinite;
            }
            .group:hover .animate-infinite-scroll {
              animation-play-state: paused;
            }
          `}</style>

          <div className="group relative flex w-full overflow-hidden">
            <div className="flex w-max shrink-0 animate-infinite-scroll items-center gap-16 pr-16">
              {extendedPartners.map((p, index) => (
                <div
                  key={`${p.name}-1-${index}`}
                  className="flex items-center gap-2 text-slate-400 transition-colors hover:text-slate-900"
                >
                  <span className="text-lg opacity-60 font-light">{p.icon}</span>
                  <span className="text-xs font-light tracking-wide uppercase">{p.name}</span>
                </div>
              ))}
            </div>

            <div
              aria-hidden="true"
              className="flex w-max shrink-0 animate-infinite-scroll items-center gap-16 pr-16"
            >
              {extendedPartners.map((p, index) => (
                <div
                  key={`${p.name}-2-${index}`}
                  className="flex items-center gap-2 text-slate-400 transition-colors hover:text-slate-900"
                >
                  <span className="text-lg opacity-60 font-light">{p.icon}</span>
                  <span className="text-xs font-light tracking-wide uppercase">{p.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}