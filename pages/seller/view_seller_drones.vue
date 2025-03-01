<template>
  <div class="min-h-screen bg-gray-900 text-white">
    <div class="container mx-auto p-6">
      <div class="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center">
        <UInput
          v-model="searchTerm"
          placeholder="Search by serial, type, or distributor"
          icon="i-heroicons-magnifying-glass"
          class="flex-1"
        />
        
        <USelect
          v-model="selectedFilter"
          :options="filterOptions"
          placeholder="Filter by status"
          class="min-w-[200px]"
        />
      </div>
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

const searchTerm = ref('');
const selectedFilter = ref('all');

const filterOptions = [
  { value: 'all', label: 'All Drones' },
];

const filteredDrones = computed(() => {
  return dronesStore.drones.filter(drone => {
    const matchesSearch = 
      drone.barcode1?.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
      drone.droneType?.type?.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
      drone.distributor?.name?.toLowerCase().includes(searchTerm.value.toLowerCase());

    const matchesFilter = selectedFilter.value === 'all' || 
      (selectedFilter.value === 'confirmed' && drone.sellerHasReceived) ||
      (selectedFilter.value === 'unconfirmed' && !drone.sellerHasReceived) ||
      (selectedFilter.value === 'sold' && drone.sold);

    return matchesSearch && matchesFilter;
  });
});

dronesStore.fetchSellerDrones();

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
  return filteredDrones.value.slice(
    (page.value - 1) * pageCount,
    page.value * pageCount
  );
});

const columns = [
  {
    key: "droneType.type",
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
    key: "sellerHasReceived",
    label: "Confirmed",
  },
  {
    key: "distributor.name",
    label: "Distributor",
  },
];

// You can add any logic or data fetching here if needed
</script>

<style scoped>
/* Add custom styles if needed */
</style>
