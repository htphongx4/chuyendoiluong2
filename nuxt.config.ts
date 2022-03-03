import { defineNuxtConfig } from "nuxt3";

// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default defineNuxtConfig({
  css: ["~/assets/scss/global.scss"],
  buildModules: ["@nuxtjs/tailwindcss", ["@pinia/nuxt", { disableVuex: true }]],
  components: ["~/components/common", "~/components/ui"],
});
