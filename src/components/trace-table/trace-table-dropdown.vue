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
					<p>Copy OSM URL</p>
				</DropdownMenuItem>
				<DropdownMenuItem @click="copy(trace.id)" class="group">
					<Settings2 class="size-4 mt-0.5 -mr-0.5 text-[#9f9fa9] group-hover:text-white" />
					<p>Edit Trace</p>
				</DropdownMenuItem>
				<DropdownMenuItem @click="showDeleteDialog = true" class="group">
					<Trash2
						class="size-4 mt-0.5 -mr-0.5 text-[#9f9fa9] group-hover:text-red-400 transition-colors fade-out fade-in duration-150" />
					<p class="group-hover:text-red-400 transition-colors fade-out fade-in duration-150">Delete Trace</p>
				</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuItem class="group">
					<BookText class="size-4 mt-0.5 -mr-0.5 text-[#9f9fa9] group-hover:text-white" />
					<p>View Details</p>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>

		<!-- Dialog moved outside of DropdownMenu -->
		<Dialog v-model:open="showDeleteDialog">
			<DeleteDialog @close="showDeleteDialog = false" :is-open="showDeleteDialog" />
		</Dialog>
	</div>
</template>

<script setup lang="ts">
import { MoreHorizontal, Link2, Settings2, Trash2, BookText } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { ref } from 'vue';
import DeleteDialog from '@/components/trace-table/delete-dialog.vue';
import { Dialog } from '@/components/ui/dialog'


defineProps<{
	trace: {
		id: string
	}
}>()

function copy(id: string) {
	navigator.clipboard.writeText(id)
}

const showDeleteDialog = ref(false);
</script>