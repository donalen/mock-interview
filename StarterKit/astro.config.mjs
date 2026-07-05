// @ts-check
import { defineConfig } from "astro/config";

import vue from "@astrojs/vue";
import svelte from "@astrojs/svelte";
import react from "@astrojs/react";
import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
  markdown: {
    shikiConfig: {
      themes: {
        light: "github-light",
        dark: "github-dark",
      },
    },
  },
  redirects: {
    "/": "/readme/",
  },
  integrations: [
    mdx(),
    vue({
      // include: ['**/vue/*'],
    }),
    svelte({
      // include: ['**/svelte/*'],
    }),
    react({
      // include: ['**/react/*'],
    }),
  ],
});
