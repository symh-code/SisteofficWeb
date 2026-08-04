"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

// Brand colors
const BRAND_COLORS = {
  primary: "#7A1E2B",
  primaryLight: "#A02838",
  primarySubtle: "#F5E6E8",
};

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
    badge: "Recepciones Elegantes",
    titulo: "Espacios abiertos, reinventados",
    subtitulo: "Ajuste inteligente con control sin esfuerzo.",
  },
  {
    imagen: "/slideshero/slide2.png",
    badge: "Sillas ejecutivas",
    titulo: "Comodidad que trabaja para ti",
    subtitulo: "Diseño ergonómico para tu jornada completa.",
  },
  {
    imagen: "/slideshero/slide3.png",
    badge: "Diseño minimalista",
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
    imagen: "https://images.unsplash.com/photo-1497366412874-3415097a27e7?q=80&w=900&auto=format&fit=crop",
  },
  {
    nombre: "Educación",
    imagen: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=900&auto=format&fit=crop",
  },
  {
    nombre: "Hospitality",
    imagen: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=900&auto=format&fit=crop",
  },
  {
    nombre: "Sanidad",
    imagen: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=900&auto=format&fit=crop",
  },
];

const sectores = SECTOR_DATA.map((sector) => ({
  ...sector,
  href: categoriaHref(sector.nombre),
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
            <span className="text-[15px] font-medium text-[#1a1a1a]">
              {formatPrice(product.precio)}
            </span>
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

// Hero image slider — altura de pantalla completa (h-screen) y controles estilo referencia.
// El H1 es fijo y localizado (SEO); el titular de cada slide se muestra como
// h2 rotativo debajo, para no perder el efecto dinámico original.
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

        <div className="absolute inset-x-0 bottom-24 px-6 sm:px-10 lg:px-16 z-10">
          <span className="inline-block rounded-full bg-white/90 backdrop-blur px-4 py-1.5 text-xs font-semibold tracking-wide text-gray-900 ml-50">
            {slide.badge}
          </span>
          <h1 className="mt-4 max-w-3xl font-serif text-4xl leading-[1.1] text-white sm:text-5xl md:text-6xl ml-50">
            Mobiliario de oficina a la medida en Barranquilla
          </h1>
          <h2 className="mt-3 max-w-2xl font-serif text-lg leading-tight text-white/90 sm:text-xl ml-50">
            {slide.titulo}
          </h2>
          <p className="mt-3 max-w-md text-sm font-light text-white/80 sm:text-base ml-50">
            {slide.subtitulo}
          </p>
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

function CategoryCard({ category }: { category: any }) {
  return (
    <Link
      href={category.href}
      className="group relative col-span-2 flex min-h-[280px] flex-col justify-end overflow-hidden"
    >
      {category.imagen ? (
        <img
          src={category.imagen}
          alt={category.nombre}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-[#ece9e4] to-[#d9d3c9]" />
      )}

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

export function HomeClient() {
  const [products, setProducts] = useState<any[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [productsError, setProductsError] = useState<string | null>(null);

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

  return (
    <div className="min-h-screen bg-white">
      {/* HERO BANNER */}
      <HeroSlider />

      {/* SECCIÓN SOBRE NOSOTROS + 4 PRODUCTOS DESTACADOS (Estilo Referencia Imagen) */}
      <section className="mx-auto max-w-[1440px] px-6 py-20 sm:px-10 lg:px-16">
        {/* Fila superior: Texto con menos ancho a la izquierda y Botón a la derecha */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
          {/* Descripción de la empresa con menor ancho (Ocupa 5 columnas) */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <p className="text-base sm:text-lg font-normal leading-relaxed text-gray-800 font-serif">
              En SisteOffic fabricamos mobiliario de oficina a la medida en Barranquilla desde hace más de 16 años, diseñando productos que apoyan la forma en que las personas trabajan y colaboran hoy, con la flexibilidad de adaptarse con el tiempo. La visión creativa guía cada decisión, desde la forma hasta la selección de materiales, moldeando productos construidos para perdurar. Atendemos proyectos corporativos en Barranquilla y en toda la Costa Caribe colombiana, con la certeza de que las inversiones que hacen nuestros clientes deben seguir sirviéndoles bien en el futuro.
            </p>
          </div>

          {/* Botón alineado a la derecha abajo (Ocupa las 5 columnas restantes) */}
          <div className="lg:col-span-5 flex lg:justify-start">
            <Link
              href="/sobre-nosotros"
              className="inline-flex items-center gap-2 rounded-md bg-gray-100 px-5 py-3 text-sm font-medium text-gray-900 transition-colors hover:bg-gray-200"
            >
              <span>Mas sobre nosotros</span>
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
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

      {/* PRODUCTS AND CATEGORIES GRID LAYOUT — full width */}
      <section className="w-full px-6 pb-16 lg:px-12">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            Nuestros Mejores Productos
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

          <CategoryCard category={categorias[1]} />
          <ProductCard product={getGenericProduct(6)} />
          <ProductCard product={getGenericProduct(7)} />

          <ProductCard product={getGenericProduct(8)} />
          <ProductCard product={getGenericProduct(9)} />
          <ProductCard product={getGenericProduct(10)} />
          <ProductCard product={getGenericProduct(11)} />
        </div>
      </section>
    </div>
  );
}
