"use client";

import Link from "next/link";
import { useEffect, useMemo, useState, type MouseEvent } from "react";
import { createPortal } from "react-dom";
import { useCart } from "./CartProvider";
import { sendCartQuote, formatQuoteItems, EmailJsConfigError } from "../lib/emailjs";

type QuoteFormData = {
  nombre: string;
  apellido: string;
  correo: string;
  celular: string;
  mensaje: string;
};

type QuoteStatus = "idle" | "submitting" | "success" | "error";

function formatPrice(value: number): string {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  }).format(value);
}

function buildEmptyForm(): QuoteFormData {
  return {
    nombre: "",
    apellido: "",
    correo: "",
    celular: "",
    mensaje: "Quisiera recibir la cotización de estos productos.",
  };
}

export function CartPage() {
  const { items, itemCount, total, updateQuantity, removeFromCart, clearCart } = useCart();

  const subtotal = useMemo(() => total, [total]);

  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [form, setForm] = useState<QuoteFormData>(() => buildEmptyForm());
  const [status, setStatus] = useState<QuoteStatus>("idle");
  const [errors, setErrors] = useState<Partial<Record<keyof QuoteFormData, string>>>(
    {}
  );
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

  function openQuoteModal() {
    setForm(buildEmptyForm());
    setErrors({});
    setStatus("idle");
    setIsQuoteOpen(true);
  }

  function closeQuoteModal() {
    setIsQuoteOpen(false);
  }

  function handleFieldChange(field: keyof QuoteFormData, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
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
      await sendCartQuote(
        {
          first_name: form.nombre,
          last_name: form.apellido,
          email: form.correo,
          phone: form.celular,
          message: form.mensaje,
        },
        {
          items,
          itemCount,
          totalPrice: formatPrice(subtotal),
        }
      );

      setSubmittedName(form.nombre);
      setForm(buildEmptyForm());
      setStatus("success");
    } catch (error) {
      console.error("Error enviando cotización del carrito:", error);
      // Si faltan las variables de entorno de EmailJS, abrimos un mailto
      // prellenado como fallback para que el usuario pueda enviar la cotización.
      if (error instanceof EmailJsConfigError) {
        const subject = encodeURIComponent("Solicitud de cotización - SisteOffic");
        const bodyLines = [
          `Nombre: ${form.nombre} ${form.apellido}`,
          `Correo: ${form.correo}`,
          `Celular: ${form.celular}`,
          "",
          "Mensaje:",
          form.mensaje,
          "",
          "Items:",
          formatQuoteItems(items),
          "",
          `Total estimado: ${formatPrice(subtotal)}`,
        ];
        const body = encodeURIComponent(bodyLines.join("\n"));
        const mailto = `mailto:comercial.sisteofficjl@gmail.com?subject=${subject}&body=${body}`;
        // Abrir el cliente de correo del usuario
        if (typeof window !== "undefined") window.location.href = mailto;
        setSubmittedName(form.nombre);
        setForm(buildEmptyForm());
        setStatus("success");
        return;
      }

      setStatus("error");
    }
  }

  function handleQuoteSuccessClose() {
    closeQuoteModal();
    clearCart();
  }

  if (items.length === 0) {
    return (
      <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col px-6 py-20 lg:px-12">
        <div className="border-b border-stone-200/80 pb-8">
          <span className="text-xs font-medium uppercase tracking-[0.25em] text-[#7A1E2B]">
            Selección de Diseño
          </span>
          <h1 className="mt-3 font-serif text-3xl font-light tracking-tight text-stone-950 sm:text-4xl">
            Tu carrito está vacío
          </h1>
        </div>

        <div className="mt-12 flex flex-col items-center justify-center rounded-2xl border border-dashed border-stone-200 bg-stone-50/50 py-24 text-center">
          <p className="max-w-md text-sm text-stone-500 font-light">
            No has seleccionado ningún elemento para cotizar. Explora nuestro catálogo y descubre piezas diseñadas para transformar tus espacios.
          </p>
          <Link
            href="/buscar"
            className="mt-8 inline-flex items-center justify-center rounded-none bg-stone-950 px-8 py-3.5 text-xs font-medium uppercase tracking-[0.2em] text-white transition-all duration-300 hover:bg-[#7A1E2B]"
          >
            Explorar catálogo
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col px-6 py-16 lg:px-12">
      {/* Encabezado */}
      <div className="flex flex-col gap-4 border-b border-stone-200/80 pb-8 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <span className="text-xs font-medium uppercase tracking-[0.25em] text-[#7A1E2B]">
            Sumario de Proyecto
          </span>
          <h1 className="mt-2 font-serif text-3xl font-light tracking-tight text-stone-950 sm:text-4xl">
            Carrito de Cotización
          </h1>
          <p className="mt-2 text-xs uppercase tracking-wider text-stone-500 font-medium">
            {itemCount} {itemCount === 1 ? "pieza seleccionada" : "piezas seleccionadas"}
          </p>
        </div>

        <button
          type="button"
          onClick={clearCart}
          className="text-xs font-medium uppercase tracking-widest text-stone-400 transition hover:text-[#7A1E2B]"
        >
          Vaciar selección
        </button>
      </div>

      {/* Contenido Principal */}
      <div className="mt-12 grid gap-12 lg:grid-cols-[1fr_420px]">
        {/* Listado de Productos Minimalista */}
        <section className="flex flex-col divide-y divide-stone-100">
          {items.map((item) => (
            <div
              key={item.id}
              className="group flex flex-col gap-6 py-6 sm:flex-row sm:items-center sm:justify-between first:pt-0 last:pb-0"
            >
              <div className="flex items-center gap-6">
                <div className="relative h-28 w-28 shrink-0 overflow-hidden bg-stone-100">
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-full w-full object-cover object-center transition duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-[10px] uppercase tracking-widest text-stone-400">
                      Sin imagen
                    </div>
                  )}
                </div>

                <div className="flex flex-col">
                  <h2 className="font-serif text-lg font-normal text-stone-900">{item.name}</h2>
                  <p className="mt-1 text-xs text-stone-500 font-light line-clamp-2 max-w-xs">
                    {item.specifications || "Acabado exclusivo Sisteoffic"}
                  </p>
                  <span className="mt-3 text-sm font-medium text-stone-900">
                    {formatPrice(parseInt(item.price.replace(/[^0-9]/g, ""), 10))}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between sm:justify-end sm:gap-8">
                {/* Selector de cantidad minimalista */}
                <div className="flex items-center border border-stone-200 bg-white">
                  <button
                    type="button"
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="flex h-9 w-9 items-center justify-center text-stone-500 transition hover:bg-stone-50 hover:text-stone-900"
                    aria-label={`Disminuir cantidad de ${item.name}`}
                  >
                    −
                  </button>
                  <span className="w-8 text-center text-xs font-medium text-stone-900">
                    {item.quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="flex h-9 w-9 items-center justify-center text-stone-500 transition hover:bg-stone-50 hover:text-stone-900"
                    aria-label={`Aumentar cantidad de ${item.name}`}
                  >
                    +
                  </button>
                </div>

                <div className="text-right min-w-[100px]">
                  <p className="text-sm font-medium text-stone-950">
                    {formatPrice(parseInt(item.price.replace(/[^0-9]/g, ""), 10) * item.quantity)}
                  </p>
                  <button
                    type="button"
                    onClick={() => removeFromCart(item.id)}
                    className="mt-1 text-[11px] uppercase tracking-wider text-stone-400 transition hover:text-[#7A1E2B]"
                  >
                    Remover
                  </button>
                </div>
              </div>
            </div>
          ))}
        </section>

        {/* Resumen Lateral Tipo Arquitectura/Estudio */}
        <aside className="h-fit bg-stone-50/70 p-8 border border-stone-200/60">
          <h2 className="font-serif text-xl font-light text-stone-950">Resumen de Cotización</h2>
          
          <div className="mt-8 space-y-4 text-sm text-stone-600 font-light">
            <div className="flex items-center justify-between pb-3 border-b border-stone-200/60">
              <span className="text-xs uppercase tracking-wider text-stone-500">Piezas totales</span>
              <span className="font-medium text-stone-900">{itemCount}</span>
            </div>
            <div className="flex items-center justify-between pb-3 border-b border-stone-200/60">
              <span className="text-xs uppercase tracking-wider text-stone-500">Subtotal</span>
              <span className="font-medium text-stone-900">{formatPrice(subtotal)}</span>
            </div>
            <div className="flex items-center justify-between pt-2 text-base text-stone-950">
              <span className="font-serif text-lg">Estimado Total</span>
              <span className="font-semibold">{formatPrice(subtotal)}</span>
            </div>
          </div>

          <button
            type="button"
            onClick={openQuoteModal}
            className="mt-8 w-full bg-stone-950 py-4 text-xs font-medium uppercase tracking-[0.2em] text-white transition-all duration-300 hover:bg-[#7A1E2B]"
          >
            Solicitar Cotización Formal
          </button>

          <p className="mt-4 text-[11px] leading-relaxed text-stone-400 font-light text-center">
            Complete sus datos para recibir una propuesta detallada directamente en su correo electrónico.
          </p>
        </aside>
      </div>

      {mounted && isQuoteOpen &&
        createPortal(
          <QuoteModal
            items={items}
            itemCount={itemCount}
            subtotal={subtotal}
            form={form}
            submittedName={submittedName}
            status={status}
            errors={errors}
            onFieldChange={handleFieldChange}
            onSubmit={handleSubmitQuote}
            onClose={closeQuoteModal}
            onSuccessClose={handleQuoteSuccessClose}
          />,
          document.body
        )}
    </main>
  );
}

