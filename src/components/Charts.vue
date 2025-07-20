<script lang="ts" setup>
import { LineChart } from 'vue-chrts'
import { CurveType, LegendPosition, type BulletLegendItemInterface } from 'vue-chrts'

const chartData = [
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

const categories: Record<string, BulletLegendItemInterface> = {
	kilometers: { name: 'Kilometers Traced', color: '#3b82f6' },
}

const xFormatter = (tick: number, i: number): string => `${chartData[i]?.date || ''}`

const height = 340;
// const { height } = useResponsiveHeight({
//   default: 180,
//   sm: 220,
//   md: 260,
//   lg: 300,
//   xl: 340,
// })
</script>
<template>
	<LineChart :data="chartData" :height="height" y-label="Kilometers Traced" :x-num-ticks="4" :y-num-ticks="4"
		:categories="categories" :x-formatter="xFormatter" :y-grid-line="true" :curve-type="CurveType.Linear"
		:legend-position="LegendPosition.Top" :hide-legend="true" />
</template>
