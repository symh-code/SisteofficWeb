import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto flex flex-1 flex-col items-center justify-center px-6 py-20 text-center">
      <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">Sin resultados</p>
      <h1 className="mt-4 text-4xl font-semibold text-slate-900">No encontramos coincidencias para esa búsqueda.</h1>
      <p className="mt-4 max-w-xl text-lg leading-8 text-slate-600">
        Intenta con otro término o vuelve a la página de productos para descubrir todas nuestras opciones.
      </p>
      <Link href="/productos" className="mt-8 inline-flex rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-700">
        Ver productos
      </Link>
    </main>
  );
}
