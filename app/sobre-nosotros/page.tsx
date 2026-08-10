import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Flag, Eye } from "lucide-react";
import { buildMetadata } from "../lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Sobre Nosotros",
  description:
    "16 años fabricando mobiliario de oficina a la medida en Barranquilla. Conoce a Sisteoffic JL: producción propia, diseño de interiores con CAMÖD Studio y proyectos corporativos llave en mano en la Costa Caribe colombiana.",
  path: "/sobre-nosotros",
});

const soluciones: { numero: string; titulo: string; descripcion: string }[] = [
  {
    numero: "01",
    titulo: "Diseño estratégico",
    descripcion: "Arquitectura + Interiorismo + CAMÖD",
  },
  {
    numero: "02",
    titulo: "Fabricación",
    descripcion: "Mobiliario corporativo a la medida",
  },
  {
    numero: "03",
    titulo: "Ejecución integral",
    descripcion: "Adecuaciones + Instalación + Llave en mano",
  },
];

export default function SobreNosotrosPage() {
  return (
    <main className="w-full bg-white">
      {/* ─── Hero ─── */}
      <section className="relative flex h-[380px] items-center justify-center overflow-hidden sm:h-[420px]">
        <Image
          src="/banner_2.jpg"
          alt="Oficina moderna fabricada por Sisteoffic JL en Barranquilla"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
          <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-white/80">
            Sisteoffic JL · Barranquilla, Atlántico
          </span>
          <h1 className="mt-4 text-3xl font-light tracking-tight text-white sm:text-5xl">
            Años fabricando mobiliarios corporativos en Barranquilla
          </h1>
        </div>
      </section>

      {/* ─── Nuestra Historia ─── */}
      <section className="mx-auto max-w-5xl px-6 py-20 sm:px-8 lg:px-12">
        <div className="text-center">
          <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#7A1E2B]">
            Nuestra Historia
          </span>
          <h2 className="mx-auto mt-4 max-w-3xl text-3xl font-light tracking-tight text-slate-900 sm:text-4xl leading-tight">
            Diseño, fabricación y ejecución bajo un mismo techo
          </h2>
        </div>

        <div className="mx-auto mt-8 max-w-3xl space-y-5 text-sm font-light leading-relaxed text-slate-600 sm:text-base">
          <p>
            En Sisteoffic JL llevamos más de 16 años desarrollando proyectos corporativos que
            integran diseño, fabricación de mobiliario y ejecución de espacios. Acompañamos a
            nuestros clientes desde la planificación hasta la instalación final, creando
            ambientes funcionales, duraderos y alineados con la identidad de cada empresa.
          </p>
          <p>
            Hoy fortalecemos esta visión con CAMÖD Studio, nuestro estudio creativo
            especializado en arquitectura y diseño interior, ofreciendo una solución integral
            desde la conceptualización hasta la entrega del proyecto.
          </p>
        </div>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full bg-[#7A1E2B] px-7 py-3 text-sm font-medium text-white transition hover:bg-[#651825]"
          >
            Conoce Sisteoffic JL
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/camodstudio"
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-7 py-3 text-sm font-medium text-slate-800 transition hover:border-[#7A1E2B] hover:text-[#7A1E2B]"
          >
            Descubre CAMÖD Studio
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* ─── Nuestras Soluciones ─── */}
      <section className="bg-slate-50 py-20">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <div className="text-center">
            <h2 className="text-3xl font-light tracking-tight text-slate-900 sm:text-4xl">
              Nuestras Soluciones
            </h2>
          </div>

          <div className="mt-14 grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
            {/* Foto */}
            <div className="lg:col-span-6">
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl shadow-2xl shadow-slate-900/10">
                <Image
                  src="/slideshero/slide2.png"
                  alt="Sala de juntas corporativa diseñada y fabricada por Sisteoffic JL"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Lista de soluciones */}
            <div className="lg:col-span-6">
              <div className="flex flex-col">
                {soluciones.map((solucion, index) => (
                  <div key={solucion.numero}>
                    <div className="flex items-start gap-6 py-7">
                      <span className="shrink-0 text-3xl font-light text-[#7A1E2B]/40 sm:text-4xl">
                        {solucion.numero}
                      </span>
                      <div>
                        <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-900 sm:text-base">
                          {solucion.titulo}
                        </h3>
                        <p className="mt-2 text-sm font-light leading-relaxed text-slate-600">
                          {solucion.descripcion}
                        </p>
                      </div>
                    </div>
                    {index < soluciones.length - 1 && (
                      <div className="h-px w-full bg-slate-200" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
