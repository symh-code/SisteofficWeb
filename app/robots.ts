import type { MetadataRoute } from "next";
import { SITE_URL } from "./lib/seo";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/carrito"],
      },
      // Permitimos explícitamente a los crawlers de motores de IA en vez de
      // dejar su acceso a criterio del user-agent por defecto (ver auditoría
      // GEO): buscamos que citen a SisteOffic, no bloquearlos.
      {
        userAgent: [
          "GPTBot",
          "ChatGPT-User",
          "PerplexityBot",
          "ClaudeBot",
          "Claude-Web",
          "Google-Extended",
          "Applebot-Extended",
          "CCBot",
        ],
        allow: "/",
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
