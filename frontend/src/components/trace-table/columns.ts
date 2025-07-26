import type { ColumnDef } from '@tanstack/vue-table'
import { h } from 'vue'
import DropdownAction from '@/components/trace-table/trace-table-dropdown.vue'
import { ArrowUpDown } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import type { Trace } from '@/stores/traces'

export const columns: ColumnDef<Trace>[] = [
  // {
  //   id: 'select',
  //   header: ({ table }) =>
  //     h(Checkbox, {
  //       modelValue: table.getIsAllPageRowsSelected(),
  //       'onUpdate:modelValue': (value: boolean) => table.toggleAllPageRowsSelected(!!value),
  //       ariaLabel: 'Select all',
  //     }),
  //   cell: ({ row }) =>
  //     h(Checkbox, {
  //       modelValue: row.getIsSelected(),
  //       'onUpdate:modelValue': (value: boolean) => row.toggleSelected(!!value),
  //       ariaLabel: 'Select row',
  //     }),
  //   enableSorting: false,
  //   enableHiding: false,
  // },
  {
    accessorKey: 'filename',
    header: () => h('div', 'Name'),
    cell: ({ row }) => h('div', { class: 'font-medium' }, row.getValue('filename')),
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
      return h(
        Button,
        {
          variant: 'ghost',
          onClick: () => column.toggleSorting(column.getIsSorted() === 'asc'),
        },
        () => ['Distance (km)', h(ArrowUpDown, { class: 'ml-2 h-4 w-4' })],
      )
    },
    cell: ({ row }) => {
      const distance = Number(row.getValue('distance'))
      const formatted = `${(distance / 1000).toFixed(2)} km`
      return h('div', { class: 'ml-3 font-medium' }, formatted)
    },
  },
  {
    accessorKey: 'points',
    header: ({ column }) => {
      return h(
        Button,
        {
          variant: 'ghost',
          onClick: () => column.toggleSorting(column.getIsSorted() === 'asc'),
        },
        () => ['GPS Points', h(ArrowUpDown, { class: 'ml-2 h-4 w-4' })],
      )
    },
    cell: ({ row }) => h('div', { class: 'ml-3' }, row.getValue('points')),
  },
  {
    accessorKey: 'visibility',
    header: ({ column }) => {
      return h(
        Button,
        {
          variant: 'ghost',
          onClick: () => column.toggleSorting(column.getIsSorted() === 'asc'),
        },
        () => ['Visibility', h(ArrowUpDown, { class: 'ml-2 h-4 w-4' })],
      )
    },
    cell: ({ row }) => h('div', { class: 'capitalize ml-3' }, row.getValue('visibility')),
  },
  {
    accessorKey: 'uploaded_at',
    header: ({ column }) => {
      return h(
        Button,
        {
          variant: 'ghost',
          onClick: () => column.toggleSorting(column.getIsSorted() === 'asc'),
        },
        () => ['Uploaded', h(ArrowUpDown, { class: 'ml-2 h-4 w-4' })],
      )
    },
    cell: ({ row }) => {
      const uploaded_at = new Date(row.getValue('uploaded_at'))

      return h('div', { class: 'ml-3' }, uploaded_at.toLocaleDateString())
    },
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      const trace = row.original

      return h(
        'div',
        { class: 'relative' },
        h(DropdownAction, {
          trace,
        }),
      )
    },
  },
]
