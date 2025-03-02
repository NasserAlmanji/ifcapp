import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null as null | {
      username: String;
      role: String;
      organization: String;
      _id: String;
    },
    userAvatar: null,
    token: localStorage.getItem("token") || null
  }),
  persist: true,
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
      localStorage.setItem("token", token);
    },
    logout() {
      this.token = null;
      this.user = null;
      localStorage.removeItem("token");
    },
  },
});
