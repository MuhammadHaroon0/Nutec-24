import { vitePlugin as remix } from "@remix-run/dev";
import { installGlobals } from "@remix-run/node";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

import { createRoutesFromFolders } from "@remix-run/v1-route-convention";

const remixPlugin = remix({
  // Tell Remix to ignore everything in the routes directory.
  // We'll let `createRoutesFromFolders` take care of that.
  ignoredRouteFiles: ["**/*"],
  routes: defineRoutes => {
    // `createRoutesFromFolders` will create routes for all files in the
    // routes directory using the same default conventions as Remix v1.
    return createRoutesFromFolders(defineRoutes, {
      ignoredFilePatterns: ["**/.*", "**/*.css", "**/*.c.tsx"]
    });
  }
});

installGlobals();

export default defineConfig({
  plugins: [remixPlugin, tsconfigPaths()],
  server: {
    port: 4200
  }
});
