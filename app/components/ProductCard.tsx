"use client";

import { useEffect, useState, type MouseEvent } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { ShoppingCart, MessageSquare, X, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "./CartProvider";
import { sendProductQuote } from "../lib/emailjs";
import { absoluteUrl } from "../lib/seo";

type ProductCardProps = {
  product: {
    id: number;
    name: string;
    image: string;
    price: string;
    specifications: string;
  };
};

type QuoteFormData = {
  nombre: string;
  apellido: string;
  correo: string;
  celular: string;
  mensaje: string;
};

type QuoteStatus = "idle" | "submitting" | "success" | "error";

function buildEmptyForm(productName: string): QuoteFormData {
  return {
    nombre: "",
    apellido: "",
    correo: "",
    celular: "",
    mensaje: `Estoy interesado en cotizar: ${productName}`,
  };
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();

  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [form, setForm] = useState<QuoteFormData>(() => buildEmptyForm(product.name));
  const [status, setStatus] = useState<QuoteStatus>("idle");
  const [errors, setErrors] = useState<Partial<Record<keyof QuoteFormData, string>>>({});
  const [justAdded, setJustAdded] = useState(false);
  const [submittedName, setSubmittedName] = useState("");

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isQuoteOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isQuoteOpen]);

  function addProductToCart(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    event.stopPropagation();
    addToCart(product);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1600);
  }

  function openQuoteModal(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    event.stopPropagation();
    setForm(buildEmptyForm(product.name));
    setErrors({});
    setStatus("idle");
    setIsQuoteOpen(true);
  }

  function closeQuoteModal() {
    setIsQuoteOpen(false);
  }

  function handleFieldChange(field: keyof QuoteFormData, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  }

  function validate(): boolean {
    const nextErrors: Partial<Record<keyof QuoteFormData, string>> = {};

    if (!form.nombre.trim()) nextErrors.nombre = "Ingresa tu nombre.";
    if (!form.apellido.trim()) nextErrors.apellido = "Ingresa tu apellido.";
    if (!form.correo.trim()) {
      nextErrors.correo = "Ingresa tu correo.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.correo)) {
      nextErrors.correo = "Ingresa un correo válido.";
    }
    if (!form.celular.trim()) {
      nextErrors.celular = "Ingresa tu celular.";
    } else if (!/^[0-9+\s-]{7,15}$/.test(form.celular)) {
      nextErrors.celular = "Ingresa un número válido.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  async function handleSubmitQuote(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setStatus("submitting");

    try {
      await sendProductQuote(
        {
          first_name: form.nombre,
          last_name: form.apellido,
          email: form.correo,
          phone: form.celular,
          message: form.mensaje,
        },
        {
          name: product.name,
          id: product.id,
          price: product.price,
          url: absoluteUrl(`/productos/${product.id}`),
          image: product.image || undefined,
        }
      );

      setSubmittedName(form.nombre);
      setForm(buildEmptyForm(product.name));
      setStatus("success");
    } catch (error) {
      console.error("Error enviando cotización de producto:", error);
      setStatus("error");
    }
  }

  return (
    <>
      <div className="group relative flex h-full flex-col justify-between bg-white overflow-hidden rounded-xl border border-slate-100 transition-all duration-300 hover:border-slate-200 hover:shadow-xl hover:shadow-slate-900/[0.03]">
        {/* Contenedor de Imagen */}
        <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#faf9f6]">
          <Link
            href={`/productos/${product.id}`}
            className="absolute inset-0 block h-full w-full"
            aria-label={product.name}
          >
            {product.image ? (
              <img
                src={product.image}
                alt={product.name}
                className="h-full w-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = "none";
                }}
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-slate-400">
                <span className="text-xs font-light tracking-widest uppercase">Sin imagen</span>
              </div>
            )}
          </Link>

          {/* Botones de acción rápida */}
          <div className="absolute inset-x-3 bottom-3 z-10 flex gap-2 translate-y-2 opacity-0 transition-all duration-200 ease-out group-hover:translate-y-0 group-hover:opacity-100">
            <button
              onClick={openQuoteModal}
              title="Cotizar producto"
              className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-white/95 px-3 py-2.5 text-xs font-medium text-slate-800 shadow-md transition hover:bg-[#7A1E2B] hover:text-white"
            >
              <MessageSquare className="h-3.5 w-3.5 shrink-0" />
              <span>Cotizar</span>
            </button>

            <button
              onClick={addProductToCart}
              title="Agregar al carrito"
              className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-[#7A1E2B] px-3 py-2.5 text-xs font-medium text-white shadow-md transition hover:bg-[#A02838]"
            >
              {justAdded ? (
                <span className="flex items-center gap-1.5">
                  <Check className="h-3.5 w-3.5 shrink-0" />
                  Agregado
                </span>
              ) : (
                <span className="flex items-center gap-1.5">
                  <ShoppingCart className="h-3.5 w-3.5 shrink-0" />
                  Agregar
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Información del Producto */}
        <div className="flex flex-col justify-between p-5 space-y-3 bg-white">
          <div className="space-y-1">
            <p className="text-[11px] font-medium tracking-wider text-slate-400 uppercase">
              Mobiliario Exclusivo
            </p>
            <Link href={`/productos/${product.id}`}>
              <h3 className="line-clamp-1 text-sm font-medium text-slate-900 transition-colors hover:text-[#7A1E2B]">
                {product.name}
              </h3>
            </Link>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-slate-50">
            <span className="text-sm font-semibold tracking-tight text-slate-900">
              {product.price}
            </span>
            <Link
              href={`/productos/${product.id}`}
              className="text-xs font-medium text-[#7A1E2B] underline-offset-4 hover:underline"
            >
              Ver detalles
            </Link>
          </div>
        </div>
      </div>

      {/* Modal Optimizado sin lag */}
      {mounted && createPortal(
        <AnimatePresence>
          {isQuoteOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6" role="dialog" aria-modal="true">
              {/* Fondo optimizado sin backdrop-filter pesado */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                onClick={closeQuoteModal}
                className="absolute inset-0 bg-slate-950/60"
              />

              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="relative max-h-[92vh] w-full max-w-lg overflow-y-auto rounded-3xl bg-white shadow-2xl border border-slate-100 z-10"
              >
                {/* Header */}
                <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-100 bg-white px-8 py-6">
                  <div className="space-y-1">
                    <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#7A1E2B]">
                      Atención Exclusiva
                    </span>
                    <h2 className="text-xl font-light tracking-tight text-slate-900">
                      Cotizar <span className="font-normal">{product.name}</span>
                    </h2>
                  </div>
                  <button
                    onClick={closeQuoteModal}
                    className="rounded-full p-2 text-slate-400 transition-colors hover:bg-slate-50 hover:text-slate-900"
                    aria-label="Cerrar modal"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>

                {status === "success" ? (
                  <div className="flex flex-col items-center gap-4 px-8 py-20 text-center">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#7A1E2B]/10 text-[#7A1E2B]">
                      <Check className="h-6 w-6" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-lg font-light text-slate-900">Solicitud enviada con éxito</h3>
                      <p className="mx-auto max-w-sm text-xs text-slate-500 font-light leading-relaxed">
                        Gracias {submittedName}, hemos registrado tu interés por <strong className="font-medium text-slate-800">{product.name}</strong>. Un especialista corporativo se pondrá en contacto contigo brevemente.
                      </p>
                    </div>
                    <button
                      onClick={closeQuoteModal}
                      className="mt-4 rounded-xl bg-[#7A1E2B] px-8 py-3 text-xs uppercase tracking-widest font-medium text-white transition-all hover:bg-[#A02838]"
                    >
                      Cerrar ventana
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmitQuote} className="flex flex-col gap-5 px-8 py-8">
                    <div className="grid gap-5 sm:grid-cols-2">
                      <div className="flex flex-col gap-2">
                        <label className="text-[11px] font-medium uppercase tracking-wider text-slate-500">Nombre</label>
                        <input
                          type="text"
                          value={form.nombre}
                          onChange={(e) => handleFieldChange("nombre", e.target.value)}
                          className={`rounded-xl border bg-transparent px-4 py-3 text-xs text-slate-900 outline-none transition-all placeholder:text-slate-300 ${
                            errors.nombre 
                              ? "border-red-300 focus:border-red-400" 
                              : "border-slate-200 focus:border-[#7A1E2B]"
                          }`}
                          placeholder="Tu nombre"
                        />
                        {errors.nombre && <span className="text-[10px] text-red-500 font-medium">{errors.nombre}</span>}
                      </div>

                      <div className="flex flex-col gap-2">
                        <label className="text-[11px] font-medium uppercase tracking-wider text-slate-500">Apellido</label>
                        <input
                          type="text"
                          value={form.apellido}
                          onChange={(e) => handleFieldChange("apellido", e.target.value)}
                          className={`rounded-xl border bg-transparent px-4 py-3 text-xs text-slate-900 outline-none transition-all placeholder:text-slate-300 ${
                            errors.apellido 
                              ? "border-red-300 focus:border-red-400" 
                              : "border-slate-200 focus:border-[#7A1E2B]"
                          }`}
                          placeholder="Tu apellido"
                        />
                        {errors.apellido && <span className="text-[10px] text-red-500 font-medium">{errors.apellido}</span>}
                      </div>
                    </div>

                    <div className="flex flex-col gap-2">
                      <label className="text-[11px] font-medium uppercase tracking-wider text-slate-500">Correo Electrónico</label>
                      <input
                        type="email"
                        value={form.correo}
                        onChange={(e) => handleFieldChange("correo", e.target.value)}
                        className={`rounded-xl border bg-transparent px-4 py-3 text-xs text-slate-900 outline-none transition-all placeholder:text-slate-300 ${
                          errors.correo 
                            ? "border-red-300 focus:border-red-400" 
                            : "border-slate-200 focus:border-[#7A1E2B]"
                        }`}
                        placeholder="correo@ejemplo.com"
                      />
                      {errors.correo && <span className="text-[10px] text-red-500 font-medium">{errors.correo}</span>}
                    </div>

                    <div className="flex flex-col gap-2">
                      <label className="text-[11px] font-medium uppercase tracking-wider text-slate-500">Celular / Teléfono</label>
                      <input
                        type="tel"
                        value={form.celular}
                        onChange={(e) => handleFieldChange("celular", e.target.value)}
                        className={`rounded-xl border bg-transparent px-4 py-3 text-xs text-slate-900 outline-none transition-all placeholder:text-slate-300 ${
                          errors.celular 
                            ? "border-red-300 focus:border-red-400" 
                            : "border-slate-200 focus:border-[#7A1E2B]"
                        }`}
                        placeholder="300 000 0000"
                      />
                      {errors.celular && <span className="text-[10px] text-red-500 font-medium">{errors.celular}</span>}
                    </div>

                    <div className="flex flex-col gap-2">
                      <label className="text-[11px] font-medium uppercase tracking-wider text-slate-500">Mensaje o Requerimientos</label>
                      <textarea
                        rows={3}
                        value={form.mensaje}
                        onChange={(e) => handleFieldChange("mensaje", e.target.value)}
                        className="resize-none rounded-xl border border-slate-200 bg-transparent px-4 py-3 text-xs text-slate-900 outline-none transition-all placeholder:text-slate-300 focus:border-[#7A1E2B]"
                        placeholder="Detalles adicionales sobre tu espacio..."
                      />
                    </div>

                    {status === "error" && (
                      <p className="text-xs text-red-500 font-medium">
                        Ocurrió un error al enviar tu solicitud. Por favor intenta nuevamente.
                      </p>
                    )}

                    <div className="mt-4 flex items-center justify-end gap-3 border-t border-slate-100 pt-6">
                      <button
                        type="button"
                        onClick={closeQuoteModal}
                        className="rounded-xl border border-slate-200 px-6 py-3 text-xs uppercase tracking-widest font-medium text-slate-600 transition-all hover:border-slate-300 hover:bg-slate-50"
                      >
                        Cancelar
                      </button>
                      <button
                        type="submit"
                        disabled={status === "submitting"}
                        className="flex min-w-[140px] items-center justify-center rounded-xl bg-[#7A1E2B] px-6 py-3 text-xs uppercase tracking-widest font-medium text-white transition-all hover:bg-[#A02838] disabled:opacity-70"
                      >
                        {status === "submitting" ? (
                          <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                        ) : (
                          "Enviar Solicitud"
                        )}
                      </button>
                    </div>
                  </form>
                )}
              </motion.div>
            </div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
}