import { getCloudflareContext } from "@opennextjs/cloudflare";

export async function GET() {
  try {
    const { env } = getCloudflareContext();

    const result = await env.DB
      .prepare(`SELECT id, nombre, imagen_url FROM camodproductos ORDER BY id ASC`)
      .all();

    return Response.json(result.results);
  } catch (error) {
    console.error("Error obteniendo productos CAMÖD:", error);

    return Response.json(
      { error: "No se pudieron obtener los productos CAMÖD" },
      { status: 500 }
    );
  }
}
