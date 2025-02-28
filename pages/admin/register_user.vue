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
            <option value="government">Government</option>
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
              :key="option.id"
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
import { ref, onMounted } from "vue";
import api from "@/utils/api";

definePageMeta({ layout: "auth" });

const form = ref({
  username: "",
  password: "",
  organization: "",
  role: "admin", // Default role
});

const message = ref("");
const error = ref("");
const distributors = ref([]);

const fetchDistributors = async () => {
  try {
    const response = await api.getDistributors();
    distributors.value = response.data;
  } catch (err) {
    console.error("Error fetching distributors:", err);
  }
};

onMounted(() => {
  fetchDistributors();
});

const register = async () => {
  try {
    await api.registerUser({
      username: form.value.username,
      password: form.value.password,
      role: form.value.role,
      organization: form.value.organization,
    });

    message.value = "Registration successful!";
    error.value = "";
    navigateTo("/dashboard");
  } catch (err) {
    error.value = err.response?.data?.message || "Registration failed";
    message.value = "";
    console.error("Register failed", err);
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
