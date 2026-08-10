"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

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

// Mock product data (all same product as requested)
const mockProduct = {
  id: 1,
  nombre: "Silla Ergonómica Premium",
  imagen_url: "https://images.unsplash.com/photo-1588854337236-6889d631f379?w=800&auto=format&fit=crop",
  precio: 1250000,
  precioOriginal: 1590000,
  especificaciones: "Soporte lumbar ajustable, brazo 4D, base de aluminio, cuero sintético premium",
};

const FEATURED_PRODUCT_IDS = [1, 3, 8, 10];

const fallbackFeaturedProducts = [
  {
    id: 1,
    nombre: "Silla Ergonómica Premium",
    imagen_url: "https://images.unsplash.com/photo-1588854337236-6889d631f379?w=800&auto=format&fit=crop",
    precio: 1250000,
    precioOriginal: 1590000,
  },
  {
    id: 3,
    nombre: "Silla Ejecutiva Comfort",
    imagen_url: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800&auto=format&fit=crop",
    precio: 1390000,
    precioOriginal: 1650000,
  },
  {
    id: 8,
    nombre: "Silla Operativa Plus",
    imagen_url: "https://images.unsplash.com/photo-1519947486511-46149fa0a254?w=800&auto=format&fit=crop",
    precio: 980000,
    precioOriginal: 1190000,
  },
  {
    id: 10,
    nombre: "Silla Directiva Elite",
    imagen_url: "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800&auto=format&fit=crop",
    precio: 1590000,
    precioOriginal: 1890000,
  },
];

// Hero slider slides (4 slides, 8s each) — usa imágenes locales desde public/slideshero
const heroSlides = [
  {
    imagen: "/slideshero/slide1.png",
    badge: "Arquitectura interior",
    titulo: "Espacios abiertos, reinventados",
    subtitulo: "Ajuste inteligente con control sin esfuerzo.",
  },
  {
    imagen: "/slideshero/slide2.png",
    badge: "Diseño",
    titulo: "Comodidad que trabaja para ti",
    subtitulo: "Diseño ergonómico para tu jornada completa.",
  },
  {
    imagen: "/slideshero/slide3.png",
    badge: "Mobiliario",
    titulo: "Transforma tu espacio de trabajo",
    subtitulo: "Funcionalidad y estilo para cada proyecto.",
  },
  {
    imagen: "/slideshero/slide4.png",
    badge: "Calidad profesional",
    titulo: "Tu oficina, a tu medida",
    subtitulo: "Mobiliario moderno para equipos que crecen.",
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
    nombre: "Puestos y estaciones de trabajo",
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
    nombre: "Educación",
    imagen: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=400&fit=crop&crop=center",
  },
  {
    nombre: "Almacenamiento",
    imagen: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=400&h=400&fit=crop&crop=center",
  },
  {
    nombre: "Mobiliario complementario",
    imagen: "https://images.unsplash.com/photo-1484101403633-562f891dc89a?w=400&h=400&fit=crop&crop=center",
  },
  {
    nombre: "Divisiones modulares",
    imagen: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=400&h=400&fit=crop&crop=center",
  },
  {
    nombre: "Muebles especiales",
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

// Sectores a los que atiende la marca — usado en la nueva sección estilo referencia
const SECTOR_DATA = [
  {
    nombre: "Oficina",
    imagen: "https://images.unsplash.com/photo-1705909773284-bcbbad9a4023?q=80&w=900&auto=format&fit=crop",
  },
  {
    nombre: "Educación",
    imagen: "https://images.unsplash.com/photo-1561089489-f13d5e730d72?q=80&w=900&auto=format&fit=crop",
  },
  {
    nombre: "Hospitality",
    imagen: "https://images.unsplash.com/photo-1646991761123-d83ce47c30c9?q=80&w=900&auto=format&fit=crop",
  },
  {
    nombre: "Sanidad",
    imagen: "https://images.unsplash.com/photo-1776883700432-1df0abe9fc18?q=80&w=900&auto=format&fit=crop",
  },
];

const sectores = SECTOR_DATA.map((sector) => ({
  ...sector,
  href: categoriaHref(sector.nombre),
}));

// Colecciones de mobiliario — cada botón enlaza a la búsqueda filtrada por la
// categoría equivalente ya existente en CATEGORIA_DATA (cuando aplica); las que
// no tienen categoría propia buscan directamente por su propio nombre.
const COLECCIONES_DATA = [
  { nombre: "Recepciones", categoria: "Recepciones" },
  { nombre: "Estaciones de trabajo", categoria: "Puestos y estaciones de trabajo" },
  { nombre: "Sala de juntas", categoria: "Mesas de juntas" },
  { nombre: "Oficinas ejecutivas", categoria: "Oficinas ejecutivas" },
  { nombre: "Espacios colaborativos", categoria: "Espacios colaborativos" },
  { nombre: "Archivo y almacenamiento", categoria: "Almacenamiento" },
  { nombre: "Divisiones y cabinas", categoria: "Divisiones modulares" },
  { nombre: "Mobiliario especial", categoria: "Muebles especiales" },
];

const colecciones = COLECCIONES_DATA.map((col) => ({
  nombre: col.nombre,
  href: categoriaHref(col.categoria),
}));

// Format price helper
function formatPrice(price: number | string | null): string {
  const numeric = typeof price === "number" ? price : Number.parseFloat(String(price ?? "0"));
  if (!Number.isFinite(numeric)) return "Precio no disponible";
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  }).format(numeric);
}

