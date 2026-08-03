"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "./CartProvider";

type ProductDetailActionsProps = {
  product: {
    id: number;
    nombre: string;
    imagen_url: string | null;
    precio: number | string | null;
    especificaciones: string | null;
    created_at: string;
    updated_At: string;
  };
};

function formatPrice(price: number | string | null) {
  const value = Number(price ?? 0);

  if (!Number.isFinite(value)) {
    return "Precio no disponible";
  }

  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  }).format(value);
}

export function ProductDetailActions({ product }: ProductDetailActionsProps) {
  const router = useRouter();
  const { addToCart } = useCart();

  function handleAddToCart() {
    addToCart({
      id: product.id,
      name: product.nombre,
      image: product.imagen_url ?? "",
      price: formatPrice(product.precio),
      specifications: product.especificaciones ?? "",
    });
  }

  function handleQuote() {
    handleAddToCart();
    router.push("/carrito");
  }

  return (
    <div className="mt-8 flex flex-wrap gap-4">
      <button
        type="button"
        onClick={handleAddToCart}
        className="rounded-full bg-[#7A1E2B] px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90"
      >
        Agregar al carrito
      </button>

      <button
        type="button"
        onClick={handleQuote}
        className="rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
      >
        Cotizar
      </button>

      <Link
        href="/productos"
        className="rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
      >
        Ver más productos
      </Link>
    </div>
  );
}
