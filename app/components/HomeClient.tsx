"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { MOBILIARIO_CATEGORIAS, mobiliarioHref } from "../data/mobiliarioCategorias";

// Brand colors
const BRAND_COLORS = {
  primary: "#7A1E2B",
  primaryLight: "#A02838",
  primarySubtle: "#F5E6E8",
};

const PROCESO_STEPS = [
  {
    numero: "1",
    titulo: "Diseño Estratégico",
    detalle: "Arquitectura + Interiorismo + CAMÖD",
  },
  {
    numero: "2",
    titulo: "Fabricación",
    detalle: "Mobiliario corporativo a la medida",
  },
  {
    numero: "3",
    titulo: "Ejecución Integral",
    detalle: "Adecuaciones + Instalación + Llave en mano",
  },
];

// Local fallback used only when the API is unavailable.
const mockProduct = {
  id: 23,
  nombre: "Nova",
  imagen_url: "/images/nova.webp",
  precio: 1900000,
  especificaciones: "Estación de trabajo operativa para dos puestos.",
};

const fallbackFeaturedProducts = [
  {
    id: 23,
    nombre: "Nova",
    imagen_url: "/images/nova.webp",
    precio: 1900000,
  },
  {
    id: 4,
    nombre: "Milo",
    imagen_url: "/images/milo.webp",
    precio: 1500000,
  },
  {
    id: 19,
    nombre: "CONNECTE",
    imagen_url: "/images/connecte.webp",
    precio: 2500000,
  },
  {
    id: 24,
    nombre: "Core",
    imagen_url: "/images/core.webp",
    precio: 3200000,
  },
];

// Hero slider slides (4 slides, 8s each) — usa imágenes locales desde public/slideshero
const heroSlides = [
  {
    imagen: "/slideshero/slide1.png",
    badge: "Mobiliario corporativo",
    titulo: "Espacios abiertos, reinventados",
    subtitulo: "Ajuste inteligente con control sin esfuerzo.",
    cta: "catalogo",
  },
  {
    imagen: "/slideshero/slide2.png",
    badge: "Diseño",
    titulo: "Comodidad que trabaja para ti",
    subtitulo: "Diseño ergonómico para tu jornada completa.",
    cta: "cotizar",
  },
  {
    imagen: "/slideshero/slide3.png",
    badge: "Mobiliario",
    titulo: "Transforma tu espacio de trabajo",
    subtitulo: "Funcionalidad y estilo para cada proyecto.",
    cta: "whatsapp",
  },
  {
    imagen: "/slideshero/slide4.png",
    badge: "Calidad profesional",
    titulo: "Tu oficina, a tu medida",
    subtitulo: "Mobiliario moderno para equipos que crecen.",
    cta: "proyectos",
  },
];

const HERO_SLIDE_DURATION_MS = 8000;

