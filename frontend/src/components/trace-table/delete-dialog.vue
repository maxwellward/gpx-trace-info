<template>
  <DialogContent>
    <DialogHeader>
      <DialogTitle class="flex items-center gap-1 text-red-400">
        <TriangleAlert class="size-5" />
        <h2>Delete GPX Trace</h2>
      </DialogTitle>
      <DialogDescription>
        Are you sure you want to delete the GPX trace "{{ 'Morning Jog' }}" ({{ 3.2 }}km) from
        OpenStreetMap? This cannot be undone.
      </DialogDescription>
    </DialogHeader>

    <DialogFooter class="!justify-between">
      <div class="flex items-center gap-1">
        <div class="gap-1 flex items-center">
          <Checkbox v-model="delayBeforeDelete" class="mt-0.5" />
          <label
            for="safety"
            class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Enable safety
          </label>
        </div>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger class="flex items-center gap-1 mt-0.5">
              <Info class="size-4" />
            </TooltipTrigger>
            <TooltipContent>
              <p class="w-48">
                Adds a 2.5s delay before enabling the delete button to prevent accidental deletions.
              </p>
              <div class="flex items-center gap-1 mt-2">
                <CloudCheck class="size-4" />
                <p>Your selection will be remembered.</p>
              </div>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
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
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/button'
import { TriangleAlert, Info, CloudCheck } from 'lucide-vue-next'
import { ref, watch } from 'vue'

const props = defineProps<{
  isOpen: boolean
}>()

const emit = defineEmits<{
  close: []
}>()

const deleteAllowed = ref(false)
const delayBeforeDelete = ref(true)

watch(
  () => props.isOpen,
  (newValue) => {
    if (newValue === false) return
    deleteAllowed.value = false
    setTimeout(() => {
      deleteAllowed.value = true
    }, 2500)
  },
)

const handleDelete = () => {
  emit('close')
}
</script>
