"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { Search, ShoppingCart, Menu, X, ArrowRight, Package, ChevronDown } from "lucide-react";
import { useCart } from "./CartProvider";
import { MOBILIARIO_CATEGORIAS, mobiliarioHref } from "../data/mobiliarioCategorias";

/* ─── Navegación ─── */
const mobiliarioConSubcategorias = MOBILIARIO_CATEGORIAS.filter(
  (categoria) => categoria.subcategorias,
);
const mobiliarioSinSubcategorias = MOBILIARIO_CATEGORIAS.filter(
  (categoria) => !categoria.subcategorias,
);

/** Servicios desplegados en el dropdown de "Servicios" */
const serviciosItems: { label: string; slug: string }[] = [
  { label: "Arquitectura", slug: "arquitectura" },
  { label: "Diseño Interior", slug: "diseno-interior" },
  { label: "Adecuaciones", slug: "adecuaciones" },
  { label: "Fabricación de mobiliario", slug: "fabricacion-de-mobiliario" },
  { label: "Proyectos llave en mano", slug: "proyectos-llave-en-mano" },
  { label: "CAMÖD Studio", slug: "camod-studio" },
];

/** Secciones principales del navbar (desktop) */
const mainNavLinks: { label: string; href: string }[] = [
  { label: "Galería", href: "/espacios" },
  { label: "CAMÖD Studio", href: "/camodstudio" },
  { label: "Nosotros", href: "/sobre-nosotros" },
  { label: "Contacto", href: "/contacto" },
];

/** Los enlaces del panel del menú (estilo Enwork) */
const menuLinks: { label: string; href: string }[] = [
  { label: "Nuestros productos", href: "/buscar" },
  { label: "Servicios", href: "/servicios" },
  { label: "Galería", href: "/espacios" },
  { label: "CAMÖD Studio", href: "/camodstudio" },
  { label: "Nosotros", href: "/sobre-nosotros" },
  { label: "Contáctanos", href: "/contacto" },
];

/** Tiles destacados que se muestran en el panel del menú (estilo Enwork) */
const menuFeatureTiles: {
  nombre: string;
  categoria: string;
  href?: string;
  imagen: string;
  grande?: boolean;
}[] = [
  {
    nombre: "Sillas de oficina en Barranquilla",
    categoria: "Sillas",
    href: "/sillas-de-oficina-en-barranquilla",
    imagen:
      "https://images.unsplash.com/photo-1519947486511-46149fa0a254?w=1200&auto=format&fit=crop",
    grande: true,
  },
  {
    nombre: "Puesto de trabajo",
    categoria: "Puesto de trabajo",
    imagen:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800&auto=format&fit=crop",
  },
  {
    nombre: "Mesas de juntas",
    categoria: "Mesas de juntas",
    imagen:
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800&auto=format&fit=crop",
  },
];

/* ─── Tipos ─── */
type ApiProduct = {
  id: number;
  nombre: string;
  imagen_url: string | null;
  precio: number | string | null;
  especificaciones: string | null;
};

/* ─── Helpers ─── */
function formatPrice(price: number | string | null): string {
  const numeric =
    typeof price === "number" ? price : Number.parseFloat(String(price ?? ""));
  if (!Number.isFinite(numeric) || numeric <= 0) return "Precio a cotizar";
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  }).format(numeric);
}

const SEARCH_SUGGESTIONS = [
  "Silla ergonómica ejecutiva",
  "Escritorio elevable",
  "Silla gerencial en malla",
  "Mesa de juntas moderna",
  "Silla operativa secretarial",
  "Archivador metálico rodante",
  "Sillas para sala de espera",
];

