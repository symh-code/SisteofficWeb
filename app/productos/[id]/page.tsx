import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProductPageContent from "./ProductPageContent";
import { getProduct, getRelatedProducts } from "./data";
import { JsonLd } from "../../components/JsonLd";
import { absoluteUrl, buildMetadata, SITE_NAME } from "../../lib/seo";

type ProductPageProps = {
  params: Promise<{
    id: string;
  }>;
};

function formatCOP(price: number | string | null): number | null {
  const numeric = typeof price === "number" ? price : Number.parseFloat(String(price ?? ""));
  return Number.isFinite(numeric) ? numeric : null;
}

function buildDescription(nombre: string, especificaciones: string | null): string {
  const base = especificaciones?.trim()
    ? especificaciones.trim()
    : "Fabricado a la medida por SisteOffic, con garantía y atención directa en Barranquilla.";
  const combined = `${nombre} — ${base} Diseño y fabricación de mobiliario de oficina a la medida en Barranquilla, Atlántico.`;
  return combined.length > 160 ? `${combined.slice(0, 157)}…` : combined;
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { id } = await params;
  const product = await getProduct(Number(id));

  if (!product) {
    return buildMetadata({
      title: "Producto no encontrado",
      description: "El producto que buscas ya no está disponible en el catálogo de SisteOffic.",
      path: `/productos/${id}`,
      noIndex: true,
    });
  }

  const categoria = product.categoria_nombre ? ` | ${product.categoria_nombre} Barranquilla` : " | Barranquilla";

  return buildMetadata({
    title: `${product.nombre}${categoria}`,
    description: buildDescription(product.nombre, product.especificaciones),
    path: `/productos/${product.id}`,
    image: product.imagen_url ?? undefined,
  });
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  const productId = Number(id);

  if (!Number.isInteger(productId)) {
    notFound();
  }

  const product = await getProduct(productId);

  if (!product) {
    notFound();
  }

  const relatedProducts = await getRelatedProducts(product.categoria_id, product.id);

  const price = formatCOP(product.precio);
  const productUrl = absoluteUrl(`/productos/${product.id}`);

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.nombre,
    description: buildDescription(product.nombre, product.especificaciones),
    sku: String(product.id),
    image: product.imagen_url ? [product.imagen_url] : undefined,
    brand: { "@type": "Brand", name: SITE_NAME },
    category: product.categoria_nombre ?? undefined,
    url: productUrl,
    ...(price !== null
      ? {
          offers: {
            "@type": "Offer",
            url: productUrl,
            priceCurrency: "COP",
            price,
            availability: "https://schema.org/PreOrder",
            areaServed: "CO",
            seller: { "@type": "Organization", name: SITE_NAME },
          },
        }
      : {}),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Inicio", item: absoluteUrl("/") },
      ...(product.categoria_nombre
        ? [
            {
              "@type": "ListItem",
              position: 2,
              name: product.categoria_nombre,
              item: absoluteUrl(`/buscar?categoria=${encodeURIComponent(product.categoria_nombre)}`),
            },
          ]
        : []),
      {
        "@type": "ListItem",
        position: product.categoria_nombre ? 3 : 2,
        name: product.nombre,
        item: productUrl,
      },
    ],
  };

  return (
    <>
      <JsonLd data={productJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />
      <ProductPageContent product={product} relatedProducts={relatedProducts} />
    </>
  );
}
