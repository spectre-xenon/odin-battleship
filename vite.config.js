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
      {
        find: "@DOM",
        replacement: fileURLToPath(new URL("./src/DOM/", import.meta.url)),
      },
      {
        find: "@game",
        replacement: fileURLToPath(new URL("./src/game/", import.meta.url)),
      },
    ],
  },
});
