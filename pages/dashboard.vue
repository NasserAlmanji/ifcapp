<template>
  <div class="min-h-screen bg-gray-900 text-white">
    <div class="container mx-auto p-6">
      <h1 class="text-3xl font-bold mb-8">Dashboard</h1>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <!-- Register New Drone -->
        <NuxtLink
          to="/admin/snbarcode"
          class="p-6 bg-gray-800 rounded-lg shadow-md hover:bg-gray-700 transition-colors relative"
        >
          <div class="absolute top-0 left-0 text-4xl font-bold text-white">
            1
          </div>
          <img
            src="/images/barcode-image.avif"
            alt="Barcode"
            class="w-full h-32 object-cover rounded-md mb-4"
          />
          <h2 class="text-xl font-semibold mb-2">Register New Drone</h2>
          <p class="text-gray-400">Scan Serial Number</p>
        </NuxtLink>

        <!-- Assign To Seller -->
        <NuxtLink
          to="/admin/dronesTable"
          class="p-6 bg-gray-800 rounded-lg shadow-md hover:bg-gray-700 transition-colors relative"
        >
          <div class="absolute top-0 left-0 text-4xl font-bold text-white">
            2
          </div>
          <img
            src="/images/shipment-image.avif"
            alt="Distribution"
            class="w-full h-32 object-cover rounded-md mb-4"
          />
          <h2 class="text-xl font-semibold mb-2">Assign To Seller</h2>
          <p class="text-gray-400">Select Drone to assign</p>
        </NuxtLink>

        <!-- Sleek Form -->
        <NuxtLink
          to="/test-form"
          class="p-6 bg-gray-800 rounded-lg shadow-md hover:bg-gray-700 transition-colors relative"
        >
          <div class="absolute top-0 left-0 text-4xl font-bold text-white">
            3
          </div>

          <h2 class="text-xl font-semibold mb-2">Sleek Form</h2>
          <p class="text-gray-400">
            A modern, dark-themed form for user input.
          </p>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({ layout: "default", middleware: ["admin"] });
</script>

<style scoped>
/* Add custom styles if needed */
</style>
