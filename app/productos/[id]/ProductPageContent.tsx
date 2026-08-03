"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useCart } from "../../components/CartProvider";
import { sendProductQuote } from "../../lib/emailjs";
import { absoluteUrl } from "../../lib/seo";

// Brand colors - Maintaining your palette
const BRAND_COLORS = {
  primary: "#7A1E2B",
  primaryLight: "#A02838",
  primarySubtle: "#F5E6E8",
};

type Product = {
  id: number;
  nombre: string;
  imagen_url: string | null;
  precio: number | string | null;
  especificaciones: string | null;
  created_at: string;
  updated_At: string;
};

type QuoteFormData = {
  nombre: string;
  apellido: string;
  correo: string;
  celular: string;
  mensaje: string;
};

const EMPTY_FORM: QuoteFormData = {
  nombre: "",
  apellido: "",
  correo: "",
  celular: "",
  mensaje: "",
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

// Minimalist Button Component
const AnimatedButton: React.FC<{
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "outline";
  disabled?: boolean;
  type?: "button" | "submit";
  className?: string;
}> = ({
  children,
  onClick = () => {},
  variant = "primary",
  disabled = false,
  type = "button",
  className = "",
}) => {
  const baseClasses = `
    inline-flex items-center justify-center
    rounded-lg px-6 py-3
    text-xs uppercase tracking-widest font-medium
    transition-all duration-200
    focus:outline-none focus:ring-1 focus:ring-[${BRAND_COLORS.primary}] focus:ring-offset-2
    disabled:cursor-not-allowed disabled:opacity-50
  `;

  const variants = {
    primary: `
      bg-[${BRAND_COLORS.primary}] text-white
      hover:bg-[${BRAND_COLORS.primaryLight}]
      active:scale-[0.99]
    `,
    secondary: `
      bg-[${BRAND_COLORS.primarySubtle}] text-[${BRAND_COLORS.primary}]
      hover:bg-[${BRAND_COLORS.primary}] hover:text-white
    `,
    outline: `
      bg-transparent text-slate-800
      border border-slate-300
      hover:border-[${BRAND_COLORS.primary}] hover:text-[${BRAND_COLORS.primary}]
    `,
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

// Minimalist Info Card Component
const ProductInfoCard: React.FC<{ title: string; value: React.ReactNode; icon?: React.ReactNode }> = ({
  title,
  value,
  icon,
}) => (
  <div className="rounded-xl border border-slate-200/80 bg-white p-5 transition-all hover:border-slate-300">
    <div className="flex items-center gap-4">
      {icon && <div className="text-[${BRAND_COLORS.primary}]">{icon}</div>}
      <div>
        <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-400">{title}</p>
        <p className="mt-1 text-sm font-normal text-slate-900">{value}</p>
      </div>
    </div>
  </div>
);

// Form Input Component
const FormInput: React.FC<{
  id: string;
  label: string;
  type?: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  placeholder?: string;
  rows?: number;
}> = ({
  id,
  label,
  type = "text",
  value,
  onChange,
  error,
  placeholder,
  rows,
}) => {
  const InputElement = rows ? "textarea" : "input";
  const inputClasses = `
    w-full rounded-lg border bg-transparent px-4 py-3 text-sm text-slate-900
    outline-none transition-all duration-200
    placeholder:text-slate-400
    ${error ? "border-red-300 focus:border-red-400" : "border-slate-200 focus:border-[${BRAND_COLORS.primary}]"}
    ${rows ? "resize-none" : ""}
  `;

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-xs uppercase tracking-wider font-medium text-slate-600">
        {label}
      </label>
      <InputElement
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={inputClasses}
        placeholder={placeholder}
        rows={rows}
      />
      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  );
};

// Main Product Page Component
export default function ProductPageContent({ 
  product, 
  relatedProducts = [] 
}: { 
  product: Product; 
  relatedProducts?: Product[]; 
}) {
  const { addToCart } = useCart();
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const [form, setForm] = useState<QuoteFormData>({
    ...EMPTY_FORM,
    mensaje: `Estoy interesado en cotizar: ${product?.nombre || ""}`,
  });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errors, setErrors] = useState<Partial<Record<keyof QuoteFormData, string>>>({});
  const [imageLoaded, setImageLoaded] = useState(false);
  const [submittedName, setSubmittedName] = useState("");

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

  // Mock product for preview
  const mockProduct: Product = {
    id: 1001,
    nombre: "Silla Ergonómica Executive",
    imagen_url: "https://images.unsplash.com/photo-1588854337236-6889d631f379?w=800&auto=format&fit=crop",
    precio: 1250000,
    especificaciones: `• Material: Cuero sintético premium\n• Ajuste de altura: Sí\n• Soporte lumbar: Ajustable\n• Brazo: 4D ajustable\n• Base: Aluminio pulido\n• Peso máximo: 150 kg\n• Garantía: 5 años`,
    created_at: "2024-01-15T10:00:00Z",
    updated_At: "2024-06-20T14:30:00Z",
  };

  const displayProduct = product || mockProduct;

  // Mock related products if none are provided
  const mockRelated: Product[] = [
    {
      id: 1002,
      nombre: " Escritorio Gerencial Minimalista",
      imagen_url: "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=800&auto=format&fit=crop",
      precio: 1890000,
      especificaciones: null,
      created_at: "2024-01-15T10:00:00Z",
      updated_At: "2024-06-20T14:30:00Z",
    },
    {
      id: 1003,
      nombre: "Silla de Visita Operativa",
      imagen_url: "https://images.unsplash.com/photo-1580481077494-e3299ac25e94?w=800&auto=format&fit=crop",
      precio: 650000,
      especificaciones: null,
      created_at: "2024-01-15T10:00:00Z",
      updated_At: "2024-06-20T14:30:00Z",
    },
    {
      id: 1004,
      nombre: "Archivador Metálico Ejecutivo",
      imagen_url: "https://images.unsplash.com/photo-1595515106969-1ce29566ff1c?w=800&auto=format&fit=crop",
      precio: 920000,
      especificaciones: null,
      created_at: "2024-01-15T10:00:00Z",
      updated_At: "2024-06-20T14:30:00Z",
    },
  ];

  const displayRelated = relatedProducts.length > 0 ? relatedProducts : mockRelated;

  function handleAddToCart() {
    addToCart({
      id: displayProduct.id,
      name: displayProduct.nombre,
      image: displayProduct.imagen_url ?? "",
      price: formatPrice(displayProduct.precio),
      specifications: displayProduct.especificaciones ?? "",
    });
  }

  function openQuoteModal() {
    setForm({
      ...EMPTY_FORM,
      mensaje: `Estoy interesado en cotizar: ${displayProduct.nombre}`,
    });
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
      await sendProductQuote(
        {
          first_name: form.nombre,
          last_name: form.apellido,
          email: form.correo,
          phone: form.celular,
          message: form.mensaje,
        },
        {
          name: displayProduct.nombre,
          id: displayProduct.id,
          price: formatPrice(displayProduct.precio),
          url: absoluteUrl(`/productos/${displayProduct.id}`),
          image: displayProduct.imagen_url ?? undefined,
        }
      );

      setSubmittedName(form.nombre);
      setForm({
        ...EMPTY_FORM,
        mensaje: `Estoy interesado en cotizar: ${displayProduct.nombre}`,
      });
      setStatus("success");
    } catch (error) {
      console.error("Error enviando cotización de producto:", error);
      setStatus("error");
    }
  }

  return (
    <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col bg-white px-6 py-12 lg:px-12 text-slate-900">
      
      {/* Breadcrumb Minimalista */}
      <nav className="mb-12 flex items-center gap-3 text-xs uppercase tracking-widest text-slate-400">
        <Link href="/" className="transition-colors hover:text-[${BRAND_COLORS.primary}]">
          Inicio
        </Link>
        <span>/</span>
        <Link href="/buscar" className="transition-colors hover:text-[${BRAND_COLORS.primary}]">
          Catálogo
        </Link>
        <span>/</span>
        <span className="text-slate-900 font-medium">{displayProduct.nombre}</span>
      </nav>

      {/* Main Product Section */}
      <section className="grid gap-12 lg:grid-cols-12 lg:items-start">
        
        {/* Product Image */}
        <div className="lg:col-span-7 bg-[#FAFAFA] rounded-2xl border border-slate-100 p-12 flex items-center justify-center relative min-h-[480px]">
          {displayProduct.imagen_url ? (
            <>
              {!imageLoaded && (
                <div className="absolute inset-0 flex items-center justify-center bg-[#FAFAFA]">
                  <div className="h-8 w-8 animate-spin rounded-full border-2 border-[${BRAND_COLORS.primary}] border-t-transparent"></div>
                </div>
              )}
              <img
                src={displayProduct.imagen_url}
                alt={displayProduct.nombre}
                className={`max-h-[450px] w-full object-contain transition-opacity duration-500 ${imageLoaded ? "opacity-100" : "opacity-0"}`}
                onLoad={() => setImageLoaded(true)}
              />
            </>
          ) : (
            <div className="text-slate-400 text-xs uppercase tracking-widest">Sin imagen disponible</div>
          )}
        </div>

        {/* Product Information */}
        <div className="lg:col-span-5 flex flex-col justify-between">
          <div>
            <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[${BRAND_COLORS.primary}]">
              Sisteoffic Collection
            </span>
            <h1 className="mt-3 text-3xl font-light tracking-tight text-slate-900 sm:text-4xl">
              {displayProduct.nombre}
            </h1>

            <div className="mt-6 flex items-baseline gap-2">
              <span className="text-2xl font-medium tracking-tight text-[${BRAND_COLORS.primary}]">
                {formatPrice(displayProduct.precio)}
              </span>
              {displayProduct.precio && (
                <span className="text-xs text-slate-400 tracking-wider">IVA incluido</span>
              )}
            </div>

            <div className="mt-8 h-px bg-slate-100" />

            {/* Specifications */}
            <div className="mt-8">
              <h2 className="text-xs font-semibold uppercase tracking-widest text-slate-900 mb-4">Detalles técnicos</h2>
              {displayProduct.especificaciones ? (
                <ul className="space-y-2.5 text-sm text-slate-600 font-light">
                  {displayProduct.especificaciones.split('\\n').map((line, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-[${BRAND_COLORS.primary}] mt-1">•</span>
                      <span>{line.replace(/^•\s*/, '')}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-slate-400 font-light">Sin especificaciones registradas.</p>
              )}
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="mt-10 flex flex-col gap-3">
            <AnimatedButton onClick={handleAddToCart} variant="primary">
              Agregar al carrito
            </AnimatedButton>

            <AnimatedButton onClick={openQuoteModal} variant="secondary">
              Solicitar cotización corporativa
            </AnimatedButton>
          </div>
        </div>
      </section>

      {/* Additional Information Section */}
      <section className="mt-24 border-t border-slate-100 pt-16">
        <h2 className="mb-8 text-xs font-semibold uppercase tracking-widest text-slate-400">Especificaciones de registro</h2>
        <div className="grid gap-6 md:grid-cols-3">
          <ProductInfoCard
            title="Referencia de fábrica"
            value={`#${displayProduct.id}`}
          />
          <ProductInfoCard
            title="Línea de diseño"
            value={displayProduct.nombre}
          />
          <ProductInfoCard
            title="Última actualización"
            value={displayProduct.updated_At ? new Date(displayProduct.updated_At).toLocaleDateString("es-CO", { year: "numeric", month: "long", day: "numeric" }) : "No disponible"}
          />
        </div>
      </section>

      {/* Similar Products Section */}
      <section className="mt-24 border-t border-slate-100 pt-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-slate-400">Productos Similares</h2>
          <Link href="/buscar" className="text-xs uppercase tracking-widest text-[${BRAND_COLORS.primary}] hover:underline font-medium">
            Ver todo el catálogo →
          </Link>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {displayRelated.map((item) => (
            <Link 
              key={item.id} 
              href={`/productos/${item.id}`}
              className="group rounded-xl border border-slate-100 bg-[#FAFAFA] p-6 transition-all hover:border-slate-300 flex flex-col justify-between"
            >
              <div>
                <div className="aspect-square w-full mb-6 flex items-center justify-center p-4 overflow-hidden">
                  {item.imagen_url ? (
                    <img 
                      src={item.imagen_url} 
                      alt={item.nombre} 
                      className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105" 
                    />
                  ) : (
                    <div className="text-xs text-slate-300 uppercase tracking-widest">Sin imagen</div>
                  )}
                </div>
                <span className="text-[10px] font-semibold uppercase tracking-widest text-[${BRAND_COLORS.primary}]">
                  Sisteoffic
                </span>
                <h3 className="mt-1 text-base font-normal text-slate-900 group-hover:text-[${BRAND_COLORS.primary}] transition-colors">
                  {item.nombre}
                </h3>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-200/60 flex items-center justify-between">
                <span className="text-sm font-medium text-slate-900">
                  {formatPrice(item.precio)}
                </span>
                <span className="text-xs uppercase tracking-widest font-medium text-[${BRAND_COLORS.primary}]">
                  Ver detalles
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Quote Modal Minimalist */}
      {isQuoteOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm"
          onClick={closeQuoteModal}
        >
          <div
            className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-xl bg-white shadow-xl p-8"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-start justify-between pb-6 border-b border-slate-100">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-widest text-[${BRAND_COLORS.primary}]">
                  Atención Comercial
                </p>
                <h2 className="mt-1 text-xl font-light text-slate-900">
                  Cotizar Producto
                </h2>
              </div>
              <button
                type="button"
                onClick={closeQuoteModal}
                className="text-slate-400 hover:text-slate-900 transition-colors text-sm uppercase tracking-wider"
              >
                ✕
              </button>
            </div>

            {/* Form Content */}
            {status === "success" ? (
              <div className="flex flex-col items-center gap-4 py-12 text-center">
                <h3 className="text-lg font-light text-slate-900">Solicitud enviada con éxito</h3>
                <p className="max-w-sm text-sm text-slate-500 font-light">
                  Gracias {submittedName}, nos pondremos en contacto contigo a la brevedad para la cotización de <strong className="font-medium text-slate-800">{displayProduct.nombre}</strong>.
                </p>
                <div className="mt-4">
                  <AnimatedButton onClick={closeQuoteModal} variant="primary">
                    Cerrar ventana
                  </AnimatedButton>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmitQuote} className="flex flex-col gap-4 pt-6">
                <div className="grid gap-4 sm:grid-cols-2">
                  <FormInput
                    id="nombre"
                    label="Nombre"
                    value={form.nombre}
                    onChange={(value) => handleFieldChange("nombre", value)}
                    error={errors.nombre}
                    placeholder="Tu nombre"
                  />
                  <FormInput
                    id="apellido"
                    label="Apellido"
                    value={form.apellido}
                    onChange={(value) => handleFieldChange("apellido", value)}
                    error={errors.apellido}
                    placeholder="Tu apellido"
                  />
                </div>

                <FormInput
                  id="correo"
                  label="Correo Electrónico"
                  type="email"
                  value={form.correo}
                  onChange={(value) => handleFieldChange("correo", value)}
                  error={errors.correo}
                  placeholder="correo@empresa.com"
                />

                <FormInput
                  id="celular"
                  label="Teléfono / Celular"
                  type="tel"
                  value={form.celular}
                  onChange={(value) => handleFieldChange("celular", value)}
                  error={errors.celular}
                  placeholder="300 000 0000"
                />

                <FormInput
                  id="mensaje"
                  label="Requerimiento o Mensaje"
                  value={form.mensaje}
                  onChange={(value) => handleFieldChange("mensaje", value)}
                  placeholder="Detalles adicionales..."
                  rows={3}
                />

                {status === "error" && (
                  <div className="rounded-lg bg-red-50 p-3 text-xs text-red-600">
                    Ocurrió un error al enviar. Por favor intente nuevamente.
                  </div>
                )}

                <div className="mt-4 flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                  <AnimatedButton type="button" onClick={closeQuoteModal} variant="outline">
                    Cancelar
                  </AnimatedButton>
                  <AnimatedButton
                    type="submit"
                    disabled={status === "submitting"}
                    variant="primary"
                  >
                    {status === "submitting" ? "Enviando..." : "Enviar Solicitud"}
                  </AnimatedButton>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </main>
  );
}