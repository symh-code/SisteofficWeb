"use client";

import { usePathname } from "next/navigation";
import { Footer } from "./Footer";

export function FooterSwitch() {
  const pathname = usePathname();
  const isCamod = Boolean(pathname?.startsWith("/camodstudio"));

  return <Footer isCamod={isCamod} />;
}
