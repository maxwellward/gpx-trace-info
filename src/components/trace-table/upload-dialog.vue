<template>
  <DialogContent>
    <DialogHeader>
      <DialogTitle class="flex items-center gap-1">
        <Upload class="size-5" />
        <h2>Upload GPX Trace</h2>
      </DialogTitle>
      <DialogDescription>
        <p>
          Your GPX trace will be uploaded to OpenStreetMap under the
          <a href="https://opendatacommons.org/licenses/odbl/" target="_blank"
            class="text-blue-400 hover:underline">Open Data Commons
            Open Database
            License</a>
          (ODbL)
        </p>
      </DialogDescription>
    </DialogHeader>

    <div class="space-y-3">
      <div>
        <div class="flex">
          <label for="terms" class="text-sm font-medium">GPX File</label>
          <p class="text-red-400">*</p>
        </div>
        <Input type="file" id="gpxFileInput" accept="application/gpx+xml" @change="handleUploadedFile" />
        <p class="text-muted-foreground text-xs">Must be a .gpx file</p>
      </div>

      <div>
        <div class="flex">
          <label for="terms" class="text-sm font-medium">Description</label>
          <p class="text-red-400">*</p>
        </div>
        <Input type="text" placeholder="Description..." v-model="trace.description" />
      </div>

      <div>
        <div class="flex mb-1">
          <label for="terms" class="text-sm font-medium">Tags</label>
        </div>
        <TagsInput v-model="trace.tags">
          <TagsInputItem v-for="item in trace.tags" :key="item" :value="item">
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
                  <a href="https://wiki.openstreetmap.org/wiki/Visibility_of_GPS_traces" target="_blank"
                    class="text-blue-600">
                    Learn more about privacy levels
                  </a>
                </div>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <Select v-model="trace.visibility">
          <SelectTrigger class="w-full">
            <SelectValue placeholder="Visibility..." />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="public">Public</SelectItem>
              <SelectItem value="private">Private</SelectItem>
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
        <a href="https://gpx.studio" target="_blank" class="text-blue-400 hover:underline">gpx.studio</a>
      </p>
      <Button @click="handleUpload()" :disabled="!canSubmit || uploading" class="w-24">
        <LoaderCircle v-if="uploading" class="size-4 animate-spin" />
        <div v-else class="flex items-center gap-1">
          <p>Upload</p>
          <Upload class="size-4" />
        </div>
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
import { Upload, Info, Link2, LoaderCircle } from 'lucide-vue-next'
import { computed, ref } from 'vue'
import { useTraceStore, type OSMTrace, TraceVisibility } from '@/stores/traces'

const emit = defineEmits<{
  close: []
}>()

const { upload } = useTraceStore();

const trace = ref<Partial<OSMTrace>>({
  description: '',
  tags: [],
  visibility: TraceVisibility.PUBLIC
});

const canSubmit = computed(() => {
  return trace.value.description && trace.value.description?.length > 0 && !!trace.value.visibility && !!trace.value.file
})

const handleUploadedFile = () => {
  const input = document.getElementById("gpxFileInput") as HTMLInputElement;
  if (!input) throw Error('Something went wrong while getting the file upload input element.');
  trace.value.file = input.files?.[0];
}

const uploading = ref(false);
const handleUpload = async () => {
  try {
    uploading.value = true;
    // This function can't be called without canSubmit being `true`, so we 
    // don't need to double-check that the trace details are complete
    await upload(trace.value as OSMTrace);
  } finally {
    uploading.value = false;

    trace.value = {
      description: '',
      tags: [],
      visibility: TraceVisibility.PUBLIC
    }

    emit('close');
  }
}
</script>
