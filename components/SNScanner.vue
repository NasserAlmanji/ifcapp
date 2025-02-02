<template>
  <div
    class="min-h-screen bg-gray-900 text-white flex justify-center items-center"
  >
    <UCard class="w-full bg-gray-800 p-6">
      <!-- Step 1: Scan Barcode -->
      <div v-if="step === 1">
        <h2 class="text-xl font-bold mb-4">Point this to S/N in Box</h2>
        <div ref="scanner" class="w-full bg-gray-700 mb-4"></div>
      </div>

      <!-- Step 2: Details Form -->
      <div v-if="step === 2">
        <h2 class="text-xl font-bold mb-4">Enter Details</h2>
        <UFormGroup label="Name" name="type" class="mb-4">
          <UInput
            v-model="formData.type"
            placeholder="Enter your name"
            class="bg-gray-700 text-white"
          />
        </UFormGroup>

        <UFormGroup label="Barcode" name="barcode1" class="mb-4">
          <UInput
            v-model="formData.barcode1"
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

const step = ref(1); // 1: Scan Barcode, 2: Details Form
const scanner = ref(null);
const formData = ref({
  type: "Drone",
  barcode1: "",
});

// Start the scanner
const startScanner = () => {
  Quagga.init(
    {
      inputStream: {
        type: "LiveStream",
        target: scanner.value,
        constraints: {
          facingMode: "environment",
        },
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
    formData.value.barcode1 = code; // Save the scanned barcode
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
    const response = await $fetch("/api/submit-drone", {
      method: "POST",
      body: formData.value,
    });
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
