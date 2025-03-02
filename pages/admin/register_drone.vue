<template>
  <div class="max-w-md mx-auto p-6 text-center font-sans">
    <h1 class="text-2xl font-bold mb-4">Scan New Drones Barcode</h1>

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
      v-model="type"
      :options="types.map((t) => ({ label: t.type, value: t.id }))"
      class="w-full p-3 mb-4 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
    <UButton @click=submit color="primary" class="w-full">
      Register ( {{ items.length }} ) drones
    </UButton>

    <!-- Display list of items -->
    <ul class="space-y-3">
      <li
        v-for="(item, index) in items"
        :key="index"
        class="flex justify-between items-center p-3 rounded-lg shadow-md"
      >
        <span>{{ item }}</span>
        <button
          @click="removeItem(index)"
          class="bg-red-500 text-white py-1 px-3 rounded-lg hover:bg-red-600 transition duration-200"
        >
          Remove
        </button>
      </li>
    </ul>
  </div>
</template>
<script setup>
import { ref, onMounted } from "vue";
import { debounce } from "lodash";
import api from "../../utils/api";

definePageMeta({ layout: "auth" });

const scannedItem = ref("");
const items = ref([]);
const type = ref("");
const inputRef = ref(null);
const types = ref([]);
const errorMessage = ref("");

onMounted(async () => {
  inputRef.value?.focus();
  try {
    const response = await api.getDroneTypes();
    types.value = response.data || [];
  } catch (error) {
    console.error("Failed to fetch drone types:", error);
    types.value = [];
    errorMessage.value = "Failed to fetch drone types. Please log in.";
  }
});

const handleFocus = () => {
  scannedItem.value = "";
};

const onInputChange = debounce(async () => {
  let item = scannedItem.value.trim();
  if (!item || item.length <= 10) return;
  //if (items.value.includes(item)) return alert("Barcode already scanned");

  try {
    items.value.push(item);
  } catch (error) {
    alert(error.message);
  } finally {
    scannedItem.value = "";
  }
}, 300);

const removeItem = (index) => {
  items.value.splice(index, 1);
};

async function submit() {
  if (!type.value || items.value.length === 0) {
    alert("Please select a type and add at least one drone.");
    return;
  }

  try {
    await api.registerDrone(type.value, items.value);
    navigateTo("/success");
  } catch (error) {
    console.error("Error registering drone:", error);
    errorMessage.value = "Failed to register drones. Please check your data.";
  }
}
</script>
