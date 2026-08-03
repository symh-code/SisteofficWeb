import emailjs from "@emailjs/browser";

/**
 * Helper único y reutilizable para EmailJS. Todos los formularios del sitio
 * pasan por acá — ningún componente llama a `@emailjs/browser` directamente.
 *
 * El plan gratuito de EmailJS solo permite 2 templates, así que se reutiliza
 * un único template "quote" tanto para la cotización de un producto
 * individual como para la cotización del carrito completo (se distinguen
 * por el campo `quote_type` y por qué otros campos vienen vacíos — ver
 * `sendProductQuote` / `sendCartQuote`).
 *
 * Las credenciales viven exclusivamente en variables de entorno
 * NEXT_PUBLIC_EMAILJS_* (necesarias con ese prefijo porque EmailJS envía
 * desde el navegador). Nunca se hardcodean acá.
 */

const PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;
const SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;

const TEMPLATE_IDS = {
  contact: process.env.NEXT_PUBLIC_EMAILJS_CONTACT_TEMPLATE_ID,
  quote: process.env.NEXT_PUBLIC_EMAILJS_QUOTE_TEMPLATE_ID,
} as const;

export type EmailTemplateKind = keyof typeof TEMPLATE_IDS;

export class EmailJsConfigError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "EmailJsConfigError";
  }
}

let initialized = false;

function ensureInitialized(): void {
  if (initialized) return;

  if (!PUBLIC_KEY) {
    throw new EmailJsConfigError(
      "Falta NEXT_PUBLIC_EMAILJS_PUBLIC_KEY. Define las variables de entorno de EmailJS antes de compilar el sitio."
    );
  }

  emailjs.init({ publicKey: PUBLIC_KEY });
  initialized = true;
}

/** Agrega automáticamente `page_url` y `submitted_at` a cualquier envío. */
export function buildAutoFields(): { page_url: string; submitted_at: string } {
  return {
    page_url: typeof window !== "undefined" ? window.location.href : "",
    submitted_at: new Intl.DateTimeFormat("es-CO", {
      dateStyle: "long",
      timeStyle: "short",
    }).format(new Date()),
  };
}

/**
 * Envía un correo con la plantilla indicada (`contact` | `quote`).
 * Lanza `EmailJsConfigError` si faltan variables de entorno, o el error que
 * arroje `emailjs.send()` si el envío falla — el llamador decide cómo
 * mostrarlo (cada formulario ya tiene su propio estado de error/carga).
 */
export async function sendEmail(
  kind: EmailTemplateKind,
  templateParams: Record<string, unknown>
): Promise<void> {
  ensureInitialized();

  const templateId = TEMPLATE_IDS[kind];

  if (!SERVICE_ID || !templateId) {
    throw new EmailJsConfigError(
      `Falta configurar NEXT_PUBLIC_EMAILJS_SERVICE_ID o el template ID de "${kind}". Revisa las variables de entorno de EmailJS.`
    );
  }

  await emailjs.send(SERVICE_ID, templateId, {
    ...templateParams,
    ...buildAutoFields(),
  });
}

type QuoteContact = {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  message: string;
};

export type QuoteLineItem = {
  name: string;
  quantity: number;
  price: string; // ya formateado, ej. "$1.200.000" (precio unitario)
};

/** "• Nombre\nCantidad: N\nPrecio: $X" por artículo, separados por línea en
 * blanco — el mismo formato para un producto individual (lista de 1) o para
 * el carrito completo, así el template solo necesita un bloque `{{items}}`.
 * Exportado porque también se usa para armar el cuerpo del fallback `mailto:`. */
export function formatQuoteItems(items: QuoteLineItem[]): string {
  return items
    .map((item) => `• ${item.name}\nCantidad: ${item.quantity}\nPrecio: ${item.price}`)
    .join("\n\n");
}

/** Nombres de campo alineados 1:1 con el template "quote" real en EmailJS
 * (items / itemCount / totalPrice, sin guion bajo). `product_*` se envían
 * igual por si el template se extiende más adelante con un link o imagen
 * del producto — hoy no los usa. */
type QuoteEmailFields = QuoteContact & {
  quote_type: "Producto individual" | "Carrito completo";
  items: string;
  itemCount: number;
  totalPrice: string;
  product_name: string;
  product_id: string;
  product_price: string;
  product_url: string;
  product_image: string;
};

function sendQuote(fields: QuoteEmailFields): Promise<void> {
  return sendEmail("quote", fields);
}

/** Cotización de un único producto (ficha de producto o modal rápido de catálogo). */
export function sendProductQuote(
  contact: QuoteContact,
  product: { name: string; id: number | string; price: string; url: string; image?: string }
): Promise<void> {
  return sendQuote({
    ...contact,
    quote_type: "Producto individual",
    items: formatQuoteItems([{ name: product.name, quantity: 1, price: product.price }]),
    itemCount: 1,
    totalPrice: product.price,
    product_name: product.name,
    product_id: String(product.id),
    product_price: product.price,
    product_url: product.url,
    product_image: product.image ?? "",
  });
}

/** Cotización del carrito completo. */
export function sendCartQuote(
  contact: QuoteContact,
  cart: { items: QuoteLineItem[]; itemCount: number; totalPrice: string }
): Promise<void> {
  return sendQuote({
    ...contact,
    quote_type: "Carrito completo",
    items: formatQuoteItems(cart.items),
    itemCount: cart.itemCount,
    totalPrice: cart.totalPrice,
    product_name: "",
    product_id: "",
    product_price: "",
    product_url: "",
    product_image: "",
  });
}