/* ─── Componente ─── */
export function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const isHome = pathname === "/";

  const { itemCount } = useCart();

  const [query, setQuery] = useState("");
  const [products, setProducts] = useState<ApiProduct[]>([]);
  const [searchOpen, setSearchOpen] = useState(false);

  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  /* Dropdown de "Mobiliario" / "Servicios" al hacer hover */
  const [hoveredMenu, setHoveredMenu] = useState<"mobiliario" | "servicios" | null>(null);

  const searchInputRef = useRef<HTMLInputElement>(null);

  /* Estados para el control del scroll y la animación de ocultado (Solo Home) */
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    if (!isHome) return; // Si no es el home, no ejecutamos la lógica de scroll hide/show

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      if (!menuOpen) {
        if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
          setIsVisible(false);
        } else {
          setIsVisible(true);
        }
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHome, menuOpen]);

  // Estados para el efecto de escritura automática en el placeholder
  const [placeholderText, setPlaceholderText] = useState("");
  const [suggestionIndex, setSuggestionIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  /* Efecto máquina de escribir para el placeholder */
  useEffect(() => {
    if (query || searchOpen === false) return;
    const currentString = SEARCH_SUGGESTIONS[suggestionIndex];
    let timeout: NodeJS.Timeout;

    if (!isDeleting) {
      if (charIndex < currentString.length) {
        timeout = setTimeout(() => {
          setPlaceholderText((prev) => prev + currentString[charIndex]);
          setCharIndex((prev) => prev + 1);
        }, 80);
      } else {
        timeout = setTimeout(() => setIsDeleting(true), 2000);
      }
    } else {
      if (charIndex > 0) {
        timeout = setTimeout(() => {
          setPlaceholderText((prev) => prev.slice(0, -1));
          setCharIndex((prev) => prev - 1);
        }, 40);
      } else {
        setIsDeleting(false);
        setSuggestionIndex((prev) => (prev + 1) % SEARCH_SUGGESTIONS.length);
      }
    }
    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, suggestionIndex, query, searchOpen]);

  /* Cargar productos para sugerencias */
  useEffect(() => {
    let cancelled = false;
    async function loadProducts() {
      try {
        const response = await fetch("/api/productos", {
          method: "GET",
          cache: "no-store",
        });
        if (!response.ok) return;
        const data: ApiProduct[] = await response.json();
        if (!cancelled) setProducts(data);
      } catch (error) {
        console.error("Error cargando productos del navbar:", error);
      }
    }
    loadProducts();
    return () => { cancelled = true; };
  }, []);

  /* Sugerencias de búsqueda */
  const suggestions = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    if (!normalizedQuery) return [];
    return products
      .filter((product) => product.nombre.toLowerCase().includes(normalizedQuery))
      .slice(0, 5);
  }, [products, query]);

  const showSuggestions = searchOpen && suggestions.length > 0;

  function submitSearch() {
    const trimmedQuery = query.trim();
    const destination = trimmedQuery
      ? `/buscar?q=${encodeURIComponent(trimmedQuery)}`
      : "/buscar";
    setSearchOpen(false);
    router.push(destination);
  }

  async function scrollToFooter(e: any) {
    try {
      e?.preventDefault?.();
    } catch {}
    setMenuOpen(false);
    if (typeof window === "undefined") return;
    if (pathname === "/") {
      const el = document.getElementById("site-footer");
      if (el) el.scrollIntoView({ behavior: "smooth" });
      return;
    }
    try {
      await router.push("/");
      setTimeout(() => {
        const el = document.getElementById("site-footer");
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 300);
    } catch (err) {
      console.error("Error navegando a home para scroll al footer:", err);
    }
  }

  /* Cerrar menú al hacer click fuera */
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    }
    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuOpen]);

  /* Cerrar overlays al cambiar de ruta */
  useEffect(() => {
    setMenuOpen(false);
    setSearchOpen(false);
    setHoveredMenu(null);
  }, [router]);

  /* Bloquear scroll cuando algún overlay está abierto */
  useEffect(() => {
    document.body.style.overflow = menuOpen || searchOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen, searchOpen]);

  /* Autofocus al abrir la búsqueda */
  useEffect(() => {
    if (searchOpen) {
      const t = setTimeout(() => searchInputRef.current?.focus(), 50);
      return () => clearTimeout(t);
    }
  }, [searchOpen]);

  // Clases condicionales de color de texto e iconos basados en si es el Home scrolleado/menú abierto o páginas internas
  const dropdownOpen = hoveredMenu !== null && !menuOpen;
  const activeDark = !isHome || isScrolled || menuOpen || dropdownOpen;
  const textColorClass = activeDark ? "text-gray-900 hover:text-black" : "text-white/80 hover:text-white";
  const iconColorClass = activeDark ? "text-gray-700 hover:bg-gray-100 hover:text-black" : "text-white/70 hover:bg-white/5 hover:text-white";

  return (
    <>
      {/* ═══ Header principal ═══ */}
      <header
        className={
          isHome
            ? `fixed left-0 right-0 top-0 z-40 transition-all duration-300 ${
                isVisible ? "translate-y-0" : "-translate-y-full"
              } ${
                dropdownOpen
                  ? "border-b border-[#DDD7CF] bg-[#F3F1EC]/95 shadow-lg backdrop-blur-xl"
                  : isScrolled && !menuOpen
                    ? "border-b border-gray-100 bg-white/90 shadow-sm backdrop-blur-md"
                    : "bg-transparent"
              }`
            : `relative left-0 right-0 top-0 z-40 bg-white shadow-sm border-b border-gray-100`
        }
      >
        <div
          className="mx-auto w-full max-w-[92rem]"
          ref={menuRef}
          onMouseLeave={() => setHoveredMenu(null)}
        >
          <div
            className={`mx-4 lg:mx-8 transition-all duration-300 ease-out ${
              menuOpen
                ? "bg-white/30 backdrop-blur-md border border-white/20 shadow-2xl shadow-black/10 rounded-2xl overflow-hidden"
                : "bg-transparent"
            }`}
          >
            <div className="relative flex h-20 w-full items-center justify-between px-4 lg:px-8">
              {/* Logo */}
              <Link href="/" className="flex shrink-0 items-center transition-opacity hover:opacity-90">
                <Image
                  src="/sisteoffic-logo.webp"
                  alt="SisteOffic"
                  width={160}
                  height={40}
                  className="h-8 w-auto object-contain sm:h-9 lg:h-10"
                  priority
                />
              </Link>

              {/* Secciones (desktop) */}
              <nav className="hidden items-center gap-7 lg:flex">
                <button
                  type="button"
                  onMouseEnter={() => !menuOpen && setHoveredMenu("servicios")}
                  onFocus={() => !menuOpen && setHoveredMenu("servicios")}
                  onClick={() => router.push("/servicios")}
                  className={`group flex cursor-pointer items-center gap-1 text-[15px] font-normal tracking-wide transition ${textColorClass}`}
                >
                  Servicios
                  <ChevronDown
                    className={`h-3.5 w-3.5 transition-transform duration-300 ease-out ${
                      hoveredMenu === "servicios" ? "rotate-180" : "group-hover:translate-y-0.5"
                    }`}
                  />
                </button>

                <Link
                  href="/buscar"
                  onMouseEnter={() => !menuOpen && setHoveredMenu("mobiliario")}
                  onFocus={() => !menuOpen && setHoveredMenu("mobiliario")}
                  className={`group flex cursor-pointer items-center gap-1 text-[15px] font-normal tracking-wide transition ${textColorClass}`}
                >
                  Mobiliario
                  <ChevronDown
                    className={`h-3.5 w-3.5 transition-transform duration-300 ease-out ${
                      hoveredMenu === "mobiliario" ? "rotate-180" : "group-hover:translate-y-0.5"
                    }`}
                  />
                </Link>

                {mainNavLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    onMouseEnter={() => setHoveredMenu(null)}
                    className={`text-[15px] font-normal tracking-wide transition ${textColorClass}`}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>

              {/* Acciones a la derecha */}
              <div className="flex items-center gap-1 sm:gap-2">
                <button
                  onClick={() => setSearchOpen(true)}
                  className={`rounded-lg p-2 transition ${iconColorClass}`}
                  aria-label="Buscar"
                >
                  <Search className="h-5 w-5" />
                </button>

                <Link
                  href="/carrito"
                  className={`group relative flex items-center gap-2 rounded-lg px-2 py-2 transition ${iconColorClass}`}
                  aria-label="Carrito"
                >
                  <div className="relative">
                    <ShoppingCart className="h-5 w-5 transition-transform group-hover:scale-105" />
                    {itemCount > 0 && (
                      <span className={`absolute -right-2 -top-2 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-[#C0392B] px-1 text-[9px] font-bold text-white ring-2 ${activeDark ? "ring-white" : "ring-[#0a0a0a]"}`}>
                        {itemCount}
                      </span>
                    )}
                  </div>
                </Link>

                <button
                  onClick={() => {
                    setHoveredMenu(null);
                    setMenuOpen(!menuOpen);
                  }}
                  className={`rounded-lg p-2 transition lg:hidden ${iconColorClass}`}
                  aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
                >
                  {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </button>
              </div>

              {/* ═══ Dropdown de "Mobiliario" / "Servicios" ═══ */}
              {/* Posicionado relativo a la fila del navbar (h-20), no al header
                  completo, para que no se descuadre cuando el menú hamburguesa
                  está abierto y expande la altura del header. El fondo del
                  despliegue sigue el mismo estado del navbar: transparente
                  cuando el navbar es transparente, blanco cuando el navbar es
                  blanco. Se oculta si el menú hamburguesa está abierto para
                  evitar que ambos paneles se superpongan. */}
              <div
                onMouseEnter={() => !menuOpen && hoveredMenu && setHoveredMenu(hoveredMenu)}
                className={`absolute inset-x-0 top-full z-40 grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  hoveredMenu && !menuOpen ? "grid-rows-[1fr]" : "pointer-events-none grid-rows-[0fr]"
                }`}
              >
                <div
                  className={`overflow-hidden transition-colors duration-300 ${
                    dropdownOpen
                      ? "border-b border-[#DDD7CF] bg-[#F3F1EC]/95 shadow-lg backdrop-blur-xl"
                      : activeDark
                        ? "border-b border-gray-100 bg-white shadow-lg"
                      : "bg-transparent"
                  }`}
                >
                  <div className="mx-auto max-w-[92rem] px-4 py-6 lg:px-8">
                    {hoveredMenu === "mobiliario" && (
                      <div className="grid grid-cols-2 gap-x-10 gap-y-10 md:grid-cols-3 lg:grid-cols-5">
                        {mobiliarioConSubcategorias.map((categoria, index) => (
                          <div
                            key={categoria.slug}
                            style={{ transitionDelay: hoveredMenu ? `${index * 30}ms` : "0ms" }}
                            className={`border-l pl-5 transition-all duration-300 ease-out ${
                              hoveredMenu ? "translate-y-0 opacity-100" : "-translate-y-1 opacity-0"
                            } ${activeDark ? "border-[#7A1E2B]/20" : "border-white/25"}`}
                          >
                            <Link
                              href={mobiliarioHref(categoria.slug)}
                              onClick={() => setHoveredMenu(null)}
                              className={`font-serif text-lg leading-tight transition-colors ${
                                activeDark
                                  ? "text-[#241C18] hover:text-[#7A1E2B]"
                                  : "text-white hover:text-white/75"
                              }`}
                            >
                              {categoria.nombre}
                            </Link>

                            <div className="mt-4 flex flex-col gap-2.5">
                              {categoria.subcategorias?.map((subcategoria) => (
                                <Link
                                  key={subcategoria.slug}
                                  href={mobiliarioHref(subcategoria.slug)}
                                  onClick={() => setHoveredMenu(null)}
                                  className={`text-[13px] leading-snug transition-colors ${
                                    activeDark
                                      ? "text-gray-500 hover:text-[#7A1E2B]"
                                      : "text-white/65 hover:text-white"
                                  }`}
                                >
                                  {subcategoria.nombre}
                                </Link>
                              ))}
                            </div>
                          </div>
                        ))}

                        <div
                          style={{ transitionDelay: hoveredMenu ? "120ms" : "0ms" }}
                          className={`flex flex-col gap-3 border-l pl-5 transition-all duration-300 ease-out ${
                            hoveredMenu ? "translate-y-0 opacity-100" : "-translate-y-1 opacity-0"
                          } ${activeDark ? "border-[#7A1E2B]/20" : "border-white/25"}`}
                        >
                          {mobiliarioSinSubcategorias.map((categoria) => (
                            <Link
                              key={categoria.slug}
                              href={mobiliarioHref(categoria.slug)}
                              onClick={() => setHoveredMenu(null)}
                              className={`font-serif text-[15px] leading-tight transition-colors ${
                                activeDark
                                  ? "text-[#241C18] hover:text-[#7A1E2B]"
                                  : "text-white hover:text-white/75"
                              }`}
                            >
                              {categoria.nombre}
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}

                    {hoveredMenu === "servicios" && (
                      <div className="flex flex-wrap justify-center gap-x-10 gap-y-4">
                        {serviciosItems.map((item, index) => (
                          <Link
                            key={item.slug}
                            href={`/servicios#${item.slug}`}
                            onClick={() => setHoveredMenu(null)}
                            style={{ transitionDelay: hoveredMenu ? `${index * 30}ms` : "0ms" }}
                            className={`text-sm font-medium transition-all duration-300 ease-out ${
                              hoveredMenu ? "translate-y-0 opacity-100" : "-translate-y-1 opacity-0"
                            } ${
                              activeDark
                                ? "text-gray-700 hover:text-[#7A1E2B]"
                                : "text-white/85 hover:text-white"
                            }`}
                          >
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* ═══ MENÚ DROPDOWN ESTILO ENWORK ═══ */}
            <div
              className={`overflow-hidden transition-all duration-300 ease-out ${
                menuOpen
                  ? "max-h-[calc(100vh-5rem)] opacity-100 translate-y-0"
                  : "max-h-0 opacity-0 -translate-y-2 pointer-events-none"
              }`}
            >
              {/* Contenido del panel: links + tiles */}
              <div className="grid grid-cols-1 gap-8 overflow-y-auto px-6 py-8 sm:px-10 lg:grid-cols-[280px_1fr] lg:gap-12 lg:items-start max-h-[calc(100vh-12rem)]">
                
                {/* Columna izquierda: links de navegación */}
                <div className="flex flex-col gap-1">
                  {menuLinks.map((link) => (
                    <Link
                      key={link.label}
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      className="group flex items-center justify-between border-b border-gray-900/10 py-4 text-xl font-medium text-gray-800 transition hover:text-[#7A1E2B] sm:text-2xl"
                    >
                      {link.label}
                      <ArrowRight className="h-5 w-5 text-gray-400 transition group-hover:translate-x-1 group-hover:text-[#7A1E2B]" />
                    </Link>
                  ))}

                  {/* Links secundarios estilo Enwork */}
                  <div className="mt-6 flex flex-col gap-3">
                    <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                      Más
                    </span>
                    <a href="/#site-footer" onClick={scrollToFooter} className="text-sm text-gray-600 hover:text-[#7A1E2B] transition">
                      Ubicación
                    </a>
                    <a href="/#site-footer" onClick={scrollToFooter} className="text-sm text-gray-600 hover:text-[#7A1E2B] transition">
                      Redes Sociales
                    </a>
                    <a href="/#site-footer" onClick={scrollToFooter} className="text-sm text-gray-600 hover:text-[#7A1E2B] transition">
                      Horarios
                    </a>
                  </div>
                </div>

                {/* Columna derecha: tiles destacados con imágenes */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {menuFeatureTiles.map((tile) => (
                    <Link
                      key={tile.nombre}
                      href={tile.href ?? `/buscar?categoria=${encodeURIComponent(tile.categoria)}`}
                      onClick={() => setMenuOpen(false)}
                      className={`group relative flex min-h-[180px] items-end overflow-hidden rounded-lg ${
                        tile.grande ? "sm:col-span-2 sm:min-h-[260px]" : ""
                      }`}
                    >
                      <img
                        src={tile.imagen}
                        alt={tile.nombre}
                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                      <div className="relative z-10 flex w-full items-center justify-between p-5">
                        <span className="text-base font-semibold text-white">{tile.nombre}</span>
                        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-gray-900 transition group-hover:bg-white">
                          <ArrowRight className="h-4 w-4" />
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ═══ Overlay de búsqueda ═══ */}
      {searchOpen && (
        <div className="fixed inset-0 z-50">
          <div
            className="absolute inset-0 bg-black/30 backdrop-blur-sm"
            onClick={() => setSearchOpen(false)}
          />
          <div className="absolute inset-x-0 top-0 border-b border-gray-100 bg-white/95 backdrop-blur-md px-4 pb-6 pt-6 shadow-lg lg:px-8">
            <div className="mx-auto max-w-3xl">
              <div className="flex items-center gap-3">
                <div className="group relative flex-1">
                  <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 transition-colors group-focus-within:text-[#7A1E2B]" />
                  <input
                    ref={searchInputRef}
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        submitSearch();
                      }
                    }}
                    placeholder={placeholderText ? `Buscar "${placeholderText}"...` : "Buscar..."}
                    className="w-full rounded-xl border border-gray-200 bg-gray-50/80 py-3 pl-11 pr-4 text-sm text-gray-900 placeholder-gray-400 outline-none transition-all duration-300 focus:border-[#7A1E2B]/50 focus:bg-white focus:ring-1 focus:ring-[#7A1E2B]/20"
                  />
                </div>
                <button
                  onClick={() => setSearchOpen(false)}
                  className="rounded-lg p-2.5 text-gray-500 transition hover:bg-gray-100 hover:text-gray-900"
                  aria-label="Cerrar búsqueda"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {showSuggestions && (
                <div className="mt-3 overflow-hidden rounded-2xl border border-gray-100 bg-white text-gray-900 shadow-2xl shadow-black/10">
                  {suggestions.map((product) => (
                    <Link
                      key={product.id}
                      href={`/productos/${product.id}`}
                      onClick={() => setSearchOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 transition hover:bg-gray-50"
                    >
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-gray-50 border border-gray-100">
                        {product.imagen_url ? (
                          <img
                            src={product.imagen_url}
                            alt={product.nombre}
                            className="h-full w-full object-contain p-1.5"
                          />
                        ) : (
                          <Package className="h-5 w-5 text-gray-300" />
                        )}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium text-gray-900">
                          {product.nombre}
                        </p>
                        <p className="mt-0.5 truncate text-xs text-gray-500">
                          {product.especificaciones || "Producto SisteOffic"}
                        </p>
                      </div>
                      <span className="shrink-0 text-sm font-semibold text-[#C0392B]">
                        {formatPrice(product.precio)}
                      </span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
