import fs from "node:fs";
import path from "node:path";

const IMAGE_EXTENSIONS = new Set([".png", ".jpg", ".jpeg", ".webp", ".jfif"]);

export type CamodProyecto = {
  slug: string;
  nombre: string;
  cover: string;
  imagenes: string[];
};

function slugify(input: string): string {
  return input
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function naturalSort(a: string, b: string): number {
  return a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" });
}

function isImageFile(fileName: string): boolean {
  return IMAGE_EXTENSIONS.has(path.extname(fileName).toLowerCase());
}

function toPublicPath(...segments: string[]): string {
  return "/" + segments.map((segment) => encodeURIComponent(segment)).join("/");
}

/**
 * Cada carpeta dentro de public/camodProyectos es un proyecto real de CAMÖD
 * Studio; el nombre de la carpeta es el nombre del proyecto y sus imágenes
 * (en cualquier orden de archivo) forman la galería completa.
 */
export function getCamodProyectos(): CamodProyecto[] {
  const dir = path.join(process.cwd(), "public", "camodProyectos");
  if (!fs.existsSync(dir)) return [];

  const carpetas = fs
    .readdirSync(dir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort(naturalSort);

  return carpetas
    .map((carpeta) => {
      const carpetaPath = path.join(dir, carpeta);
      const imagenes = fs
        .readdirSync(carpetaPath)
        .filter(isImageFile)
        .sort(naturalSort)
        .map((file) => toPublicPath("camodProyectos", carpeta, file));

      return {
        slug: slugify(carpeta),
        nombre: carpeta,
        cover: imagenes[0],
        imagenes,
      };
    })
    .filter((proyecto) => proyecto.imagenes.length > 0);
}
