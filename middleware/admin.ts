export default defineNuxtRouteMiddleware(async (to, from) => {
  console.log(to, from);
  if (to.path === "/login") return;

  const authStore = useAuthStore();
  //authStore.initialize();

  console.log("test " + authStore.token, useCookie("auth_token"));
  const allowedRoles = ["admin", "editor"]; // Add more roles as needed
  if (
    !authStore.token &&
    !useCookie("auth_token") /*|| !allowedRoles.includes(authStore.user?.role)*/
  ) {
    return navigateTo("/login");
  }
});
