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

import { format } from "date-fns";

const scannedItem = ref("");
const droneType = ref("");
const idcardnumber = ref("");
const idname = ref("");
const idexpirydate = ref(new Date());

const inputRef = ref(null);
let timeout = null;

onMounted(() => {
  inputRef.value?.focus();
});

const handleFocus = () => {
  scannedItem.value = "";
};

const onInputChange = () => {
  clearTimeout(timeout);
  timeout = setTimeout(async () => {
    let item = scannedItem.value.trim();
    if (item) {
      // Add item if it's not empty or a duplicate
      if (item.length > 10) {
        //alert(item);
        try {
          let drone = await $fetch(`/api/seller/check/isValidSale?id=${item}`);
          droneType.value = drone.type;
        } catch (error) {
          alert(error.message);
        }
      }
    }
  }, 100);
};

const removeItem = (index) => {
  items.value.splice(index, 1);
  scannedItem.value = "";
};

async function submit() {
  const { data, error, pending } = await useFetch("/api/seller/sell_drone", {
    method: "POST",
    body: { idcardnumber, idname, idexpirydate, id: scannedItem.value },
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!error.value) {
    navigateTo("/success"); // Redirect to success page
  } else {
    alert(error.value);
  }
}
</script>

<style scoped>
/* You can add custom styling here, but Tailwind provides the utilities you need */
</style>
