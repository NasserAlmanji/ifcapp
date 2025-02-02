<template>
  <div
    class="min-h-screen bg-gray-900 text-white flex justify-center items-center"
  >
    <UCard class="w-full max-w-md bg-gray-800">
      <UForm :state="formState" @submit="submitForm">
        <UFormGroup label="Name" name="name" class="mb-4">
          <UInput
            v-model="formState.name"
            placeholder="Enter your name"
            class="bg-gray-700 text-white placeholder-gray-400"
          />
        </UFormGroup>

        <UFormGroup label="Email" name="email" class="mb-4">
          <UInput
            v-model="formState.email"
            type="email"
            placeholder="Enter your email"
            class="bg-gray-700 text-white placeholder-gray-400"
          />
        </UFormGroup>

        <UFormGroup label="Message" name="message" class="mb-6">
          <UTextarea
            v-model="formState.message"
            placeholder="Enter your message"
            class="bg-gray-700 text-white placeholder-gray-400"
          />
        </UFormGroup>

        <UButton type="submit" color="primary" class="w-full"> Submit </UButton>
      </UForm>
    </UCard>
  </div>
</template>

<script setup>
const formState = ref({
  name: "Nasser",
  email: "test@amalalee.com",
  message: "Hello from Nasser",
});

const submitForm = async () => {
  try {
    const response = await $fetch("/api/submit-form", {
      method: "POST",
      body: formState.value,
    });
    navigateTo("/success"); // Redirect to success page
  } catch (error) {
    console.error("Error:", error);
  }
};
</script>
