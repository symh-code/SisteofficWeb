import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Building2,
  Briefcase,
  Compass,
  Palette,
  PenTool,
  Hammer,
  Sparkles,
} from "lucide-react";
import { buildMetadata } from "../lib/seo";
import { getCamodProductos } from "../lib/camodProductos";
import { camodProyectos } from "./proyectos/data";
import { CamodProductosGaleria } from "../components/CamodProductosGaleria";
import { CamodRendersGaleria } from "../components/CamodRendersGaleria";
import { CamodMoodboardGaleria } from "../components/CamodMoodboardGaleria";
import { CamodProceso } from "../components/CamodProceso";
import { CamodHero } from "../components/CamodHero";

export const metadata: Metadata = buildMetadata({
  title: "CAMÖD Studio",
  description:
    "CAMÖD Studio es el estudio creativo de Sisteoffic: arquitectura interior, diseño corporativo y ejecución integral de espacios de trabajo en Barranquilla.",
  path: "/camodstudio",
});

// Los productos se consultan en D1 (getCamodProductos) en cada request, así
// que la página no puede prerenderizarse de forma estática.
export const dynamic = "force-dynamic";

/* ─── Paleta CAMÖD ─── Chocolate #302416 · Carbón #13110D · Marfil #FCF5ED · Camel #C6AB96 */

const disciplinas: {
  id: string;
  icono: typeof Building2;
  titulo: string;
  descripcion: string;
}[] = [
  {
    id: "arquitectura-interior",
    icono: Building2,
    titulo: "Arquitectura Interior",
    descripcion:
      "Intervenimos la distribución, la materialidad y la luz de cada espacio para que la arquitectura interior trabaje a favor de la operación y la marca.",
  },
  {
    id: "diseno-corporativo",
    icono: Briefcase,
    titulo: "Diseño Corporativo",
    descripcion:
      "Traducimos la identidad de cada empresa en ambientes coherentes: paleta, mobiliario y señalética pensados como un solo sistema de marca.",
  },
];

const proceso: {
  numero: string;
  icono: typeof Compass;
  titulo: string;
  descripcion: string;
}[] = [
  {
    numero: "01",
    icono: Compass,
    titulo: "Descubrimos",
    descripcion: "Reunión con el cliente, levantamiento del espacio y primeros bocetos.",
  },
  {
    numero: "02",
    icono: Palette,
    titulo: "Conceptualizamos",
    descripcion: "Moodboard, muestras de materiales y definición de la paleta de colores.",
  },
  {
    numero: "03",
    icono: PenTool,
    titulo: "Diseñamos",
    descripcion: "Desarrollo de planos, renders y modelado 3D del proyecto completo.",
  },
  {
    numero: "04",
    icono: Hammer,
    titulo: "Materializamos",
    descripcion: "Taller de fabricación, carpintería, instalación y detalles constructivos.",
  },
  {
    numero: "05",
    icono: Sparkles,
    titulo: "Transformamos",
    descripcion: "Entrega del proyecto terminado y registro fotográfico profesional.",
  },
];

const moodboardImages = [
  "/moodboard/imagen carrusel moodboard2.webp",
  "/moodboard/imagen carrusel moodboard3.webp",
  "/moodboard/imagen carrusel moodboard4.webp",
];

const renderImages = [
  "/camodstudio/renders/render-01.jpeg",
  "/camodstudio/renders/render-02.jpeg",
  "/camodstudio/renders/render-03.webp",
  "/camodstudio/renders/render-04.jpeg",
  "/camodstudio/renders/render-05.webp",
  "/camodstudio/renders/render-06.webp",
  "/camodstudio/renders/render-07.jpeg",
  "/camodstudio/renders/render-08.jpeg",
  "/camodstudio/renders/render-09.jpeg",
];

const WHATSAPP_HREF =
  "https://wa.me/573003591054?text=" +
  encodeURIComponent("Hola, vengo del sitio de CAMÖD Studio y quiero agendar una asesoría de diseño");

