"use client";

import { useEffect, useMemo, useState, useCallback, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  Search,
  X,
  ChevronDown,
  ChevronRight,
  ArrowLeft,
  ArrowRight,
  LayoutGrid,
  List,
  Check,
} from "lucide-react";
import { ProductCard } from "./ProductCard";

/* ─── Tipos ─── */
type ApiProduct = {
  id: number;
  nombre: string;
  imagen_url: string | null;
  precio: number | string | null;
  especificaciones: string | null;
  categoria_id?: number | null;
  categoria_nombre?: string | null;
  categoria_slug?: string | null;
  categoria_parent_id?: number | null;
  categoria_padre_nombre?: string | null;
  categoria_padre_slug?: string | null;
  created_at: string;
  updated_At: string;
};

type CatalogProduct = {
  id: number;
  name: string;
  image: string;
  price: string;
  specifications: string;
  categoria: string;
  categoriaId: number | null;
  categoriaSlug: string | null;
  categoriaPadre: string | null;
  categoriaPadreSlug: string | null;
};

type SortOption = "category-asc" | "relevance" | "price-asc" | "price-desc" | "name-asc";
type ViewMode = "grid" | "list";

/* ─── Categorías ─── */
type CategoryMeta = {
  name: string;
  slug: string;
};

// Categories will be derived from the products returned by the API (categoria_id + categoria_nombre)

/* ─── Sugerencias de búsqueda populares ─── */
const POPULAR_SEARCHES = [
  "Sillas ergonómicas",
  "Mesas ejecutivas",
  "Estaciones de trabajo",
  "Sillas directoriales",
  "Mesas de reuniones",
  "Pizarras",
  "Biombos acústicos",
];

/* ─── Constantes ─── */
const SORT_LABELS: Record<SortOption, string> = {
  "category-asc": "Categoría A-Z",
  relevance: "Relevancia",
  "price-asc": "Menor precio",
  "price-desc": "Mayor precio",
  "name-asc": "Nombre A-Z",
};

const PAGE_SIZE = 12;
const SEARCH_DEBOUNCE_MS = 300;
const AUTOCOMPLETE_MIN_CHARS = 2;

/* ─── Helpers ─── */
function parsePrice(price: string): number {
  const numeric = price.replace(/[^0-9]/g, "");
  return numeric ? Number.parseInt(numeric, 10) : 0;
}

function formatPrice(price: number | string | null): string {
  const numeric = typeof price === "number" ? price : Number.parseFloat(String(price ?? ""));
  if (!Number.isFinite(numeric) || numeric <= 0) return "Precio a cotizar";
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  }).format(numeric);
}

/** Divide el query en palabras individuales para hacer un match más flexible
 *  (permite que "Mesas" encuentre productos cuya categoría es "Mesas de juntas",
 *  aunque el nombre del producto no contenga la palabra). */
function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .trim()
    .split(/\s+/)
    .filter(Boolean);
}

/** Resalta coincidencias del query en el texto */
function HighlightText({ text, query }: { text: string; query: string }) {
  if (!query.trim()) return <>{text}</>;
  const q = query.trim().toLowerCase();
  const idx = text.toLowerCase().indexOf(q);
  if (idx === -1) return <>{text}</>;
  return (
    <>
      {text.slice(0, idx)}
      <mark className="bg-[#7A1E2B]/8 text-[#7A1E2B] px-0.5 rounded-sm">{text.slice(idx, idx + q.length)}</mark>
      {text.slice(idx + q.length)}
    </>
  );
}

/* ─── Skeleton Product Card ─── */
function SkeletonCard() {
  return (
    <div className="animate-pulse rounded-lg border border-stone-100 overflow-hidden bg-white">
      <div className="aspect-[4/3] bg-stone-100" />
      <div className="p-4 space-y-2.5">
        <div className="h-3.5 w-3/4 rounded bg-stone-100" />
        <div className="h-3 w-1/2 rounded bg-stone-100" />
        <div className="h-3 w-2/3 rounded bg-stone-100" />
      </div>
    </div>
  );
}

