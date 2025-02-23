<template>
  <div class="flex justify-center items-center">
    <div class="rounded-lg shadow-lg p-3">
      <h1 class="text-2xl font-bold text-center mb-8">Add User</h1>

      <form @submit.prevent="register">
        <div class="mb-6">
          <input
            v-model="form.username"
            type="text"
            id="username"
            class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Username"
            required
          />
        </div>

        <div class="mb-6">
          <input
            v-model="form.password"
            type="password"
            id="password"
            placeholder="Password"
            required
            class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <div class="mb-6">
          <select
            v-model="form.role"
            id="role"
            required
            class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="admin">Admin</option>
            <option value="seller">Seller</option>
            <option value="government">Governmnet</option>
          </select>
        </div>

        <div v-if="form.role == 'seller'" class="mb-6">
          <select
            v-model="form.organization"
            required
            class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option
              v-for="option in distributors"
              :key="option.name"
              :value="option.name"
            >
              {{ option.name }}
            </option>
          </select>
        </div>

        <div v-else class="mb-6">
          <input
            v-model="form.organization"
            type="text"
            id="organization"
            placeholder="Organization"
            class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <button
          class="p-10 w-full py-3 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
          type="submit"
        >
          Register
        </button>
      </form>

      <div v-if="message" class="message">{{ message }}</div>
      <div v-if="error" class="error">{{ error }}</div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({ layout: "auth" });

const form = ref({
  username: "",
  password: "",
  organization: "",
  role: "admin", // Default role
});

const message = ref("");
const error = ref("");

const {
  data: distributors,
  status,
  error: fetchError,
} = await useFetch("/api/admin/distributor/list");

const register = async () => {
  try {
    const response = await $fetch("/api/auth/register", {
      method: "POST",
      body: form.value,
    });
    //authStore.setToken(response.token);
    //authStore.setUser(response.user);
    message.value = "Registration successful!";
    error.value = "";
    navigateTo("/dashboard");
  } catch (error) {
    error.value = error.message;
    message.value = "";
    console.error("Register failed", error);
  }
};
</script>

<style scoped>
.message {
  margin-top: 15px;
  color: green;
}

.error {
  margin-top: 15px;
  color: red;
}
</style>
