export type MobiliarioSubcategoria = {
  nombre: string;
  slug: string;
};

export type MobiliarioCategoria = {
  nombre: string;
  slug: string;
  subcategorias?: MobiliarioSubcategoria[];
};

export const MOBILIARIO_CATEGORIAS: MobiliarioCategoria[] = [
  {
    nombre: "Puesto de trabajo",
    slug: "puesto-de-trabajo",
    subcategorias: [
      { nombre: "Escritorios", slug: "escritorios" },
      { nombre: "Islas de trabajo", slug: "islas-de-trabajo" },
    ],
  },
  {
    nombre: "Mesas",
    slug: "mesas",
    subcategorias: [
      { nombre: "Mesas de juntas", slug: "mesas-de-juntas" },
      { nombre: "Mesas", slug: "mesas-generales" },
    ],
  },
  {
    nombre: "Sillas",
    slug: "sillas",
    subcategorias: [
      { nombre: "Sillas operativas y ejecutivas", slug: "sillas-operativas-ejecutivas" },
      { nombre: "Lounge", slug: "lounge" },
      { nombre: "Gerenciales", slug: "gerenciales" },
      { nombre: "Interlocutoras", slug: "interlocutoras" },
      { nombre: "Sala de espera", slug: "sala-de-espera" },
    ],
  },
  {
    nombre: "Almacenamiento",
    slug: "almacenamiento",
    subcategorias: [
      { nombre: "Lockers", slug: "lockers" },
      { nombre: "Estantería", slug: "estanteria" },
      { nombre: "Archivadores", slug: "archivadores" },
    ],
  },
  { nombre: "Línea educativa", slug: "linea-educativa" },
  { nombre: "Cabinas Zenbox", slug: "cabinas-zenbox" },
  { nombre: "Divisiones", slug: "divisiones" },
  { nombre: "Counter", slug: "counter" },
  { nombre: "Mobiliario especial", slug: "mobiliario-especial" },
  { nombre: "Accesorios", slug: "accesorios" },
];

export function mobiliarioHref(slug: string): string {
  return `/buscar?categoria=${encodeURIComponent(slug)}`;
}
