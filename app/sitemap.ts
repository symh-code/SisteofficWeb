import type { MetadataRoute } from "next";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { SITE_URL } from "./lib/seo";

// El binding D1 solo existe en tiempo de request dentro del runtime de
// Cloudflare Workers, no durante `next build` — forzamos generación dinámica
// para que el sitemap siempre refleje el catálogo real.
export const dynamic = "force-dynamic";

type ProductRow = {
  id: number;
  updated_At: string | null;
};

const STATIC_ROUTES: { path: string; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"]; priority: number }[] = [
  { path: "/", changeFrequency: "weekly", priority: 1 },
  { path: "/sillas-de-oficina-en-barranquilla", changeFrequency: "weekly", priority: 0.9 },
  { path: "/buscar", changeFrequency: "daily", priority: 0.6 },
  { path: "/sobre-nosotros", changeFrequency: "monthly", priority: 0.5 },
  { path: "/contacto", changeFrequency: "monthly", priority: 0.6 },
  { path: "/servicios", changeFrequency: "monthly", priority: 0.6 },
  { path: "/espacios", changeFrequency: "monthly", priority: 0.5 },
  { path: "/camodstudio", changeFrequency: "monthly", priority: 0.5 },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((route) => ({
    url: `${SITE_URL}${route.path}`,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  let productEntries: MetadataRoute.Sitemap = [];

  try {
    const { env } = getCloudflareContext();
    const result = await env.DB.prepare(
      "SELECT id, updated_At FROM productos ORDER BY id DESC"
    ).all<ProductRow>();

    productEntries = (result.results ?? []).map((product) => ({
      url: `${SITE_URL}/productos/${product.id}`,
      lastModified: product.updated_At ? new Date(product.updated_At) : undefined,
      changeFrequency: "weekly",
      priority: 0.7,
    }));
  } catch (error) {
    console.error("sitemap: no se pudieron cargar productos desde D1", error);
  }

  return [...staticEntries, ...productEntries];
}
