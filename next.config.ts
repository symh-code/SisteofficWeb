import type { NextConfig } from "next";
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";

// Ensure OpenNext Cloudflare dev helpers are initialized during Next.js config
initOpenNextCloudflareForDev();

const nextConfig: NextConfig = {
  /* config options here */
};

export default nextConfig;
