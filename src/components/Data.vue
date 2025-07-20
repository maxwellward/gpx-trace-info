<template>
	<div>
		<div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
			<Card>
				<CardHeader>
					<CardTitle class="flex justify-between">
						<h2>GPX Traces</h2>
						<ChartLine class="size-6 rounded-md p-1.5" />
					</CardTitle>
					<CardDescription class="text-[#9f9fa9] text-xs">Total number of GPX traces you've uploaded
					</CardDescription>
				</CardHeader>
				<CardContent>
					<p class="text-lg font-bold">118</p>
				</CardContent>
			</Card>
			<Card>
				<CardHeader>
					<CardTitle class="flex justify-between">
						<h2>Kilometers Traced</h2>
						<ChartLine class="size-6 bg-[#27272a] rounded-md p-1.5" />
					</CardTitle>
					<CardDescription class="text-[#9f9fa9] text-xs">Total distance you've travelled in your GPX
						traces</CardDescription>
				</CardHeader>
				<CardContent>
					<p class="text-lg font-bold">1,209km</p>
				</CardContent>
			</Card>
			<Card>
				<CardHeader>
					<CardTitle class="flex justify-between">
						<h2>GPS Points</h2>
						<ChartLine class="size-6 rounded-md p-1.5" />
					</CardTitle>
					<CardDescription class="text-[#9f9fa9] text-xs">Total number of GPS points across all your traces
					</CardDescription>
				</CardHeader>
				<CardContent>
					<p class="text-lg font-bold">12,298</p>
				</CardContent>
			</Card>
		</div>

		<div class="mt-4">
			<Charts />
		</div>
	</div>
</template>

<script setup lang="ts">
import Charts from '@/components/Charts.vue'
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { ChartLine } from 'lucide-vue-next'
</script>