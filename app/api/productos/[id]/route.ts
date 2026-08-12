import { getCloudflareContext } from "@opennextjs/cloudflare";

interface RouteContext {
  params: Promise<{
    id: string;
  }>;
}

export async function GET(
  _request: Request,
  { params }: RouteContext
) {
  try {
    const { id } = await params;

    const productId = Number(id);

    if (!Number.isInteger(productId)) {
      return Response.json(
        { error: "ID de producto inválido" },
        { status: 400 }
      );
    }

    const { env } = getCloudflareContext();

    const producto = await env.DB
      .prepare(`
        SELECT
          id,
          nombre,
          imagen_url,
          precio,
          especificaciones,
          created_at,
          updated_At
        FROM productos
        WHERE id = ?
      `)
      .bind(productId)
      .first();

    if (!producto) {
      return Response.json(
        { error: "Producto no encontrado" },
        { status: 404 }
      );
    }

    const imagenes = await env.DB
      .prepare(`
        SELECT id, imagen_url, angulo, orden
        FROM producto_imagenes
        WHERE producto_id = ?
        ORDER BY orden ASC, id ASC
      `)
      .bind(productId)
      .all();

    return Response.json({ ...producto, imagenes: imagenes.results });
  } catch (error) {
    console.error("Error obteniendo producto:", error);

    return Response.json(
      { error: "Error al obtener el producto" },
      { status: 500 }
    );
  }
}
