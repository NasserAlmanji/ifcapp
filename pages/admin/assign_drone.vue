<template>
  <div class="max-w-md mx-auto p-6 text-center font-sans">
    <h1 class="text-2xl font-bold mb-4">Assign Drones to Seller</h1>

    <input
      v-model="scannedItem"
      @input="onInputChange"
      type="text"
      @focus="handleFocus"
      ref="inputRef"
      placeholder="Flashing cursor must be here while scanning barcode "
      class="w-full p-3 mb-4 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
    />

    <USelect
      v-model="distributor"
      :options="distributors.map((distributor) => distributor.name)"
      class="w-full p-3 mb-4 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
    />

    <UButton @click="submit()" color="primary" class="w-full">
      Assign ( {{ items.length }} ) drones</UButton
    >

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
definePageMeta({ layout: "auth" });

const scannedItem = ref("");
const items = ref([]);
const distributor = ref("");
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
      if (items.value.includes(item)) {
        return alert("Barcode already scanned");
      }
      // Add item if it's not empty or a duplicate
      if (item.length > 10) {
        //alert(item);
        try {
          await $fetch(`/api/admin/check/isWithSeller?id=${item}`);

          items.value.push(item);
        } catch (error) {
          alert(error.message);
        }
        scannedItem.value = "";
      }
    }
  }, 100);
};

const {
  data: distributors,
  status,
  error: fetchError,
} = await useFetch("/api/admin/distributor/list");

const removeItem = (index) => {
  items.value.splice(index, 1);
  scannedItem.value = "";
};

async function submit() {
  const { data, error, pending } = await useFetch("/api/admin/assign_drone", {
    method: "POST",
    body: { distributor, items: items.value },
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