function ProcesoSection() {
  return (
    <section className="w-full bg-white">
      <div className="mx-auto grid max-w-[1440px] grid-cols-1 lg:grid-cols-2">
        {/* Foto */}
        <div className="relative h-[360px] sm:h-[480px] lg:h-auto lg:min-h-[560px]">
          <img
            src="/imagen de nuestras soluciones.png"
            alt="Proceso de diseño y fabricación de mobiliario corporativo"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>
 
        {/* Pasos */}
        <div className="flex flex-col justify-center bg-white px-6 py-16 sm:px-10 lg:px-16 xl:px-20">
          <span className="mb-8 inline-block text-xs font-semibold uppercase tracking-[0.2em] text-[#7A1E2B]">
            Nuestro proceso
          </span>
 
          <div className="flex flex-col">
            {PROCESO_STEPS.map((step, idx) => (
              <div key={step.numero}>
                <div className="flex items-start gap-6 py-7">
                  <span className="font-serif text-3xl leading-none text-[#7A1E2B] sm:text-4xl">
                    {step.numero}
                  </span>
                  <div className="flex flex-col gap-1.5">
                    <h3 className="font-serif text-xl leading-tight text-[#1a1a1a] sm:text-2xl">
                      {step.titulo}
                    </h3>
                    <p className="text-sm font-light text-gray-600 sm:text-base">
                      {step.detalle}
                    </p>
                  </div>
                </div>
                {idx < PROCESO_STEPS.length - 1 && (
                  <div className="h-px w-full bg-[#e5dfd8]" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// Genera el link de una categoría hacia el buscador con el filtro ya aplicado.
function categoriaHref(nombre: string): string {
  return `/buscar?categoria=${encodeURIComponent(nombre)}`;
}

// Categories data
const CATEGORIA_DATA = [
  {
    nombre: "Puesto de trabajo",
    imagen: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=400&h=400&fit=crop&crop=center",
  },
  {
    nombre: "Mesas de juntas",
    imagen: "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=400&h=400&fit=crop&crop=center",
  },
  {
    nombre: "Sillas",
    imagen: "https://images.unsplash.com/photo-1519947486511-46149fa0a254?w=400&h=400&fit=crop&crop=center",
  },
  {
    nombre: "Línea educativa",
    imagen: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=400&fit=crop&crop=center",
  },
  {
    nombre: "Almacenamiento",
    imagen: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=400&h=400&fit=crop&crop=center",
  },
  {
    nombre: "Cabinas Zenbox",
    imagen: "https://images.unsplash.com/photo-1484101403633-562f891dc89a?w=400&h=400&fit=crop&crop=center",
  },
  {
    nombre: "Divisiones",
    imagen: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=400&h=400&fit=crop&crop=center",
  },
  {
    nombre: "Mobiliario especial",
    imagen: "https://images.unsplash.com/photo-1460317442991-0ec209397118?w=400&h=400&fit=crop&crop=center",
  },
  {
    nombre: "Accesorios",
    imagen: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=400&fit=crop&crop=center",
  },
];

// La categoría "Sillas" apunta a la landing dedicada (más contenido, FAQ y
// datos estructurados) en vez del buscador genérico — concentra autoridad
// interna en la keyword objetivo "sillas de oficina en Barranquilla".
const categorias = CATEGORIA_DATA.map((cat) => ({
  ...cat,
  href: cat.nombre === "Sillas" ? "/sillas-de-oficina-en-barranquilla" : categoriaHref(cat.nombre),
}));

const CATEGORY_DEMO_IMAGES: Record<string, string> = {
  "puesto-de-trabajo": "/entrefoto-inicio.png",
  mesas: "/espacios/CAFETERIA.jfif",
  sillas: "/categorias/sillas.png",
  almacenamiento: "/categorias/almacenamiento.png",
  "linea-educativa": "/categorias/linea-educativa.png",
  "cabinas-zenbox": "/categorias/cabinas-zenbox.png",
  divisiones: "/espacios/visual3.jpg",
  counter: "/espacios/ENTRADA.jfif",
  "mobiliario-especial": "/espacios/render4.png",
  accesorios: "/categorias/accesorios.png",
};

function ProductCard({ product }: { product: any }) {
  return (
    <Link href={`/productos/${product.id}`} className="group flex min-w-0 flex-col bg-transparent">
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-white">
        {product.imagen_url ? (
          <img
            src={product.imagen_url}
            alt={product.nombre}
            className="h-full w-full scale-[1.08] object-contain p-2 transition-transform duration-700 ease-out group-hover:scale-[1.14] sm:p-3"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-[#c2bcb0]">
            <svg className="h-10 w-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
        )}
      </div>

      <div className="relative overflow-hidden bg-transparent">
        <div
          className="absolute inset-y-0 left-0 w-[58%] bg-[#EAEAE6] transition-[width] duration-500 ease-out group-hover:w-[85%]"
          style={{ clipPath: "polygon(0 0, 100% 0, calc(100% - 22px) 100%, 0 100%)" }}
        />
        <div className="relative z-10 flex flex-col gap-1.5 px-4 py-4">
          <span className="text-[10px] font-medium uppercase tracking-[0.15em] text-[#9c9990]">
            SISTEOFFIC
          </span>
          <h3 className="truncate text-[16px] font-medium leading-snug text-[#1a1a1a] transition-colors group-hover:text-[#7A1E2B]">
            {product.nombre}
          </h3>
        </div>
      </div>
    </Link>
  );
}

// Tarjeta CAMÖD con identidad visual propia y sin precio.
function CamodProductCard({ product }: { product: { id: number; nombre: string; imagen_url: string } }) {
  return (
    <Link href="/camodstudio#productos" className="group flex flex-col bg-transparent">
      <div className="relative aspect-square w-full overflow-hidden bg-[#13110D]">
        <span className="absolute left-0 top-0 z-10 bg-[#302416] px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.18em] text-[#C6AB96]">
          CAMÖD
        </span>
        {product.imagen_url ? (
          <img
            src={product.imagen_url}
            alt={product.nombre}
            className="h-full w-full object-contain p-6 transition-transform duration-700 ease-out group-hover:scale-[1.05]"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-[#C6AB96]/40">
            <svg className="h-10 w-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
        )}
      </div>

      <div className="relative overflow-hidden bg-transparent">
        <div
          className="absolute inset-y-0 left-0 w-[58%] bg-[#EAEAE6] transition-[width] duration-500 ease-out group-hover:w-[85%]"
          style={{ clipPath: "polygon(0 0, 100% 0, calc(100% - 22px) 100%, 0 100%)" }}
        />
        <div className="relative z-10 flex flex-col gap-1.5 px-4 py-4">
          <span className="text-[10px] font-medium uppercase tracking-[0.15em] text-[#9c9990]">
            CAMÖD Studio
          </span>
          <h3 className="truncate font-serif text-[16px] leading-snug text-[#302416]">
            {product.nombre}
          </h3>
        </div>
      </div>
    </Link>
  );
}

// Hero image slider — altura de pantalla completa (h-screen) y controles estilo referencia.
// El H1 es fijo y localizado (SEO); el titular de cada slide se muestra como
// h2 rotativo debajo, para no perder el efecto dinámico original.
// Hero image slider — altura de pantalla completa (h-screen) y controles estilo referencia.
// El H1 es fijo y localizado (SEO) en los slides 1-3; en el 4to slide (índice 3) se
// reemplaza todo el bloque de texto y el CTA por el mensaje de "Proyectos llave en mano".
function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (isPaused) return;

    timerRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, HERO_SLIDE_DURATION_MS);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused]);

  const slide = heroSlides[currentSlide];
  const isProjectsSlide = currentSlide === 3; // 4to slide (índice 3)

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev === 0 ? heroSlides.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  return (
    <section className="relative h-screen w-full overflow-hidden bg-black">
      <div className="relative h-full w-full ">
        {heroSlides.map((s, index) => (
          <img
            key={s.imagen}
            src={s.imagen}
            alt={s.titulo}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ease-in-out ${
              index === 3 ? "object-top" : "object-center"
            } ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}

        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/30" />

        {/* Contenido del hero: texto + CTA. En mobile se apilan (columna),
            desde lg se distribuyen en fila con el/los botón(es) a la derecha. */}
        <div className="absolute inset-x-0 bottom-20 sm:bottom-24 px-6 sm:px-10 lg:px-16 z-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            {/* El slide 4 ya incorpora el mensaje en la imagen. */}
            {!isProjectsSlide && (
              <div className="ml-0 transition-opacity duration-500 ease-in-out sm:ml-10 md:ml-24 lg:ml-32 xl:ml-48">
                <h1 className="max-w-[90vw] font-serif text-[28px] leading-[1.15] text-white xs:text-3xl sm:max-w-xl sm:text-4xl md:max-w-2xl md:text-5xl lg:max-w-3xl lg:text-6xl">
                  Mobiliario de oficina a la medida en toda la costa Caribe
                </h1>
                <h2 className="mt-3 max-w-[85vw] font-serif text-base leading-tight text-white/90 sm:max-w-lg sm:text-lg md:max-w-xl md:text-xl lg:max-w-2xl">
                  Diseñamos espacios que potencian el bienestar y la productividad
                </h2>
                <p className="mt-3 max-w-[80vw] sm:max-w-sm md:max-w-md text-sm font-light text-white/80 sm:text-base">
                  Desde la idea hasta el último detalle.
                </p>
              </div>
            )}

            {/* CTA único y contextual en slides 1-3 / navegación de proyectos en slide 4 */}
            <div
              key={`cta-${slide.cta}`}
              className={`ml-0 flex flex-shrink-0 flex-col gap-3 transition-opacity duration-500 ease-in-out sm:ml-10 sm:flex-row md:ml-24 lg:mr-8 ${
                isProjectsSlide ? "lg:ml-auto" : "lg:ml-0"
              } xl:mr-16`}
            >
              {isProjectsSlide ? (
                <>
                  <Link
                    href="/servicios"
                    className="group/cta inline-flex items-center justify-center gap-3 whitespace-nowrap bg-[#7A1E2B] px-8 py-4 text-[13px] font-normal uppercase tracking-[0.2em] text-white transition-colors duration-300 hover:bg-[#5c1620] w-full sm:w-auto text-center"
                  >
                    Conocer nuestros servicios
                    <svg
                      className="h-3.5 w-3.5 shrink-0 transition-transform duration-300 group-hover/cta:translate-x-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.25} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </Link>
                  <Link
                    href="/camodstudio#proyectos"
                    className="group/cta inline-flex items-center justify-center gap-3 whitespace-nowrap border border-white/70 px-8 py-4 text-[13px] font-normal uppercase tracking-[0.2em] text-white transition-colors duration-300 hover:bg-white/10 w-full sm:w-auto text-center"
                  >
                    Ver proyectos
                    <svg
                      className="h-3.5 w-3.5 shrink-0 transition-transform duration-300 group-hover/cta:translate-x-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.25} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </Link>
                </>
              ) : (
                <>
                  {slide.cta === "catalogo" && (
                    <Link
                      href="/buscar"
                      className="group/cta inline-flex w-full items-center justify-center gap-3 whitespace-nowrap bg-[#7A1E2B] px-8 py-4 text-center text-[13px] font-normal uppercase tracking-[0.2em] text-white transition-colors duration-300 hover:bg-[#5c1620] sm:w-auto"
                    >
                      Explora nuestro mobiliario
                      <svg className="h-3.5 w-3.5 shrink-0 transition-transform duration-300 group-hover/cta:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.25} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </Link>
                  )}
                  {slide.cta === "cotizar" && (
                    <Link
                      href="/contacto"
                      className="group/cta inline-flex w-full items-center justify-center gap-3 whitespace-nowrap bg-[#7A1E2B] px-8 py-4 text-center text-[13px] font-normal uppercase tracking-[0.2em] text-white transition-colors duration-300 hover:bg-[#5c1620] sm:w-auto"
                    >
                      Cotiza con nosotros
                      <svg className="h-3.5 w-3.5 shrink-0 transition-transform duration-300 group-hover/cta:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.25} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </Link>
                  )}
                  {slide.cta === "whatsapp" && (
                    <a
                      href="https://wa.me/573003591054?text=Hola%2C%20Me%20gustar%C3%ADa%20conocer%20m%C3%A1s%20de%20sus%20servicios"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/cta inline-flex w-full items-center justify-center gap-3 whitespace-nowrap bg-[#25D366] px-8 py-4 text-center text-[13px] font-normal uppercase tracking-[0.15em] text-white transition-colors duration-300 hover:bg-[#1EAD52] sm:w-auto"
                    >
                      Escríbenos por WhatsApp
                      <svg className="h-4 w-4 shrink-0 fill-current" viewBox="0 0 32 32" aria-hidden="true">
                        <path d="M16.001 3.2c-7.07 0-12.8 5.73-12.8 12.8 0 2.26.6 4.44 1.73 6.36L3.2 28.8l6.44-1.69a12.75 12.75 0 0 0 6.36 1.62h.005c7.07 0 12.8-5.73 12.8-12.8s-5.73-12.73-12.804-12.73Zm.002 23.4h-.004a10.6 10.6 0 0 1-5.578-1.598l-.383-.227-3.933 1.032 1.05-3.837-.245-.397a10.6 10.6 0 0 1-1.578-5.573c0-5.882 4.785-10.667 10.667-10.667 5.885 0 10.67 4.718 10.67 10.6 0 5.882-4.785 10.667-10.666 10.667Zm5.717-8.36c-.31-.156-1.84-.907-2.126-1.011-.285-.104-.492-.156-.699.156-.207.311-.802 1.01-.984 1.218-.181.208-.362.234-.673.078-.311-.156-1.312-.483-2.499-1.538-.924-.822-1.548-1.837-1.73-2.148-.181-.311-.019-.479.137-.634.14-.14.311-.363.467-.545.156-.181.207-.311.311-.519.104-.208.052-.39-.026-.545-.078-.156-.699-1.683-.958-2.303-.252-.605-.508-.523-.699-.533-.181-.008-.389-.01-.596-.01-.208 0-.545.078-.83.39-.285.311-1.089 1.064-1.089 2.594s1.115 3.009 1.27 3.216c.156.208 2.194 3.351 5.317 4.699.743.321 1.323.512 1.775.655.746.237 1.425.204 1.963.124.599-.09 1.84-.752 2.1-1.478.259-.727.259-1.35.181-1.478-.078-.13-.285-.208-.596-.363Z" />
                      </svg>
                    </a>
                  )}
                </>
              )}
            </div>
          </div>
        </div>

        <div className="absolute inset-x-0 bottom-0 z-20 flex h-16 items-center justify-between border-t border-white/10 bg-black/40 px-6 backdrop-blur-md sm:px-10 lg:px-16">
          <div className="flex items-center gap-3 ">
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Anterior imagen"
              className="flex h-9 w-9 items-center justify-center rounded-full text-white transition hover:bg-white/15 "
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              type="button"
              onClick={handleNext}
              aria-label="Siguiente imagen"
              className="flex h-9 w-9 items-center justify-center rounded-full text-white transition hover:bg-white/15"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          <div className="hidden sm:flex items-center gap-4 w-48 lg:w-64">
            <div className="relative h-[2px] w-full bg-white/20 rounded-full overflow-hidden">
              <div
                className="absolute top-0 left-0 bottom-0 bg-white transition-all duration-300"
                style={{ width: `${((currentSlide + 1) / heroSlides.length) * 100}%` }}
              />
            </div>
          </div>

          <button
            type="button"
            onClick={() => setIsPaused((prev) => !prev)}
            aria-label={isPaused ? "Reanudar presentación" : "Pausar presentación"}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur transition hover:bg-white/25"
          >
            {isPaused ? (
              <svg className="h-4 w-4 translate-x-[1px]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            ) : (
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 5h4v14H6zM14 5h4v14h-4z" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </section>
  );
}

function CategoryCard({
  category,
  imagenOverride,
  hrefOverride,
  hideContent,
  imagePosition = "center",
}: {
  category: any;
  imagenOverride?: string;
  hrefOverride?: string;
  hideContent?: boolean;
  imagePosition?: "center" | "top";
}) {
  const imagen = imagenOverride ?? category.imagen;

  return (
    <Link
      href={hrefOverride ?? category.href}
      className="group relative col-span-2 flex min-h-[280px] flex-col justify-end overflow-hidden"
    >
      {imagen ? (
        <img
          src={imagen}
          alt={hideContent ? "" : category.nombre}
          className={`absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 ${
            imagePosition === "top" ? "object-top" : "object-center"
          }`}
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-[#ece9e4] to-[#d9d3c9]" />
      )}

      {!hideContent && (
        <>
          {/* Overlay tonal en vino oscuro (no negro puro) — liga la imagen a la marca */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#1f0f10]/85 via-[#1f0f10]/15 to-transparent" />

          <div className="relative z-10 p-7">
            <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-white/60">
              Sisteoffic
            </p>
            <h3 className="mt-2 font-serif text-2xl leading-tight text-white sm:text-[28px]">
              {category.nombre}
            </h3>
            <span className="mt-5 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.15em] text-white">
              Ver productos
              <span className="h-px w-6 bg-white transition-all duration-300 group-hover:w-10" />
            </span>
          </div>
        </>
      )}
    </Link>
  );
}

// Carrusel horizontal de categorías y subcategorías de mobiliario.
function ColeccionesSection() {
  const carouselRef = useRef<HTMLDivElement | null>(null);

  const moveCarousel = (direction: -1 | 1) => {
    const carousel = carouselRef.current;
    if (!carousel) return;
    carousel.scrollBy({
      left: direction * Math.min(carousel.clientWidth * 0.82, 560),
      behavior: "smooth",
    });
  };

  return (
    <section className="w-full overflow-hidden bg-white px-6 py-20 sm:px-10 lg:px-16">
      <div className="mx-auto max-w-[1440px]">
        <div className="flex items-end justify-between gap-8">
          <div>
            <span className="mb-4 inline-block text-xs font-semibold uppercase tracking-[0.2em] text-[#7A1E2B]">
              Colecciones de mobiliario
            </span>
            <p className="max-w-3xl text-3xl font-normal leading-[1.35] text-[#3a1219] sm:text-4xl">
              Diseñamos y fabricamos soluciones para cada espacio de trabajo.
            </p>
          </div>

          <div className="hidden shrink-0 items-center gap-2 sm:flex">
            <button
              type="button"
              onClick={() => moveCarousel(-1)}
              aria-label="Ver colecciones anteriores"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-[#D8D1C8] text-[#3A1219] transition hover:border-[#7A1E2B] hover:bg-[#7A1E2B] hover:text-white"
            >
              <span aria-hidden="true">←</span>
            </button>
            <button
              type="button"
              onClick={() => moveCarousel(1)}
              aria-label="Ver más colecciones"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-[#D8D1C8] text-[#3A1219] transition hover:border-[#7A1E2B] hover:bg-[#7A1E2B] hover:text-white"
            >
              <span aria-hidden="true">→</span>
            </button>
          </div>
        </div>

        <div
          ref={carouselRef}
          className="mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {MOBILIARIO_CATEGORIAS.map((categoria) => (
            <Link
              key={categoria.slug}
              href={mobiliarioHref(categoria.slug)}
              className="group relative aspect-[4/5] min-w-[78%] snap-start overflow-hidden bg-[#EAE6E0] sm:min-w-[300px] lg:min-w-[320px] xl:min-w-[340px]"
            >
              <img
                src={CATEGORY_DEMO_IMAGES[categoria.slug]}
                alt={categoria.nombre}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />

              <div className="absolute inset-x-0 bottom-0 flex h-14 items-stretch bg-[#38322E]/75 backdrop-blur-sm">
                <span className="flex min-w-0 flex-1 items-center truncate px-4 font-serif text-xl text-white">
                  {categoria.nombre}
                </span>
                <span className="flex w-12 shrink-0 items-center justify-center bg-[#F3F1EC] text-xl text-[#302416] transition-colors group-hover:bg-[#7A1E2B] group-hover:text-white">
                  →
                </span>
              </div>
            </Link>
          ))}
        </div>

        <p className="mt-2 text-xs text-[#8A817A] sm:hidden">Desliza hacia la derecha para ver más</p>
      </div>
    </section>
  );
}

// Sección con una única frase de marca — estética minimalista tipo "modern
// furniture": degradado vinotinto de fondo, mucho aire, un trazo delgado como
// único acento, y una animación sutil de aparición al entrar en viewport.
function FraseSection() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-br from-[#3a1219] via-[#7A1E2B] to-[#5c1620] px-6 py-10 sm:px-10 sm:py-12 lg:px-16">
      {/* Glow sutil que da profundidad al degradado sin romper el minimalismo */}
      <div className="pointer-events-none absolute -top-1/2 left-1/2 h-[140%] w-[140%] -translate-x-1/2 bg-[radial-gradient(ellipse_at_center,_rgba(160,40,56,0.35)_0%,_transparent_60%)]" />

      <div
        ref={ref}
        className={`relative mx-auto flex max-w-3xl flex-col items-center text-center transition-all duration-1000 ease-out ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
        }`}
      >
        <span
          className={`h-px bg-white/40 transition-all duration-1000 ease-out ${
            isVisible ? "w-12 delay-300" : "w-0"
          }`}
        />
        <p className="mt-4 font-serif text-2xl font-light leading-[1.35] tracking-[0.01em] text-white sm:text-3xl lg:text-[2rem]">
          Diseñamos el lugar donde las ideas,<br className="hidden sm:block" /> las personas y las empresas crecen.
        </p>
        <span
          className={`mt-4 h-px bg-white/40 transition-all duration-1000 ease-out ${
            isVisible ? "w-12 delay-300" : "w-0"
          }`}
        />
      </div>
    </section>
  );
}

export function HomeClient() {
  const [products, setProducts] = useState<any[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [productsError, setProductsError] = useState<string | null>(null);
  const [camodProducts, setCamodProducts] = useState<any[]>([]);

  useEffect(() => {
    const fetchCamodProducts = async () => {
      try {
        const res = await fetch("/api/camod-productos", { cache: "no-store" });
        const data = await res.json();
        setCamodProducts(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error cargando productos CAMÖD:", error);
        setCamodProducts([]);
      }
    };

    fetchCamodProducts();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/productos", { cache: "no-store" });
        const text = await res.text();

        let data: any = null;
        try {
          data = text ? JSON.parse(text) : null;
        } catch (e) {
          data = null;
        }

        if (!res.ok) {
          const errMsg = data && data.error ? data.error : text || "Error al cargar productos";
          // Do not throw here - handle gracefully and use fallback products
          setProductsError(errMsg);
          setProducts([]);
          setLoadingProducts(false);
          return;
        }

        setProducts(Array.isArray(data) ? data : []);
      } catch (error) {
        // Network or unexpected error
        console.error("Error cargando productos de la API:", error);
        setProductsError(String(error));
        setProducts([]);
      } finally {
        setLoadingProducts(false);
      }
    };

    fetchProducts();
  }, []);

  const getCategoryProducts = (categoryName: string, count: number) => {
    if (products.length === 0) {
      return Array.from({ length: count }, () => mockProduct);
    }

    return products
      .filter(
        (product) =>
          product.categoria_nombre === categoryName ||
          product.categoria_padre_nombre === categoryName,
      )
      .slice(0, count);
  };

  const withFallback = (arr: any[], count: number) => {
    if (arr.length >= count) return arr.slice(0, count);
    const padded = [...arr];
    while (padded.length < count) padded.push(mockProduct);
    return padded;
  };

  const productosSobreCategoria0 = withFallback(getCategoryProducts(categorias[0].nombre, 2), 2);

  // Pool de productos "genéricos" para las ProductCard que no pertenecen
  // a ninguna categoría específica del grid. Excluye los productos ya
  // reservados para evitar que aparezcan dos veces en esta misma sección.
  const reservedProductIds = new Set(productosSobreCategoria0.map((product) => product.id));
  const genericProductPool = products.length > 0
    ? products.filter((product) => !reservedProductIds.has(product.id))
    : fallbackFeaturedProducts;

  const getGenericProduct = (index: number) => {
    if (genericProductPool.length === 0) return mockProduct;
    return genericProductPool[index % genericProductPool.length];
  };

  const getCamodProduct = (index: number) => {
    if (camodProducts.length === 0) return null;
    return camodProducts[index % camodProducts.length];
  };

  return (
    <div className="min-h-screen bg-white">
      {/* HERO BANNER */}
      <HeroSlider />

      {/* SECCIÓN SOBRE NOSOTROS */}
      <section className="mx-auto max-w-[1440px] px-6 py-20 sm:px-10 lg:px-16">
        {/* Fila superior: Texto con menos ancho a la izquierda y Botón a la derecha */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
          {/* Descripción de la empresa (Ocupa 7 columnas para mejor balance) */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <p className="text-base sm:text-lg font-normal leading-relaxed text-gray-800 font-serif">
              En Sisteoffic JL llevamos más de 16 años desarrollando proyectos corporativos que integran
              diseño, fabricación de mobiliario y ejecución de espacios. Acompañamos a nuestros clientes desde
              la planificación hasta la instalación final, creando ambientes funcionales, duraderos y alineados
              con la identidad de cada empresa.<br /><br />
              Hoy fortalecemos esta visión con CAMÖD Studio, nuestro estudio creativo especializado en
              arquitectura y diseño interior, ofreciendo una solución integral desde la conceptualización hasta la
              entrega del proyecto.
            </p>
          </div>

          {/* Contenedor de botones (Ocupa las 5 columnas restantes) */}
          <div className="lg:col-span-5 flex flex-col sm:flex-row lg:justify-start gap-4">
            <Link
              href="/sobre-nosotros"
              className="inline-flex items-center justify-center gap-2 rounded-md bg-gray-900 px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-gray-800"
            >
              <span>Conoce Sisteoffic JL</span>
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>

            <Link
              href="/camodstudio"
              className="inline-flex items-center justify-center gap-2 rounded-md bg-gray-100 px-5 py-3 text-sm font-medium text-gray-900 transition-colors hover:bg-gray-200"
            >
              <span>Descubre CAMÖD Studio</span>
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
        </div>

        {/* SECCIÓN DE PROCESO */}
        <div className="mt-20">
          <ProcesoSection />
        </div>

      </section>

      {/* SECCIÓN DE FRASE DE MARCA */}
      <FraseSection />

      {/* SECCIÓN DE COLECCIONES DE MOBILIARIO */}
      <ColeccionesSection />

      {/* PRODUCTS AND CATEGORIES GRID LAYOUT — full width */}
      <section className="w-full bg-white px-6 pb-16 pt-20 lg:px-12">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
           Explora Nuestro Mobiliario
          </h2>
          <Link
            href="/buscar"
            className="text-sm font-semibold text-[#7A1E2B] transition hover:underline"
          >
            Ver todos →
          </Link>
        </div>

        {/* Grid Layout: Products + Category Cards */}
        <div className="grid grid-cols-2 gap-5 md:grid-cols-4">
          <ProductCard product={getGenericProduct(0)} />
          <ProductCard product={getGenericProduct(1)} />
          {/* Estas 2 caen justo encima de CategoryCard[0] */}
          <ProductCard product={productosSobreCategoria0[0]} />
          <ProductCard product={productosSobreCategoria0[1]} />

          <ProductCard product={getGenericProduct(2)} />
          <ProductCard product={getGenericProduct(3)} />
          <CategoryCard category={categorias[0]} imagenOverride="/entrefoto-inicio.png" />

          {/* Estas 2 caen justo encima de CategoryCard[1] */}
          <ProductCard product={getGenericProduct(12)} />
          <ProductCard product={getGenericProduct(13)} />
          <ProductCard product={getGenericProduct(4)} />
          <ProductCard product={getGenericProduct(5)} />
        </div>
      </section>

      {/* CAMÖD STUDIO */}
      <section className="w-full border-t border-[#D8D4CC] bg-[#F2F1EF] px-6 py-12 lg:px-12">
        <div className="grid grid-cols-2 gap-5 md:grid-cols-4">
          <CategoryCard
            category={categorias[1]}
            imagenOverride="/camodCategoria.png"
            hrefOverride="/camodstudio"
            hideContent
            imagePosition="top"
          />
          {/* A partir de aquí, todas las ProductCard son productos de CAMÖD Studio */}
          {[0, 1, 2, 3, 4, 5].map((index) => {
            const camodProduct = getCamodProduct(index);
            if (!camodProduct) return null;
            return <CamodProductCard key={`camod-${index}-${camodProduct.id}`} product={camodProduct} />;
          })}
        </div>
      </section>
    </div>
  );
}
