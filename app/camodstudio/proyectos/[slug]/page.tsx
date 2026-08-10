import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { buildMetadata } from "../../../lib/seo";
import { camodProyectos } from "../data";
import { ProyectoGaleria } from "../../../components/ProyectoGaleria";

type ProyectoPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return camodProyectos.map((proyecto) => ({ slug: proyecto.slug }));
}

export async function generateMetadata({ params }: ProyectoPageProps): Promise<Metadata> {
  const { slug } = await params;
  const proyecto = camodProyectos.find((p) => p.slug === slug);

  if (!proyecto) {
    return buildMetadata({
      title: "Proyecto no encontrado",
      description: "Este proyecto de CAMÖD Studio ya no está disponible.",
      path: `/camodstudio/proyectos/${slug}`,
      noIndex: true,
    });
  }

  return buildMetadata({
    title: `${proyecto.nombre} · CAMÖD Studio`,
    description: `Proyecto ${proyecto.nombre}, diseñado y ejecutado por CAMÖD Studio.`,
    path: `/camodstudio/proyectos/${proyecto.slug}`,
  });
}

export default async function ProyectoPage({ params }: ProyectoPageProps) {
  const { slug } = await params;
  const proyecto = camodProyectos.find((p) => p.slug === slug);

  if (!proyecto) {
    notFound();
  }

  const otros = camodProyectos.filter((p) => p.slug !== proyecto.slug).slice(0, 3);

  return (
    <main className="w-full bg-[#FCF5ED]">
      {/* ─── Hero ─── */}
      <section className="relative flex h-[420px] items-end overflow-hidden sm:h-[480px]">
        <Image src={proyecto.cover} alt={proyecto.nombre} fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-[#13110D]/85 via-[#13110D]/25 to-transparent" />
        <div className="relative z-10 mx-auto w-full max-w-6xl px-6 pb-12 sm:px-8">
          <Link
            href="/camodstudio#proyectos"
            className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.2em] text-[#FCF5ED]/70 transition hover:text-[#FCF5ED]"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Proyectos
          </Link>
          <span className="mt-4 block text-[10px] font-semibold uppercase tracking-[0.3em] text-[#C6AB96]">
            CAMÖD Studio
          </span>
          <h1 className="mt-2 max-w-2xl text-3xl font-light tracking-tight text-[#FCF5ED] sm:text-5xl">
            {proyecto.nombre}
          </h1>
        </div>
      </section>

      {/* ─── Galería completa ─── */}
      <section className="mx-auto max-w-6xl px-6 py-16 sm:px-8">
        <ProyectoGaleria nombre={proyecto.nombre} imagenes={proyecto.imagenes} />
      </section>

      {/* ─── Otros proyectos ─── */}
      <section className="bg-[#302416] py-16">
        <div className="mx-auto max-w-6xl px-6 sm:px-8">
          <h2 className="text-2xl font-light tracking-tight text-[#FCF5ED] sm:text-3xl">
            Otros proyectos
          </h2>

          <div className="mt-10 grid grid-cols-1 gap-px bg-[#FCF5ED]/10 sm:grid-cols-3">
            {otros.map((p) => (
              <Link
                key={p.slug}
                href={`/camodstudio/proyectos/${p.slug}`}
                className="group relative flex aspect-[4/5] items-end overflow-hidden bg-[#13110D]"
              >
                <Image
                  src={p.cover}
                  alt={p.nombre}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#13110D]/85 via-[#13110D]/10 to-transparent" />
                <div className="relative z-10 p-5">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#C6AB96]">
                    CAMÖD Studio
                  </span>
                  <h3 className="mt-1 text-base font-medium text-[#FCF5ED]">{p.nombre}</h3>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/camodstudio#agenda"
              className="inline-flex items-center gap-2 rounded-full bg-[#FCF5ED] px-7 py-3 text-sm font-medium text-[#302416] transition hover:bg-[#C6AB96]"
            >
              Agenda una asesoría
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