function QuoteModal({
  items,
  itemCount,
  subtotal,
  form,
  submittedName,
  status,
  errors,
  onFieldChange,
  onSubmit,
  onClose,
  onSuccessClose,
}: {
  items: ReturnType<typeof useCart>["items"];
  itemCount: number;
  subtotal: number;
  form: QuoteFormData;
  submittedName: string;
  status: QuoteStatus;
  errors: Partial<Record<keyof QuoteFormData, string>>;
  onFieldChange: (field: keyof QuoteFormData, value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onClose: () => void;
  onSuccessClose: () => void;
}) {
  function stop(event: MouseEvent<HTMLElement>) {
    event.stopPropagation();
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-stone-950/40 backdrop-blur-sm p-4 animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="cart-quote-modal-title"
      onClick={(event) => {
        stop(event);
        onClose();
      }}
    >
      <div
        className="max-h-[92vh] w-full max-w-xl overflow-y-auto bg-white shadow-2xl border border-stone-200"
        onClick={stop}
      >
        {/* Header Minimalista */}
        <div className="flex items-start justify-between border-b border-stone-100 px-8 py-6">
          <div>
            <span className="text-[10px] font-medium uppercase tracking-[0.25em] text-[#7A1E2B]">
              Gestión de Propuesta
            </span>
            <h2 id="cart-quote-modal-title" className="mt-1 font-serif text-2xl font-light text-stone-950">
              Detalles de Contacto
            </h2>
          </div>

          <button
            type="button"
            onClick={(event) => {
              stop(event);
              onClose();
            }}
            aria-label="Cerrar"
            className="text-stone-400 transition hover:text-stone-950 p-2"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Resumen ultra compacto */}
        <div className="border-b border-stone-100 bg-stone-50 px-8 py-4">
          <div className="flex items-center justify-between text-xs text-stone-500 font-light">
            <span>{itemCount} {itemCount === 1 ? "artículo seleccionado" : "artículos seleccionados"}</span>
            <span className="font-medium text-stone-900">Total: {formatPrice(subtotal)}</span>
          </div>
        </div>

        {status === "success" ? (
          <div className="flex flex-col items-center gap-4 px-8 py-16 text-center">
            <div className="flex h-12 w-12 items-center justify-center bg-stone-900 text-white">
              <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="font-serif text-xl font-normal text-stone-950">Solicitud Recibida</h3>
            <p className="max-w-sm text-xs font-light text-stone-500 leading-relaxed">
              Estimado/a <span className="font-medium text-stone-800">{submittedName}</span>, hemos registrado su solicitud satisfactoriamente. Nuestro equipo comercial se pondrá en contacto con usted a la brevedad.
            </p>
            <button
              type="button"
              onClick={(event) => {
                stop(event);
                onSuccessClose();
              }}
              className="mt-4 bg-stone-950 px-8 py-3 text-xs font-medium uppercase tracking-[0.2em] text-white transition hover:bg-[#7A1E2B]"
            >
              Finalizar
            </button>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="flex flex-col gap-6 px-8 py-8">
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="flex flex-col gap-2">
                <label htmlFor="cart-quote-nombre" className="text-[11px] font-medium uppercase tracking-wider text-stone-600">
                  Nombre
                </label>
                <input
                  id="cart-quote-nombre"
                  type="text"
                  value={form.nombre}
                  onChange={(e) => onFieldChange("nombre", e.target.value)}
                  className={`border bg-transparent px-4 py-3 text-xs text-stone-900 outline-none transition ${
                    errors.nombre
                      ? "border-red-300 focus:border-red-500"
                      : "border-stone-200 focus:border-stone-950"
                  }`}
                  placeholder="Ej. Sofía"
                />
                {errors.nombre && <span className="text-[10px] text-red-500">{errors.nombre}</span>}
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="cart-quote-apellido" className="text-[11px] font-medium uppercase tracking-wider text-stone-600">
                  Apellido
                </label>
                <input
                  id="cart-quote-apellido"
                  type="text"
                  value={form.apellido}
                  onChange={(e) => onFieldChange("apellido", e.target.value)}
                  className={`border bg-transparent px-4 py-3 text-xs text-stone-900 outline-none transition ${
                    errors.apellido
                      ? "border-red-300 focus:border-red-500"
                      : "border-stone-200 focus:border-stone-950"
                  }`}
                  placeholder="Ej. Miller"
                />
                {errors.apellido && <span className="text-[10px] text-red-500">{errors.apellido}</span>}
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="cart-quote-correo" className="text-[11px] font-medium uppercase tracking-wider text-stone-600">
                Correo Electrónico
              </label>
              <input
                id="cart-quote-correo"
                type="email"
                value={form.correo}
                onChange={(e) => onFieldChange("correo", e.target.value)}
                className={`border bg-transparent px-4 py-3 text-xs text-stone-900 outline-none transition ${
                  errors.correo
                    ? "border-red-300 focus:border-red-500"
                    : "border-stone-200 focus:border-stone-950"
                }`}
                placeholder="nombre@dominio.com"
              />
              {errors.correo && <span className="text-[10px] text-red-500">{errors.correo}</span>}
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="cart-quote-celular" className="text-[11px] font-medium uppercase tracking-wider text-stone-600">
                Teléfono Celular
              </label>
              <input
                id="cart-quote-celular"
                type="tel"
                value={form.celular}
                onChange={(e) => onFieldChange("celular", e.target.value)}
                className={`border bg-transparent px-4 py-3 text-xs text-stone-900 outline-none transition ${
                  errors.celular
                    ? "border-red-300 focus:border-red-500"
                    : "border-stone-200 focus:border-stone-950"
                }`}
                placeholder="+57 300 000 0000"
              />
              {errors.celular && <span className="text-[10px] text-red-500">{errors.celular}</span>}
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="cart-quote-mensaje" className="text-[11px] font-medium uppercase tracking-wider text-stone-600">
                Observaciones o Requerimientos
              </label>
              <textarea
                id="cart-quote-mensaje"
                rows={3}
                value={form.mensaje}
                onChange={(e) => onFieldChange("mensaje", e.target.value)}
                className="resize-none border border-stone-200 bg-transparent px-4 py-3 text-xs text-stone-900 outline-none focus:border-stone-950 transition"
                placeholder="Indíquenos detalles sobre su espacio..."
              />
            </div>

            {status === "error" && (
              <p className="text-xs text-red-500 font-light">
                Ocurrió un error al procesar su solicitud. Por favor, intente nuevamente.
              </p>
            )}

            <div className="mt-4 flex items-center justify-end gap-4">
              <button
                type="button"
                onClick={(event) => {
                  stop(event);
                  onClose();
                }}
                className="px-6 py-3 text-xs font-medium uppercase tracking-widest text-stone-500 transition hover:text-stone-900"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={status === "submitting"}
                className="bg-stone-950 px-8 py-3 text-xs font-medium uppercase tracking-[0.2em] text-white transition hover:bg-[#7A1E2B] disabled:opacity-50"
              >
                {status === "submitting" ? "Transmitiendo..." : "Enviar Cotización"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}