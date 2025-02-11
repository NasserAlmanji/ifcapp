export default defineNuxtRouteMiddleware(async (to, from) => {
  console.log(to, from);
  if (to.path === "/login") return;

  const authStore = useAuthStore();

  console.log(
    "checkLogin MW " + authStore.token,
    "cookie",
    useCookie("auth_token")
  );
  //const allowedRoles = ["admin", "editor"]; // Add more roles as needed
  if (!authStore.token /*|| !allowedRoles.includes(authStore.user?.role)*/) {
    return navigateTo("/login");
  }
});
