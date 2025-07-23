<template>
  <div>
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
      <!-- TODO: Convert these cards into a v-for with JSON in the script -->
      <Card>
        <CardHeader>
          <CardTitle class="flex justify-between items-center">
            <h2>GPX Traces</h2>
            <button @click="selectedChartView = 'gpxTotal'"
              class="flex items-center gap-1 px-2 py-0.5 mt-0.5 rounded-md text-muted-foreground transition-all duration-150 hover:cursor-pointer"
              :class="selectedChartView == 'gpxTotal' && 'bg-[#27272a] text-white'">
              <p class="font-medium text-xs">View in Chart</p>
              <ChartLine class="size-3" />
            </button>
          </CardTitle>
          <CardDescription>Total number of GPX traces you've uploaded </CardDescription>
        </CardHeader>
        <CardContent>
          <p class="text-lg font-bold">{{ authStore.user?.traces?.count }}</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle class="flex justify-between items-center">
            <h2>Kilometers Traced</h2>
            <button @click="selectedChartView = 'kilometers'"
              class="flex items-center gap-1 px-2 py-0.5 mt-0.5 rounded-md text-muted-foreground transition-all duration-150 hover:cursor-pointer"
              :class="selectedChartView == 'kilometers' && 'bg-[#27272a] text-white'">
              <p class="font-medium text-xs">View in Chart</p>
              <ChartLine class="size-3" />
            </button>
          </CardTitle>
          <CardDescription>Total distance you've travelled in your GPX traces</CardDescription>
        </CardHeader>
        <CardContent>
          <p class="text-lg font-bold">1,209km</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle class="flex justify-between items-center">
            <h2>GPS Points</h2>
            <button @click="selectedChartView = 'gpsPoints'"
              class="flex items-center gap-1 px-2 py-0.5 mt-0.5 rounded-md text-muted-foreground transition-all duration-150 hover:cursor-pointer"
              :class="selectedChartView == 'gpsPoints' && 'bg-[#27272a] text-white'">
              <p class="font-medium text-xs">View in Chart</p>
              <ChartLine class="size-3" />
            </button>
          </CardTitle>
          <CardDescription>Total number of GPS points across all your traces </CardDescription>
        </CardHeader>
        <CardContent>
          <p class="text-lg font-bold">12,298</p>
        </CardContent>
      </Card>
    </div>

    <div class="mt-4">
      <Charts v-if="selectedChartView === 'gpxTotal'" :data="gpxTotalMock" y-label="
          GPX Traces
        " :categories="categories" />
      <Charts v-else-if="selectedChartView === 'kilometers'" :data="kilometersTracedMock" y-label="
          Kilometers Traced
        " :categories="categories" />
      <Charts v-else-if="selectedChartView === 'gpsPoints'" :data="gpsPointTracedMock" y-label="
          GPS Points
        " :categories="categories" />
    </div>
  </div>
</template>

<script setup lang="ts">
import Charts from '@/components/Charts.vue'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { ChartLine } from 'lucide-vue-next'
import type { BulletLegendItemInterface } from 'vue-chrts'
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore();

const categories: Record<string, BulletLegendItemInterface> = {
  kilometers: { name: 'Kilometers Traced', color: '#1abc9c' },
  gpxTotal: { name: 'GPX Traces', color: '#e74c3c' },
  gpsPoints: { name: 'GPS Points', color: '#8e44ad' },
}

const selectedChartView = ref<'gpxTotal' | 'kilometers' | 'gpsPoints'>('gpxTotal')

const kilometersTracedMock = [
  {
    date: 'Jan 23',
    kilometers: 756,
  },
  {
    date: 'Feb 23',
    kilometers: 843,
  },
  {
    date: 'Mar 23',
    kilometers: 890,
  },
  {
    date: 'Apr 23',
    kilometers: 903,
  },
  {
    date: 'May 23',
    kilometers: 929,
  },
  {
    date: 'Jun 23',
    kilometers: 937,
  },
  {
    date: 'Jul 23',
    kilometers: 1054,
  },
  {
    date: 'Aug 23',
    kilometers: 1070,
  },
  {
    date: 'Sep 23',
    kilometers: 1122,
  },
  {
    date: 'Oct 23',
    kilometers: 1175,
  },
  {
    date: 'Nov 23',
    kilometers: 1190,
  },
  {
    date: 'Dec 23',
    kilometers: 1209,
  },
]

const gpxTotalMock = [
  { date: 'Jan 23', gpxTotal: 18 },
  { date: 'Feb 23', gpxTotal: 24 },
  { date: 'Mar 23', gpxTotal: 32 },
  { date: 'Apr 23', gpxTotal: 45 },
  { date: 'May 23', gpxTotal: 56 },
  { date: 'Jun 23', gpxTotal: 62 },
  { date: 'Jul 23', gpxTotal: 74 },
  { date: 'Aug 23', gpxTotal: 85 },
  { date: 'Sep 23', gpxTotal: 93 },
  { date: 'Oct 23', gpxTotal: 104 },
  { date: 'Nov 23', gpxTotal: 112 },
  { date: 'Dec 23', gpxTotal: 118 },
]

const gpsPointTracedMock = [
  { date: 'Feb 23', gpsPoints: 876 },
  { date: 'May 23', gpsPoints: 980 },
  { date: 'Nov 23', gpsPoints: 1087 },
  { date: 'Jul 23', gpsPoints: 1104 },
  { date: 'Apr 23', gpsPoints: 1157 },
  { date: 'Sep 23', gpsPoints: 1195 },
  { date: 'Jan 23', gpsPoints: 1196 },
  { date: 'Aug 23', gpsPoints: 1238 },
  { date: 'Jun 23', gpsPoints: 1275 },
  { date: 'Oct 23', gpsPoints: 1299 },
  { date: 'Mar 23', gpsPoints: 1342 },
  { date: 'Dec 23', gpsPoints: 1422 },
]
</script>
