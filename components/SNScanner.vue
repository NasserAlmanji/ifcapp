<template>
  <div class="mt-5 bg-gray-900 text-white flex justify-center items-center">
    <UCard class="bg-gray-800 p-6">
      <!-- Step 1: Scan Barcode -->
      <div v-if="step === 1">
        <h2 class="text-xl font-bold mb-4">Point this to S/N in Box</h2>
        <div id="scanner" class="w-full bg-gray-700 mb-4"></div>

        <UButton @click="step++" color="primary" class="w-full mt-5">
          Next
        </UButton>
      </div>

      <!-- Step 2: Details Form -->
      <div v-if="step === 2">
        <h2 class="text-xl font-bold mb-4">Enter Details</h2>
        <UFormGroup label="Name" name="type" class="mb-4">
          <UInput
            v-model="form.type"
            placeholder="Enter your name"
            class="bg-gray-700 text-white"
          />
        </UFormGroup>

        <UFormGroup label="Barcode" name="barcode1" class="mb-4">
          <UInput
            v-model="form.barcode1"
            disabled
            class="bg-gray-700 text-white"
          />
        </UFormGroup>

        <UButton @click="submitForm" color="primary" class="w-full">
          Submit
        </UButton>
      </div>
    </UCard>
  </div>
</template>

<script setup>
import Quagga from "@ericblade/quagga2";
import { ref, onMounted, onBeforeUnmount } from "vue";

const dronesStore = useDronesStore();

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

const step = ref(1); // 1: Scan Barcode, 2: Details Form
const form = ref({
  type: "Drone",
  barcode1: generateRandomString(10),
});

// Start the scanner
const startScanner = () => {
  Quagga.init(
    {
      inputStream: {
        type: "LiveStream",
        target: "#scanner",
      },
      decoder: {
        readers: ["code_128_reader"], // Only scan Code 128 barcodes
      },
    },
    (err) => {
      if (err) {
        console.error("Error initializing Quagga:", err);
        return;
      }
      Quagga.start();
    }
  );

  Quagga.onDetected((result) => {
    const code = result.codeResult.code;
    form.value.barcode1 = code; // Save the scanned barcode
    Quagga.stop(); // Stop the scanner
    step.value = 2; // Move to the details form
  });
};

// Stop the scanner
const stopScanner = () => {
  Quagga.stop();
};

// Submit the form
const submitForm = async () => {
  try {
    const response = await $fetch("/api/admin/register", {
      method: "POST",
      body: form.value,
    });
    dronesStore.fetchDrones();

    navigateTo("/success"); // Redirect to success page
  } catch (error) {
    console.error("Error:", error);
  }
};

// Automatically start the scanner when the component is mounted
onMounted(() => {
  if (step.value === 1) {
    startScanner();
  }
});

// Stop the scanner when the component is unmounted
onBeforeUnmount(() => {
  stopScanner();
});
</script>

<style scoped>
/* Add custom styles if needed */
</style>
