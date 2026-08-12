import { getCloudflareContext } from "@opennextjs/cloudflare";

export async function GET() {
  try {
    const { env } = getCloudflareContext();

    const result = await env.DB
      .prepare(`
        SELECT
          p.id,
          p.nombre,
          p.imagen_url,
          p.precio,
          p.especificaciones,
          p.categoria_id,
          COALESCE(c.nombre_visible, c.nombre) AS categoria_nombre,
          c.slug AS categoria_slug,
          c.parent_id AS categoria_parent_id,
          COALESCE(cp.nombre_visible, cp.nombre) AS categoria_padre_nombre,
          cp.slug AS categoria_padre_slug,
          p.created_at,
          p.updated_At
        FROM productos p
        LEFT JOIN categorias c ON c.id = p.categoria_id
        LEFT JOIN categorias cp ON cp.id = c.parent_id
        ORDER BY p.id DESC
      `)
      .all();

    return Response.json(result.results);
  } catch (error) {
    console.error("Error obteniendo productos:", error);

    return Response.json(
      { error: "No se pudieron obtener los productos" },
      { status: 500 }
    );
  }
}
