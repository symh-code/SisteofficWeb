import Link from "next/link";
import Image from "next/image";
import { Store, MapPin, Mail, Clock, ArrowUpRight } from "lucide-react";

const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path d="M12.04 2a9.84 9.84 0 0 0-8.46 14.86L2 22l5.28-1.54A9.95 9.95 0 1 0 12.04 2Zm0 17.9a8.03 8.03 0 0 1-4.1-1.12l-.3-.18-3.13.92.93-3.05-.2-.31A7.92 7.92 0 0 1 4 11.9a8.04 8.04 0 1 1 8.04 8Zm4.42-6.03c-.24-.12-1.43-.7-1.65-.78-.22-.08-.38-.12-.54.12-.16.24-.62.78-.76.94-.14.16-.28.18-.52.06-.24-.12-1.02-.37-1.94-1.19a7.3 7.3 0 0 1-1.34-1.67c-.14-.24-.02-.37.1-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.3-.74-1.78-.19-.47-.39-.41-.54-.42h-.46c-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2s.86 2.32.98 2.48c.12.16 1.69 2.58 4.1 3.62.57.25 1.02.39 1.37.5.58.18 1.1.16 1.51.1.46-.07 1.43-.59 1.63-1.15.2-.56.2-1.04.14-1.14-.06-.1-.22-.16-.46-.28Z" />
  </svg>
);

const FacebookIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124zM7.114 20.452H3.558V9h3.556v11.452z" />
  </svg>
);

const navegacion = [
  { label: "Inicio", href: "/" },
  { label: "Nosotros", href: "/sobre-nosotros" },
  { label: "Servicios", href: "/servicios" },
  { label: "Colecciones", href: "/colecciones" },
  { label: "Productos", href: "/productos" },
  { label: "CAMÖD Studio", href: "/camodstudio" },
  { label: "Contacto", href: "/contacto" },
];

const contacto = [
  { icon: WhatsAppIcon, label: "+57 300 359 1054", href: "https://wa.me/573003591054" },
  { icon: Mail, label: "comercial.sisteofficjl@gmail.com", href: "mailto:comercial.sisteofficjl@gmail.com" },
];

const horario = [
  { dia: "Lun - Vie", hora: "8:30 a.m. - 5:45 p.m." },
  { dia: "Sábado", hora: "8:30 a.m. - 1:30 p.m." },
  { dia: "Domingo", hora: "Cerrado" },
];

const redesSisteoffic = [
  {
    href: "https://www.instagram.com/sisteofficjl/",
    icon: InstagramIcon,
    label: "Instagram Sisteoffic",
    color: "hover:bg-pink-600 hover:text-white",
  },
  {
    href: "https://www.linkedin.com/company/sisteoffic/",
    icon: LinkedinIcon,
    label: "LinkedIn",
    color: "hover:bg-sky-700 hover:text-white",
  },
  {
    href: "https://www.facebook.com/sisteofficjlsas",
    icon: FacebookIcon,
    label: "Facebook",
    color: "hover:bg-blue-600 hover:text-white",
  },
  {
    href: "https://provee.com.co/empresas/sisteoffic-jl-sas",
    icon: Store,
    label: "Provee",
    color: "hover:bg-emerald-600 hover:text-white",
  },
];

const redesCamod = [
  {
    href: "https://www.instagram.com/camod.diseno?igsh=c2xzNGJ0eGZqeDhw",
    icon: InstagramIcon,
    label: "Instagram CAMÖD",
    color: "hover:bg-[#8A6A52] hover:text-white",
  },
];

/* ─── Paleta CAMÖD Studio ─── Chocolate #302416 · Carbón #13110D · Marfil #FCF5ED · Camel #C6AB96 */
const THEMES = {
  sisteoffic: {
    footerBg: "bg-[#24211F]",
    topBorder: "from-[#24211F] via-[#7A1E2B] to-[#24211F]",
    text60: "text-white/60",
    text50: "text-white/50",
    text40: "text-white/40",
    text35: "text-white/35",
    text30: "text-white/30",
    text70: "text-white/70",
    textSolid: "text-white",
    hoverWhite: "hover:text-white",
    hoverWhite80: "hover:text-white/80",
    underline: "bg-white/50",
    borderAccent: "border-white",
    iconBorder: "border-white/10",
    iconBg: "bg-white/5",
    iconText: "text-white/70",
    iconGroupHoverBg: "group-hover:bg-white/10",
    iconGroupHoverText: "group-hover:text-white",
    divider: "border-white/10",
    mapBg: "bg-[#1B1917]",
  },
  camod: {
    footerBg: "bg-[#302416]",
    topBorder: "from-[#C6AB96] via-[#8A7A5C] to-[#C6AB96]",
    text60: "text-[#FCF5ED]/60",
    text50: "text-[#FCF5ED]/50",
    text40: "text-[#FCF5ED]/40",
    text35: "text-[#FCF5ED]/35",
    text30: "text-[#FCF5ED]/30",
    text70: "text-[#FCF5ED]/70",
    textSolid: "text-[#FCF5ED]",
    hoverWhite: "hover:text-[#FCF5ED]",
    hoverWhite80: "hover:text-[#FCF5ED]/80",
    underline: "bg-[#FCF5ED]/50",
    borderAccent: "border-[#C6AB96]",
    iconBorder: "border-[#FCF5ED]/10",
    iconBg: "bg-[#FCF5ED]/5",
    iconText: "text-[#FCF5ED]/70",
    iconGroupHoverBg: "group-hover:bg-[#FCF5ED]/10",
    iconGroupHoverText: "group-hover:text-[#FCF5ED]",
    divider: "border-[#FCF5ED]/10",
    mapBg: "bg-[#1F160D]",
  },
} as const;

