<template>
  <center>
    <h1 class="text-2xl font-bold mb-4">Add Distributor</h1>

    <UCard class="w-full max-w-md bg-gray-800">
      <UForm :state="formState" @submit="submitForm">
        <UFormGroup label="Distributor name" name="type" class="mb-4">
          <UInput
            v-model="formState.name"
            placeholder="SharafDJ"
            class="bg-gray-700 text-white placeholder-gray-400"
          />
        </UFormGroup>

        <UButton type="submit" color="primary" class="w-full"> Add </UButton>
      </UForm>

      <!-- Display list of items -->
      <h2 class="mt-10">Added Distributors</h2>
      <ul class="space-y-3">
        <li
          v-for="(item, index) in distributors"
          :key="index"
          class="flex justify-between items-center rounded-lg shadow-md"
        >
          <span> - {{ item.name }}</span>
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

const formState = ref({ name: "" });
const distributors = ref([]);

const fetchDistributors = async () => {
  try {
    const { data } = await api.getDistributors();
    distributors.value = data;
  } catch (error) {
    console.error(error);
    alert("Failed to load distributors");
  }
};

const submitForm = async () => {
  try {
    await api.createDistributor(formState.value.name);
    // formState.value.name = "";
    // await fetchDistributors();
    navigateTo("/success");
  } catch (error) {
    console.error(error);
    alert("Failed to add distributor");
  }
};

onMounted(fetchDistributors);
</script>