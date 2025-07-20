import type { ColumnDef } from '@tanstack/vue-table'
import { h } from 'vue'
import DropdownAction from '@/components/trace-table/trace-table-dropdown.vue'
import { ArrowUpDown } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'

export const columns: ColumnDef<Trace>[] = [
	{
		id: 'select',
		header: ({ table }) => h(Checkbox, {
			'modelValue': table.getIsAllPageRowsSelected(),
			'onUpdate:modelValue': (value: boolean) => table.toggleAllPageRowsSelected(!!value),
			'ariaLabel': 'Select all',
		}),
		cell: ({ row }) => h(Checkbox, {
			'modelValue': row.getIsSelected(),
			'onUpdate:modelValue': (value: boolean) => row.toggleSelected(!!value),
			'ariaLabel': 'Select row',
		}),
		enableSorting: false,
		enableHiding: false,
	},
	{
		accessorKey: 'name',
		header: () => h('div', 'Name'),
		cell: ({ row }) => h('div', { class: 'font-medium' }, row.getValue('name')),
		enableSorting: false,
	},
	{
		accessorKey: 'description',
		header: () => h('div', 'Description'),
		cell: ({ row }) => h('div', {}, row.getValue('description')),
		enableSorting: false,
	},
	{
		accessorKey: 'distance',
		header: ({ column }) => {
			return h(Button, {
				variant: 'ghost',
				onClick: () => column.toggleSorting(column.getIsSorted() === 'asc'),
			}, () => ['Distance (km)', h(ArrowUpDown, { class: 'ml-2 h-4 w-4' })])
		},
		cell: ({ row }) => {
			const distance = Number(row.getValue('distance'))
			const formatted = `${distance.toFixed(2)} km`
			return h('div', { class: 'ml-3 font-medium' }, formatted)
		},
	},
	{
		accessorKey: 'points',
		header: ({ column }) => {
			return h(Button, {
				variant: 'ghost',
				onClick: () => column.toggleSorting(column.getIsSorted() === 'asc'),
			}, () => ['Points', h(ArrowUpDown, { class: 'ml-2 h-4 w-4' })])
		},
		cell: ({ row }) => h('div', { class: 'ml-3' }, row.getValue('points')),
	},
	{
		accessorKey: 'visibility',
		header: ({ column }) => {
			return h(Button, {
				variant: 'ghost',
				onClick: () => column.toggleSorting(column.getIsSorted() === 'asc'),
			}, () => ['Visibility', h(ArrowUpDown, { class: 'ml-2 h-4 w-4' })])
		},
		cell: ({ row }) => h('div', { class: 'capitalize ml-3' }, row.getValue('visibility')),
	},
	{
		accessorKey: 'date',
		header: ({ column }) => {
			return h(Button, {
				variant: 'ghost',
				onClick: () => column.toggleSorting(column.getIsSorted() === 'asc'),
			}, () => ['Date', h(ArrowUpDown, { class: 'ml-2 h-4 w-4' })])
		},
		cell: ({ row }) => {
			const date = row.getValue('date') as Date
			return h('div', { class: 'ml-3' }, date.toLocaleDateString())
		},
	},
	{
		id: 'actions',
		enableHiding: false,
		cell: ({ row }) => {
			const trace = row.original

			return h('div', { class: 'relative' }, h(DropdownAction, {
				trace,
			}))
		},
	},
]

export interface Trace {
	id: string,
	name: string,
	description: string,
	distance: number,
	points: number,
	visibility: 'public' | 'private',
	date: Date,
}