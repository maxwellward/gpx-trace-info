<template>
  <main class="w-full flex flex-col mt-12 h-screen px-24">

    <Header @toggle-view="selectedView = $event" />

    <Data v-if="selectedView === 'statistics'" />
    <Manager v-else-if="selectedView === 'manage'" />

    <div class="mt-32" />
    <ThemeToggle />

    <!-- Authentication Status -->
    <div v-if="authStore.isAuthenticated" class="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
      <p class="text-green-800">
        Welcome back, <strong>{{ authStore.displayName }}</strong>!
        <span v-if="authStore.userTraceCount > 0"> You have {{ authStore.userTraceCount }} GPS traces.</span>
      </p>
    </div>

    <div v-if="authStore.error" class="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
      <p class="text-red-800">{{ authStore.error }}</p>
    </div>

    <div class="mt-6 space-y-2 xs:space-x-2 flex flex-col xs:block">
      <!-- Authentication-aware button -->
      <p-button v-if="!authStore.isAuthenticated" :disabled="authStore.isLoading" @click="handleGetStarted">
        <span v-if="authStore.isLoading">Connecting...</span>
        <span v-else>Sign in with OpenStreetMap</span>
      </p-button>

      <!-- Logout button when authenticated -->
      <p-button v-if="authStore.isAuthenticated" label="Sign Out" @click="handleLogout" />
    </div>
  </main>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useAuthStore } from '@/stores/auth';

import Header from '@/components/Header.vue';
import Data from '@/components/Data.vue';
import Manager from '@/components/Manager.vue';
import ThemeToggle from '@/components/ThemeToggle.vue';


const selectedView = ref<'statistics' | 'manage'>('statistics')
const authStore = useAuthStore()

onMounted(async () => {
  // Load any saved authentication state
  await authStore.loadSavedAuth()
})

const handleGetStarted = async () => {
  try {
    await authStore.login()
  } catch (error) {
    console.error('Login failed:', error)
  }
}

const handleLogout = () => {
  authStore.logout()
}
</script>

<style scoped>
img {
  position: relative;
  mask-image: linear-gradient(to bottom, transparent, black 25%, black 75%, transparent);
  -webkit-mask-image: linear-gradient(to bottom, transparent, black 25%, black 75%, transparent);
}
</style>