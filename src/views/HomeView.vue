<template>
  <main class="w-full flex flex-col">
    <Header @toggle-view="selectedView = $event" />

    <Data v-if="selectedView === 'statistics'" />
    <Manager v-else-if="selectedView === 'manage'" />

    <!-- Temp Sign in Button -->
    <p-button
      v-if="!authStore.isAuthenticated"
      :disabled="authStore.isLoading"
      @click="handleGetStarted"
    >
      <span v-if="authStore.isLoading">Connecting...</span>
      <span v-else>Sign in with OpenStreetMap</span>
    </p-button>

    <Footer />
  </main>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useAuthStore } from '@/stores/auth'

import Header from '@/components/Header.vue'
import Data from '@/components/Data.vue'
import Manager from '@/components/Manager.vue'
import Footer from '@/components/Footer.vue'

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
