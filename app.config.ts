import { defineConfig } from "@solidjs/start/config";

export default defineConfig({
  ssr: true,
  middleware: "./src/server/middleware.ts",
  server: {
    preset: "vercel",
  },
});
