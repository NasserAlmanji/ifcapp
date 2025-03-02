<template>
  <div class="flex justify-center items-center">
    <div class="rounded-lg shadow-lg p-3 w-full max-w-md">
      <div class="flex justify-center mb-6">
        <i class="fas fa-user-circle text-4xl text-green-500"></i>
      </div>
      
      <h1 class="text-2xl font-bold text-center mb-8">Login</h1>
      
      <div v-if="errorMessage" class="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
        {{ errorMessage }}
      </div>

      <form @submit.prevent="login">
        <div class="mb-6">
          <input
            v-model="form.username"
            type="text"
            placeholder="Username"
            required
            class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
        
        <div class="mb-6">
          <input
            v-model="form.password"
            type="password"
            placeholder="Password"
            required
            class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
        
        <button
          type="submit"
          :disabled="loading"
          class="w-full py-3 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:bg-gray-400"
        >
          {{ loading ? 'Logging in...' : 'Login' }}
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from '../stores/authStore.client';
import api from '../utils/api';
import { ref } from 'vue';

const authStore = useAuthStore();
const errorMessage = ref('');
const loading = ref(false);

const form = ref({
  username: "admin",
  password: "admin",
});

const clearError = () => {
  errorMessage.value = '';
};

const login = async () => {
  try {
    loading.value = true;
    errorMessage.value = '';
    
    const response = await api.login({
      username: form.value.username,
      password: form.value.password,
    });

    authStore.setToken(response.data.token);
    authStore.setUser(response.data.user);
    navigateTo("/dashboard");
  } catch (error) {
    console.error('Login error:', error);
    errorMessage.value = error.response?.data?.message || 
                        error.message || 
                        'Login failed. Please check your credentials and try again.';
  } finally {
    loading.value = false;
  }
};
</script>