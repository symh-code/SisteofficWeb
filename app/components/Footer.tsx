import Link from "next/link";
import Image from "next/image";
import { Store, MapPin, Phone, Mail, Clock, ArrowUpRight } from "lucide-react";

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

const navegacion = [
  { label: "Inicio", href: "/" },
  { label: "Sillas de oficina en Barranquilla", href: "/sillas-de-oficina-en-barranquilla" },
  { label: "Buscar productos", href: "/buscar" },
  { label: "Sobre nosotros", href: "/sobre-nosotros" }
];

const contacto = [
  { icon: Phone, label: "+57 300 359 1054", href: "tel:+573003591054" },
  { icon: Mail, label: "comercial.sisteofficjl@gmail.com", href: "mailto:comercial.sisteofficjl@gmail.com" },
];

const horario = [
  { dia: "Lun - Vie", hora: "8:00 a.m. - 6:00 p.m." },
  { dia: "Sábado", hora: "9:00 a.m. - 2:00 p.m." },
  { dia: "Domingo", hora: "Cerrado" },
];

export function Footer() {
  return (
    <footer id="site-footer" className="relative bg-[#6B1212] text-white">
      {/* Decorative top border */}
      <div className="h-1 w-full bg-gradient-to-r from-[#8B1A1A] via-[#C0392B] to-[#8B1A1A]" />

      <div className="mx-auto max-w-7xl px-6 pt-20 pb-10 lg:px-8">
        {/* ─── Main Grid ─── */}
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          
          {/* ─── Brand Column ─── */}
          <div className="lg:col-span-4">
            <Link 
              href="/" 
              className="group inline-flex items-center gap-3"
            >
              <Image
                src="/logo_2.svg"
                alt="SisteOffic"
                width={160}
                height={40}
                className="h-10 w-auto brightness-0 invert transition-transform duration-300 group-hover:scale-105"
                priority
              />
            </Link>

            <p className="mt-6 max-w-sm text-[15px] leading-relaxed text-white/60">
              Excelencia en arquitectura de espacios de trabajo. Diseñamos y 
              fabricamos mobiliario premium que transforma la productividad 
              de tu empresa.
            </p>

            {/* Social Networks */}
            <div className="mt-8">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-white/40">
                Síguenos
              </p>
              <div className="flex items-center gap-3">
                {[
                  { href: "https://www.facebook.com/sisteofficjlsas", icon: FacebookIcon, label: "Facebook", color: "hover:bg-blue-600 hover:text-white" },
                  { href: "https://www.instagram.com/sisteofficjl/", icon: InstagramIcon, label: "Instagram", color: "hover:bg-pink-600 hover:text-white" },
                  { href: "https://provee.com.co/empresas/sisteoffic-jl-sas", icon: Store, label: "Provee", color: "hover:bg-emerald-600 hover:text-white" },
                ].map((social) => (
                  <Link
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white/70 backdrop-blur-sm transition-all duration-300 ${social.color} hover:shadow-lg hover:shadow-black/20 hover:-translate-y-0.5`}
                    aria-label={social.label}
                    title={social.label}
                  >
                    <social.icon className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* ─── Navigation Column ─── */}
          <div className="lg:col-span-2">
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-white/40">
              Navegación
            </h3>
            <ul className="mt-6 space-y-3">
              {navegacion.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="group inline-flex items-center gap-1.5 text-[15px] text-white/70 transition-all duration-200 hover:text-white"
                  >
                    <span className="h-px w-0 bg-white/50 transition-all duration-300 group-hover:w-3" />
                    {item.label}
                    <ArrowUpRight className="h-3 w-3 opacity-0 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ─── Contact & Hours Column ─── */}
          <div className="lg:col-span-3">
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-white/40">
              Contacto
            </h3>
            <ul className="mt-6 space-y-4">
              {contacto.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="group flex items-center gap-3 text-[15px] text-white/70 transition-colors hover:text-white"
                  >
                    <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/5 text-white/50 transition-colors group-hover:bg-white/10 group-hover:text-white">
                      <item.icon className="h-4 w-4" />
                    </span>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>

            <h3 className="mt-8 text-xs font-bold uppercase tracking-[0.2em] text-white/40">
              Horario de atención
            </h3>
            <ul className="mt-4 space-y-2.5">
              {horario.map((h) => (
                <li key={h.dia} className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2 text-white/50">
                    <Clock className="h-3.5 w-3.5" />
                    {h.dia}
                  </span>
                  <span className={`font-medium ${h.hora === "Cerrado" ? "text-white/30" : "text-white/70"}`}>
                    {h.hora}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* ─── Location Column ─── */}
          <div className="lg:col-span-3">
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-white/40">
              Ubicación
            </h3>
            
            <div className="mt-6 flex items-start gap-3">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-white/40" />
              <address className="not-italic text-[15px] leading-relaxed text-white/60">
                Cl. 85 #81 32 Riomar,<br />
                Barranquilla, Atlántico<br />
                <span className="text-white/40">Colombia</span>
              </address>
            </div>

            {/* Contenedor relative y group para el mapa y el pin */}
            <div className="group relative mt-5 overflow-hidden rounded-2xl border border-white/10 bg-[#5a0f0f] shadow-2xl shadow-black/30">
              <iframe
                title="Ubicación SisteOffic"
                src="https://www.google.com/maps?q=Cl.+85+%2381+32,+Riomar,+Barranquilla,+Atl%C3%A1ntico&output=embed"
                width="100%"
                height="180"
                style={{ border: 0, filter: "grayscale(30%) contrast(1.1) brightness(0.9)" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="pointer-events-none transition-all duration-500 group-hover:filter-none"
              />
              
              {/* Pin Personalizado sobre el mapa */}
              <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-3/4">
                <Image
                  src="/gps_logo.png" 
                  alt="Pin SisteOffic"
                  width={48} 
                  height={48}
                  className="drop-shadow-xl"
                />
              </div>

              {/* Capa invisible para enlazar hacia Google Maps */}
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
              className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-white/50 transition-colors hover:text-white"
            >
              Cómo llegar
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>

        {/* ─── Divider ─── */}
        <div className="mt-16 border-t border-white/10" />

        {/* ─── Bottom Bar ─── */}
        <div className="mt-8 flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-xs text-white/35">
            &copy; {new Date().getFullYear()} SisteOffic. Todos los derechos reservados.
          </p>
          
          <div className="flex items-center gap-6 text-xs text-white/35">
          </div>
        </div>
      </div>
    </footer>
  );
}