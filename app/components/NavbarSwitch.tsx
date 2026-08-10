"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "./Navbar";
import { CamodNavbar } from "./CamodNavbar";

export function NavbarSwitch() {
  const pathname = usePathname();

  if (pathname?.startsWith("/camodstudio")) {
    return <CamodNavbar />;
  }

  return <Navbar />;
}
