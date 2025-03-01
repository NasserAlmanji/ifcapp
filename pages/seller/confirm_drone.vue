<template>
  <div class="max-w-md mx-auto p-6 text-center font-sans">
    <h1 class="text-2xl font-bold mb-4">
      Scan Drone Barcode To Confirm Drone Reception
    </h1>

    <input
      v-model="scannedItem"
      @input="onInputChange"
      type="text"
      @focus="handleFocus"
      ref="inputRef"
      placeholder="Before scan, place cursor here"
      class="w-full p-3 mb-4 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
    />

    <UButton @click="submit" color="primary" class="w-full">
      Confirm ( {{ items.length }} ) drones
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

const scannedItem = ref("");
const items = ref([]);
const inputRef = ref(null);

onMounted(() => {
  inputRef.value?.focus();
});

const handleFocus = () => {
  scannedItem.value = '';
};

const onInputChange = debounce(async () => {
  const barcode = scannedItem.value.trim();
  if (!barcode || barcode.length <= 10) return;

  try {
    await api.checkDroneConfirmation(barcode);
    if (!items.value.includes(barcode)) {
      items.value.push(barcode);
    }
    scannedItem.value = '';
  } catch (error) {
    alert(error.response?.data?.message || 'Invalid drone confirmation');
  }
}, 300);

const removeItem = (index) => {
  items.value.splice(index, 1);
};

const submit = async () => {
  try {
    if (!items.value.length) {
      alert('Please scan at least one drone');
      return;
    }

    await api.confirmDrones(items.value);
    navigateTo('/success');
  } catch (error) {
    alert(error.response?.data?.message || 'Confirmation failed');
  }
};
</script>