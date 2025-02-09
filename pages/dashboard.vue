<template>
  <div class="min-h-screen bg-gray-900 text-white">
    <div class="container mx-auto p-6">
      <h1 class="text-3xl font-bold mb-8">Dashboard</h1>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <NuxtLink
          to="/snbarcode"
          class="p-6 bg-gray-800 rounded-lg shadow-md hover:bg-gray-700 transition-colors"
        >
          <h2 class="text-xl font-semibold mb-2">Register New Drone</h2>
          <p class="text-gray-400">Scan Serial Number</p>
        </NuxtLink>

        <!-- Link to Sleek Form -->
        <NuxtLink
          to="/test-form"
          class="p-6 bg-gray-800 rounded-lg shadow-md hover:bg-gray-700 transition-colors"
        >
          <h2 class="text-xl font-semibold mb-2">Sleek Form</h2>
          <p class="text-gray-400">
            A modern, dark-themed form for user input.
          </p>
        </NuxtLink>
      </div>

      <div>
        <UTable :rows="rows" :columns="columns" @select="select" />

        <div
          class="flex justify-end px-3 py-3.5 border-t border-gray-200 dark:border-gray-700"
        >
          <UPagination
            v-model="page"
            :page-count="pageCount"
            :total="drones.length"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useDronesStore } from "@/stores/drones";

// Define reactive state

const page = ref(1);
const pageCount = 10;

const dronesStore = useDronesStore();
if (!dronesStore.drones.length) {
  dronesStore.fetchDrones();
}

const drones = computed(() => {
  return dronesStore.drones;
});

const isLoading = computed(() => {
  return dronesStore.isLoading;
});

const error = computed(() => {
  return dronesStore.error;
});

// Handle row click
const select = (row) => {
  let id = { ...row }._id;
  // alert(id);
  navigateTo(`/drones/assign-${id}`);
};

const rows = computed(() => {
  return dronesStore.drones.slice(
    (page.value - 1) * pageCount,
    page.value * pageCount
  );
});

const columns = [
  {
    key: "type",
    label: "Type",
  },
  {
    key: "createdAt",
    label: "Registration Date",
  },
  {
    key: "barcode1",
    label: "Serial Number",
  },
];

// You can add any logic or data fetching here if needed
</script>

<style scoped>
/* Add custom styles if needed */
</style>
