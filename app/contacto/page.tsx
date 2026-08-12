import type { Metadata } from "next";
import Link from "next/link";
import { ContactForm } from "./ContactForm";
import { JsonLd } from "../components/JsonLd";
import { absoluteUrl, buildMetadata, BUSINESS } from "../lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Contacto en Barranquilla",
  description:
    "Contacta a SisteOffic en Barranquilla: Cl. 85 #81 32, Riomar. Cotiza mobiliario de oficina a la medida por teléfono, correo o WhatsApp para tu proyecto en la Costa Caribe.",
  path: "/contacto",
});

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Inicio", item: absoluteUrl("/") },
    { "@type": "ListItem", position: 2, name: "Contacto", item: absoluteUrl("/contacto") },
  ],
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#faf9f6] text-slate-900 selection:bg-[#7A1E2B] selection:text-white">
      <JsonLd data={breadcrumbJsonLd} />

      {/* Cabecera Minimalista Editorial */}
      <header className="mx-auto max-w-7xl px-6 pt-20 pb-12 sm:px-8 lg:px-12">
        <div className="space-y-4 max-w-2xl">
          <span className="inline-block text-[10px] font-semibold uppercase tracking-[0.3em] text-[#7A1E2B]">
            SisteOffic • Barranquilla
          </span>
          <h1 className="text-4xl font-light tracking-tight text-slate-900 sm:text-6xl">
            Contáctanos
          </h1>
          <p className="text-sm font-light text-slate-500 leading-relaxed pt-2">
            ¿Qué podemos hacer por ti? Escríbenos, llámanos o visítanos en nuestra sede de Barranquilla.
            Esperamos saber de ti pronto.
          </p>
        </div>
      </header>

      {/* Contenido Principal: Split Layout Minimalista */}
      <main className="mx-auto max-w-7xl px-6 pb-24 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-24 items-start">

          {/* Columna Izquierda: Información de Contacto y Redes */}
          <div className="lg:col-span-5 space-y-12">

            {/* Datos de contacto distribuidos */}
            <div className="grid grid-cols-2 gap-8 text-xs tracking-wide">
              <div className="space-y-6">
                <div>
                  <span className="block font-medium uppercase tracking-[0.2em] text-[#7A1E2B] mb-1">
                    Oficina Principal
                  </span>
                  <address className="not-italic text-slate-600 font-light leading-relaxed">
                    {BUSINESS.streetAddress}<br />
                    {BUSINESS.addressLocality}, {BUSINESS.addressRegion}
                  </address>
                </div>

                <div>
                  <span className="block font-medium uppercase tracking-[0.2em] text-[#7A1E2B] mb-1">
                    Teléfono / WhatsApp
                  </span>
                  <p className="text-slate-600 font-light">
                    <a
                      href="https://wa.me/573003591054"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {BUSINESS.telephone}
                    </a>
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <span className="block font-medium uppercase tracking-[0.2em] text-[#7A1E2B] mb-1">
                    General
                  </span>
                  <p className="text-slate-600 font-light">
                    <a href={`mailto:${BUSINESS.email}`}>{BUSINESS.email}</a>
                  </p>
                </div>
              </div>
            </div>

            {/* Redes Sociales Minimalistas */}
            <div className="space-y-3 pt-4 border-t border-slate-200/60">
              <span className="block text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400">
                Síguenos
              </span>
              <div className="flex items-center gap-3">
                {/* Facebook */}
                <Link href="https://www.facebook.com/sisteofficjlsas" aria-label="Facebook" className="flex h-9 w-9 items-center justify-center rounded-lg bg-white border border-slate-200/80 text-slate-600 transition-all hover:bg-[#7A1E2B] hover:text-white hover:border-transparent">
                  <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                </Link>
                {/* Instagram */}
                <Link href="https://www.instagram.com/sisteofficjl/" aria-label="Instagram" className="flex h-9 w-9 items-center justify-center rounded-lg bg-white border border-slate-200/80 text-slate-600 transition-all hover:bg-[#7A1E2B] hover:text-white hover:border-transparent">
                  <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                </Link>
              </div>
            </div>

          </div>

          {/* Columna Derecha: Formulario de Contacto */}
          <div className="lg:col-span-7">
            <ContactForm />
          </div>

        </div>
      </main>
    </div>
  );
}
