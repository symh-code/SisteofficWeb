"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowRight, ArrowLeft } from "lucide-react";

/* ─── Paleta CAMÖD Studio ───
   Chocolate #302416 · Carbón #13110D · Marfil #FCF5ED · Camel #C6AB96 */

const camodLinks: { label: string; href: string }[] = [
  { label: "Quiénes somos", href: "/camodstudio#quienes-somos" },
  { label: "Nuestro proceso", href: "/camodstudio#proceso" },
  { label: "Moodboards", href: "/camodstudio#moodboards" },
  { label: "Renders", href: "/camodstudio#renders" },
  { label: "Proyectos", href: "/camodstudio#proyectos" },
  { label: "Colección CAMÖD", href: "/camodstudio#productos" },
];

export function CamodNavbar() {
  const pathname = usePathname();
  const isCamodHome = pathname === "/camodstudio";

  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    if (!isCamodHome) return;

    function handleScroll() {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 50);
      if (!menuOpen) {
        setIsVisible(!(currentScrollY > lastScrollY.current && currentScrollY > 100));
      }
      lastScrollY.current = currentScrollY;
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isCamodHome, menuOpen]);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const transparent = isCamodHome && !isScrolled && !menuOpen;
  const textColorClass = transparent
    ? "text-[#FCF5ED]/85 hover:text-[#FCF5ED]"
    : "text-[#302416]/80 hover:text-[#13110D]";

  return (
    <header
      className={
        isCamodHome
          ? `fixed left-0 right-0 top-0 z-40 transition-all duration-300 ${
              isVisible ? "translate-y-0" : "-translate-y-full"
            } ${
              transparent
                ? "bg-transparent"
                : "border-b border-[#C6AB96]/30 bg-[#FCF5ED]/95 shadow-sm backdrop-blur-md"
            }`
          : "relative left-0 right-0 top-0 z-40 border-b border-[#C6AB96]/30 bg-[#FCF5ED] shadow-sm"
      }
    >
      <div className="mx-auto flex h-28 w-full max-w-[92rem] items-center justify-between px-4 sm:h-32 lg:px-8">
        {/* Logo */}
        <Link
          href="/camodstudio"
          className="flex shrink-0 items-center transition-opacity hover:opacity-80"
        >
          <Image
            src="/camodLogos/logoCamodBlanco.png"
            alt="CAMÖD Studio"
            width={420}
            height={120}
            className={`h-24 w-auto transition-all sm:h-28 ${transparent ? "" : "brightness-0"}`}
            priority
          />
        </Link>

        {/* Enlaces (desktop) */}
        <nav className="hidden items-center gap-6 xl:flex">
          {camodLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={`text-[13px] font-medium tracking-wide transition ${textColorClass}`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Acciones a la derecha */}
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className={`hidden items-center gap-2 text-[13px] font-medium tracking-wide transition sm:inline-flex ${textColorClass}`}
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Volver a Sisteoffic
          </Link>

          <Link
            href="/camodstudio#agenda"
            className="hidden items-center gap-2 rounded-full bg-[#302416] px-5 py-2.5 text-[13px] font-medium text-[#FCF5ED] transition hover:bg-[#13110D] sm:inline-flex"
          >
            Agenda una asesoría
          </Link>

          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            className={`rounded-lg p-2 transition xl:hidden ${
              transparent
                ? "text-[#FCF5ED] hover:bg-white/10"
                : "text-[#302416] hover:bg-[#C6AB96]/20"
            }`}
            aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* ═══ Menú móvil ═══ */}
      <div
        className={`overflow-hidden border-t bg-[#FCF5ED] transition-all duration-300 ease-out xl:hidden ${
          menuOpen ? "max-h-[36rem] border-[#C6AB96]/30 opacity-100" : "max-h-0 border-transparent opacity-0"
        }`}
      >
        <div className="flex flex-col gap-1 px-6 py-6">
          {camodLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="border-b border-[#C6AB96]/20 py-3 text-base font-medium text-[#302416] transition hover:text-[#13110D]"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/camodstudio#agenda"
            onClick={() => setMenuOpen(false)}
            className="mt-4 inline-flex items-center justify-center gap-2 rounded-full bg-[#302416] px-5 py-3 text-sm font-medium text-[#FCF5ED] transition hover:bg-[#13110D]"
          >
            Agenda una asesoría
            <ArrowRight className="h-4 w-4" />
          </Link>

          <Link
            href="/"
            onClick={() => setMenuOpen(false)}
            className="mt-3 inline-flex items-center justify-center gap-2 rounded-full border border-[#302416]/20 px-5 py-3 text-sm font-medium text-[#302416] transition hover:bg-[#C6AB96]/10"
          >
            <ArrowLeft className="h-4 w-4" />
            Volver a Sisteoffic
          </Link>
        </div>
      </div>
    </header>
  );
}
