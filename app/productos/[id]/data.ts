import { cache } from "react";
import { getCloudflareContext } from "@opennextjs/cloudflare";

export type Product = {
  id: number;
  nombre: string;
  imagen_url: string | null;
  precio: number | string | null;
  especificaciones: string | null;
  categoria_id?: number | null;
  categoria_nombre?: string | null;
  created_at: string;
  updated_At: string;
  imagenes?: ProductImage[];
};

export type ProductImage = {
  id: number;
  imagen_url: string;
  angulo: string | null;
  orden: number;
};

/** Memoizado por request: generateMetadata() y la página comparten esta
 * misma consulta a D1 sin duplicar la lectura. */
export const getProduct = cache(async (productId: number): Promise<Product | null> => {
  if (!Number.isInteger(productId)) return null;

  const { env } = getCloudflareContext();

  const result = await env.DB.prepare(
    `
      SELECT
        p.id,
        p.nombre,
        p.imagen_url,
        p.precio,
        p.especificaciones,
        p.categoria_id,
        c.nombre as categoria_nombre,
        p.created_at,
        p.updated_At
      FROM productos p
      LEFT JOIN categorias c ON c.id = p.categoria_id
      WHERE p.id = ?
      LIMIT 1
    `
  )
    .bind(productId)
    .first<Product>();

  if (!result) return null;

  const images = await env.DB.prepare(
    `
      SELECT id, imagen_url, angulo, orden
      FROM producto_imagenes
      WHERE producto_id = ?
      ORDER BY orden ASC, id ASC
    `
  )
    .bind(productId)
    .all<ProductImage>();

  return { ...result, imagenes: images.results ?? [] };
});

export const getRelatedProducts = cache(
  async (categoriaId: number | null | undefined, excludeId: number): Promise<Product[]> => {
    if (!categoriaId) return [];

    const { env } = getCloudflareContext();

    const result = await env.DB.prepare(
      `
        SELECT
          p.id,
          p.nombre,
          p.imagen_url,
          p.precio,
          p.especificaciones,
          p.categoria_id,
          c.nombre as categoria_nombre,
          p.created_at,
          p.updated_At
        FROM productos p
        LEFT JOIN categorias c ON c.id = p.categoria_id
        WHERE p.categoria_id = ?
          AND p.id != ?
        ORDER BY RANDOM()
        LIMIT 3
      `
    )
      .bind(categoriaId, excludeId)
      .all<Product>();

    return result.results ?? [];
  }
);
