<template>
  <header class="bg-gray-800 shadow-lg">
    <div class="container mx-auto px-4">
      <div class="flex items-center justify-between h-16">
        <!-- Left side - Logo/Brand -->
        <div class="flex items-center">
          <NuxtLink
            to="/dashboard"
            class="text-xl font-bold text-white hover:text-gray-200 transition-colors"
          >
            IFC Compliance App
          </NuxtLink>
        </div>

        <!-- Right side - User info & actions -->
        <div
          v-if="authStore.user"
          ref="menuRef"
          class="flex items-center space-x-4"
        >
          <div class="flex items-center">
            <span class="text-sm text-gray-300 mr-4"
              >Welcome, {{ authStore.user.username }}</span
            >

            <!-- User Avatar -->
            <div class="relative">
              <button
                @click="isMenuOpen = !isMenuOpen"
                class="flex items-center"
              >
                <div
                  class="w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center overflow-hidden"
                >
                  <img
                    v-if="authStore.userAvatar"
                    :src="authStore.userAvatar"
                    :alt="authStore.user"
                    class="w-full h-full object-cover"
                  />
                  <span v-else class="text-lg font-semibold text-white">
                    {{ getUserInitials }}
                  </span>
                </div>
              </button>

              <!-- Dropdown Menu -->
              <div
                v-if="isMenuOpen"
                class="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
              >
                <div class="py-1">
                  <NuxtLink
                    to="/profile"
                    class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Profile Settings
                  </NuxtLink>
                  <button
                    @click="handleLogout"
                    class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
const authStore = useAuthStore();
const isMenuOpen = ref(false);
const menuRef = ref(null);

onMounted(() => {
  document.addEventListener("click", (event) => {
    const menu = menuRef.value;
    if (menu && !menu.contains(event.target)) {
      isMenuOpen.value = false;
    }
  });
});

// Get user initials for avatar fallback
const getUserInitials = computed(() => {
  const name = authStore.user.username || "";
  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
});

const handleLogout = () => {
  isMenuOpen.value = false;
  authStore.logout();
  navigateTo("/login");
};
</script>
