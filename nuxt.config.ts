import dotenv from "dotenv";
dotenv.config();

export default defineNuxtConfig({
  ssr: false,
  target: "static",
  compatibilityDate: "2024-11-01",
  devtools: { enabled: false },
  publicRuntimeConfig: {
    API_BASE_URL: process.env.API_BASE_URL || "http://localhost:8090/api",
  },

  css: ["~/assets/css/global.css"],

  modules: ["@nuxt/ui", "@pinia/nuxt", "pinia-plugin-persistedstate/nuxt"],

  routeRules: {
    "/": { redirect: "/dashboard" },
  },
});
