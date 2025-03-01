<template>
  <div class="max-w-md mx-auto p-6 text-center font-sans">
    <h1 class="text-2xl font-bold mb-4">Scan Drone Barcode To Sell</h1>

    <input
      v-model="scannedItem"
      @input="onInputChange"
      type="text"
      @focus="handleFocus"
      ref="inputRef"
      placeholder="Before scan, place cursor here"
      class="w-full p-3 mb-4 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
    />

    <input
      v-model="droneType"
      type="text"
      readonly
      placeholder="Drone type will automatically appear here"
      class="w-full p-3 mb-4 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
    <input
      v-model="idname"
      type="text"
      placeholder="ID Name"
      class="w-full p-3 mb-4 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
    />

    <input
      v-model="idcardnumber"
      type="text"
      placeholder="ID Card Number"
      class="w-full p-3 mb-4 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
    />

    <UPopover :popper="{ placement: 'bottom-start' }">
      <UButton
        icon="i-heroicons-calendar-days-20-solid"
        :label="format(idexpirydate, 'd MMM, yyy')"
      />

      <template #panel="{ close }">
        <DatePicker v-model="idexpirydate" is-required @close="close" />
      </template>
    </UPopover>

    <UButton @click="submit()" color="primary" class="w-full mt-10">
      Sell Drone</UButton
    >
  </div>
</template>

<script setup>
definePageMeta({ layout: "auth" });

import { ref, onMounted } from 'vue';
import { format } from 'date-fns';
import api from '../../utils/api';
import { debounce } from 'lodash';

const scannedItem = ref("");
const droneType = ref("");
const idcardnumber = ref("");
const idname = ref("");
const idexpirydate = ref(new Date());
const inputRef = ref(null);

onMounted(() => {
  inputRef.value?.focus();
});

const handleFocus = () => {
  scannedItem.value = "";
};

const onInputChange = debounce(async () => {
  const barcode = scannedItem.value.trim();
  if (!barcode || barcode.length <= 10) return;

  try {
    const response = await api.validateDroneSale(barcode);
    droneType.value = response.data.droneType.type || 'Unknown';
  } catch (error) {
    alert(error.response?.data?.message || 'Invalid drone for sale');
  }
}, 300);

const submit = async () => {
  try {
    if (!scannedItem.value || !idcardnumber.value || !idname.value) {
      alert('Please fill all required fields');
      return;
    }

    await api.sellDrone({
      id: scannedItem.value,
      idcardnumber: idcardnumber.value,
      idname: idname.value,
      idexpirydate: idexpirydate.value.toISOString()
    });
    
    navigateTo('/success');
  } catch (error) {
    alert(error.response?.data?.message || 'Sale failed');
  }
};
</script>