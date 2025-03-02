<template>
  <center>
    <h1 class="text-2xl font-bold mb-4">Add Drone Type</h1>

    <UCard class="w-full max-w-md bg-gray-800">
      <UForm :state="formState" @submit="submitForm">
        <UFormGroup label="Drone type" name="type" class="mb-4">
          <UInput
            v-model="formState.type"
            placeholder="DJI Mavic 3 Pro(DJI RC)"
            class="bg-gray-700 text-white placeholder-gray-400"
          />
        </UFormGroup>

        <UButton type="submit" color="primary" class="w-full"> Add </UButton>
      </UForm>

      <!-- Display list of items -->
      <h2 class="mt-10">Added Types</h2>
      <ul class="space-y-3">
        <li
          v-for="(item, index) in types"
          :key="index"
          class="flex justify-between items-center rounded-lg shadow-md"
        >
          <span> - {{ item.type }}</span>
          <!-- <button
            @click="removeItem(index)"
            class="bg-red-500 text-white py-1 px-3 rounded-lg hover:bg-red-600 transition duration-200"
          >
            Remove
          </button> -->
        </li>
      </ul>
    </UCard>
  </center>
</template>

<script setup>
import api from '../../utils/api';

definePageMeta({ layout: "auth" });

const formState = ref({ type: "" });
const types = ref([]);
const errorMessage = ref("");

const fetchDroneTypes = async () => {
  try {
    const response = await api.getDroneTypes();
    types.value = response.data;
  } catch (error) {
    console.error("Error fetching drone types:", error);
    errorMessage.value = "Failed to fetch drone types. Please log in.";
  }
};

const submitForm = async () => {
  try {
    await api.createDroneType(formState.value.type);
    navigateTo("/success");
    // formState.value.type = "";
    // await fetchDroneTypes();
  } catch (error) {
    console.error("Error creating drone type:", error);
    errorMessage.value = "Failed to create drone type. Check your authentication.";
  }
};

onMounted(fetchDroneTypes);
</script>