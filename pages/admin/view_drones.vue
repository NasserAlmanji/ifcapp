<template>
  <div class="min-h-screen bg-gray-900 text-white">
    <div class="container mx-auto p-6">
      <div>
        <UTable v-model:expand="expand" :columns="columns" :rows="rows">
          <template #expand="{ row }">
            <div class="p-4">
              <pre>{{ row }}</pre>
            </div>
          </template>
        </UTable>

        <!-- <UTable :rows="rows" :columns="columns" @select="select" /> -->
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
definePageMeta({ layout: "auth" });

// Define reactive state

const page = ref(1);
const pageCount = 10;
const expand = ref({
  openedRows: [],
  row: {},
});
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
// const select = (row) => {
//   let id = { ...row }._id;
//   if ({ ...row }.seller) {
//     return alert("already assigned to seller");
//   }
//   navigateTo(`/admin/assign-${id}`);
// };

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
  {
    key: "registrar.username",
    label: "Registrar",
  },
  {
    key: "seller",
    label: "Distributor",
  },
];

// You can add any logic or data fetching here if needed
</script>

<style scoped>
/* Add custom styles if needed */
</style>
