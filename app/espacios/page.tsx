import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
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
      <section className="relative flex h-[380px] items-center justify-center overflow-hidden sm:h-[420px]">
        <Image
          src="/banner_2.jpg"
          alt="Espacios corporativos diseñados por SisteOffic en Barranquilla"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
          <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-white/80">
            SisteOffic · Espacios
          </span>
          <h1 className="mt-4 text-3xl font-light tracking-tight text-white sm:text-5xl">
            Espacios corporativos diseñados para trabajar mejor
          </h1>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 py-16 text-center sm:px-8">
        <h2 className="text-2xl font-light tracking-tight text-slate-900 sm:text-3xl">
          Transformamos oficinas, salas de juntas y áreas comerciales
        </h2>
        <p className="mt-4 text-sm font-light leading-relaxed text-slate-600">
          Acompañamos cada proyecto desde el levantamiento del espacio hasta la instalación final,
          combinando mobiliario a la medida, distribución funcional y diseño de interiores para
          crear ambientes que potencien la productividad y la imagen de tu empresa.
        </p>
        <Link
          href="/contacto"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#7A1E2B] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#651825]"
        >
          Cuéntanos tu proyecto
          <ArrowRight className="h-4 w-4" />
        </Link>
      </section>

      <EspaciosGaleria />
    </main>
  );
}
