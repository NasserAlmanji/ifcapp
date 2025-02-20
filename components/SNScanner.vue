<template>
  <div class="max-w-md mx-auto p-6 text-center font-sans">
    <h1 class="text-2xl font-bold mb-4">Scan</h1>

    <!-- Input for adding items -->

    <input
      v-model="type"
      type="text"
      placeholder="DJI Mavic 3 Pro(DJI RC)"
      class="w-full p-3 mb-4 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
    />

    <input
      v-model="newItem"
      @input="onInputChange"
      type="text"
      focus
      placeholder="Scan barcode "
      class="w-full p-3 mb-4 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
    />

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
const newItem = ref("");
const items = ref([]);

const onInputChange = () => {
  if (newItem.value.trim()) {
    // Add item if it's not empty or a duplicate
    if (!items.value.includes(newItem.value) && newItem.value.length > 8) {
      items.value.push(newItem.value);
      newItem.value = "";
    }
  }
};

const removeItem = (index) => {
  items.value.splice(index, 1);
  newItem.value = "";
};

// const dronesStore = useDronesStore();

//   return result;
// }

// const step = ref(1); // 1: Scan Barcode, 2: Details Form
// const form = ref({
//   type: "Drone",
//   barcode1: generateRandomString(10),
// });

// // Submit the form
// const submitForm = async () => {
//   try {
//     const response = await $fetch("/api/admin/register", {
//       method: "POST",
//       body: form.value,
//     });
//     dronesStore.fetchDrones();

//     navigateTo("/success"); // Redirect to success page
//   } catch (error) {
//     console.error("Error:", error);
//   }
// };
</script>

<style scoped>
/* You can add custom styling here, but Tailwind provides the utilities you need */
</style>
