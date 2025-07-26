<template>
  <DialogScrollContent>
    <DialogHeader>
      <DialogTitle class="flex items-center gap-1">
        <BookText class="size-5" />
        <h2>GPX Trace Details</h2>
      </DialogTitle>
      <DialogDescription className="sr-only">GPX trace metadata</DialogDescription>
    </DialogHeader>

    <DetailsMap />

    <div class="flex items-center w-full gap-2" v-for="(value, key) in information" :key="key">
      <p class="capitalize">{{ String(key).replace(/_/g, ' ') }}</p>
      <Separator class="flex-1 mx-2" />
      <p>{{ value }}</p>
    </div>

    <DialogFooter class="items-center !justify-between">
      <p class="text-sm text-muted-foreground">
        Looking to modify your trace file? Try
        <a href="https://gpx.studio" target="_blank" class="text-blue-400 hover:underline">gpx.studio</a>
      </p>
      <Button @click="emit('close')" variant="secondary">
        <p>Close</p>
      </Button>
    </DialogFooter>
  </DialogScrollContent>
</template>

<script setup lang="ts">
import { Separator } from '@/components/ui/separator'
import {
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogScrollContent,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { BookText } from 'lucide-vue-next'
import { ref, watch } from 'vue'
import DetailsMap from '@/components/details-map.vue'
import { useTraceStore, type Trace } from '@/stores/traces'

const props = defineProps<{
  open: boolean
  tid: number
}>()

const emit = defineEmits<{
  close: []
}>()

const traceStore = useTraceStore()

watch(
  () => props.open,
  async (newValue) => {
    if (newValue) {
      const trace: Trace = await traceStore.getTrace(props.tid)

      information.value = {
        filename: trace.filename,
        description: trace.description,
        distance: `${(trace.distance / 1000).toFixed(2)}km`,
        points: trace.points,
        visibility: trace.visibility[0].toUpperCase() + trace.visibility.slice(1),
        uploaded: `${new Date(trace.uploaded_at).toLocaleString()} UTC`,
        elevation_gain: `${trace.elevation_gain} meters`,
        average_speed: `${trace.average_speed || 0 / 1000}km/h`,
        duration: trace.duration
          ? `${Math.floor(trace.duration / 3600) > 0 ? Math.floor(trace.duration / 3600) + 'h ' : ''}${Math.floor((trace.duration % 3600) / 60) > 0 ? Math.floor((trace.duration % 3600) / 60) + 'm ' : ''}${trace.duration % 60}s`
          : 'N/A',
        start_point: `${trace.start_point?.lat}, ${trace.start_point?.lon}`,
        end_point: `${trace.end_point?.lat}, ${trace.end_point?.lon}`,
      }
    }
  },
)

const information = ref()
</script>