export function Footer({ isCamod = false }: { isCamod?: boolean }) {
  const t = isCamod ? THEMES.camod : THEMES.sisteoffic;

  return (
    <footer id="site-footer" className={`relative ${t.footerBg} text-white`}>
      {!isCamod && (
        <svg className="absolute h-0 w-0" aria-hidden="true">
          <filter id="sisteoffic-dark-logo" colorInterpolationFilters="sRGB">
            <feComponentTransfer>
              <feFuncR type="table" tableValues="1 1" />
              <feFuncG type="table" tableValues="1 0" />
              <feFuncB type="table" tableValues="1 0" />
              <feFuncA type="identity" />
            </feComponentTransfer>
          </filter>
        </svg>
      )}

      {/* Decorative top border */}
      <div className={`h-1 w-full bg-gradient-to-r ${t.topBorder}`} />

      <div className="mx-auto max-w-7xl px-6 pt-20 pb-10 lg:px-8">
        {/* ─── Main Grid (Distribución 3 - 2 - 3 - 4) ─── */}
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">

          {/* 1. Brand Column (span-3) */}
          <div className="lg:col-span-3 space-y-6">
            <Link
              href={isCamod ? "/camodstudio" : "/"}
              className="group inline-flex items-center gap-3"
            >
              <Image
                src={isCamod ? "/camodLogos/logoCamodBlanco.png" : "/sisteoffic-logo.png"}
                alt={isCamod ? "CAMÖD Studio" : "SisteOffic"}
                width={420}
                height={120}
                className={`w-auto transition-transform duration-300 group-hover:scale-105 ${
                  isCamod ? "h-28" : "h-10 object-contain"
                }`}
                style={isCamod ? undefined : { filter: "url(#sisteoffic-dark-logo)" }}
                priority
              />
            </Link>

            <p className={`text-[15px] leading-relaxed ${t.text60}`}>
              Diseñamos, fabricamos y transformamos espacios de trabajo.
            </p>

            <p className={`text-xs font-semibold uppercase tracking-[0.2em] ${t.text40}`}>
              Arquitectura • Diseño Interior • Mobiliario • Ejecución
            </p>

            <Link
              href="/camodstudio"
              className={`group/camod inline-flex items-center gap-2.5 border-l-2 ${t.borderAccent} py-1 pl-4 text-[13px] font-medium uppercase tracking-[0.2em] ${t.textSolid} transition-colors ${t.hoverWhite80}`}
            >
              Conoce CAMÖD Studio
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover/camod:translate-x-0.5 group-hover/camod:-translate-y-0.5" />
            </Link>

            <div className="space-y-5">
              <div>
                <p className={`mb-3 text-[10px] font-semibold uppercase tracking-[0.2em] ${t.text40}`}>
                  Sisteoffic
                </p>
                <div className="flex flex-wrap items-center gap-2.5">
                  {redesSisteoffic.map((social) => (
                    <Link
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`group flex h-10 w-10 items-center justify-center rounded-xl border ${t.iconBorder} ${t.iconBg} ${t.iconText} backdrop-blur-sm transition-all duration-300 ${social.color} hover:-translate-y-0.5 hover:shadow-lg hover:shadow-black/20`}
                      aria-label={social.label}
                      title={social.label}
                    >
                      <social.icon className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
                    </Link>
                  ))}
                </div>
              </div>

              <div>
                <p className={`mb-3 text-[10px] font-semibold uppercase tracking-[0.2em] ${t.text40}`}>
                  CAMÖD
                </p>
                <div className="flex flex-wrap items-center gap-2.5">
                  {redesCamod.map((social) => (
                    <Link
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`group flex h-10 w-10 items-center justify-center rounded-xl border ${t.iconBorder} ${t.iconBg} ${t.iconText} backdrop-blur-sm transition-all duration-300 ${social.color} hover:-translate-y-0.5 hover:shadow-lg hover:shadow-black/20`}
                      aria-label={social.label}
                      title={social.label}
                    >
                      <social.icon className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* 2. Navigation Column (span-2) */}
          <div className="lg:col-span-2">
            <h3 className={`text-xs font-bold uppercase tracking-[0.2em] ${t.text40}`}>
              Navegación
            </h3>
            <ul className="mt-6 space-y-3">
              {navegacion.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className={`group inline-flex items-center gap-1.5 text-[14px] ${t.text70} transition-all duration-200 ${t.hoverWhite}`}
                  >
                    <span className={`h-px w-0 ${t.underline} transition-all duration-300 group-hover:w-2`} />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 3. Contact & Hours Column (span-3) */}
          <div className="lg:col-span-3 space-y-8">
            <div>
              <h3 className={`text-xs font-bold uppercase tracking-[0.2em] ${t.text40}`}>
                Contacto
              </h3>
              <ul className="mt-6 space-y-3">
                {contacto.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      target={item.href.startsWith("https://wa.me/") ? "_blank" : undefined}
                      rel={item.href.startsWith("https://wa.me/") ? "noopener noreferrer" : undefined}
                      className={`group flex items-center gap-3 text-[14px] ${t.text70} transition-colors ${t.hoverWhite}`}
                    >
                      <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${t.iconBg} ${t.text50} transition-colors ${t.iconGroupHoverBg} ${t.iconGroupHoverText}`}>
                        <item.icon className="h-3.5 w-3.5" />
                      </span>
                      <span className="truncate">{item.label}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className={`text-xs font-bold uppercase tracking-[0.2em] ${t.text40}`}>
                Horario de atención
              </h3>
              <ul className="mt-4 space-y-2">
                {horario.map((h) => (
                  <li key={h.dia} className="flex items-center justify-between gap-4 text-xs">
                    <span className={`flex items-center gap-1.5 ${t.text50}`}>
                      <Clock className="h-3 w-3" />
                      {h.dia}
                    </span>
                    <span className={`font-medium ${h.hora === "Cerrado" ? t.text30 : t.text70}`}>
                      {h.hora}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* 4. Location Column (span-4) */}
          <div className="lg:col-span-4">
            <h3 className={`text-xs font-bold uppercase tracking-[0.2em] ${t.text40}`}>
              Ubicación
            </h3>

            <div className="mt-6 flex items-start gap-3">
              <MapPin className={`mt-0.5 h-4 w-4 shrink-0 ${t.text40}`} />
              <address className={`not-italic text-[15px] leading-relaxed ${t.text60}`}>
                Cl. 85 #81 32 Riomar,<br />
                Barranquilla, Atlántico<br />
                <span className={t.text40}>Colombia</span>
              </address>
            </div>

            {/* Mapa más estrecho (max-w-[280px]) */}
            <div className={`group relative mt-5 max-w-[280px] overflow-hidden rounded-2xl border ${t.iconBorder} ${t.mapBg} shadow-2xl shadow-black/30`}>
              <iframe
                title="Ubicación SisteOffic"
                src="https://www.google.com/maps?q=Cl.+85+%2381+32,+Riomar,+Barranquilla,+Atl%C3%A1ntico&output=embed"
                width="100%"
                height="100"
                style={{ border: 0, filter: "grayscale(30%) contrast(1.1) brightness(0.9)" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="pointer-events-none transition-all duration-500 group-hover:filter-none"
              />

              <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-3/4">
                <Image
                  src="/gps_logo.png"
                  alt="Pin SisteOffic"
                  width={880}
                  height={1205}
                  className="h-auto w-7 drop-shadow-xl"
                />
              </div>

              <a
                href="https://www.google.com/maps/dir/?api=1&destination=Cl.+85+%2381+32,+Riomar,+Barranquilla,+Atl%C3%A1ntico"
                target="_blank"
                rel="noopener noreferrer"
                className="absolute inset-0 z-10"
                aria-label="Abrir mapa en Google Maps"
              />
            </div>

            <a
              href="https://www.google.com/maps/dir/?api=1&destination=Cl.+85+%2381+32,+Riomar,+Barranquilla,+Atl%C3%A1ntico"
              target="_blank"
              rel="noopener noreferrer"
              className={`mt-4 inline-flex items-center gap-2 text-sm font-medium ${t.text50} transition-colors ${t.hoverWhite}`}
            >
              Cómo llegar
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </div>

        </div>

        {/* ─── Divider ─── */}
        <div className={`mt-16 border-t ${t.divider}`} />

        {/* ─── Bottom Bar ─── */}
        <div className="mt-8 flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className={`text-xs ${t.text35}`}>
            &copy; {new Date().getFullYear()} SisteOffic. Todos los derechos reservados.
          </p>

          <p className={`font-serif text-xs italic ${t.text40}`}>
            "Diseñamos el lugar donde las ideas, las personas y las empresas crecen."
          </p>
        </div>
      </div>
    </footer>
  );
}
