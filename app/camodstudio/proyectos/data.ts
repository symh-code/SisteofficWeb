import proyectosData from "./proyectos.generated.json";

export type CamodProyecto = {
  slug: string;
  nombre: string;
  cover: string;
  imagenes: string[];
};

/**
 * Proyectos reales de CAMÖD Studio. Se generan en build time desde
 * public/camodProyectos (ver scripts/generate-camod-proyectos.mjs) porque en
 * producción la app corre en un Cloudflare Worker sin acceso a filesystem —
 * leer la carpeta con fs en runtime devolvería una lista vacía.
 */
export const camodProyectos: CamodProyecto[] = proyectosData as CamodProyecto[];
