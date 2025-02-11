import { defineStore } from "pinia";

export const useDronesStore = defineStore("dronesStore", {
  state: () => ({
    drones: [],
    loading: false,
    error: null,
  }),
  actions: {
    async fetchDrones() {
      this.loading = true;
      const { $fetch } = useNuxtApp(); // Get custom $fetch from the plugin
      try {
        const data = await $fetch("/api/admin/all");
        this.drones = data;
      } catch (error) {
        console.error("Failed to fetch drones:", error);
      } finally {
        this.loading = false;
      }
    },
    async fetchSellerDrones() {
      this.loading = true;
      const { $fetch } = useNuxtApp(); // Get custom $fetch from the plugin
      try {
        const data = await $fetch("/api/seller/available");
        this.drones = data;
      } catch (error) {
        console.error("Failed to fetch drones:", error);
      } finally {
        this.loading = false;
      }
    },
  },
});
