<template>
	<div>
		<div class="items-center flex flex-col mt-16">
			<DraftingCompass class="size-28" />
			<h1 class="text-muted-foreground tracking-widest font-light uppercase my-6">GPX Statistics</h1>
			<h2 class="text-3xl font-semibold w-2/3 text-center">View and manage your OpenStreetMap GPX traces, all from
				one place.
			</h2>
			<Button class="mt-8 w-56" @click="handleSignIn" :disabled="authStore.isLoading">
				<LoaderCircle v-if="authStore.isLoading" class="size-4 animate-spin" />
				<div v-else class="inline-flex items-center gap-1">
					<p>Sign in with OpenStreetMap</p>
					<Map class="size-4 mt-0.5" />
				</div>
			</Button>

			<div class="w-2/3 grid grid-cols-3 gap-3 mt-8">
				<Card v-for="card in cards" :key="card.title">
					<CardHeader>
						<CardTitle class="flex justify-between">
							<h2>{{ card.title }}</h2>
							<component :is="card.icon" class="size-4 shrink-0" />
						</CardTitle>
						<CardDescription>{{ card.description }}</CardDescription>
					</CardHeader>
				</Card>
			</div>

		</div>
	</div>
</template>

<script setup lang="ts">
import { Button } from '@/components/ui/button';
import {
	Card,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'

import { Map, ChartLine, GitCompareArrows, WandSparkles, DraftingCompass, LoaderCircle } from 'lucide-vue-next';

import { h, onMounted } from 'vue';

import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()

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

const cards = [
	{
		title: 'Detailed over-time statistics',
		icon: h(ChartLine),
		description: 'Beautiful charts showing off your total GPX traces, kilometers traced, and GPS points over your specified time period.'
	},
	{
		title: 'All-in-one GPX trace manager',
		icon: h(GitCompareArrows),
		description: 'View, manage, and visualize your OpenStreetMap GPX traces, all on one page.'
	},
	{
		title: 'Thoughtfully designed',
		icon: h(WandSparkles),
		description: 'All of what you want, none of what you don\'t. Looking for a new feature or found a bug? We\'re open source on GitHub.'
	},
]
</script>