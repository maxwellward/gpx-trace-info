<template>
	<DialogContent>
		<DialogHeader>
			<DialogTitle class="flex items-center gap-1 text-red-400">
				<TriangleAlert class="size-5" />
				<h2>Delete GPX Trace</h2>
			</DialogTitle>
			<DialogDescription>
				Are you sure you want to delete the GPX trace "{{ 'Morning Jog' }}" ({{ 3.20 }}km) from OpenStreetMap?
				This cannot be undone.
			</DialogDescription>
		</DialogHeader>

		<DialogFooter>
			<Button variant="destructive" @click="handleDelete()" :disabled="!deleteAllowed">
				<p>Delete Trace</p>
			</Button>
		</DialogFooter>
	</DialogContent>
</template>

<script setup lang="ts">
import {
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog'

import { Button } from '@/components/ui/button';

import { TriangleAlert } from 'lucide-vue-next';
import { ref, watch } from 'vue';

const props = defineProps<{
	isOpen: boolean;
}>();

const emit = defineEmits<{
	close: []
}>();

const deleteAllowed = ref(false);

watch(() => props.isOpen, (newValue) => {
	if (newValue === false) return;
	deleteAllowed.value = false;
	setTimeout(() => {
		deleteAllowed.value = true;
	}, 2500);
})

const handleDelete = () => {
	emit('close');
};
</script>