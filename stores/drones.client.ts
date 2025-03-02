import { defineStore } from "pinia";
import api from "../utils/api";

export const useDronesStore = defineStore("dronesStore", {
  state: () => ({
    drones: [] as any[],
    loading: false,
    error: null as Error | null,
  }),
  actions: {
    async fetchDrones() {
      try {
        this.loading = true;
        const response = await api.listDrones();
        this.drones = response.data;
        this.error = null;
      } catch (error: any) {
        this.error = error;
      } finally {
        this.loading = false;
      }
    },

    async fetchSellerDrones() {
      try {
        this.loading = true;
        const response = await api.listSellerDrones();
        this.drones = response.data;
        this.error = null;
      } catch (error: any) {
        this.error = error;
      } finally {
        this.loading = false;
      }
    }
  }
});