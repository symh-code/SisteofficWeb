import type { Metadata } from "next";

/**
 * Dominio de producción. Mientras no haya un dominio propio confirmado en
 * Cloudflare, se usa este valor por defecto — actualízalo (o define
 * NEXT_PUBLIC_SITE_URL en el entorno de despliegue) en cuanto el dominio
 * final esté listo: todo canonical, sitemap, robots y JSON-LD se calculan
 * a partir de este único valor.
 */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://sisteoffic.com";

export const SITE_NAME = "SisteOffic";

export const BUSINESS = {
  name: "SisteOffic",
  legalName: "Sisteoffic JL S.A.S.",
  description:
    "Fabricación y comercialización de mobiliario de oficina a la medida en Barranquilla: sillas gerenciales, ejecutivas, interlocutoras, tándem, presidenciales, universitarias y secretariales, puestos de trabajo modulares, escritorios, counters, mesas de juntas, archivadores y divisiones de oficina.",
  telephone: "+57 300 359 1054",
  email: "comercial.sisteofficjl@gmail.com",
  foundingYear: 2013, // ~12 años de trayectoria a 2026
  streetAddress: "Cl. 85 #81 32, Riomar",
  addressLocality: "Barranquilla",
  addressRegion: "Atlántico",
  addressCountry: "CO",
  // Coordenadas aproximadas del barrio Riomar, norte de Barranquilla.
  // TODO: reemplazar por las coordenadas exactas del Google Business Profile.
  latitude: 11.0086,
  longitude: -74.842,
  areaServed: [
    "Barranquilla",
    "Puerto Colombia",
    "Soledad",
    "Atlántico",
    "Costa Caribe colombiana",
  ],
  sameAs: [
    "https://www.facebook.com/sisteofficjlsas",
    "https://www.instagram.com/sisteofficjl/",
    "https://provee.com.co/empresas/sisteoffic-jl-sas",
  ],
  openingHours: [
    {
      days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:00",
      closes: "18:00",
    },
    { days: ["Saturday"], opens: "09:00", closes: "14:00" },
  ],
};

export function absoluteUrl(path: string): string {
  return new URL(path, SITE_URL).toString();
}

type BuildMetadataInput = {
  title: string;
  description: string;
  path: string;
  image?: string | null;
  noIndex?: boolean;
};

export function buildMetadata({
  title,
  description,
  path,
  image,
  noIndex,
}: BuildMetadataInput): Metadata {
  const url = absoluteUrl(path);
  const images = image ? [{ url: image }] : undefined;

  return {
    title,
    description,
    alternates: { canonical: url },
    robots: noIndex ? { index: false, follow: false } : { index: true, follow: true },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      locale: "es_CO",
      type: "website",
      images,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: image ? [image] : undefined,
    },
  };
}
