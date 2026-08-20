import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { buildMetadata } from "../lib/seo";
import ClientLogos from "./ClientLogos";

export const metadata: Metadata = buildMetadata({
  title: "Sobre Nosotros",
  description:
    "16 años fabricando mobiliario de oficina a la medida en Barranquilla. Conoce a Sisteoffic JL: producción propia, diseño de interiores con CAMÖD Studio y proyectos corporativos llave en mano en la Costa Caribe colombiana.",
  path: "/sobre-nosotros",
});

export default function SobreNosotrosPage() {
  return (
    <main className="w-full bg-white">
      {/* ─── Hero ─── */}
      <section className="relative flex min-h-[520px] items-end overflow-hidden sm:min-h-[620px]">
        <Image
          src="/sobre-nosotros-hero.webp"
          alt="Taller de fabricación de mobiliario de Sisteoffic JL en Barranquilla"
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/5" />
        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-16 sm:px-8 sm:pb-20 lg:px-12">
          <span className="text-[10px] font-semibold uppercase tracking-[0.32em] text-white/75">
            Sisteoffic JL · Barranquilla, Atlántico
          </span>
          <h1 className="mt-5 max-w-4xl font-serif text-4xl font-normal leading-[1.08] tracking-tight text-white sm:text-6xl lg:text-7xl">
            Mobiliario que transforma espacios y potencia experiencias.
          </h1>
          <p className="mt-7 max-w-2xl text-base font-light leading-relaxed text-white/80 sm:text-lg">
            Diseñamos soluciones funcionales, confortables y duraderas para empresas que buscan
            trabajar mejor.
          </p>
        </div>
      </section>

      {/* ─── Propósito ─── */}
      <section className="mx-auto max-w-7xl px-6 py-20 sm:px-8 sm:py-24 lg:px-12">
        <div className="grid gap-px overflow-hidden border border-[#DDD5CF] bg-[#DDD5CF] lg:grid-cols-2">
          <article className="bg-white p-8 sm:p-12 lg:p-14">
            <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#7A1E2B]">
              Misión
            </span>
            <p className="mt-8 max-w-xl font-serif text-2xl leading-relaxed text-[#261D1B] sm:text-3xl">
              Ofrecer soluciones de mobiliario que combinen calidad, confort y eficiencia,
              integrando innovación y tendencias para lograr la satisfacción de nuestros clientes.
            </p>
          </article>
          <article className="bg-[#F5F1ED] p-8 sm:p-12 lg:p-14">
            <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#7A1E2B]">
              Visión
            </span>
            <p className="mt-8 max-w-xl font-serif text-2xl leading-relaxed text-[#261D1B] sm:text-3xl">
              Ser una empresa líder a nivel nacional, reconocida por brindar soluciones de
              mobiliario que optimizan espacios, siempre alineados con las necesidades del mercado,
              la tecnología y la calidad.
            </p>
          </article>
        </div>
      </section>

      {/* ─── Valores ─── */}
      <section className="bg-[#261D1B] py-20 text-white sm:py-24">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <h2 className="font-serif text-4xl font-normal tracking-tight text-white sm:text-5xl">
            Valores
          </h2>
          <div className="mt-5 h-px w-16 bg-[#A33A49]" aria-hidden="true" />
          <div className="mt-10 flex flex-wrap gap-x-10 gap-y-5 font-serif text-2xl sm:text-3xl lg:text-4xl">
            {[
              "Honestidad",
              "Responsabilidad",
              "Servicio",
              "Creatividad",
              "Pasión por la calidad",
            ].map((valor) => (
              <span key={valor} className="inline-flex items-center">
                {valor}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Clientes ─── */}
      <section className="mx-auto max-w-7xl px-6 py-20 sm:px-8 sm:py-24 lg:px-12">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <h2 className="font-serif text-4xl font-normal tracking-tight text-[#261D1B] sm:text-5xl">
            Nuestros clientes
            </h2>
            <p className="mt-5 font-serif text-2xl leading-snug text-[#7A1E2B] sm:text-3xl">
              Confianza construida proyecto a proyecto.
            </p>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <p className="text-base font-light leading-8 text-slate-600 sm:text-lg">
              Hemos trabajado con empresas de distintos sectores: comercial, industrial y
              servicios, desarrollando proyectos a la medida. Algunos clientes destacados son
              Drummond LTD, Farmatodo, Combarranquilla, Universidad Libre y Mac Pollo, quienes
              confían en nuestro trabajo y nos recomiendan.
            </p>
          </div>
        </div>
        <ClientLogos />
      </section>

      {/* ─── Historia y contexto SEO ─── */}
      <section className="border-t border-slate-200 bg-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-20 sm:px-8 lg:grid-cols-12 lg:px-12">
          <div className="lg:col-span-5">
            <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#7A1E2B]">
              Nuestra historia
            </span>
            <h2 className="mt-5 font-serif text-3xl leading-tight text-[#261D1B] sm:text-4xl">
              Más de 16 años fabricando mobiliario corporativo en Barranquilla
            </h2>
          </div>
          <div className="space-y-5 text-sm font-light leading-relaxed text-slate-600 sm:text-base lg:col-span-6 lg:col-start-7">
            <p>
              En Sisteoffic JL llevamos más de 16 años desarrollando proyectos corporativos que
              integran diseño, fabricación de mobiliario y ejecución de espacios. Acompañamos a
              nuestros clientes desde la planificación hasta la instalación final, creando
              ambientes funcionales, duraderos y alineados con la identidad de cada empresa.
            </p>
            <p>
              Hoy fortalecemos esta visión con CAMÖD Studio, nuestro estudio creativo especializado
              en arquitectura y diseño interior, ofreciendo una solución integral desde la
              conceptualización hasta la entrega del proyecto.
            </p>
            <div className="flex flex-col gap-4 pt-4 sm:flex-row">
              <Link
                href="/buscar"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#7A1E2B] px-7 py-3 text-sm font-medium text-white transition hover:bg-[#651825]"
              >
                Ver mobiliario
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/camodstudio"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 px-7 py-3 text-sm font-medium text-slate-800 transition hover:border-[#7A1E2B] hover:text-[#7A1E2B]"
              >
                Descubre CAMÖD Studio
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
