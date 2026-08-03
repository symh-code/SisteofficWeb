import type { Metadata } from "next";
import Link from "next/link";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { ProductCard } from "../components/ProductCard";
import { JsonLd } from "../components/JsonLd";
import { absoluteUrl, buildMetadata, BUSINESS } from "../lib/seo";

const CATEGORIA = "Sillas";

const PAGE_TITLE = "Las mejores sillas de oficina en Barranquilla";
const PAGE_DESCRIPTION =
  "Sillas de oficina a la medida en Barranquilla: gerenciales, ejecutivas, interlocutoras, tándem, presidenciales, universitarias y secretariales. Fabricación propia, garantía y asesoría de SisteOffic, con más de 12 años atendiendo empresas en la Costa Caribe colombiana.";

export const metadata: Metadata = buildMetadata({
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  path: "/sillas-de-oficina-en-barranquilla",
});

// El catálogo de sillas viene de D1 (binding solo disponible en tiempo de
// request en el runtime de Cloudflare) — forzamos dinámico para no hornear
// una página vacía en el build.
export const dynamic = "force-dynamic";

type ProductRow = {
  id: number;
  nombre: string;
  imagen_url: string | null;
  precio: number | string | null;
  especificaciones: string | null;
};

const TIPOS_DE_SILLA = [
  { nombre: "Sillas gerenciales", detalle: "Para dirección y alta gerencia, con soporte lumbar y acabados premium." },
  { nombre: "Sillas ejecutivas", detalle: "Confort para jornadas largas en oficinas corporativas de Barranquilla." },
  { nombre: "Sillas interlocutoras", detalle: "Pensadas para salas de reunión y espacios de atención a visitantes." },
  { nombre: "Sillas tándem", detalle: "Ideales para salas de espera y áreas de recepción de alto tránsito." },
  { nombre: "Sillas presidenciales", detalle: "La opción de mayor jerarquía, en cuero sintético y bases reforzadas." },
  { nombre: "Sillas universitarias", detalle: "Para instituciones educativas, resistentes y de fácil mantenimiento." },
  { nombre: "Sillas secretariales", detalle: "Operativas, ergonómicas y ajustables para jornadas de oficina completas." },
];

const FAQS = [
  {
    pregunta: "¿Cuáles son las mejores sillas de oficina en Barranquilla?",
    respuesta:
      "Las mejores sillas de oficina en Barranquilla son las que se ajustan al uso real de cada puesto: soporte lumbar y ajuste 4D para roles gerenciales, bases reforzadas para uso intensivo y materiales resistentes al clima de la Costa Caribe. SisteOffic fabrica cada silla a la medida del cliente en su sede de Barranquilla, en vez de vender solo referencias de catálogo estándar.",
  },
  {
    pregunta: "¿SisteOffic fabrica sillas de oficina a la medida?",
    respuesta:
      "Sí. SisteOffic diseña y fabrica mobiliario de oficina a la medida, incluyendo sillas gerenciales, ejecutivas, interlocutoras, tándem, presidenciales, universitarias y secretariales, adaptando dimensiones, materiales y acabados al proyecto de cada cliente.",
  },
  {
    pregunta: "¿Hacen envíos e instalación en toda la Costa Caribe?",
    respuesta:
      "SisteOffic atiende proyectos corporativos de mediana y gran escala en Barranquilla y en la Costa Caribe colombiana, con equipo propio de diseño de interiores y producción.",
  },
  {
    pregunta: "¿Qué garantía tienen las sillas de oficina de SisteOffic?",
    respuesta:
      "Todas las sillas fabricadas por SisteOffic cuentan con garantía. Los detalles específicos de cobertura se confirman al momento de cotizar, según el modelo y los materiales elegidos.",
  },
  {
    pregunta: "¿Cómo cotizo una silla ejecutiva o gerencial en Barranquilla?",
    respuesta:
      "Puedes cotizar directamente desde la ficha de cada silla en este sitio, escribir por WhatsApp o visitar la sede de SisteOffic en Cl. 85 #81 32, Riomar, Barranquilla.",
  },
];

