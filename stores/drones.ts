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
      try {
        const response = await fetch("/api/drones/all"); // Replace with your API endpoint
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        this.drones = data;
      } catch (error) {
        console.error("Failed to fetch drones:", error);
        //this.error = error.message;
      } finally {
        this.loading = false;
      }
    },
  },
});
