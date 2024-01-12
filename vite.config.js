import { defineConfig } from "vite";
import { fileURLToPath } from "node:url";

export default defineConfig({
  resolve: {
    alias: [
      {
        find: "@",
        replacement: fileURLToPath(new URL("./src", import.meta.url)),
      },
      {
        find: "@factories",
        replacement: fileURLToPath(
          new URL("./src/factories/", import.meta.url),
        ),
      },
    ],
  },
});