export default async function CamodStudioPage() {
  const productos = await getCamodProductos();

  return (
    <main className="w-full bg-[#FCF5ED]">
      {/* ─── Hero ─── */}
      <CamodHero />

      {/* ─── Quiénes somos ─── */}
      <section id="quienes-somos" className="w-full bg-[#FCF5ED]">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* Imagen — a sangre completa, ocupa toda la mitad izquierda de la sección */}
          <div className="relative min-h-[420px] lg:min-h-[720px]">
            <Image
              src="/camodstudio/quienes-somos-cafeteria.jpeg"
              alt="Cafetería diseñada por CAMÖD Studio"
              fill
              className="object-cover"
            />
            {/* Cédula de crédito, estilo ficha de producto */}
            <div className="absolute bottom-0 left-0 flex items-center gap-3 bg-[#FAF6EE] px-5 py-3">
              <span className="font-serif text-sm italic text-[#302416]">Espacio comercial</span>
              <span className="h-3 w-px bg-[#302416]/25" />
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#302416]/60">
                CAMÖD Studio
              </span>
            </div>
          </div>

          {/* Texto — solo en la mitad derecha */}
          <div className="flex flex-col justify-center px-6 py-16 sm:px-10 lg:px-16 xl:px-20">
            <span className="text-[10px] font-semibold uppercase tracking-[0.35em] text-[#8A7A5C]">
              Quiénes somos
            </span>
            <h2 className="mt-5 max-w-lg font-serif text-3xl font-light leading-tight tracking-tight text-[#302416] sm:text-4xl lg:text-[2.75rem]">
              Diseñamos más que espacios. Diseñamos experiencias.
            </h2>
            <div className="mt-6 max-w-md space-y-4 text-sm font-light leading-relaxed text-[#302416]/75 sm:text-base">
              <p>
                En CAMÖD Studio creemos que cada espacio tiene el poder de influir en la
                productividad, el bienestar y la identidad de quienes lo habitan. Por eso
                abordamos cada proyecto desde una mirada estratégica, donde la arquitectura
                interior, el diseño y la funcionalidad trabajan como un solo lenguaje.
              </p>
              <p>
                Como el estudio creativo de Sisteoffic, conceptualizamos cada proyecto antes de
                convertirse en realidad, desarrollando propuestas que integran diseño,
                materialidad, iluminación, mobiliario y cada detalle necesario para crear espacios
                únicos y atemporales.
              </p>
            </div>

            {/* Disciplinas — junto con el resto de la información, en la columna derecha */}
            <div className="mt-10 max-w-md border-t border-[#302416]/10">
              {disciplinas.map((d) => (
                <div
                  key={d.id}
                  id={d.id}
                  className="scroll-mt-36 border-b border-[#302416]/10 py-7"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center border border-[#302416]/20 text-[#302416]">
                      <d.icono className="h-4.5 w-4.5" />
                    </div>
                    <h3 className="text-sm font-semibold uppercase tracking-wider text-[#302416]">
                      {d.titulo}
                    </h3>
                  </div>
                  <p className="mt-3 text-sm font-light leading-relaxed text-[#302416]/70">
                    {d.descripcion}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── Nuestra filosofía + Proceso ─── */}
      <section className="w-full bg-[#302416] py-24 sm:py-32">
        <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-8">
            <div className="hidden lg:col-span-1 lg:block">
              <span className="font-serif text-8xl leading-none text-[#C6AB96]/25">“</span>
            </div>
            <div className="lg:col-span-7">
              <span className="text-[10px] font-semibold uppercase tracking-[0.35em] text-[#C6AB96]">
                Nuestra filosofía
              </span>
              <h2 className="mt-5 font-serif text-4xl font-light italic leading-[1.15] tracking-tight text-[#FCF5ED] sm:text-5xl lg:text-6xl">
                No diseñamos para llenar espacios.
              </h2>
            </div>
            <div className="lg:col-span-4 lg:pt-2">
              <div className="space-y-5 text-sm font-light leading-relaxed text-[#FCF5ED]/70 sm:text-base lg:border-l lg:border-[#FCF5ED]/10 lg:pl-8">
                <p>
                  Diseñamos para generar experiencias, fortalecer marcas y mejorar la manera en
                  que las personas trabajan, colaboran y viven cada ambiente.
                </p>
                <p>
                  Cada proyecto nace de comprender profundamente a nuestros clientes, su cultura y
                  la forma en que utilizan sus espacios, transformando esas necesidades en
                  soluciones funcionales, estéticas y duraderas.
                </p>
              </div>
            </div>
          </div>

          {/* Proceso */}
          <div id="proceso" className="mt-24 scroll-mt-36 border-t border-[#FCF5ED]/10 pt-16 lg:mt-28 lg:pt-20">
            <h3 className="text-xs font-semibold uppercase tracking-[0.35em] text-[#C6AB96]">
              Nuestro proceso
            </h3>

            <div className="mt-14">
              <CamodProceso
                pasos={proceso.map(({ numero, titulo, descripcion }) => ({ numero, titulo, descripcion }))}
              />
            </div>

            <p className="mt-16 max-w-2xl font-serif text-lg italic leading-relaxed text-[#C6AB96] lg:text-xl">
              Cada proyecto comienza con una conversación, evoluciona a través del diseño y cobra
              vida gracias a la experiencia de Sisteoffic.
            </p>
          </div>
        </div>
      </section>

      {/* ─── Inspiración: Moodboards ─── */}
      <section id="moodboards" className="scroll-mt-36 py-24">
        <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-12">
          <span className="text-[10px] font-semibold uppercase tracking-[0.35em] text-[#8A7A5C]">
            Inspiración
          </span>
          <div className="mt-4 flex items-center gap-3">
            <Image
              src="/moodboard/icono de moodboard.webp"
              alt=""
              width={40}
              height={40}
              className="h-9 w-9 object-contain"
            />
            <h2 className="max-w-xl text-3xl font-light leading-tight tracking-tight text-[#302416] sm:text-4xl">
              Moodboards &amp; materiales
            </h2>
          </div>
          <p className="mt-4 max-w-xl text-sm font-light leading-relaxed text-[#302416]/70">
            El punto de partida de cada proyecto: texturas, acabados y paletas que definen el
            carácter del espacio antes de tomar forma.
          </p>
        </div>

        <div className="mx-auto mt-10 max-w-6xl px-6 sm:px-8 lg:px-12">
          <CamodMoodboardGaleria imagenes={moodboardImages} />
        </div>
      </section>

      {/* ─── Inspiración: Renders ─── */}
      <section id="renders" className="scroll-mt-36 bg-[#F3E9DC] py-24">
        <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-12">
          <span className="text-[10px] font-semibold uppercase tracking-[0.35em] text-[#8A7A5C]">
            Inspiración
          </span>
          <h2 className="mt-4 max-w-xl text-3xl font-light leading-tight tracking-tight text-[#302416] sm:text-4xl">
            Renders
          </h2>
          <p className="mt-4 max-w-xl text-sm font-light leading-relaxed text-[#302416]/70">
            La visualización del proyecto antes de construirlo: luz, proporción y materialidad en
            un mismo render.
          </p>
        </div>

        <div className="mx-auto mt-12 max-w-6xl px-6 sm:px-8 lg:px-12">
          <CamodRendersGaleria renders={renderImages} />
        </div>
      </section>

      {/* ─── Proyectos ─── */}
      <section id="proyectos" className="scroll-mt-36 py-24">
        <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-12">
          <span className="text-[10px] font-semibold uppercase tracking-[0.35em] text-[#8A7A5C]">
            Portafolio
          </span>
          <h2 className="mt-4 max-w-xl text-3xl font-light leading-tight tracking-tight text-[#302416] sm:text-4xl">
            Proyectos
          </h2>
          <p className="mt-4 max-w-xl text-sm font-light leading-relaxed text-[#302416]/70">
            Proyectos reales entregados por CAMÖD Studio, uno por espacio y por cliente.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-px bg-[#C6AB96]/25 sm:grid-cols-2 lg:grid-cols-3">
          {camodProyectos.map((proyecto) => (
            <Link
              key={proyecto.slug}
              href={`/camodstudio/proyectos/${proyecto.slug}`}
              className="group relative flex aspect-[4/3] items-end overflow-hidden bg-[#FCF5ED]"
            >
              <Image
                src={proyecto.cover}
                alt={proyecto.nombre}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#13110D]/85 via-[#13110D]/15 to-transparent transition-opacity group-hover:from-[#13110D]/90" />
              <div className="relative z-10 flex w-full items-end justify-between p-6">
                <div>
                  <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#C6AB96]">
                    CAMÖD Studio
                  </span>
                  <h3 className="mt-1 text-lg font-medium text-[#FCF5ED]">{proyecto.nombre}</h3>
                </div>
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#FCF5ED]/90 text-[#302416] transition group-hover:bg-[#FCF5ED]">
                  <ArrowRight className="h-4 w-4" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ─── Productos ─── */}
      <section id="productos" className="scroll-mt-36 bg-[#13110D] py-24">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <span className="text-[10px] font-semibold uppercase tracking-[0.35em] text-[#C6AB96]">
            Colección CAMÖD
          </span>
          <h2 className="mt-4 max-w-xl text-3xl font-light leading-tight tracking-tight text-[#FCF5ED] sm:text-4xl">
            Piezas únicas, sin distracciones
          </h2>
          <p className="mt-4 max-w-xl text-sm font-light leading-relaxed text-[#FCF5ED]/60">
            Mobiliario y piezas de autor diseñadas por CAMÖD Studio, fabricadas a la medida de cada
            proyecto.
          </p>
        </div>

        <div className="mx-auto mt-14 max-w-7xl px-6 sm:px-8 lg:px-12">
          <CamodProductosGaleria productos={productos} />
        </div>
      </section>

      {/* ─── Agenda una asesoría ─── */}
      <section id="agenda" className="scroll-mt-36 bg-[#FCF5ED] py-28">
        <div className="mx-auto max-w-2xl px-6 text-center sm:px-8">
          <span className="inline-block rounded-full bg-[#6E6B4E]/10 px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[0.3em] text-[#6E6B4E]">
            Empecemos tu proyecto
          </span>
          <h2 className="mt-6 text-3xl font-light leading-tight tracking-tight text-[#302416] sm:text-4xl">
            Agenda una asesoría
          </h2>
          <p className="mt-5 text-sm font-light leading-relaxed text-[#302416]/70 sm:text-base">
            Cuéntanos sobre tu espacio y tu marca. Un diseñador de CAMÖD Studio te acompañará desde
            la primera conversación hasta la entrega final del proyecto.
          </p>
          <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href={WHATSAPP_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-[#302416]/20 px-8 py-3.5 text-sm font-medium text-[#302416] transition hover:border-[#302416] hover:bg-[#302416]/5"
            >
              Escríbenos a WhatsApp
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
