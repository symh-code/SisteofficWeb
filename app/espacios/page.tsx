import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";
import { buildMetadata } from "../lib/seo";
import { EspaciosGaleria } from "../components/EspaciosGaleria";

export const metadata: Metadata = buildMetadata({
  title: "Espacios",
  description:
    "Diseñamos y transformamos espacios corporativos en Barranquilla: oficinas, salas de juntas, áreas colaborativas y espacios comerciales pensados a la medida de cada equipo.",
  path: "/espacios",
});

export default function EspaciosPage() {
  return (
    <main className="w-full bg-white">
      <EspaciosGaleria />

      <section className="border-t border-[#E5E0DA] bg-white px-6 py-20 sm:px-8 sm:py-24">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="font-serif text-3xl font-normal tracking-tight text-slate-900 sm:text-5xl">
            Espacios corporativos diseñados para trabajar mejor
          </h1>
          <h2 className="mt-8 text-2xl font-light tracking-tight text-slate-900 sm:text-3xl">
            Transformamos oficinas, salas de juntas y áreas comerciales
          </h2>
          <p className="mt-4 text-sm font-light leading-relaxed text-slate-600">
            Acompañamos cada proyecto desde el levantamiento del espacio hasta la instalación final,
            combinando mobiliario a la medida, distribución funcional y diseño de interiores para
            crear ambientes que potencien la productividad y la imagen de tu empresa.
          </p>
          <div className="mt-8 flex flex-col items-center gap-3">
            <Link
              href="/contacto"
              className="inline-flex items-center gap-2 rounded-full bg-[#7A1E2B] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#651825]"
            >
              Cuéntanos tu proyecto
              <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href="https://wa.me/573003591054"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-[#1F8F5F] px-6 py-3 text-sm font-medium text-[#176F4A] transition hover:bg-[#1F8F5F] hover:text-white"
            >
              Escríbenos por WhatsApp
              <MessageCircle className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
