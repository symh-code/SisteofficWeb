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
          c.nombre as categoria_nombre,
          p.created_at,
          p.updated_At
        FROM productos p
        LEFT JOIN categorias c ON c.id = p.categoria_id
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