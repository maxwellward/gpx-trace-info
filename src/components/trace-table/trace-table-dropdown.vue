<template>
  <div>
    <DropdownMenu>
      <DropdownMenuTrigger as-child>
        <Button variant="ghost" class="w-8 h-8 p-0">
          <span class="sr-only">Open menu</span>
          <MoreHorizontal class="w-4 h-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem @click="copy(trace.id)" class="group">
          <Link2 class="size-4 mt-0.5 -mr-0.5 text-[#9f9fa9] group-hover:text-white" />
          <p>Copy URL</p>
        </DropdownMenuItem>
        <DropdownMenuItem @click="showEditDialog = true" class="group">
          <Settings2 class="size-4 mt-0.5 -mr-0.5 text-[#9f9fa9] group-hover:text-white" />
          <p>Edit Trace</p>
        </DropdownMenuItem>
        <DropdownMenuItem @click="showDeleteDialog = true" class="group">
          <Trash2
            class="size-4 mt-0.5 -mr-0.5 text-[#9f9fa9] group-hover:text-red-400 transition-colors fade-out fade-in duration-150"
          />
          <p class="group-hover:text-red-400 transition-colors fade-out fade-in duration-150">
            Delete Trace
          </p>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem @click="showDetailsDialog = true" class="group">
          <BookText class="size-4 mt-0.5 -mr-0.5 text-[#9f9fa9] group-hover:text-white" />
          <p>View Details</p>
        </DropdownMenuItem>
        <DropdownMenuItem class="group">
          <ArrowDownToLine class="size-4 mt-0.5 -mr-0.5 text-[#9f9fa9] group-hover:text-white" />
          <p>Download GPX File</p>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>

    <Dialog v-model:open="showDeleteDialog">
      <DeleteDialog @close="showDeleteDialog = false" :is-open="showDeleteDialog" />
    </Dialog>

    <Dialog v-model:open="showEditDialog">
      <EditDialog @close="showEditDialog = false" />
    </Dialog>

    <Dialog v-model:open="showDetailsDialog">
      <DetailsDialog @close="showDetailsDialog = false" />
    </Dialog>
  </div>
</template>

<script setup lang="ts">
import {
  MoreHorizontal,
  Link2,
  Settings2,
  Trash2,
  BookText,
  ArrowDownToLine,
} from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { ref } from 'vue'
import DeleteDialog from '@/components/trace-table/delete-dialog.vue'
import EditDialog from '@/components/trace-table/edit-dialog.vue'
import DetailsDialog from '@/components/trace-table/details-dialog.vue'
import { Dialog } from '@/components/ui/dialog'

defineProps<{
  trace: {
    id: string
  }
}>()

function copy(id: string) {
  navigator.clipboard.writeText(id)
}

const showDeleteDialog = ref(false)
const showEditDialog = ref(false)
const showDetailsDialog = ref(false)
</script>
