import { spawnSync } from "node:child_process";

// OpenNext compiles Next.js by invoking this project's build script. On that
// inner invocation it sets NEXT_PRIVATE_STANDALONE, so run only the Next.js
// portion and let the outer OpenNext process finish generating `.open-next`.
const args =
  process.env.NEXT_PRIVATE_STANDALONE === "true"
    ? ["run", "build:next"]
    : ["exec", "opennextjs-cloudflare", "build"];

const result = spawnSync("pnpm", args, { stdio: "inherit" });

if (result.error) {
  throw result.error;
}

process.exit(result.status ?? 1);
