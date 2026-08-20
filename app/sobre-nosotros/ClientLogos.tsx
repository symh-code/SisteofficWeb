"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const clientes = [
  {
    nombre: "Drummond LTD Colombia",
    logo: "/clientes/drummond-v2.webp",
    className: "max-h-32 max-w-[145px] sm:max-w-[170px]",
  },
  {
    nombre: "Farmatodo",
    logo: "/clientes/farmatodo-v2.webp",
    className: "max-h-24 max-w-[145px] sm:max-w-[230px]",
  },
  {
    nombre: "Combarranquilla",
    logo: "/clientes/combarranquilla-v2.webp",
    className: "max-h-24 max-w-[145px] sm:max-w-[230px]",
  },
  {
    nombre: "Universidad Libre",
    logo: "/clientes/universidad-libre-v2.webp",
    className: "max-h-32 max-w-[130px] sm:max-w-[150px]",
  },
  {
    nombre: "Mac Pollo",
    logo: "/clientes/mac-pollo-v2.webp",
    className: "max-h-32 max-w-[145px] sm:max-w-[190px]",
  },
] as const;

export default function ClientLogos() {
  return (
    <div className="mt-12 grid grid-cols-2 items-center gap-x-8 gap-y-12 sm:grid-cols-3 lg:grid-cols-5">
      {clientes.map((cliente, index) => (
        <motion.div
          key={cliente.nombre}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.55, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ y: -7, scale: 1.035 }}
          className="group relative flex min-h-40 items-center justify-center"
        >
          <span
            aria-hidden="true"
            className="absolute bottom-3 left-1/2 h-px w-0 -translate-x-1/2 bg-[#7A1E2B]/45 transition-all duration-500 group-hover:w-2/3"
          />
          <Image
            src={cliente.logo}
            alt={`Logo de ${cliente.nombre}`}
            width={240}
            height={150}
            className={`h-auto w-auto object-contain transition-[filter,opacity] duration-500 ${cliente.className}`}
          />
        </motion.div>
      ))}
    </div>
  );
}
