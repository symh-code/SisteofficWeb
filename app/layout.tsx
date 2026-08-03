import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import WhatsAppButton from "./components/WhatsAppButton";
import { CartProvider } from "./components/CartProvider";
import { TabTitleSwitcher } from "./components/TabTitleSwitcher";
import { JsonLd } from "./components/JsonLd";
import { absoluteUrl, BUSINESS, SITE_NAME, SITE_URL } from "./lib/seo";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const DEFAULT_TITLE = "Mobiliario de oficina a la medida en Barranquilla";
const DEFAULT_DESCRIPTION =
  "SisteOffic fabrica y comercializa mobiliario de oficina a la medida en Barranquilla: sillas, puestos de trabajo, escritorios, mesas de juntas, archivadores y divisiones para proyectos corporativos en toda la Costa Caribe colombiana.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${DEFAULT_TITLE} | ${SITE_NAME}`,
    template: `%s | ${SITE_NAME}`,
  },
  description: DEFAULT_DESCRIPTION,
  alternates: { canonical: absoluteUrl("/") },
  openGraph: {
    title: `${DEFAULT_TITLE} | ${SITE_NAME}`,
    description: DEFAULT_DESCRIPTION,
    url: absoluteUrl("/"),
    siteName: SITE_NAME,
    locale: "es_CO",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${DEFAULT_TITLE} | ${SITE_NAME}`,
    description: DEFAULT_DESCRIPTION,
  },
};

const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "FurnitureStore",
  "@id": absoluteUrl("/#negocio"),
  name: BUSINESS.name,
  legalName: BUSINESS.legalName,
  description: BUSINESS.description,
  url: SITE_URL,
  image: absoluteUrl("/logo_2.svg"),
  logo: absoluteUrl("/logo_2.svg"),
  telephone: BUSINESS.telephone,
  email: BUSINESS.email,
  priceRange: "$$",
  address: {
    "@type": "PostalAddress",
    streetAddress: BUSINESS.streetAddress,
    addressLocality: BUSINESS.addressLocality,
    addressRegion: BUSINESS.addressRegion,
    addressCountry: BUSINESS.addressCountry,
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: BUSINESS.latitude,
    longitude: BUSINESS.longitude,
  },
  areaServed: BUSINESS.areaServed.map((name) => ({ "@type": "City", name })),
  openingHoursSpecification: BUSINESS.openingHours.map((block) => ({
    "@type": "OpeningHoursSpecification",
    dayOfWeek: block.days,
    opens: block.opens,
    closes: block.closes,
  })),
  sameAs: BUSINESS.sameAs,
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": absoluteUrl("/#organizacion"),
  name: BUSINESS.name,
  legalName: BUSINESS.legalName,
  url: SITE_URL,
  logo: absoluteUrl("/logo_2.svg"),
  foundingDate: String(BUSINESS.foundingYear),
  sameAs: BUSINESS.sameAs,
  contactPoint: {
    "@type": "ContactPoint",
    telephone: BUSINESS.telephone,
    email: BUSINESS.email,
    contactType: "ventas",
    areaServed: "CO",
    availableLanguage: "Spanish",
  },
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": absoluteUrl("/#sitio"),
  name: SITE_NAME,
  url: SITE_URL,
  inLanguage: "es-CO",
  potentialAction: {
    "@type": "SearchAction",
    target: `${absoluteUrl("/buscar")}?q={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es-CO"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <JsonLd data={localBusinessJsonLd} />
        <JsonLd data={organizationJsonLd} />
        <JsonLd data={websiteJsonLd} />
      </head>
      <body className="flex min-h-full flex-col bg-slate-50 text-slate-900">
        <CartProvider>
          <TabTitleSwitcher />
          <Navbar />
          <div className="flex-1">{children}</div>
          <WhatsAppButton />
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}