import type { NextConfig } from "next";
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";

// Use the persisted local bindings during `next dev`. Production builds still
// receive their bindings from Cloudflare at runtime.
initOpenNextCloudflareForDev({
  remoteBindings: false,
  persist: true,
});

const nextConfig: NextConfig = {
  /* config options here */
};

export default nextConfig;
