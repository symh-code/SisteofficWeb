import type { Metadata } from "next";

export const metadata: Metadata = {
  icons: {
    icon: "/camodLogos/iconCamod.webp",
  },
};

export default function CamodStudioLayout({ children }: { children: React.ReactNode }) {
  return children;
}
