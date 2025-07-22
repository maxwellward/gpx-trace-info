<template>
  <DialogContent>
    <DialogHeader>
      <DialogTitle class="flex items-center gap-1">
        <Settings2 class="size-5" />
        <h2>Edit GPX Trace</h2>
      </DialogTitle>
      <DialogDescription>
        <p>Editing "{{ 'Morning Jog' }}" ({{ 3.2 }}km)</p>
      </DialogDescription>
    </DialogHeader>

    <div class="space-y-3">
      <div>
        <div class="flex">
          <label for="terms" class="text-sm font-medium">Description</label>
          <p class="text-red-400">*</p>
        </div>
        <Input type="text" placeholder="Description..." v-model="description" />
      </div>

      <div>
        <div class="flex mb-1">
          <label for="terms" class="text-sm font-medium">Tags</label>
        </div>
        <TagsInput v-model="tags">
          <TagsInputItem v-for="item in tags" :key="item" :value="item">
            <TagsInputItemText />
            <TagsInputItemDelete />
          </TagsInputItem>

          <TagsInputInput placeholder="Tags..." />
        </TagsInput>
      </div>

      <div>
        <div class="flex mb-0.5">
          <label for="terms" class="text-sm font-medium">Visibility</label>
          <p class="text-red-400">*</p>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger class="flex items-center gap-1 ml-1">
                <Info class="size-4" />
              </TooltipTrigger>
              <TooltipContent>
                <p class="w-48">
                  GPX traces can be configured to various different privacy levels. Public is
                  recommended and does not link your traces to your identity. Please note that due
                  to the nature of GPX traces, even private traces can be used to identify patterns
                  and habits.
                </p>
                <div class="flex items-center gap-1 mt-1">
                  <Link2 class="size-4 mt-0.5" />
                  <a
                    href="https://wiki.openstreetmap.org/wiki/Visibility_of_GPS_traces"
                    target="_blank"
                    class="text-blue-600"
                  >
                    Learn more about privacy levels
                  </a>
                </div>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <Select v-model="visibility">
          <SelectTrigger class="w-full">
            <SelectValue placeholder="Visibility..." />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="private">Private</SelectItem>
              <SelectItem value="public">Public</SelectItem>
              <SelectItem value="trackable">Trackable</SelectItem>
              <SelectItem value="identifiable">Identifiable</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>

    <DialogFooter class="items-center !justify-between">
      <p class="text-sm text-muted-foreground">
        Looking to modify your trace file? Try
        <a href="https://gpx.studio" target="_blank" class="text-blue-300 hover:underline"
          >gpx.studio</a
        >
      </p>
      <Button @click="handleEdit()" :disabled="!canSubmit">
        <p>Save</p>
        <Check class="size-4 mt-1" />
      </Button>
    </DialogFooter>
  </DialogContent>
</template>

<script setup lang="ts">
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  TagsInput,
  TagsInputInput,
  TagsInputItem,
  TagsInputItemDelete,
  TagsInputItemText,
} from '@/components/ui/tags-input'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Settings2, Check, Info, Link2 } from 'lucide-vue-next'
import { computed, ref } from 'vue'

const emit = defineEmits<{
  close: []
}>()

const description = ref('')
const tags = ref([])
const visibility = ref<'private' | 'public' | 'trackable' | 'identifiable'>()

const canSubmit = computed(() => {
  return !!description.value && !!visibility.value
})

const handleEdit = () => {
  emit('close')
}
</script>
