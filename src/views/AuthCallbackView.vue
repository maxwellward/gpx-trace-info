<template>
	<div class="min-h-screen flex items-center justify-center">
		<div class="text-center">
			<div v-if="isLoading" class="space-y-4">
				<div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
				<p class="text-gray-600">Completing authentication...</p>
			</div>

			<div v-else-if="error" class="space-y-4">
				<div class="text-red-600">
					<svg class="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
							d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.962-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
					</svg>
				</div>
				<h2 class="text-xl font-semibold text-gray-900">Authentication Failed</h2>
				<p class="text-gray-600">{{ error }}</p>
				<p-button label="Return Home" @click="$router.push('/')" />
			</div>

			<div v-else class="space-y-4">
				<div class="text-green-600">
					<svg class="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
					</svg>
				</div>
				<h2 class="text-xl font-semibold text-gray-900">Successfully Authenticated!</h2>
				<p class="text-gray-600">Welcome, {{ authStore.displayName }}!</p>
				<p-button label="Continue to Dashboard" @click="$router.push('/')" />
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

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

		// Redirect to home after a brief delay to show success message
		setTimeout(() => {
			router.push('/')
		}, 2000)
	} catch (err) {
		console.error('OAuth callback error:', err)
	}
})
</script>