function formatPrice(price: number | string | null): string {
  const numeric = typeof price === "number" ? price : Number.parseFloat(String(price ?? "0"));
  if (!Number.isFinite(numeric)) return "Precio a cotizar";
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  }).format(numeric);
}

async function getSillas(): Promise<ProductRow[]> {
  try {
    const { env } = getCloudflareContext();
    const result = await env.DB.prepare(
      `
        SELECT p.id, p.nombre, p.imagen_url, p.precio, p.especificaciones
        FROM productos p
        JOIN categorias c ON c.id = p.categoria_id
        WHERE c.nombre = ?
        ORDER BY p.id DESC
      `
    )
      .bind(CATEGORIA)
      .all<ProductRow>();

    return result.results ?? [];
  } catch (error) {
    console.error("sillas-de-oficina-en-barranquilla: error consultando D1", error);
    return [];
  }
}

export default async function SillasBarranquillaPage() {
  const sillas = await getSillas();
  const pageUrl = absoluteUrl("/sillas-de-oficina-en-barranquilla");

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Inicio", item: absoluteUrl("/") },
      { "@type": "ListItem", position: 2, name: PAGE_TITLE, item: pageUrl },
    ],
  };

  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: PAGE_TITLE,
    itemListElement: sillas.map((silla, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: absoluteUrl(`/productos/${silla.id}`),
      name: silla.nombre,
    })),
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((faq) => ({
      "@type": "Question",
      name: faq.pregunta,
      acceptedAnswer: { "@type": "Answer", text: faq.respuesta },
    })),
  };

  return (
    <main className="w-full bg-white">
      <JsonLd data={breadcrumbJsonLd} />
      {sillas.length > 0 && <JsonLd data={itemListJsonLd} />}
      <JsonLd data={faqJsonLd} />

      {/* ─── Encabezado ─── */}
      <header className="border-b border-slate-100 bg-[#faf9f6]">
        <div className="mx-auto max-w-6xl px-6 py-16 sm:px-8 lg:px-12">
          <nav aria-label="Ruta de navegación" className="mb-6 text-xs text-slate-500">
            <Link href="/" className="hover:text-[#7A1E2B]">Inicio</Link>
            <span className="mx-2">/</span>
            <span className="text-slate-700">Sillas de oficina en Barranquilla</span>
          </nav>
          <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#7A1E2B]">
            SisteOffic · Barranquilla, Atlántico
          </span>
          <h1 className="mt-4 max-w-3xl text-4xl font-light tracking-tight text-slate-900 sm:text-5xl">
            Las mejores sillas de oficina en Barranquilla
          </h1>
          <p className="mt-5 max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base">
            En SisteOffic fabricamos sillas de oficina a la medida en Barranquilla desde hace más de
            12 años: gerenciales, ejecutivas, interlocutoras, tándem, presidenciales, universitarias
            y secretariales, con producción propia y asesoría de diseño para proyectos corporativos
            de toda la Costa Caribe colombiana.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/contacto"
              className="inline-flex items-center gap-2 rounded-md bg-[#7A1E2B] px-6 py-3 text-xs font-semibold uppercase tracking-widest text-white transition-colors hover:bg-[#A02838]"
            >
              Cotizar sillas para mi oficina
            </Link>
            <a
              href={`https://wa.me/${BUSINESS.telephone.replace(/[^0-9]/g, "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-md border border-slate-200 px-6 py-3 text-xs font-semibold uppercase tracking-widest text-slate-800 transition-colors hover:border-[#7A1E2B] hover:text-[#7A1E2B]"
            >
              Escribir por WhatsApp
            </a>
          </div>
        </div>
      </header>

      {/* ─── Tipos de silla (long-tail) ─── */}
      <section className="mx-auto max-w-6xl px-6 py-16 sm:px-8 lg:px-12">
        <h2 className="text-2xl font-light tracking-tight text-slate-900 sm:text-3xl">
          Tipos de sillas de oficina que fabricamos en Barranquilla
        </h2>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {TIPOS_DE_SILLA.map((tipo) => (
            <div key={tipo.nombre} className="rounded-2xl border border-slate-200/80 bg-white p-6">
              <h3 className="text-sm font-semibold text-slate-900">{tipo.nombre}</h3>
              <p className="mt-2 text-xs leading-relaxed text-slate-500">{tipo.detalle}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Catálogo real de sillas ─── */}
      <section className="mx-auto max-w-6xl px-6 pb-16 sm:px-8 lg:px-12">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-2xl font-light tracking-tight text-slate-900 sm:text-3xl">
            Catálogo de sillas disponibles
          </h2>
          <Link href="/buscar?categoria=Sillas" className="text-xs font-semibold text-[#7A1E2B] hover:underline">
            Ver todas →
          </Link>
        </div>

        {sillas.length > 0 ? (
          <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
            {sillas.map((silla) => (
              <ProductCard
                key={silla.id}
                product={{
                  id: silla.id,
                  name: silla.nombre,
                  image: silla.imagen_url ?? "",
                  price: formatPrice(silla.precio),
                  specifications: silla.especificaciones ?? "",
                }}
              />
            ))}
          </div>
        ) : (
          <p className="text-sm text-slate-500">
            Estamos actualizando el catálogo en línea de sillas. Escríbenos por WhatsApp o
            visita <Link href="/contacto" className="text-[#7A1E2B] hover:underline">nuestra sede en Barranquilla</Link> para
            ver referencias disponibles.
          </p>
        )}
      </section>

      {/* ─── Por qué elegir SisteOffic ─── */}
      <section className="border-t border-slate-100 bg-[#F5E6E8]/40">
        <div className="mx-auto max-w-6xl px-6 py-16 sm:px-8 lg:px-12">
          <h2 className="text-2xl font-light tracking-tight text-slate-900 sm:text-3xl">
            Por qué elegir a SisteOffic para tus sillas de oficina
          </h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { titulo: "Fabricación propia", texto: "Producimos en nuestra sede del norte de Barranquilla, sin intermediarios." },
              { titulo: "A la medida", texto: "Ajustamos dimensiones, materiales y acabados a cada puesto de trabajo." },
              { titulo: "12+ años de trayectoria", texto: "Proyectos corporativos de mediana y gran escala en la Costa Caribe." },
              { titulo: "Diseño + producción", texto: "Asesoría de interiores integrada con nuestra propia línea de fabricación." },
            ].map((item) => (
              <div key={item.titulo} className="rounded-2xl bg-white p-6 shadow-sm">
                <h3 className="text-sm font-semibold text-[#7A1E2B]">{item.titulo}</h3>
                <p className="mt-2 text-xs leading-relaxed text-slate-600">{item.texto}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section className="mx-auto max-w-6xl px-6 py-16 sm:px-8 lg:px-12">
        <h2 className="text-2xl font-light tracking-tight text-slate-900 sm:text-3xl">
          Preguntas frecuentes sobre sillas de oficina en Barranquilla
        </h2>
        <div className="mt-8 divide-y divide-slate-100 border-t border-b border-slate-100">
          {FAQS.map((faq) => (
            <details key={faq.pregunta} className="group py-5">
              <summary className="cursor-pointer list-none text-sm font-medium text-slate-900 marker:content-none">
                {faq.pregunta}
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">{faq.respuesta}</p>
            </details>
          ))}
        </div>
      </section>

      {/* ─── Ubicación ─── */}
      <section className="border-t border-slate-100 bg-[#faf9f6]">
        <div className="mx-auto max-w-6xl px-6 py-14 text-center sm:px-8 lg:px-12">
          <p className="text-sm text-slate-600">
            Visítanos en {BUSINESS.streetAddress}, {BUSINESS.addressLocality}, {BUSINESS.addressRegion}, o
            contáctanos al <a href={`tel:${BUSINESS.telephone.replace(/\s/g, "")}`} className="text-[#7A1E2B] hover:underline">{BUSINESS.telephone}</a>.
          </p>
        </div>
      </section>
    </main>
  );
}