/* ─── Subcomponente: Checklist minimalista ─── */
function ChecklistItem({
  label,
  active,
  onToggle,
}: {
  label: string;
  active: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      onClick={onToggle}
      className="flex w-full items-center gap-3 px-0 py-2 text-left transition-colors"
    >
      <span
        className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-sm border transition-colors duration-150 ${
          active
            ? "border-[#7A1E2B] bg-[#7A1E2B]"
            : "border-stone-300 bg-white"
        }`}
      >
        {active && <Check className="h-3 w-3 text-white" strokeWidth={3} />}
      </span>
      <span
        className={`text-[13px] truncate transition-colors ${
          active
            ? "font-medium text-[#7A1E2B]"
            : "text-stone-600"
        }`}
      >
        {label}
      </span>
    </button>
  );
}

/* ─── Subcomponente: Filtros de categoría como checklist ─── */
function CategoryFilterGroup({
  categories,
  selectedCategories,
  toggleCategory,
}: {
  categories: CategoryMeta[];
  selectedCategories: number[];
  toggleCategory: (catId: number) => void;
}) {
  return (
    <div className="space-y-0.5">
      {categories.map((cat) => (
        <ChecklistItem
          key={cat.name + String(cat.slug)}
          label={cat.name}
          active={selectedCategories.includes(Number(cat.slug))}
          onToggle={() => toggleCategory(Number(cat.slug))}
        />
      ))}
    </div>
  );
}

/* ─── Subcomponente: Slider de precio con doble thumb funcional ─── */
function PriceFilter({
  priceFloor,
  priceCeiling,
  maxPrice,
  setPriceFloor,
  setPriceCeiling,
  setPage,
}: {
  priceFloor: number;
  priceCeiling: number;
  maxPrice: number;
  setPriceFloor: (v: number) => void;
  setPriceCeiling: (v: number) => void;
  setPage: (v: number) => void;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [draggingFloor, setDraggingFloor] = useState(false);
  const [draggingCeiling, setDraggingCeiling] = useState(false);

  const floorPercentage = maxPrice > 0 ? (priceFloor / maxPrice) * 100 : 0;
  const ceilingPercentage = maxPrice > 0 ? (priceCeiling / maxPrice) * 100 : 100;

  const getValueFromPosition = useCallback(
    (clientX: number) => {
      if (!trackRef.current) return 0;
      const rect = trackRef.current.getBoundingClientRect();
      const x = clientX - rect.left;
      const percentage = Math.max(0, Math.min(1, x / rect.width));
      return Math.round(percentage * maxPrice);
    },
    [maxPrice],
  );

  const handleMouseDown = useCallback(
    (thumb: "floor" | "ceiling") => (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      if (thumb === "floor") setDraggingFloor(true);
      else setDraggingCeiling(true);

      const onMove = (ev: MouseEvent) => {
        const val = getValueFromPosition(ev.clientX);
        if (thumb === "floor") {
          setPriceFloor(Math.min(val, priceCeiling - 1));
        } else {
          setPriceCeiling(Math.max(val, priceFloor + 1));
        }
      };

      const onUp = () => {
        setDraggingFloor(false);
        setDraggingCeiling(false);
        setPage(1);
        window.removeEventListener("mousemove", onMove);
        window.removeEventListener("mouseup", onUp);
      };

      window.addEventListener("mousemove", onMove);
      window.addEventListener("mouseup", onUp);
    },
    [priceCeiling, priceFloor, setPriceFloor, setPriceCeiling, setPage, getValueFromPosition],
  );

  const handleTrackClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const val = getValueFromPosition(e.clientX);
      const distanceToFloor = Math.abs(val - priceFloor);
      const distanceToCeiling = Math.abs(val - priceCeiling);

      if (distanceToFloor <= distanceToCeiling) {
        setPriceFloor(Math.min(val, priceCeiling - 1));
      } else {
        setPriceCeiling(Math.max(val, priceFloor + 1));
      }
      setPage(1);
    },
    [maxPrice, priceFloor, priceCeiling, setPriceFloor, setPriceCeiling, setPage, getValueFromPosition],
  );

  return (
    <div className="space-y-4">
      {/* Precios actuales */}
      <div className="flex items-center justify-between">
        <span className="text-[13px] font-medium text-stone-900">
          {formatPrice(priceFloor)}
        </span>
        <span className="text-[13px] font-medium text-stone-900">
          {formatPrice(priceCeiling)}
        </span>
      </div>

      {/* Slider con thumbs */}
      <div className="relative py-3">
        {/* Track de fondo */}
        <div
          ref={trackRef}
          onClick={handleTrackClick}
          className="relative h-1.5 w-full rounded-full bg-stone-200 cursor-pointer"
        >
          {/* Barra de rango seleccionada */}
          <div
            className="absolute h-1.5 rounded-full bg-[#7A1E2B]"
            style={{
              left: `${floorPercentage}%`,
              width: `${ceilingPercentage - floorPercentage}%`,
            }}
          />
        </div>

        {/* Thumb izquierdo */}
        <div
          className={`absolute top-1/2 -translate-y-1/2 h-4 w-4 rounded-full border-2 border-[#7A1E2B] bg-white cursor-grab transition-shadow ${
            draggingFloor ? "shadow-md scale-110" : "shadow-sm hover:shadow-md hover:scale-110"
          }`}
          style={{ left: `calc(${floorPercentage}% - 8px)` }}
          onMouseDown={handleMouseDown("floor")}
        />

        {/* Thumb derecho */}
        <div
          className={`absolute top-1/2 -translate-y-1/2 h-4 w-4 rounded-full border-2 border-[#7A1E2B] bg-[#7A1E2B] cursor-grab transition-shadow ${
            draggingCeiling ? "shadow-md scale-110" : "shadow-sm hover:shadow-md hover:scale-110"
          }`}
          style={{ left: `calc(${ceilingPercentage}% - 8px)` }}
          onMouseDown={handleMouseDown("ceiling")}
        />
      </div>

      {/* Labels de rango mínimo/máximo */}
      <div className="flex justify-between text-[11px] text-stone-400">
        <span>{formatPrice(0)}</span>
        <span>{formatPrice(maxPrice)}</span>
      </div>
    </div>
  );
}

/* ─── Subcomponente: Lista de filtros completa con accordion ─── */

function FilterList({
  categories,
  selectedCategories,
  toggleCategory,
  priceFloor,
  priceCeiling,
  maxPrice,
  setPriceFloor,
  setPriceCeiling,
  setPage,
}: {
  categories: CategoryMeta[];
  selectedCategories: number[];
  toggleCategory: (catId: number) => void;
  priceFloor: number;
  priceCeiling: number;
  maxPrice: number;
  setPriceFloor: (v: number) => void;
  setPriceCeiling: (v: number) => void;
  setPage: (v: number) => void;
}) {
  const [categoryOpen, setCategoryOpen] = useState(true);
  const [priceOpen, setPriceOpen] = useState(true);

  return (
    <>
      {/* Accordion: Categorías */}
      <div className="border-b border-stone-100">
        <button
          onClick={() => setCategoryOpen(!categoryOpen)}
          className="flex w-full items-center justify-between py-4 text-[11px] font-medium uppercase tracking-widest text-[#7A1E2B]"
        >
          <span>Categorías</span>
          <ChevronDown
            className={`h-4 w-4 text-[#7A1E2B]/50 transition-transform duration-200 ${
              categoryOpen ? "rotate-180" : ""
            }`}
          />
        </button>
        {categoryOpen && (
            <div className="pb-5">
            <CategoryFilterGroup
              categories={categories}
              selectedCategories={selectedCategories}
              toggleCategory={toggleCategory}
            />
            </div>
          )}
      </div>

      {/* Accordion: Precio */}
      <div className="pt-4">
        <button
          onClick={() => setPriceOpen(!priceOpen)}
          className="flex w-full items-center justify-between py-4 text-[11px] font-medium uppercase tracking-widest text-[#7A1E2B]"
        >
          <span>Precio</span>
          <ChevronDown
            className={`h-4 w-4 text-[#7A1E2B]/50 transition-transform duration-200 ${
              priceOpen ? "rotate-180" : ""
            }`}
          />
        </button>
        {priceOpen && (
          <div className="pb-5">
            <PriceFilter
              priceFloor={priceFloor}
              priceCeiling={priceCeiling}
              maxPrice={maxPrice}
              setPriceFloor={setPriceFloor}
              setPriceCeiling={setPriceCeiling}
              setPage={setPage}
            />
          </div>
        )}
      </div>
    </>
  );
}

/* ─── Subcomponente: Autocomplete Dropdown ─── */
function SearchAutocomplete({
  query,
  products,
  onSelect,
  onClose,
}: {
  query: string;
  products: CatalogProduct[];
  onSelect: (value: string) => void;
  onClose: () => void;
}) {
  const q = query.trim().toLowerCase();
  if (q.length < AUTOCOMPLETE_MIN_CHARS) return null;

  const matchingProducts = products
    .filter((p) => p.name.toLowerCase().includes(q))
    .slice(0, 4);

  const matchingCategories = Array.from(
    new Set(products.map((p) => p.categoria)),
  )
    .filter((name) => name.toLowerCase().includes(q))
    .slice(0, 4);

  if (matchingProducts.length === 0 && matchingCategories.length === 0) return null;

  return (
    <div className="absolute top-full left-0 right-0 z-50 mt-2 overflow-hidden rounded border border-stone-200 bg-white shadow-lg shadow-stone-900/5">
      {matchingProducts.length > 0 && (
        <div className="p-2">
          {matchingProducts.map((product) => (
            <button
              key={product.id}
              onClick={() => {
                onSelect(product.name);
                onClose();
              }}
              className="flex w-full items-center gap-3 rounded px-3 py-2.5 text-left transition-colors hover:bg-stone-50"
            >
              <img
                src={product.image}
                alt=""
                className="h-10 w-10 shrink-0 rounded object-cover bg-stone-100"
              />
              <div className="flex-1 min-w-0">
                <p className="text-[13px] font-medium text-stone-900 truncate">
                  <HighlightText text={product.name} query={q} />
                </p>
                <p className="text-[11px] text-stone-400">{product.categoria}</p>
              </div>
              <span className="text-[12px] font-medium text-stone-500">{product.price}</span>
            </button>
          ))}
        </div>
      )}

      {matchingCategories.length > 0 && (
        <div className="border-t border-stone-100 p-2">
          {matchingCategories.map((catName) => (
            <button
              key={catName}
              onClick={() => {
                onSelect(catName);
                onClose();
              }}
              className="flex w-full items-center gap-3 rounded px-3 py-2.5 text-left transition-colors hover:bg-stone-50"
            >
              <div className="flex-1 min-w-0">
                <p className="text-[13px] font-medium text-stone-900">
                  <HighlightText text={catName} query={q} />
                </p>
              </div>
              <ChevronRight className="h-3.5 w-3.5 text-stone-300" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/* ─── Subcomponente: Barra de búsqueda minimalista ─── */
function SearchBar({
  value,
  onChange,
  placeholder,
  onClear,
  products,
  onSelectSuggestion,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  onClear: () => void;
  products: CatalogProduct[];
  onSelectSuggestion: (v: string) => void;
}) {
  const [focused, setFocused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setFocused(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} className="relative max-w-2xl w-full">
      <div
        className={`flex items-center gap-3 rounded border bg-white px-4 py-3 transition-colors duration-150 ${
          focused
            ? "border-[#7A1E2B]/40"
            : "border-stone-200"
        }`}
      >
        <Search className="h-4 w-4 shrink-0 text-stone-400" />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          placeholder={placeholder}
          className="w-full bg-transparent text-[14px] text-stone-900 placeholder-stone-400 outline-none"
        />
        {value && (
          <button
            onClick={() => {
              onClear();
              onChange("");
            }}
            aria-label="Limpiar búsqueda"
            className="rounded p-1 text-stone-300 transition hover:text-stone-500"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {focused && (
        <SearchAutocomplete
          query={value}
          products={products}
          onSelect={onSelectSuggestion}
          onClose={() => setFocused(false)}
        />
      )}
    </div>
  );
}

/* ─── Subcomponente: Navegación de categorías como checklist ─── */
function CategoryChecklist({
  onSelect,
  selectedCategories,
}: {
  onSelect: (catId: number) => void;
  selectedCategories: number[];
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-0.5">
      {/* Placeholder: parent should render categories via CategoryFilterGroup instead */}
    </div>
  );
}

/* ─── Subcomponente: Breadcrumbs ─── */
function Breadcrumbs({ query }: { query: string }) {
  return (
    <nav className="flex items-center gap-1.5 text-[11px] uppercase tracking-widest text-stone-400">
      <Link href="/" className="transition hover:text-stone-600">
        Inicio
      </Link>
      <span className="text-stone-300">/</span>
      <span className="text-stone-500">Catálogo</span>
      {query.trim() && (
        <>
          <span className="text-stone-300">/</span>
          <span className="text-stone-500">{query}</span>
        </>
      )}
    </nav>
  );
}

/* ─── Componente Principal ─── */
export function CatalogView({ query }: { query: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [products, setProducts] = useState<CatalogProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  /* Filtros */
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  const [priceFloor, setPriceFloor] = useState(0);
  const [priceCeiling, setPriceCeiling] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  /* UI */
  const [sort, setSort] = useState<SortOption>("category-asc");
  const [sortOpen, setSortOpen] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [page, setPage] = useState(1);
  const [searchInput, setSearchInput] = useState(query);

  const categories = useMemo(() => {
    const map = new Map<number, string>();
    products.forEach((p) => {
      if (p.categoriaId != null) map.set(p.categoriaId, p.categoria);
    });
    return Array.from(map.entries())
      .map(([id, name]) => ({ name, slug: String(id) }))
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [products]);

  /* Sincronizar query */
  useEffect(() => {
    setSearchInput(query);
  }, [query]);

  /* Debounce a URL */
  useEffect(() => {
    const handler = setTimeout(() => {
      if (searchInput === query) return;
      const params = new URLSearchParams(searchParams?.toString());
      if (searchInput.trim()) {
        params.set("q", searchInput);
      } else {
        params.delete("q");
      }
      router.replace(`${pathname}?${params.toString()}`);
    }, SEARCH_DEBOUNCE_MS);
    return () => clearTimeout(handler);
  }, [searchInput, query, pathname, router, searchParams]);

  /* Preseleccionar categoría por id o nombre desde el query param `categoria` */
  useEffect(() => {
    const categoriaParam = searchParams?.get("categoria");
    if (!categoriaParam) return;

    const id = Number(categoriaParam);
    if (!Number.isNaN(id)) {
      setSelectedCategories([id]);
      setPage(1);
      return;
    }

    const normalizedParam = categoriaParam.toLowerCase();
    const matchedIds = Array.from(
      new Set(
        products
          .filter((product) =>
            [
              product.categoria,
              product.categoriaSlug,
              product.categoriaPadre,
              product.categoriaPadreSlug,
            ].some((value) => value?.toLowerCase() === normalizedParam),
          )
          .map((product) => product.categoriaId)
          .filter((id): id is number => id != null),
      ),
    );

    if (matchedIds.length > 0) {
      setSelectedCategories(matchedIds);
      setPage(1);
    }
  }, [searchParams, products]);

  /* Evitar scroll de fondo en drawer móvil */
  useEffect(() => {
    document.body.style.overflow = mobileFiltersOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileFiltersOpen]);

  /* Cargar productos */
  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch("/api/productos", { cache: "no-store" });
        if (!res.ok) throw new Error("Error");
        const data: ApiProduct[] = await res.json();
        if (cancelled) return;

        const mapped: CatalogProduct[] = data.map((p) => ({
          id: p.id,
          name: p.nombre,
          image: p.imagen_url ?? "/placeholder-product.webp",
          price: formatPrice(p.precio),
          specifications: p.especificaciones ?? "",
          categoria: p.categoria_nombre ?? "Sin categoría",
          categoriaId: p.categoria_id ?? null,
          categoriaSlug: p.categoria_slug ?? null,
          categoriaPadre: p.categoria_padre_nombre ?? null,
          categoriaPadreSlug: p.categoria_padre_slug ?? null,
        }));

        setProducts(mapped);
        const highest = Math.max(0, ...mapped.map((p) => parsePrice(p.price)));
        const maxP = highest || 5000000;
        setMaxPrice(maxP);
        setPriceCeiling(maxP);
        setPriceFloor(0);
        setPage(1);
      } catch {
        if (!cancelled) setError("No fue posible cargar el catálogo.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, []);

  /* Filtrado */
  const filtered = useMemo(() => {
    let result = [...products];

    // Búsqueda tokenizada: cada palabra del query debe aparecer en algún lado
    // (nombre, especificaciones o categoría). Esto hace que buscar "Mesas"
    // muestre también todos los productos de la categoría "Mesas de juntas",
    // aunque el nombre del producto no contenga esa palabra.
    const tokens = tokenize(query);
    if (tokens.length > 0) {
      result = result.filter((p) => {
        const haystack = `${p.name} ${p.specifications} ${p.categoria}`.toLowerCase();
        return tokens.every((token) => haystack.includes(token));
      });
    }

    if (selectedCategories.length > 0) {
      result = result.filter((p) => selectedCategories.includes(p.categoriaId ?? -1));
    }

    result = result.filter((p) => {
      const price = parsePrice(p.price);
      return price >= priceFloor && price <= priceCeiling;
    });

    result.sort((a, b) => {
      if (sort === "category-asc") {
        const categoryComparison = a.categoria.localeCompare(b.categoria, "es", {
          sensitivity: "base",
        });
        if (categoryComparison !== 0) return categoryComparison;
        return a.name.localeCompare(b.name, "es", { sensitivity: "base" });
      }
      if (sort === "price-asc") return parsePrice(a.price) - parsePrice(b.price);
      if (sort === "price-desc") return parsePrice(b.price) - parsePrice(a.price);
      if (sort === "name-asc") return a.name.localeCompare(b.name);
      return 0;
    });

    return result;
  }, [products, query, selectedCategories, priceFloor, priceCeiling, sort]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const pageItems = filtered.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );

  // Ventana de números de página a mostrar (máx. 5), sin duplicados y sin
  // salirse del rango [1, totalPages]. Antes se clamps cada número por
  // separado, lo que producía números repetidos (ej: 1 1 1 2 3).
  const pageNumbers = useMemo(() => {
    const maxButtons = Math.min(totalPages, 5);
    let start = currentPage - Math.floor(maxButtons / 2);
    start = Math.max(1, Math.min(start, totalPages - maxButtons + 1));
    return Array.from({ length: maxButtons }, (_, i) => start + i);
  }, [currentPage, totalPages]);

  const toggleCategory = useCallback((catId: number) => {
    setSelectedCategories((prev) =>
      prev.includes(catId) ? prev.filter((c) => c !== catId) : [...prev, catId],
    );
    setPage(1);
  }, []);

  const clearAllFilters = useCallback(() => {
    setSelectedCategories([]);
    setPriceCeiling(maxPrice);
    setPriceFloor(0);
    setPage(1);
  }, [maxPrice]);

  const activeFiltersCount =
    selectedCategories.length +
    (priceCeiling < maxPrice ? 1 : 0) +
    (priceFloor > 0 ? 1 : 0);

  /* ═══════════════════════════════════════════════
      Render: Loading
  ═══════════════════════════════════════════════ */
  if (loading) {
    return (
      <main className="min-h-screen bg-white">
        <div className="border-b border-stone-100">
          <div className="mx-auto max-w-7xl px-6 py-12 sm:px-8 md:py-16 lg:px-12">
            <div className="animate-pulse">
              <div className="h-2.5 w-24 rounded bg-stone-100 mb-6" />
              <div className="h-9 w-56 rounded bg-stone-100 mb-3" />
              <div className="h-4 w-44 rounded bg-stone-100 mb-10" />
              <div className="h-[46px] w-full max-w-xl rounded bg-stone-100" />
            </div>
          </div>
        </div>
        <div className="mx-auto max-w-7xl px-6 py-8 sm:px-8 lg:px-12">
          <div className="flex gap-8">
            <aside className="hidden w-56 lg:block">
              <div className="animate-pulse border border-stone-100 bg-white h-80" />
            </aside>
            <div className="flex-1">
              <div className="h-5 w-40 rounded bg-stone-100 mb-6 animate-pulse" />
              <div className="grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-3 xl:grid-cols-4">
                {Array.from({ length: 8 }).map((_, i) => (
                  <SkeletonCard key={i} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  /* ═══════════════════════════════════════════════
      Render: Error
  ═══════════════════════════════════════════════ */
  if (error) {
    return (
      <main className="flex min-h-[60vh] items-center justify-center bg-white px-6">
        <div className="text-center">
          <p className="text-[14px] text-stone-500 mb-5">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="text-[13px] font-medium text-stone-900 underline underline-offset-4 decoration-stone-300 hover:decoration-stone-900 transition-all"
          >
            Reintentar
          </button>
        </div>
      </main>
    );
  }

  /* ═══════════════════════════════════════════════
      Render Principal
  ═══════════════════════════════════════════════ */
  return (
    <main className="min-h-screen bg-white">
      {/* ═══════════════════════════════════════════
          HEADER
      ═══════════════════════════════════════════ */}
      <header className="border-b border-stone-100">
        <div className="mx-auto max-w-7xl px-3 py-4 sm:px-4 md:py-6 lg:px-6">
          <Breadcrumbs query={query} />

          <div className="mt-5">
            <h1 className="text-[28px] sm:text-[32px] font-light text-stone-900 tracking-tight">
              {query.trim()
                ? <>Resultados para &ldquo;{query}&rdquo;</>
                : "Catálogo"}
            </h1>
            <p className="mt-2 text-[14px] text-stone-400">
              {filtered.length} {filtered.length === 1 ? "producto" : "productos"}
            </p>
          </div>

          {/* Accesos rápidos a categorías en móvil */}
          <div className="mt-5 lg:hidden">
            <p className="mb-2.5 text-[11px] font-medium uppercase tracking-[0.16em] text-stone-400">
              Explora categorías
            </p>
            <div
              className="-mx-3 flex gap-2 overflow-x-auto px-3 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
              aria-label="Categorías del catálogo"
            >
              <button
                type="button"
                onClick={() => {
                  setSelectedCategories([]);
                  setPage(1);
                }}
                aria-pressed={selectedCategories.length === 0}
                className={`shrink-0 rounded-full border px-4 py-2 text-[12px] transition-colors ${
                  selectedCategories.length === 0
                    ? "border-[#7A1E2B] bg-[#7A1E2B] text-white"
                    : "border-stone-200 bg-stone-50 text-stone-600 hover:border-stone-300"
                }`}
              >
                Todas
              </button>
              {categories.map((category) => {
                const categoryId = Number(category.slug);
                const selected = selectedCategories.includes(categoryId);

                return (
                  <button
                    key={category.slug}
                    type="button"
                    onClick={() => toggleCategory(categoryId)}
                    aria-pressed={selected}
                    className={`shrink-0 rounded-full border px-4 py-2 text-[12px] transition-colors ${
                      selected
                        ? "border-[#7A1E2B] bg-[#7A1E2B] text-white"
                        : "border-stone-200 bg-stone-50 text-stone-600 hover:border-stone-300"
                    }`}
                  >
                    {category.name}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-8">
            <SearchBar
              value={searchInput}
              onChange={(v) => {
                setSearchInput(v);
                setPage(1);
              }}
              placeholder="Buscar productos..."
              onClear={() => {
                setSearchInput("");
                setPage(1);
              }}
              products={products}
              onSelectSuggestion={(v) => {
                setSearchInput(v);
                setPage(1);
              }}
            />
          </div>
        </div>
      </header>

      {/* ═══════════════════════════════════════════
          CONTENIDO PRINCIPAL
      ═══════════════════════════════════════════ */}
      <div className="mx-auto max-w-7xl px-6 py-8 sm:px-8 lg:px-12">
        <div className="flex gap-8 lg:gap-12">
          {/* ─── Sidebar Desktop ─── */}
          <aside className="hidden w-56 flex-shrink-0 lg:block">
            <div className="sticky top-8">
              <FilterList
                selectedCategories={selectedCategories}
                categories={categories}
                toggleCategory={toggleCategory}
                priceFloor={priceFloor}
                priceCeiling={priceCeiling}
                maxPrice={maxPrice}
                setPriceFloor={setPriceFloor}
                setPriceCeiling={setPriceCeiling}
                setPage={setPage}
              />

              {activeFiltersCount > 0 && (
                <button
                  onClick={clearAllFilters}
                  className="mt-5 text-[12px] text-stone-400 underline underline-offset-3 decoration-stone-200 hover:text-stone-600 hover:decoration-stone-400 transition-all"
                >
                  Limpiar filtros ({activeFiltersCount})
                </button>
              )}
            </div>
          </aside>

          {/* ─── Contenido de productos ─── */}
          <div className="min-w-0 flex-1">
            {/* Chips de filtros activos */}
            {activeFiltersCount > 0 && (
              <div className="mb-5 flex flex-wrap items-center gap-1.5">
                {selectedCategories.map((cat) => {
                  const name = categories.find((c) => Number(c.slug) === cat)?.name ?? String(cat);
                  return (
                    <button
                      key={cat}
                      onClick={() => toggleCategory(cat)}
                      className="flex items-center gap-1.5 rounded-sm border border-stone-200 px-2.5 py-1 text-[11px] text-stone-600 transition hover:border-stone-300 hover:text-stone-800"
                    >
                      <span className="flex h-3 w-3 items-center justify-center rounded-sm bg-stone-200">
                        <X className="h-2 w-2" />
                      </span>
                      {name}
                    </button>
                  );
                })}
                {(priceCeiling < maxPrice || priceFloor > 0) && (
                  <button
                    onClick={() => {
                      setPriceCeiling(maxPrice);
                      setPriceFloor(0);
                    }}
                    className="flex items-center gap-1.5 rounded-sm border border-stone-200 px-2.5 py-1 text-[11px] text-stone-600 transition hover:border-stone-300 hover:text-stone-800"
                  >
                    <span className="flex h-3 w-3 items-center justify-center rounded-sm bg-stone-200">
                      <X className="h-2 w-2" />
                    </span>
                    {formatPrice(priceFloor)} – {formatPrice(priceCeiling)}
                  </button>
                )}
                <button
                  onClick={clearAllFilters}
                  className="text-[11px] text-stone-400 underline underline-offset-2 decoration-stone-200 hover:text-stone-600 hover:decoration-stone-400 transition-all"
                >
                  Limpiar todo
                </button>
              </div>
            )}

            {/* ─── Toolbar ─── */}
            <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
              <span className="text-[12px] text-stone-400">
                {pageItems.length} de {filtered.length} {filtered.length === 1 ? "producto" : "productos"}
              </span>

              <div className="flex items-center gap-2">
                {/* Filtros móvil */}
                <button
                  onClick={() => setMobileFiltersOpen(true)}
                  className="flex items-center gap-1.5 rounded border border-stone-200 px-3 py-2 text-[12px] text-stone-500 transition hover:border-stone-300 lg:hidden"
                >
                  <span>Filtros</span>
                  {activeFiltersCount > 0 && (
                    <span className="text-stone-400">({activeFiltersCount})</span>
                  )}
                </button>

                {/* Sort */}
                <div className="relative">
                  <button
                    onClick={() => setSortOpen((o) => !o)}
                    className="flex items-center gap-1.5 rounded border border-stone-200 px-3 py-2 text-[12px] text-stone-500 transition hover:border-stone-300"
                  >
                    <span className="hidden sm:inline">{SORT_LABELS[sort]}</span>
                    <span className="sm:hidden">Ordenar</span>
                    <ChevronDown
                      className={`h-3.5 w-3.5 transition ${sortOpen ? "rotate-180" : ""}`}
                    />
                  </button>

                  {sortOpen && (
                    <>
                      <div
                        className="fixed inset-0 z-10"
                        onClick={() => setSortOpen(false)}
                      />
                      <div className="absolute right-0 top-full z-20 mt-1 w-48 overflow-hidden rounded border border-stone-200 bg-white py-1 shadow-lg shadow-stone-900/5">
                        {(Object.keys(SORT_LABELS) as SortOption[]).map((option) => (
                          <button
                            key={option}
                            onClick={() => {
                              setSort(option);
                              setSortOpen(false);
                              setPage(1);
                            }}
                            className={`flex w-full items-center justify-between px-3.5 py-2.5 text-left text-[13px] transition ${
                              option === sort
                                ? "font-medium text-[#7A1E2B]"
                                : "text-stone-600 hover:text-stone-900"
                            }`}
                          >
                            {SORT_LABELS[option]}
                            {option === sort && (
                              <span className="flex h-3.5 w-3.5 items-center justify-center rounded-sm bg-[#7A1E2B]">
                                <Check className="h-2.5 w-2.5 text-white" strokeWidth={3} />
                              </span>
                            )}
                          </button>
                        ))}
                      </div>
                    </>
                  )}
                </div>

                {/* View Toggle */}
                <div className="hidden items-center rounded border border-stone-200 p-0.5 sm:flex">
                  <button
                    onClick={() => setViewMode("grid")}
                    aria-label="Vista de cuadrícula"
                    className={`rounded-sm p-2 transition ${
                      viewMode === "grid"
                        ? "bg-stone-900 text-white"
                        : "text-stone-400 hover:text-stone-600"
                    }`}
                  >
                    <LayoutGrid className="h-3.5 w-3.5" />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    aria-label="Vista de lista"
                    className={`rounded-sm p-2 transition ${
                      viewMode === "list"
                        ? "bg-stone-900 text-white"
                        : "text-stone-400 hover:text-stone-600"
                    }`}
                  >
                    <List className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </div>

            {/* ─── Productos ─── */}
            {pageItems.length > 0 ? (
              <div
                className={
                  viewMode === "grid"
                    ? "grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-3 xl:grid-cols-4"
                    : "flex flex-col gap-4"
                }
              >
                {pageItems.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={{
                      id: product.id,
                      name: product.name,
                      image: product.image,
                      price: product.price,
                      specifications: product.specifications,
                    }}
                  />
                ))}
              </div>
            ) : (
              /* ─── Empty State ─── */
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <h3 className="text-[16px] font-medium text-stone-800 mb-2">
                  Sin resultados
                </h3>
                <p className="text-[13px] text-stone-400 mb-6 max-w-sm">
                  Intenta con otros términos o explora nuestras categorías.
                </p>
                {activeFiltersCount > 0 && (
                  <button
                    onClick={clearAllFilters}
                    className="text-[12px] text-stone-500 underline underline-offset-3 decoration-stone-200 hover:text-stone-700 hover:decoration-stone-400 transition-all"
                  >
                    Limpiar filtros
                  </button>
                )}
              </div>
            )}

            {/* ─── Paginación ─── */}
            {totalPages > 1 && (
              <div className="mt-10 flex items-center justify-center gap-1">
                <button
                  onClick={() => setPage((c) => Math.max(1, c - 1))}
                  disabled={currentPage === 1}
                  aria-label="Página anterior"
                  className="flex h-9 w-9 items-center justify-center text-stone-400 transition hover:text-stone-700 disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <ArrowLeft className="h-4 w-4" />
                </button>

                <span className="flex h-9 items-center px-3 text-[12px] text-stone-400 sm:hidden">
                  {currentPage} / {totalPages}
                </span>

                <div className="hidden items-center gap-1 sm:flex">
                  {pageNumbers.map((n) => (
                    <button
                      key={n}
                      onClick={() => setPage(n)}
                      className={`flex h-9 w-9 items-center justify-center text-[13px] transition ${
                        n === currentPage
                          ? "font-medium text-[#7A1E2B]"
                          : "text-stone-400 hover:text-stone-700"
                      }`}
                    >
                      {n}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => setPage((c) => Math.min(totalPages, c + 1))}
                  disabled={currentPage === totalPages}
                  aria-label="Página siguiente"
                  className="flex h-9 w-9 items-center justify-center text-stone-400 transition hover:text-stone-700 disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════
          DRAWER DE FILTROS MÓVIL
      ═══════════════════════════════════════════ */}
      <div
        className={`fixed inset-0 z-50 bg-black/30 lg:hidden transition-opacity duration-200 ${
          mobileFiltersOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={() => setMobileFiltersOpen(false)}
        aria-hidden={!mobileFiltersOpen}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Filtros"
        className={`fixed right-0 top-0 z-50 flex h-full w-[85vw] max-w-[320px] flex-col bg-white transition-transform duration-300 ease-out lg:hidden ${
          mobileFiltersOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-stone-100">
          <span className="text-[11px] uppercase tracking-widest text-stone-400">Filtros</span>
          <button
            onClick={() => setMobileFiltersOpen(false)}
            aria-label="Cerrar filtros"
            className="rounded p-1.5 text-stone-400 transition hover:text-stone-600"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-5">
          <FilterList
            categories={categories}
            selectedCategories={selectedCategories}
            toggleCategory={toggleCategory}
            priceFloor={priceFloor}
            priceCeiling={priceCeiling}
            maxPrice={maxPrice}
            setPriceFloor={setPriceFloor}
            setPriceCeiling={setPriceCeiling}
            setPage={setPage}
          />
        </div>

        <div className="flex gap-3 border-t border-stone-100 px-5 py-4">
          {activeFiltersCount > 0 && (
            <button
              onClick={clearAllFilters}
              className="flex-1 rounded border border-stone-200 py-2.5 text-[12px] font-medium text-stone-600 transition hover:border-stone-300 hover:text-stone-800"
            >
              Limpiar
            </button>
          )}
          <button
            onClick={() => setMobileFiltersOpen(false)}
            className="flex-1 rounded bg-[#7A1E2B] py-2.5 text-[12px] font-medium text-white transition hover:bg-[#A02838] active:scale-[0.98]"
          >
            Ver {filtered.length} {filtered.length === 1 ? "resultado" : "resultados"}
          </button>
        </div>
      </div>
    </main>
  );
}
