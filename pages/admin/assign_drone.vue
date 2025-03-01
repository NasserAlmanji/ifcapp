<template>
  <div class="max-w-md mx-auto p-6 text-center font-sans">
    <h1 class="text-2xl font-bold mb-4">Assign Drones to Seller</h1>

    <input
      v-model="scannedItem"
      @input="onInputChange"
      type="text"
      @focus="handleFocus"
      ref="inputRef"
      placeholder="Before scan, place cursor here"
      class="w-full p-3 mb-4 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
    />

    <USelect
      v-model="selectedDistributor"
      :options="distributorsOptions"
      class="w-full p-3 mb-4 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
    />

    <UButton @click="submit" color="primary" class="w-full">
      Assign ( {{ items.length }} ) drones
    </UButton>

    <ul class="space-y-3 mt-4">
      <li
        v-for="(item, index) in items"
        :key="index"
        class="flex justify-between items-center p-3 rounded-lg shadow-md bg-gray-800"
      >
        <span>{{ item }}</span>
        <UButton
          @click="removeItem(index)"
          color="red"
          variant="solid"
          icon="i-heroicons-x-mark"
        />
      </li>
    </ul>
  </div>
</template>

<script setup>
definePageMeta({ layout: "auth" });

import { ref, onMounted } from 'vue';
import api from '../../utils/api';
import { debounce } from 'lodash';

const scannedItem = ref('');
const items = ref([]);
const selectedDistributor = ref('');
const inputRef = ref(null);
const distributors = ref([]);

onMounted(async () => {
  try {
    const response = await api.getDistributors();
    distributors.value = response.data;
    inputRef.value?.focus();
  } catch (error) {
    console.error('Failed to fetch distributors:', error);
  }
});

const distributorsOptions = computed(() => {
  return distributors.value.map(d => ({
    label: d.name,
    value: d.id
  }));
});

const handleFocus = () => {
  scannedItem.value = "";
};

const onInputChange = debounce(async () => {
  const barcode = scannedItem.value.trim();
  if (!barcode || barcode.length <= 10) return;

  try {
    await api.checkDroneSeller(barcode);
    if (!items.value.includes(barcode)) items.value.push(barcode);
    scannedItem.value = '';
  } catch (error) {
    alert(error.response?.data?.message || 'Invalid drone for assignment');
  }
}, 300);

const removeItem = (index) => {
  items.value.splice(index, 1);
};

const submit = async () => {
  if (!selectedDistributor.value || !items.value.length) {
    alert('Please select a distributor and scan at least one drone');
    return;
  }

  try {
    await api.assignDrones(selectedDistributor.value, items.value);
    navigateTo('/success');
  } catch (error) {
    alert(error.response?.data?.message || 'Assignment failed');
  }
};
</script>