import { defineNuxtConfig } from "nuxt3";

// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default defineNuxtConfig({
  meta: {
    link: [
      {
        rel: "icon",
        type: "image/x-icon",
        href: "/favicon.ico",
      },
    ],
  },
  css: ["~/assets/scss/global.scss"],
  buildModules: ["@nuxtjs/tailwindcss", ["@pinia/nuxt", { disableVuex: true }]],
  components: ["~/components/common", "~/components/ui"],
});
