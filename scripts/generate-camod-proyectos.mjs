// Genera app/camodstudio/proyectos/proyectos.generated.json a partir de las
// carpetas en public/camodProyectos. Se ejecuta en build time (Node, con
// filesystem real) porque en runtime la app corre en un Cloudflare Worker,
// que no tiene acceso a `public/` como filesystem — leerlo con fs en ese
// entorno devuelve una lista vacía (por eso "Proyectos" aparecía vacío en
// producción). El resultado queda como JSON estático importado por data.ts.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const IMAGE_EXTENSIONS = new Set([".png", ".jpg", ".jpeg", ".webp", ".jfif"]);
const EXCLUDED_PROJECTS = new Set(["PROYECTO G.P"]);
const COVER_OVERRIDES = {
  "proyecto-comercial": "02.jpeg",
  "proyecto-comercial-cronicas": "04.png",
  "proyecto-h-s": "09.png",
  "proyecto-o-p": "03.jpeg",
  "proyecto-y-y": "WhatsApp Image 2026-08-04 at 11.20.46 PM (1).jpeg",
  "proyecto-hostal": "WhatsApp Image 2026-08-04 at 11.16.35 PM.jpeg",
  "proyecto-j-l": "WhatsApp Image 2026-08-04 at 9.52.40 PM (1).jpeg",
  "proyecto-e-n": "WhatsApp Image 2026-08-04 at 11.15.14 PM (2).jpeg",
};

function slugify(input) {
  return input
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function naturalSort(a, b) {
  return a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" });
}

function isImageFile(fileName) {
  return IMAGE_EXTENSIONS.has(path.extname(fileName).toLowerCase());
}

function toPublicPath(...segments) {
  return "/" + segments.map((segment) => encodeURIComponent(segment)).join("/");
}

function getCamodProyectos() {
  const dir = path.join(ROOT, "public", "camodProyectos");
  if (!fs.existsSync(dir)) return [];

  const carpetas = fs
    .readdirSync(dir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory() && !EXCLUDED_PROJECTS.has(entry.name))
    .map((entry) => entry.name)
    .sort(naturalSort);

  return carpetas
    .map((carpeta) => {
      const carpetaPath = path.join(dir, carpeta);
      const slug = slugify(carpeta);
      const imagenes = fs
        .readdirSync(carpetaPath)
        .filter(isImageFile)
        .sort(naturalSort)
        .map((file) => toPublicPath("camodProyectos", carpeta, file));
      const coverFile = COVER_OVERRIDES[slug];
      const cover = coverFile
        ? toPublicPath("camodProyectos", carpeta, coverFile)
        : imagenes[0] ?? null;

      return {
        slug,
        nombre: carpeta,
        cover,
        imagenes,
      };
    })
    .filter((proyecto) => proyecto.imagenes.length > 0);
}

const proyectos = getCamodProyectos();
const outPath = path.join(ROOT, "app", "camodstudio", "proyectos", "proyectos.generated.json");
fs.writeFileSync(outPath, JSON.stringify(proyectos, null, 2) + "\n");
console.log(`[generate-camod-proyectos] ${proyectos.length} proyectos escritos en ${path.relative(ROOT, outPath)}`);
