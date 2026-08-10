import { cache } from "react";
import { getCloudflareContext } from "@opennextjs/cloudflare";

export type CamodProducto = {
  id: number;
  nombre: string;
  imagen_url: string;
};

/** Productos de la colección CAMÖD, almacenados en la tabla D1 camodproductos. */
export const getCamodProductos = cache(async (): Promise<CamodProducto[]> => {
  const { env } = getCloudflareContext();

  const result = await env.DB.prepare(
    `SELECT id, nombre, imagen_url FROM camodproductos ORDER BY id ASC`
  ).all<CamodProducto>();

  return result.results ?? [];
});
