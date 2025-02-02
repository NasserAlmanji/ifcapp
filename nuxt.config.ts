// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  modules: ["@nuxt/ui"],
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
