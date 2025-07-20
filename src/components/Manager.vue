<template>
	<div class="container mx-auto pt-6">
		<Alert class="mb-2 block sm:hidden">
			<AlertTitle class="flex items-center justify-between">
				<div class="flex items-center gap-1">
					<TriangleAlert class="size-4 " />
					<p>Heads up!</p>
				</div>
				<button
					class="hover:text-red-400 transition-colors duration-150 fade-in fade-out hover:cursor-pointer p-1">
					<X class="size-4" />
				</button>
			</AlertTitle>
			<AlertDescription>
				This table works best on a larger display. You can still use it on smaller displays, but your experience
				may be degraded.
			</AlertDescription>
		</Alert>
		<TraceTable :columns="columns" :data="data" />
	</div>
</template>

<script setup lang="ts">
import type { Trace } from '@/components/trace-table/columns'
import { onMounted, ref } from 'vue'
import { columns } from '@/components/trace-table/columns'
import TraceTable from '@/components/trace-table/trace-table.vue'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { TriangleAlert, X } from 'lucide-vue-next'

const data = ref<Trace[]>([])

async function getData(): Promise<Trace[]> {
	// Fetch data from your API here.
	return [
		{
			id: '728ed52f',
			name: 'Morning Jog',
			description: 'Easy run around the park',
			distance: 3.2,
			points: 125,
			visibility: 'public',
			date: new Date('2023-06-15'),
		},
		{
			id: '489e1d42',
			name: 'Mountain Trail',
			description: 'Steep climb with beautiful views',
			distance: 8.7,
			points: 350,
			visibility: 'private',
			date: new Date('2023-07-22'),
		},
		{
			id: '489e1d43',
			name: 'Beach Run',
			description: 'Sunset run along the shoreline',
			distance: 5.3,
			points: 210,
			visibility: 'public',
			date: new Date('2023-08-05'),
		},
		{
			id: 'a3c21ef8',
			name: 'City Tour',
			description: 'Urban exploration route',
			distance: 12.4,
			points: 420,
			visibility: 'public',
			date: new Date('2023-05-30'),
		},
		{
			id: 'b5d32f9a',
			name: 'Forest Path',
			description: 'Peaceful trail through old growth trees',
			distance: 6.8,
			points: 275,
			visibility: 'private',
			date: new Date('2023-09-12'),
		},
		{
			id: 'c7e43f1b',
			name: 'Lake Loop',
			description: 'Circuit around the lake with water views',
			distance: 9.5,
			points: 380,
			visibility: 'public',
			date: new Date('2023-07-08'),
		},
		{
			id: 'd9f54g2c',
			name: 'Hill Climber',
			description: 'Challenging uphill segments',
			distance: 4.2,
			points: 190,
			visibility: 'public',
			date: new Date('2023-08-24'),
		},
		{
			id: 'e1g65h3d',
			name: 'River Route',
			description: 'Scenic path alongside the river',
			distance: 7.6,
			points: 310,
			visibility: 'public',
			date: new Date('2023-06-29'),
		},
		{
			id: 'f2h76i4e',
			name: 'Neighborhood Circuit',
			description: 'Easy loop around residential streets',
			distance: 2.8,
			points: 110,
			visibility: 'private',
			date: new Date('2023-09-05'),
		},
		{
			id: 'g3i87j5f',
			name: 'Marathon Training',
			description: 'Long distance preparation route',
			distance: 18.5,
			points: 650,
			visibility: 'public',
			date: new Date('2023-05-18'),
		},
		{
			id: 'h4j98k6g',
			name: 'Coastal Path',
			description: 'Windy trail with ocean views',
			distance: 11.3,
			points: 410,
			visibility: 'public',
			date: new Date('2023-07-30'),
		},
		{
			id: 'i5k09l7h',
			name: 'Park Sprint',
			description: 'Short high-intensity route',
			distance: 1.5,
			points: 85,
			visibility: 'private',
			date: new Date('2023-08-17'),
		},
		{
			id: 'j6l10m8i',
			name: 'Valley Crossing',
			description: 'Beautiful valley with stream crossings',
			distance: 10.2,
			points: 395,
			visibility: 'public',
			date: new Date('2023-06-05'),
		},
		{
			id: 'k7m21n9j',
			name: 'Downtown Dash',
			description: 'Urban exploration through city center',
			distance: 4.8,
			points: 205,
			visibility: 'public',
			date: new Date('2023-09-20'),
		},
		{
			id: 'l8n32o0k',
			name: 'Countryside Loop',
			description: 'Peaceful route through rural landscape',
			distance: 14.7,
			points: 520,
			visibility: 'public',
			date: new Date('2023-07-15'),
		},
		// ...
	]
}

onMounted(async () => {
	data.value = await getData()
})
</script>
