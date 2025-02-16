import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null as null | {
      username: String;
      role: String;
      organization: String;
      _id: String;
    },
    token: null as null | string,
    userAvatar: null, // Add this for avatar support
  }),
  persist: true, // Enables persistence
  actions: {
    setUser(user: {
      username: String;
      role: String;
      organization: String;
      _id: String;
    }) {
      this.user = user;
    },
    setToken(token: string) {
      this.token = token;
    },
    logout() {
      this.user = null;
      this.token = null;
      const token = useCookie("auth_token"); // Access the cookie
      token.value = null; // Set the cookie to null (delete it)
    },
  },
});
