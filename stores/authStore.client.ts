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
      //localStorage.setItem("user", JSON.stringify(this.user)); // Store token in localStorage
    },
    setToken(token: string) {
      this.token = token;
      localStorage.setItem("token", token); // Store token in localStorage
    },
    logout() {
      this.user = null;
      this.token = null;
      localStorage.removeItem("token"); // Remove token from localStorage
      //localStorage.removeItem("user"); // Remove token from localStorage
    },
    initialize() {
      console.warn("AuthStore initialize called");
      const token = localStorage.getItem("token");
      if (token) {
        this.token = token;
        // Optionally, fetch user data from the backend
      }
    },
  },
});
