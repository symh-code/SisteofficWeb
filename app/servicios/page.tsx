import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { buildMetadata } from "../lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Servicios",
  description:
    "Arquitectura, diseño interior, fabricación de mobiliario, adecuaciones y proyectos llave en mano: los servicios de SisteOffic para espacios de trabajo en Barranquilla.",
  path: "/servicios",
});

const WHATSAPP_HREF =
  "https://wa.me/573003591054?text=" +
  encodeURIComponent("Hola, vengo del sitio de Sisteoffic y quiero solicitar una asesoría para mi proyecto");

type Servicio = {
  id: string;
  numero: string;
  nombre: string;
  descripcion: string;
  imagen: string;
  icono?: string;
  cta?: { label: string; href: string };
};

const servicios: Servicio[] = [
  {
    id: "arquitectura",
    numero: "01",
    nombre: "Arquitectura",
    descripcion:
      "Diseñamos espacios corporativos funcionales que optimizan la distribución, la circulación y la experiencia de trabajo.",
    imagen: "/servicios/Icono de arquitectura.webp",
  },
  {
    id: "diseno-interior",
    numero: "02",
    nombre: "Diseño interior",
    descripcion:
      "Seleccionamos materiales, iluminación, mobiliario y acabados para crear espacios alineados con la identidad de cada empresa.",
    imagen: "/servicios/icono de diseño interior.webp",
  },
  {
    id: "fabricacion-de-mobiliario",
    numero: "03",
    nombre: "Fabricación",
    descripcion: "Fabricamos mobiliario corporativo a la medida en nuestra planta de producción.",
    imagen: "/images/montecarlo.webp",
  },
  {
    id: "adecuaciones",
    numero: "04",
    nombre: "Adecuaciones",
    descripcion: "Ejecutamos remodelaciones, adecuaciones e intervenciones para renovar espacios de trabajo.",
    imagen: "/servicios/icono de adecuacion.webp",
  },
  {
    id: "proyectos-llave-en-mano",
    numero: "05",
    nombre: "Proyectos llave en mano",
    descripcion: "Nos encargamos del proyecto completo, desde el diseño hasta la entrega final.",
    imagen: "/moodboard/icono de llaves en mano.webp",
  },
  {
    id: "camod-studio",
    numero: "06",
    nombre: "CAMÖD Studio",
    descripcion:
      "Nuestro estudio creativo desarrolla el concepto, la arquitectura interior y la identidad espacial de cada proyecto.",
    imagen: "/moodboard/icono de camod.webp",
    cta: { label: "Descubre CAMÖD Studio", href: "/camodstudio" },
  },
];

const proceso = [
  { numero: "01", nombre: "Analizamos" },
  { numero: "02", nombre: "Diseñamos" },
  { numero: "03", nombre: "Fabricamos" },
  { numero: "04", nombre: "Instalamos" },
  { numero: "05", nombre: "Entregamos" },
];

const diferenciales = [
  "Más de 16 años de experiencia",
  "Fabricación propia",
  "Diseño personalizado",
  "Acompañamiento integral",
];

