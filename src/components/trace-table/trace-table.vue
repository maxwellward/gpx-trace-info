<template>
  <div class="flex justify-between items-center mb-2">
    <div class="relative w-full sm:max-w-sm items-center">
      <Input id="search" type="text" placeholder="Search for any field..." class="pl-8" />
      <span class="absolute start-0 inset-y-0 flex items-center justify-center px-2">
        <TextSearch class="size-4 text-muted-foreground" />
      </span>
    </div>
    <Button>
      <Upload class="size-4" />
      <p>Upload GPX Trace</p>
    </Button>
  </div>

  <div class="border rounded-md">
    <Table>
      <TableHeader>
        <TableRow v-for="headerGroup in table.getHeaderGroups()" :key="headerGroup.id">
          <TableHead v-for="header in headerGroup.headers" :key="header.id">
            <FlexRender
              v-if="!header.isPlaceholder"
              :render="header.column.columnDef.header"
              :props="header.getContext()"
            />
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <template v-if="table.getRowModel().rows?.length">
          <TableRow
            v-for="row in table.getRowModel().rows"
            :key="row.id"
            :data-state="row.getIsSelected() ? 'selected' : undefined"
          >
            <TableCell v-for="cell in row.getVisibleCells()" :key="cell.id">
              <FlexRender :render="cell.column.columnDef.cell" :props="cell.getContext()" />
            </TableCell>
          </TableRow>
        </template>
        <template v-else>
          <TableRow>
            <TableCell :colspan="columns.length" class="h-24 text-center"> No results. </TableCell>
          </TableRow>
        </template>
      </TableBody>
    </Table>
  </div>

  <div
    class="mt-1 flex-1 text-sm text-muted-foreground"
    :class="[table.getFilteredSelectedRowModel().rows.length > 0 ? 'visible' : 'invisible']"
  >
    <p>
      {{ table.getFilteredSelectedRowModel().rows.length }} of
      {{ table.getFilteredRowModel().rows.length }}
      {{ table.getFilteredRowModel().rows.length > 1 ? 'rows' : 'row' }} selected.
    </p>
  </div>

  <Pagination v-slot="{ page }" :items-per-page="1" :total="3" :default-page="1">
    <PaginationContent v-slot="{ items }">
      <PaginationPrevious :disabled="!table.getCanPreviousPage()" @click="table.previousPage()" />

      <template v-for="(item, index) in items" :key="index">
        <PaginationItem
          v-if="item.type === 'page'"
          :value="item.value"
          :is-active="item.value === page"
        >
          {{ item.value }}
        </PaginationItem>
      </template>

      <PaginationEllipsis :index="4" />

      <PaginationNext :disabled="!table.getCanNextPage()" @click="table.nextPage()" />
    </PaginationContent>
  </Pagination>
</template>

<script setup lang="ts" generic="TData, TValue">
import type { ColumnDef, SortingState } from '@tanstack/vue-table'
import {
  FlexRender,
  getCoreRowModel,
  useVueTable,
  getPaginationRowModel,
  getSortedRowModel,
} from '@tanstack/vue-table'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'

import { Input } from '@/components/ui/input'

import { TextSearch, Upload } from 'lucide-vue-next'

import { valueUpdater } from '@/lib/utils'
import { ref } from 'vue'

const props = defineProps<{
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}>()

const sorting = ref<SortingState>([])
const rowSelection = ref({})

const table = useVueTable({
  get data() {
    return props.data
  },
  get columns() {
    return props.columns
  },
  getCoreRowModel: getCoreRowModel(),
  getPaginationRowModel: getPaginationRowModel(),
  getSortedRowModel: getSortedRowModel(),
  onSortingChange: (updaterOrValue) => valueUpdater(updaterOrValue, sorting),
  onRowSelectionChange: (updaterOrValue) => valueUpdater(updaterOrValue, rowSelection),
  state: {
    get sorting() {
      return sorting.value
    },
    get rowSelection() {
      return rowSelection.value
    },
  },
})

table.setPageSize(5)
</script>
