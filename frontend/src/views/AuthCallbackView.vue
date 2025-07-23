<template>
	<div class="mt-24 mb-48 w-full justify-center items-center flex text-center">
		<div v-if="isLoading" class="space-y-2 flex flex-col items-center">
			<LoaderCircle class="animate-spin size-8" />
			<p class="text-muted-foreground">Getting things ready...</p>
		</div>

		<div v-else-if="error" class="items-center flex flex-col">
			<OctagonX class="size-8 text-red-400 mb-2" />
			<h2 class="text-xl font-semibold">Authentication Failed</h2>
			<p class="text-muted-foreground text-sm">{{ error }}</p>
			<Button @click="$router.push('/')" class="mt-4">Return Home</Button>
		</div>
	</div>
</template>

<script setup lang="ts">
import { onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

import { LoaderCircle, OctagonX } from 'lucide-vue-next'

import { Button } from '@/components/ui/button'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()

const isLoading = computed(() => authStore.isLoading)
const error = computed(() => authStore.error)

onMounted(async () => {
	const code = route.query.code as string
	const state = route.query.state as string
	const errorParam = route.query.error as string

	if (errorParam) {
		authStore.error = `Authentication error: ${errorParam}`
		return
	}

	if (!code || !state) {
		authStore.error = 'Missing authorization code or state parameter'
		return
	}

	try {
		await authStore.handleCallback(code, state)
		// Save the token for persistence
		authStore.saveToken()
		router.push({ name: 'stats' })
	} catch (err) {
		console.error('OAuth callback error:', err)
	}
})
</script>
