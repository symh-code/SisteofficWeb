import type { Metadata } from "next";
import { HomeClient } from "./components/HomeClient";
import { buildMetadata } from "./lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Mobiliario de oficina a la medida en Barranquilla",
  description:
    "SisteOffic diseña y fabrica mobiliario de oficina a la medida en Barranquilla: sillas, puestos de trabajo, escritorios, mesas de juntas y divisiones, para proyectos corporativos en toda la Costa Caribe colombiana. Más de 12 años de experiencia.",
  path: "/",
});

export default function HomePage() {
  return <HomeClient />;
}
