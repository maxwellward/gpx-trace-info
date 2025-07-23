<template>
  <div>
    <div class="flex items-center justify-between h-16 py-2">
      <RouterLink :to="{ name: 'landing' }" class="flex items-center gap-2 h-full">
        <DraftingCompass class="size-6" />
        <h1 class="text-text-primary font-bold tracking-wide text-xl sm:text-2xl">GPX Statistics</h1>
      </RouterLink>
      <div class="space-x-2 flex items-center h-full">
        <DatePicker v-if="isOnDataPage && isAuthenticated" />

        <Select v-if="isOnDataPage && isAuthenticated">
          <SelectTrigger>
            <SelectValue placeholder="Units" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="Metric"> Metric </SelectItem>
              <SelectItem value="imperial"> Imperial </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>

        <Button v-if="isOnDataPage && isAuthenticated">
          <Share2 class="size-4" />
          <p>Share</p>
        </Button>

        <AccountMenu v-if="isAuthenticated" />
        <Button v-else @click="handleSignIn">Sign In</Button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Share2, DraftingCompass } from 'lucide-vue-next'

import { DatePicker } from '@/components/ui/date-picker'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import AccountMenu from '@/components/account-menu.vue'

import { useAuthStore } from '@/stores/auth';
import { onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'

const authStore = useAuthStore()
const route = useRoute()

// Use computed properties to maintain reactivity
const isAuthenticated = computed(() => authStore.isAuthenticated)
const isOnDataPage = computed(() => route.name === 'stats')

onMounted(async () => {
  // Load any saved authentication state
  await authStore.loadSavedAuth()
})

const handleSignIn = async () => {
  try {
    await authStore.login()
  } catch (error) {
    console.error('Login failed:', error)
  }
}

</script>
