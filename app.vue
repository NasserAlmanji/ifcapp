<template>
  <div class="min-h-screen bg-gray-900 text-white">
    <main>
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </main>
  </div>
</template>

<script setup>
import { createPinia } from "pinia";
import piniaPersist from "pinia-plugin-persistedstate";

const pinia = createPinia();
pinia.use(piniaPersist);
</script>

<style>
/* Add global styles if needed */
</style>
