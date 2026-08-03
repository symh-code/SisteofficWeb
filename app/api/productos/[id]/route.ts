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

    return Response.json(producto);
  } catch (error) {
    console.error("Error obteniendo producto:", error);

    return Response.json(
      { error: "Error al obtener el producto" },
      { status: 500 }
    );
  }
}