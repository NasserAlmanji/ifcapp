<template>
  <div class="bg-gray-900 text-white flex justify-center items-center">
    <UCard class="w-full max-w-md bg-gray-800 text-center">
      <h1 class="text-2xl font-bold mb-4">Success!</h1>
      <p class="text-gray-400">Your form has been submitted successfully.</p>
      <p class="text-gray-400 mt-2">
        Redirecting to the main page in 2 seconds...
      </p>
    </UCard>
  </div>
</template>

<script setup>
onMounted(() => {
  setTimeout(() => {
    navigateTo("/dashboard"); // Redirect to the main dashboard page
  }, 2000); // 2 seconds delay
});
</script>