function ProductCard({ product }: { product: any }) {
  const tieneDescuento =
    product.precioOriginal && Number(product.precioOriginal) > Number(product.precio);

  return (
    <Link href={`/productos/${product.id}`} className="group flex flex-col bg-white">
      {/* Imagen — ocupa todo el bloque superior, sin relleno ni esquinas redondeadas */}
      <div className="relative aspect-square w-full overflow-hidden bg-[#ece9e4]">
        {tieneDescuento && (
          <span className="absolute left-0 top-0 z-10 bg-[#7A1E2B] px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.18em] text-white">
            Oferta
          </span>
        )}
        {product.imagen_url ? (
          <img
            src={product.imagen_url}
            alt={product.nombre}
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
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

      {/* Info — panel gris cortado en diagonal que cubre poco más de la mitad
          de la tarjeta en reposo, y se expande al hacer hover sobre la card */}
      <div className="relative overflow-hidden bg-white">
        <div
          className="absolute inset-y-0 left-0 w-[58%] bg-[#EAEAE6] transition-[width] duration-500 ease-out group-hover:w-[85%]"
          style={{ clipPath: "polygon(0 0, 100% 0, calc(100% - 22px) 100%, 0 100%)" }}
        />
        <div className="relative z-10 flex flex-col gap-1.5 px-4 py-4">
          {product.categoria_nombre && (
            <span className="text-[10px] font-medium uppercase tracking-[0.15em] text-[#9c9990]">
              {product.categoria_nombre}
            </span>
          )}
          <h3 className="truncate font-serif text-[16px] leading-snug text-[#1a1a1a] transition-colors group-hover:text-[#7A1E2B]">
            {product.nombre}
          </h3>
          <div className="flex items-baseline gap-2.5">
            {tieneDescuento && (
              <span className="text-[13px] text-[#9c9990] line-through">
                {formatPrice(product.precioOriginal)}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}

// Tarjeta de producto CAMÖD — misma línea visual que ProductCard, sin precio
// y con la etiqueta de marca fija; enlaza a la sección de productos de CAMÖD Studio.
function CamodProductCard({ product }: { product: { id: number; nombre: string; imagen_url: string } }) {
  return (
    <Link href="/camodstudio#productos" className="group flex flex-col bg-white">
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

      <div className="relative overflow-hidden bg-white">
        <div
          className="absolute inset-y-0 left-0 w-[58%] bg-[#EAEAE6] transition-[width] duration-500 ease-out group-hover:w-[85%]"
          style={{ clipPath: "polygon(0 0, 100% 0, calc(100% - 22px) 100%, 0 100%)" }}
        />
        <div className="relative z-10 flex flex-col gap-1.5 px-4 py-4">
          <span className="text-[10px] font-medium uppercase tracking-[0.15em] text-[#9c9990]">
            CAMÖD Studio
          </span>
          <h3 className="truncate font-serif text-[16px] leading-snug text-[#1a1a1a] transition-colors group-hover:text-[#7A1E2B]">
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
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}

        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/30" />

        {/* Contenido del hero: texto + CTA. En mobile se apilan (columna),
            desde lg se distribuyen en fila con el/los botón(es) a la derecha. */}
        <div className="absolute inset-x-0 bottom-20 sm:bottom-24 px-6 sm:px-10 lg:px-16 z-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            {/* Bloque de texto */}
            <div
              key={isProjectsSlide ? "proyectos" : "default"}
              className="ml-0 sm:ml-10 md:ml-24 lg:ml-32 xl:ml-48 transition-opacity duration-500 ease-in-out"
            >
              <span className="inline-flex items-center gap-2.5 bg-white/10 backdrop-blur-md border-l-2 border-white px-4 py-2 text-[11px] font-medium uppercase tracking-[0.25em] text-white">
                {isProjectsSlide ? "Proyectos llave en mano" : slide.badge}
              </span>
              <h1 className="mt-4 max-w-[90vw] sm:max-w-xl md:max-w-2xl lg:max-w-3xl font-serif text-[28px] leading-[1.15] text-white xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
                {isProjectsSlide
                  ? "Diseñamos, fabricamos e instalamos"
                  : "Mobiliario de oficina a la medida en Barranquilla"}
              </h1>
              <h2 className="mt-3 max-w-[85vw] sm:max-w-lg md:max-w-xl lg:max-w-2xl font-serif text-base leading-tight text-white/90 sm:text-lg md:text-xl">
                {isProjectsSlide
                  ? "Un solo equipo para desarrollar todo tu espacio de trabajo."
                  : "Diseñamos espacios que potencian el bienestar y la productividad"}
              </h2>
              {!isProjectsSlide && (
                <p className="mt-3 max-w-[80vw] sm:max-w-sm md:max-w-md text-sm font-light text-white/80 sm:text-base">
                  Desde la idea hasta el último detalle.
                </p>
              )}
            </div>

            {/* CTA: Cotizar Proyecto (slides 1-3) / dos botones (slide 4) */}
            <div
              key={isProjectsSlide ? "cta-proyectos" : "cta-default"}
              className="ml-0 sm:ml-10 md:ml-24 lg:ml-0 lg:mr-8 xl:mr-16 flex-shrink-0 flex flex-col sm:flex-row gap-3 transition-opacity duration-500 ease-in-out"
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
                <Link
                  href="/contacto"
                  className="group/cta inline-flex items-center justify-center gap-3 whitespace-nowrap bg-[#7A1E2B] px-8 py-4 text-[13px] font-normal uppercase tracking-[0.2em] text-white transition-colors duration-300 hover:bg-[#5c1620] w-full sm:w-auto text-center"
                >
                  Cotizar Proyecto
                  <svg
                    className="h-3.5 w-3.5 shrink-0 transition-transform duration-300 group-hover/cta:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.25} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
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

// Slider horizontal para explorar el resto de categorías dentro de la sección de sectores


// Sección de sectores — estilo referencia: párrafo introductorio grande
// seguido de una grilla de 4 imágenes con etiqueta simple debajo (sin overlay),
// y un slider para navegar el resto de categorías. Fondo alineado a la paleta
// de marca (tono blush derivado de BRAND_COLORS.primarySubtle).
function SectoresSection() {
  return (
    <section className="w-full bg-gradient-to-b from-[#F5E6E8] via-[#F7E3E8] to-[#FFFFFF] px-6 py-20 sm:px-10 lg:px-16">
      <div className="mx-auto max-w-[1440px]">
        <span className="mb-4 inline-block text-xs font-semibold uppercase tracking-[0.2em] text-[#7A1E2B]">
          Categorías
        </span>
        <p className="max-w-3xl text-3xl font-normal leading-[1.35] text-[#3a1219] sm:text-4xl">
          Explora nuestras categorías de producto para encontrar soluciones pensadas por tipo de espacio y uso.
        </p>

        <div className="mt-14 grid grid-cols-2 gap-6 lg:grid-cols-4">
          {categorias.map((cat, idx) => {
            const isLast = idx === categorias.length - 1;
            return (
              <Link
                key={cat.nombre}
                href={cat.href}
                className={`group flex flex-col ${isLast ? "col-span-2 lg:col-span-4 items-center" : ""}`}
              >
                <div className="w-full h-48 sm:h-56 lg:h-56 overflow-hidden rounded-xl bg-[#e7d5d8]">
                  <img
                    src={cat.imagen}
                    alt={cat.nombre}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <span className={`mt-4 text-base font-medium text-[#3a1219] ${isLast ? 'text-center' : ''}`}>
                  {cat.nombre}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// Sección de colecciones de mobiliario — grilla de botones por categoría,
// cada uno enlaza a la búsqueda con el filtro correspondiente aplicado.
function ColeccionesSection() {
  return (
    <section className="w-full bg-white px-6 py-20 sm:px-10 lg:px-16">
      <div className="mx-auto max-w-[1440px]">
        <span className="mb-4 inline-block text-xs font-semibold uppercase tracking-[0.2em] text-[#7A1E2B]">
          Colecciones de mobiliario
        </span>
        <p className="max-w-3xl text-3xl font-normal leading-[1.35] text-[#3a1219] sm:text-4xl">
          Diseñamos y fabricamos soluciones para cada espacio de trabajo.
        </p>

        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {colecciones.map((coleccion) => (
            <Link
              key={coleccion.nombre}
              href={coleccion.href}
              className="group flex items-center justify-between border border-[#e5dfd8] px-6 py-5 text-left transition-colors duration-300 hover:border-[#7A1E2B] hover:bg-[#F5E6E8]"
            >
              <span className="font-serif text-lg leading-tight text-[#1a1a1a] transition-colors group-hover:text-[#7A1E2B]">
                {coleccion.nombre}
              </span>
              <svg
                className="h-4 w-4 shrink-0 text-[#7A1E2B] transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.25} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          ))}
        </div>
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
    <section className="relative w-full overflow-hidden bg-gradient-to-br from-[#3a1219] via-[#7A1E2B] to-[#5c1620] px-6 py-28 sm:px-10 sm:py-36 lg:px-16">
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
        <p className="mt-10 font-serif text-2xl font-light leading-[1.5] tracking-[0.01em] text-white sm:text-3xl lg:text-[2.5rem]">
          Diseñamos el lugar donde las ideas,<br className="hidden sm:block" /> las personas y las empresas crecen.
        </p>
        <span
          className={`mt-10 h-px bg-white/40 transition-all duration-1000 ease-out ${
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

  const featuredProducts =
    products.length > 0
      ? products.filter((product) => FEATURED_PRODUCT_IDS.includes(Number(product.id)))
      : fallbackFeaturedProducts;

  const getCategoryProducts = (categoryName: string, count: number) => {
    if (products.length === 0) {
      return Array.from({ length: count }, () => mockProduct);
    }

    return products.filter((product) => product.categoria_nombre === categoryName).slice(0, count);
  };

  const withFallback = (arr: any[], count: number) => {
    if (arr.length >= count) return arr.slice(0, count);
    const padded = [...arr];
    while (padded.length < count) padded.push(mockProduct);
    return padded;
  };

  const productosSobreCategoria0 = withFallback(getCategoryProducts(categorias[0].nombre, 2), 2);
  const productosSobreCategoria1 = withFallback(getCategoryProducts(categorias[1].nombre, 2), 2);

  // Pool de productos "genéricos" para las ProductCard que no pertenecen
  // a ninguna categoría específica del grid. Si hay datos reales de la API
  // los usa (evitando repetir siempre el mismo); si no, cicla el fallback.
  const genericProductPool = products.length > 0 ? products : fallbackFeaturedProducts;

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

      {/* SECCIÓN SOBRE NOSOTROS + 4 PRODUCTOS DESTACADOS (Estilo Referencia Imagen) */}
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
              href="/sisteoffic-jl"
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

        {/* Título de la sección de productos */}
        <div className="mt-20 mb-8">
          <h2 className="font-serif text-2xl sm:text-3xl text-gray-900">
            Productos Destacados
          </h2>
        </div>

        {/* 4 Productos Destacados Estilo Referencia */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredProducts.map((product) => (
            <Link
              key={product.id}
              href={`/productos/${product.id}`}
              className="group flex flex-col"
            >
              <div className="aspect-square w-full overflow-hidden">
                <img
                  src={product.imagen_url}
                  alt={product.nombre}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="mt-6 flex items-center justify-between">
                <span className="text-base font-medium text-gray-900">
                  {product.nombre}
                </span>
                <span className="text-base font-normal text-gray-500">
                  {formatPrice(product.precio)}
                </span>
              </div>
            </Link>
          ))}
        </div>

      </section>

      {/* SECCIÓN DE SECTORES (rediseñada según imagen de referencia) */}
      <SectoresSection />

      {/* SECCIÓN DE COLECCIONES DE MOBILIARIO */}
      <ColeccionesSection />

      {/* SECCIÓN DE FRASE DE MARCA */}
      <FraseSection />

      {/* PRODUCTS AND CATEGORIES GRID LAYOUT — full width */}
      <section className="w-full px-6 pb-16 pt-20 lg:px-12">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
           Explora Nuestro Mobiliario
          </h2>
          <Link
            href="/productos"
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
          <CategoryCard category={categorias[0]} />

          {/* Estas 2 caen justo encima de CategoryCard[1] */}
          <ProductCard product={getGenericProduct(12)} />
          <ProductCard product={getGenericProduct(13)} />
          <ProductCard product={getGenericProduct(4)} />
          <ProductCard product={getGenericProduct(5)} />

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
