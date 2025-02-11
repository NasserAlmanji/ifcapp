<template>
  <div class="max-w-md mx-auto p-6 bg-gray-900 shadow-lg rounded-lg">
    <h1 class="text-2xl font-bold mb-6 text-white-800">Drone Information</h1>

    <!-- Type Field -->
    <UFormGroup label="Type" class="mb-4">
      <h2>{{ drone.type }}</h2>
    </UFormGroup>

    <UFormGroup label="Serial Number" class="mb-4">
      <h2>{{ drone.barcode1 }}</h2>
    </UFormGroup>

    <!-- Dropdown Field -->
    <UFormGroup label="Select Seller" class="mb-6">
      <USelect
        v-model="formData.seller"
        :options="options"
        placeholder="Choose Seller"
      />
    </UFormGroup>

    <!-- Submit Button -->
    <UButton
      @click="submitForm"
      class="w-full bg-blue-500 hover:bg-blue-600 text-white"
    >
      Save
    </UButton>
  </div>
</template>

<script setup>
definePageMeta({ layout: "default", middleware: ["admin"] });
const { $fetch } = useNuxtApp(); // Get custom $fetch from the plugin

import { useRoute } from "vue-router";
//import { useDronesStore } from "@/stores/drones";

const options = ["SharafDJ", "Omantel", "Emax"];
const route = useRoute();
const id = route.params.id;

const formData = ref({
  id,
  seller: null,
});

const dronesStore = useDronesStore();
if (!dronesStore.drones.length) {
  dronesStore.fetchDrones();
}

const submitForm = async () => {
  console.log(formData);
  try {
    await $fetch("/api/admin/assign", {
      method: "POST",
      body: formData.value,
    });
    dronesStore.fetchDrones();

    navigateTo("/success"); // Redirect to success page
  } catch (error) {
    console.error("Error:", error);
  }
};

const drone = computed(() => {
  return dronesStore.drones.find((drone) => drone._id === id);
});
</script>
