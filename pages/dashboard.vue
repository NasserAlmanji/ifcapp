<template>
  <div class="min-h-screen bg-gray-900 text-white">
    <div class="container mx-auto p-6">
      <h1 class="text-3xl font-bold mb-8">Dashboard</h1>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <NuxtLink
          to="/snbarcode"
          class="p-6 bg-gray-800 rounded-lg shadow-md hover:bg-gray-700 transition-colors"
        >
          <h2 class="text-xl font-semibold mb-2">Register New Drone</h2>
          <p class="text-gray-400">Scan Serial Number</p>
        </NuxtLink>

        <!-- Link to Sleek Form -->
        <NuxtLink
          to="/test-form"
          class="p-6 bg-gray-800 rounded-lg shadow-md hover:bg-gray-700 transition-colors"
        >
          <h2 class="text-xl font-semibold mb-2">Sleek Form</h2>
          <p class="text-gray-400">
            A modern, dark-themed form for user input.
          </p>
        </NuxtLink>

        <!-- Add more links/actions here -->
        <div
          class="p-6 bg-gray-800 rounded-lg shadow-md hover:bg-gray-700 transition-colors"
        >
          <h2 class="text-xl font-semibold mb-2">Another Action</h2>
          <p class="text-gray-400">Description of another action or form.</p>
        </div>

        <div
          class="p-6 bg-gray-800 rounded-lg shadow-md hover:bg-gray-700 transition-colors"
        >
          <h2 class="text-xl font-semibold mb-2">More Actions</h2>
          <p class="text-gray-400">Additional actions or forms can go here.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// You can add any logic or data fetching here if needed
</script>

<style scoped>
/* Add custom styles if needed */
</style>
