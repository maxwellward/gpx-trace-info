<template>
  <LineChart
    :data="data"
    :height="height"
    :y-label="yLabel"
    :x-num-ticks="4"
    :y-num-ticks="4"
    :categories="categories"
    :x-formatter="xFormatter"
    :y-grid-line="true"
    :curve-type="CurveType.Linear"
    :legend-position="LegendPosition.Top"
    :hide-legend="true"
  />
</template>

<script lang="ts" setup>
import { LineChart } from 'vue-chrts'
import { CurveType, LegendPosition, type BulletLegendItemInterface } from 'vue-chrts'

// Define props for the component
const props = defineProps<{
  data: any[]
  categories: Record<string, BulletLegendItemInterface>
  yLabel: string
}>()

const xFormatter = (tick: number, i: number): string => `${props.data[i]?.date || ''}`

const height = 340
// const { height } = useResponsiveHeight({
//   default: 180,
//   sm: 220,
//   md: 260,
//   lg: 300,
//   xl: 340,
// })
</script>
