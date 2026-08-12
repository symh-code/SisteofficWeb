"use client";

import { useCallback, useEffect } from "react";
import { ArrowLeft, ArrowRight, X } from "lucide-react";

export type LightboxItem = {
  src: string;
  label: string;
};

export function Lightbox({
  items,
  index,
  onClose,
  onNavigate,
}: {
  items: LightboxItem[];
  index: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}) {
  const goPrev = useCallback(
    () => onNavigate((index - 1 + items.length) % items.length),
    [index, items.length, onNavigate]
  );
  const goNext = useCallback(() => onNavigate((index + 1) % items.length), [index, items.length, onNavigate]);

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    }
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [goPrev, goNext, onClose]);

  const item = items[index];

  return (
    <div
      className="fixed inset-0 z-[60] flex flex-col bg-[#13110D]/97 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div className="flex items-center justify-between px-6 py-5 sm:px-10">
        <span className="text-[11px] font-medium uppercase tracking-[0.25em] text-white/60">
          {index + 1} / {items.length}
        </span>
        <button
          type="button"
          onClick={onClose}
          aria-label="Cerrar"
          className="flex h-9 w-9 items-center justify-center text-white/80 transition hover:text-white"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <div className="relative flex min-h-0 flex-1 items-center justify-center overflow-hidden px-4 pb-6 sm:px-16">
        <button
          type="button"
          aria-label="Imagen anterior"
          onClick={(e) => {
            e.stopPropagation();
            goPrev();
          }}
          className="absolute left-2 flex h-10 w-10 shrink-0 items-center justify-center text-white/70 transition hover:text-white sm:left-6"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>

        <img
          src={item.src}
          alt={item.label}
          onClick={(e) => e.stopPropagation()}
          className="block h-auto max-h-[calc(100dvh-10rem)] w-auto max-w-[calc(100vw-2rem)] object-contain sm:max-w-[calc(100vw-10rem)]"
        />

        <button
          type="button"
          aria-label="Imagen siguiente"
          onClick={(e) => {
            e.stopPropagation();
            goNext();
          }}
          className="absolute right-2 flex h-10 w-10 shrink-0 items-center justify-center text-white/70 transition hover:text-white sm:right-6"
        >
          <ArrowRight className="h-5 w-5" />
        </button>
      </div>

      {item.label && (
        <p className="pb-8 text-center text-xs font-light uppercase tracking-[0.2em] text-white/70">
          {item.label}
        </p>
      )}
    </div>
  );
}
