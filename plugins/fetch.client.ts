export default defineNuxtPlugin({
  // Extend $fetch to automatically add Authorization header
  name: "fetch-plugin",
  enforce: "pre", // or 'post'
  async setup(nuxtApp) {
    // this is the equivalent of a normal functional plugin
    nuxtApp.$fetch = $fetch.create({
      onRequest({ options }) {
        const authStore = useAuthStore();
        // Retrieve the token from localStorage or a cookie
        const token = authStore.token; // Or use useCookie("auth_token")
        console.log("options token", token);

        // If there's a token, attach it to the headers
        if (token) {
          // Ensure headers exist
          options.headers = new Headers(options.headers || {});
          options.headers.set("Authorization", `Bearer ${token}`);
        }

        console.log("options", options.headers);
      },
      onResponse({ response }) {
        console.log("Response received:", response);
      },
    });
  },
});
