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

    <!-- <input
      v-model="type"
      type="text"
      placeholder="DJI Mavic 3 Pro(DJI RC)"
      class="w-full p-3 mb-4 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
    /> -->

    <USelect
      v-model="type"
      :options="types.map((type) => type.type)"
      class="w-full p-3 mb-4 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
    />

    <UButton @click="submit()" color="primary" class="w-full">
      Register ( {{ items.length }} ) drones</UButton
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
const type = ref("");
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
          await $fetch(`/api/admin/check/isAlreadyRegistered?id=${item}`);

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
  data: types,
  status,
  error: fetchError,
} = await useFetch("/api/admin/type/list");

const removeItem = (index) => {
  items.value.splice(index, 1);
  scannedItem.value = "";
};

// onMounted(() => {
//   for (var i = 1; i < 1; i++) {
//     setTimeout(() => {
//       scannedItem.value = generateRandomString(10);
//       //alert(scannedItem.value + "" + generateRandomString(10));
//       onInputChange();
//     }, 1000 * i * 2);
//   }
// });

function generateRandomString(length) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters[randomIndex];
  }
  return result;
}

async function submit() {
  const { data, error, pending } = await useFetch("/api/admin/register_drone", {
    method: "POST",
    body: { type, items: items.value },
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
