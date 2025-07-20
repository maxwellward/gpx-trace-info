<template>
  <main class="w-full flex flex-col items-center mt-16 h-screen">
    <h1 class="text-text-primary font-extrabold tracking-wider text-3xl sm:text-5xl">GPX Statistics</h1>
    <h2 class="text-secondary mt-2 text-center mx-4">View, upload, and learn about the GPX tracks on your OpenStreetMap
      account.</h2>

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

    <div class="mt-3 space-y-2 xs:space-x-2 flex flex-col xs:block">
      <!-- Authentication-aware button -->
      <p-button v-if="!authStore.isAuthenticated" :disabled="authStore.isLoading" @click="handleGetStarted">
        <span v-if="authStore.isLoading">Connecting...</span>
        <span v-else>Sign in with OpenStreetMap</span>
      </p-button>

      <p-button v-else label="View Your Tracks" @click="viewTracks" />

      <!-- Logout button when authenticated -->
      <p-button v-if="authStore.isAuthenticated" label="Sign Out" @click="handleLogout" />
    </div>
    <img src="@/assets/map.png" alt="" class="w-full mt-8 object-cover h-full min-h-96">
  </main>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'

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

const viewTracks = () => {
  // TODO: Navigate to tracks view or implement tracks functionality
  console.log('Navigate to tracks view')
}

const learnMore = () => {
  // TODO: Navigate to about page or show more information
  console.log('Show more information')
}
</script>

<style scoped>
img {
  position: relative;
  mask-image: linear-gradient(to bottom, transparent, black 25%, black 75%, transparent);
  -webkit-mask-image: linear-gradient(to bottom, transparent, black 25%, black 75%, transparent);
}
</style>