"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

const PHONE_NUMBER = "573003591054";
const DEFAULT_MESSAGE =
  "Hola, vengo de la web y quiero recibir asesoría personalizada para comprar";

const SCROLL_THRESHOLD = 150; // px que hay que bajar para que aparezca el botón

// Color "rojo" de marca usado en el resto del sitio (footer por defecto)
const FOOTER_ACCENT_COLOR = "#7A1E2B";

// Color chocolate oscuro usado solo en la ruta /camodstudio
const CAMODSTUDIO_FOOTER_ACCENT_COLOR = "#3C2414";

export default function WhatsAppButton() {
  const pathname = usePathname();
  const isCamodStudio = pathname?.startsWith("/camodstudio");

  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState(DEFAULT_MESSAGE);
  const [visible, setVisible] = useState(false);
  const [overFooter, setOverFooter] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Color de acento a usar cuando el footer está visible,
  // según la ruta actual
  const footerAccentColor = isCamodStudio
    ? CAMODSTUDIO_FOOTER_ACCENT_COLOR
    : FOOTER_ACCENT_COLOR;

  // Muestra el botón flotante solo después de scrollear
  useEffect(() => {
    function handleScroll() {
      setVisible(window.scrollY > SCROLL_THRESHOLD);
    }
    handleScroll(); // por si la página carga con scroll ya aplicado
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Detecta cuando el footer entra en el viewport para cambiar el color
  // del botón de blanco/negro a blanco/rojo (o blanco/chocolate en /camodstudio)
  useEffect(() => {
    const footer = document.querySelector("footer");
    if (!footer) return;

    const observer = new IntersectionObserver(
      ([entry]) => setOverFooter(entry.isIntersecting),
      { threshold: 0 },
    );

    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  // Si el botón se oculta por scroll, cierra también el mini chat
  useEffect(() => {
    if (!visible) setOpen(false);
  }, [visible]);

  // Cierra el mini chat si se hace click fuera de él (popup Y botón)
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node;
      const clickedInsidePopup = popupRef.current?.contains(target);
      const clickedToggleButton = buttonRef.current?.contains(target);

      if (!clickedInsidePopup && !clickedToggleButton) {
        setOpen(false);
      }
    }
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  const handleSend = () => {
    const text = message.trim().length > 0 ? message : DEFAULT_MESSAGE;
    const url = `https://wa.me/${PHONE_NUMBER}?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank", "noopener,noreferrer");
    setOpen(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div
      className={`fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3 transition-all duration-500 ease-out ${
        visible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-6 opacity-0"
      }`}
    >
      {/* ====== MINI CHAT ====== */}
      {open && (
        <div
          ref={popupRef}
          className="w-[92vw] max-w-[400px] overflow-hidden rounded-2xl border border-black/5 bg-white shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-200 sm:w-[400px]"
        >
          {/* Header — NEGRO */}
          <div className="flex items-center gap-3 bg-neutral-900 px-5 py-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 ring-2 ring-white/20">
              <svg
                viewBox="0 0 32 32"
                className="h-7 w-7 fill-white"
                aria-hidden="true"
              >
                <path d="M16.001 3.2c-7.07 0-12.8 5.73-12.8 12.8 0 2.26.6 4.44 1.73 6.36L3.2 28.8l6.44-1.69a12.75 12.75 0 0 0 6.36 1.62h.005c7.07 0 12.8-5.73 12.8-12.8s-5.73-12.73-12.804-12.73Z" opacity=".18"/>
                <path d="M16.003 5.334c-5.882 0-10.667 4.785-10.667 10.667 0 1.978.545 3.895 1.578 5.573l.245.397-1.05 3.837 3.933-1.032.383.227a10.6 10.6 0 0 0 5.578 1.598h.004c5.881 0 10.666-4.785 10.666-10.667s-4.785-10.6-10.67-10.6Z"/>
                <path
                  d="M21.72 18.24c-.31-.156-1.84-.907-2.126-1.011-.285-.104-.492-.156-.699.156-.207.311-.802 1.01-.984 1.218-.181.208-.362.234-.673.078-.311-.156-1.312-.483-2.499-1.538-.924-.822-1.548-1.837-1.73-2.148-.181-.311-.019-.479.137-.634.14-.14.311-.363.467-.545.156-.181.207-.311.311-.519.104-.208.052-.39-.026-.545-.078-.156-.699-1.683-.958-2.303-.252-.605-.508-.523-.699-.533-.181-.008-.389-.01-.596-.01-.208 0-.545.078-.83.39-.285.311-1.089 1.064-1.089 2.594s1.115 3.009 1.27 3.216c.156.208 2.194 3.351 5.317 4.699.743.321 1.323.512 1.775.655.746.237 1.425.204 1.963.124.599-.09 1.84-.752 2.1-1.478.259-.727.259-1.35.181-1.478-.078-.13-.285-.208-.596-.363Z"
                  fill="#171717"
                />
              </svg>
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-base font-semibold text-white">
                Sisteoffic
              </p>
              <p className="text-sm text-white/70">Asesoría personalizada</p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Cerrar chat"
              className="rounded-full p-1 text-white/70 transition hover:bg-white/10 hover:text-white"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5 pointer-events-none" fill="none" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Cuerpo del chat */}
          <div
            className="flex min-h-[220px] flex-col gap-3 px-5 py-5"
            style={{
              backgroundColor: "#f5f5f5",
              backgroundImage:
                "radial-gradient(rgba(0,0,0,0.04) 1px, transparent 1px)",
              backgroundSize: "14px 14px",
            }}
          >
            <div className="max-w-[85%] rounded-lg rounded-tl-none bg-white px-4 py-3 text-[15px] leading-relaxed text-gray-800 shadow-sm">
              👋 ¡Hola! Escríbenos y te ayudamos a elegir el mueble ideal para
              tu espacio.
            </div>
          </div>

          {/* Input y envío */}
          <div className="flex items-end gap-3 border-t border-gray-100 bg-white px-4 py-4">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              rows={3}
              className="flex-1 resize-none rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-[15px] leading-relaxed text-gray-800 outline-none focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900"
              placeholder="Escribe tu mensaje..."
            />
            <button
              type="button"
              onClick={handleSend}
              aria-label="Enviar mensaje por WhatsApp"
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-neutral-900 text-white shadow-md transition hover:bg-black active:scale-95"
            >
              <svg viewBox="0 0 24 24" className="h-6 w-6 translate-x-[1px] pointer-events-none" fill="currentColor">
                <path d="M3.4 20.6l17.45-8.32a.5.5 0 0 0 0-.9L3.4 3.06a.5.5 0 0 0-.7.55l1.9 7.02 10.9.87-10.9.87-1.9 7.02a.5.5 0 0 0 .7.55Z" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* ====== BOTÓN FLOTANTE — BLANCO/NEGRO, BLANCO/ACENTO cerca del footer ====== */}
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Cerrar chat de WhatsApp" : "Abrir chat de WhatsApp"}
        style={{
          color: overFooter ? footerAccentColor : undefined,
          boxShadow: overFooter
            ? `0 0 0 1px ${footerAccentColor}33`
            : undefined,
        }}
        className={`flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-xl ring-1 transition-all duration-300 hover:scale-105 active:scale-95 ${
          overFooter ? "ring-transparent" : "text-neutral-900 ring-black/5"
        }`}
      >
        {open ? (
          <svg viewBox="0 0 24 24" className="h-7 w-7 pointer-events-none" fill="none" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg
            viewBox="0 0 32 32"
            className="h-8 w-8 pointer-events-none transition-colors duration-300"
            style={{ fill: overFooter ? footerAccentColor : "#171717" }}
            aria-hidden="true"
          >
            <path d="M27.2 4.8A15.87 15.87 0 0 0 16.04 0C7.22 0 .04 7.18.04 16c0 2.82.74 5.58 2.14 8.01L0 32l8.19-2.15c2.34 1.28 4.98 1.95 7.66 1.95h.01c8.82 0 16-7.18 16-16 0-4.27-1.66-8.29-4.66-11.3Zm-11.15 24.6h-.01a13.28 13.28 0 0 1-6.77-1.85l-.49-.29-5.02 1.32 1.34-4.9-.32-.5A13.28 13.28 0 0 1 2.75 16C2.75 8.66 8.7 2.72 16.05 2.72A13.24 13.24 0 0 1 29.28 16c0 7.34-5.95 13.4-13.23 13.4Zm7.26-9.97c-.4-.2-2.35-1.16-2.71-1.29-.36-.13-.63-.2-.9.2-.26.4-1.03 1.29-1.26 1.55-.23.27-.46.3-.86.1-.4-.2-1.68-.62-3.19-1.97-1.18-1.05-1.98-2.35-2.21-2.75-.23-.4-.02-.61.17-.81.18-.18.4-.46.6-.7.2-.23.26-.4.4-.66.13-.27.06-.5-.03-.7-.1-.2-.9-2.16-1.23-2.96-.32-.77-.65-.67-.9-.68-.23-.01-.5-.01-.76-.01-.27 0-.7.1-1.06.5-.36.4-1.4 1.36-1.4 3.32s1.43 3.86 1.63 4.13c.2.27 2.8 4.28 6.79 6 .95.41 1.69.66 2.27.84.95.3 1.82.26 2.51.16.77-.11 2.35-.96 2.68-1.89.33-.93.33-1.72.23-1.89-.1-.16-.36-.26-.76-.46Z"/>
          </svg>
        )}
      </button>
    </div>
  );
}