export default function ServiciosPage() {
  return (
    <main className="w-full bg-white">
      {/* ─── Hero ─── */}
      <section className="relative flex h-[86vh] min-h-[560px] w-full items-end overflow-hidden">
        <Image
          src="/servicios/imagen incial de servicios.webp"
          alt="Proyecto corporativo diseñado y fabricado por Sisteoffic"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-black/10" />

        <div className="relative z-10 mx-auto w-full max-w-[1440px] px-6 pb-20 sm:px-10 sm:pb-28 lg:px-16">
          <h1 className="max-w-3xl font-serif text-[32px] leading-[1.15] text-white sm:text-5xl lg:text-6xl">
            Soluciones integrales para espacios de trabajo
          </h1>
          <p className="mt-5 max-w-xl text-base font-light leading-relaxed text-white/85 sm:text-lg">
            Desde la estrategia y el diseño hasta la fabricación e instalación, acompañamos cada etapa de tu
            proyecto.
          </p>
          <Link
            href="/contacto"
            className="group/cta mt-9 inline-flex items-center justify-center gap-3 whitespace-nowrap bg-[#7A1E2B] px-8 py-4 text-[13px] font-normal uppercase tracking-[0.2em] text-white transition-colors duration-300 hover:bg-[#5c1620]"
          >
            Solicitar asesoría
            <ArrowRight className="h-3.5 w-3.5 shrink-0 transition-transform duration-300 group-hover/cta:translate-x-1" />
          </Link>
        </div>
      </section>

      {/* ─── ¿Cómo podemos ayudarte? ─── */}
      <section className="w-full bg-white px-6 py-24 sm:px-10 sm:py-32 lg:px-16">
        <div className="mx-auto max-w-[1440px]">
          <span className="mb-4 inline-block text-xs font-semibold uppercase tracking-[0.2em] text-[#7A1E2B]">
            Qué hacemos
          </span>
          <h2 className="max-w-2xl font-serif text-3xl leading-[1.25] text-[#1a1a1a] sm:text-4xl">
            ¿Cómo podemos ayudarte?
          </h2>

          <div className="mt-20 flex flex-col">
            {servicios.map((servicio, idx) => {
              const invertido = idx % 2 === 1;
              return (
                <div key={servicio.id} id={servicio.id} className="scroll-mt-28">
                  <div
                    className={`grid grid-cols-1 items-center gap-10 py-16 lg:grid-cols-12 lg:gap-16 ${
                      invertido ? "lg:[direction:rtl]" : ""
                    }`}
                  >
                    <div className={`lg:col-span-7 ${invertido ? "lg:[direction:ltr]" : ""}`}>
                      <div className="group relative aspect-[4/3] w-full overflow-hidden bg-[#ece9e4] sm:aspect-[16/10]">
                        <Image
                          src={servicio.imagen}
                          alt={servicio.nombre}
                          fill
                          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                        />
                      </div>
                    </div>

                    <div className={`lg:col-span-5 ${invertido ? "lg:[direction:ltr]" : ""}`}>
                      <div className="flex items-center gap-4">
                        {servicio.icono && (
                          <img
                            src={servicio.icono}
                            alt=""
                            className="h-10 w-10 object-contain sm:h-12 sm:w-12"
                          />
                        )}
                        <span className="font-serif text-4xl leading-none text-[#7A1E2B]/30 sm:text-5xl">
                          {servicio.numero}
                        </span>
                      </div>
                      <h3 className="mt-5 font-serif text-2xl leading-tight text-[#1a1a1a] sm:text-[28px]">
                        {servicio.nombre}
                      </h3>
                      <p className="mt-4 max-w-md text-base font-light leading-relaxed text-gray-600">
                        {servicio.descripcion}
                      </p>
                      {servicio.cta && (
                        <Link
                          href={servicio.cta.href}
                          className="group/cta mt-6 inline-flex items-center gap-2.5 text-xs font-medium uppercase tracking-[0.18em] text-[#7A1E2B]"
                        >
                          {servicio.cta.label}
                          <span className="h-px w-6 bg-[#7A1E2B] transition-all duration-300 group-hover/cta:w-10" />
                        </Link>
                      )}
                    </div>
                  </div>
                  {idx < servicios.length - 1 && <div className="h-px w-full bg-[#e5dfd8]" />}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── Nuestro proceso ─── */}
      <section className="w-full bg-[#FAF8F6] px-6 py-24 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-[1440px]">
          <span className="mb-4 inline-block text-xs font-semibold uppercase tracking-[0.2em] text-[#7A1E2B]">
            Metodología
          </span>
          <h2 className="max-w-2xl font-serif text-3xl leading-[1.25] text-[#1a1a1a] sm:text-4xl">
            Nuestro proceso
          </h2>

          <div className="mt-16 grid grid-cols-2 gap-y-14 sm:grid-cols-3 lg:grid-cols-5">
            {proceso.map((paso, idx) => (
              <div key={paso.numero} className="relative flex flex-col gap-4 pr-6">
                <span className="font-serif text-lg leading-none text-[#7A1E2B]">{paso.numero}</span>
                <span className="font-serif text-xl leading-tight text-[#1a1a1a] sm:text-2xl">
                  {paso.nombre}
                </span>
                {idx < proceso.length - 1 && (
                  <span className="absolute right-0 top-1 hidden h-px w-4 bg-[#7A1E2B]/30 lg:block" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── ¿Por qué trabajar con Sisteoffic? ─── */}
      <section className="w-full bg-white px-6 py-24 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-[1440px]">
          <span className="mb-4 inline-block text-xs font-semibold uppercase tracking-[0.2em] text-[#7A1E2B]">
            Por qué Sisteoffic
          </span>
          <h2 className="max-w-2xl font-serif text-3xl leading-[1.25] text-[#1a1a1a] sm:text-4xl">
            ¿Por qué trabajar con Sisteoffic?
          </h2>

          <div className="mt-16 grid grid-cols-1 divide-y divide-[#e5dfd8] border-t border-[#e5dfd8] sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4">
            {diferenciales.map((item) => (
              <div key={item} className="flex items-center px-0 py-8 sm:px-8">
                <p className="font-serif text-xl leading-snug text-[#1a1a1a] sm:text-[22px]">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA final ─── */}
      <section className="relative flex h-[70vh] min-h-[480px] w-full items-center justify-center overflow-hidden">
        <Image
          src="/servicios/imagen final de servicios.webp"
          alt="Espacio de trabajo diseñado por Sisteoffic"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/55 to-black/70" />

        <div className="relative z-10 mx-auto flex max-w-2xl flex-col items-center px-6 text-center">
          <span className="h-px w-12 bg-white/50" />
          <p className="mt-8 font-serif text-3xl leading-[1.3] text-white sm:text-4xl lg:text-[2.75rem]">
            Transformemos juntos tu espacio.
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/contacto"
              className="group/cta inline-flex items-center justify-center gap-3 whitespace-nowrap bg-[#7A1E2B] px-8 py-4 text-[13px] font-normal uppercase tracking-[0.2em] text-white transition-colors duration-300 hover:bg-[#5c1620]"
            >
              Solicitar asesoría
              <ArrowRight className="h-3.5 w-3.5 shrink-0 transition-transform duration-300 group-hover/cta:translate-x-1" />
            </Link>
            <a
              href={WHATSAPP_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 whitespace-nowrap border border-white/70 px-8 py-4 text-[13px] font-normal uppercase tracking-[0.2em] text-white transition-colors duration-300 hover:bg-white/10"
            >
              Hablar por WhatsApp
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
