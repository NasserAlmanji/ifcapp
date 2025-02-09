// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  runtimeConfig: {
    MONGODB_URI: process.env.MONGODB_URI,
    MONGODB_DB_NAME: process.env.MONGODB_DB_NAME,
  },
  css: ["~/assets/css/global.css"],

  modules: ["@nuxt/ui", "@pinia/nuxt"],
  // devServer: {
  //   https: {
  //     key: "./cert.key",
  //     cert: "./cert.crt",
  //   },
  //   host: "0.0.0.0", // This allows external access
  // },
  routeRules: {
    "/": { redirect: "/dashboard" },
  },
});
