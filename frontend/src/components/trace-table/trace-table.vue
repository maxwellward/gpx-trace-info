<template>
  <div class="flex justify-end items-center mb-2">
    <!-- <div class="relative w-full sm:max-w-sm items-center">
      <Input id="search" type="text" placeholder="Search for any field..." class="pl-8" />
      <span class="absolute start-0 inset-y-0 flex items-center justify-center px-2">
        <TextSearch class="size-4 text-muted-foreground" />
      </span>
    </div> -->
    <div class="flex items-center gap-2">
      <Button @click="showSyncDialog = true" size="icon">
        <RefreshCw class="size-4" />
      </Button>
      <Button @click="showUploadDialog = true">
        <Upload class="size-4" />
        <p>Upload GPX Trace</p>
      </Button>
    </div>

  </div>

  <div class="border rounded-md">
    <Table>
      <TableHeader>
        <TableRow v-for="headerGroup in table.getHeaderGroups()" :key="headerGroup.id">
          <TableHead v-for="header in headerGroup.headers" :key="header.id">
            <FlexRender v-if="!header.isPlaceholder" :render="header.column.columnDef.header"
              :props="header.getContext()" />
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <template v-if="table.getRowModel().rows?.length">
          <TableRow v-for="row in table.getRowModel().rows" :key="row.id"
            :data-state="row.getIsSelected() ? 'selected' : undefined">
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

  <div class="mt-1 flex-1 text-sm text-muted-foreground"
    :class="[table.getFilteredSelectedRowModel().rows.length > 0 ? 'visible' : 'invisible']">
    <p>
      {{ table.getFilteredSelectedRowModel().rows.length }} of
      {{ table.getFilteredRowModel().rows.length }}
      {{ table.getFilteredRowModel().rows.length > 1 ? 'rows' : 'row' }} selected.
    </p>
  </div>

  <Pagination v-slot="{ page }" :items-per-page="1" :total="Math.ceil(data.length / PAGE_SIZE)" :default-page="1">
    <PaginationContent v-slot="{ items }">
      <PaginationPrevious :disabled="!table.getCanPreviousPage()" @click="table.previousPage()" />

      <template v-for="(item, index) in items" :key="index">
        <PaginationItem v-if="item.type === 'page'" :value="item.value" :is-active="item.value === page"
          @click="table.setPageIndex(item.value - 1)">
          {{ item.value }}
        </PaginationItem>
      </template>

      <PaginationNext :disabled="!table.getCanNextPage()" @click="table.nextPage()" />
    </PaginationContent>
  </Pagination>

  <Dialog v-model:open="showUploadDialog">
    <UploadDialog @close="showUploadDialog = false" />
  </Dialog>
  <Dialog v-model:open="showSyncDialog">
    <SyncDialog @close="showSyncDialog = false" />
  </Dialog>
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

import { Dialog } from '@/components/ui/dialog'

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
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'

import { Input } from '@/components/ui/input'

import { RefreshCw, TextSearch, Upload } from 'lucide-vue-next'

import { valueUpdater } from '@/lib/utils'
import { ref } from 'vue'
import UploadDialog from '@/components/trace-table/upload-dialog.vue'
import SyncDialog from '@/components/trace-table/sync-dialog.vue'

const props = defineProps<{
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}>()

const showUploadDialog = ref(false)
const showSyncDialog = ref(false)

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

const PAGE_SIZE = 10
table.setPageSize(PAGE_SIZE)
</script>
