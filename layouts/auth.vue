<template>
  <div class="min-h-screen bg-gray-900 text-white">
    <AppHeader />
    <main class="container mx-auto p-4">
      <slot />
    </main>
  </div>
</template>

<script setup>
definePageMeta({ middleware: ["checkLogin"] });
</script>
