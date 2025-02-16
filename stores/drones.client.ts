import { defineStore } from "pinia";

export const useDronesStore = defineStore("dronesStore", {
  state: () => ({
    drones: [],
    loading: false,
    error: null as Error | null,
  }),
  actions: {
    async fetchDrones() {
      const { data, status, error } = await useFetch("/api/admin/all");
      this.drones = (data.value as []) || [];
      this.loading = status.value === "pending";
      this.error = error.value;
    },
    async fetchSellerDrones() {
      const { data, status, error } = await useFetch("/api/seller/available");
      this.drones = (data.value as []) || [];
      this.loading = status.value === "pending";
      this.error = error.value;
    },
  },
});
