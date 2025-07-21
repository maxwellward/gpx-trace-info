<template>
  <DialogContent>
    <DialogHeader>
      <DialogTitle class="flex items-center gap-1">
        <BookText class="size-5" />
        <h2>GPX Trace Details</h2>
      </DialogTitle>
      <DialogDescription className="sr-only">GPX trace metadata</DialogDescription>
    </DialogHeader>

    <DetailsMap />

    <div class="flex items-center w-full gap-2" v-for="(value, key) in information" :key="key">
      <p class="capitalize">{{ key.replace(/_/g, ' ') }}</p>
      <Separator class="flex-1 mx-2" />
      <p>{{ value }}</p>
    </div>

    <DialogFooter class="items-center !justify-between">
      <p class="text-sm text-muted-foreground">
        Looking to modify your trace file? Try
        <a href="https://gpx.studio" target="_blank" class="text-blue-300 hover:underline"
          >gpx.studio</a
        >
      </p>
      <Button @click="emit('close')" variant="secondary">
        <p>Close</p>
      </Button>
    </DialogFooter>
  </DialogContent>
</template>

<script setup lang="ts">
import { Separator } from '@/components/ui/separator'
import {
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { BookText } from 'lucide-vue-next'
import { ref } from 'vue'
import DetailsMap from '@/components/details-map.vue'

const emit = defineEmits<{
  close: []
}>()

const information = ref({
  file_name: '19_Jul_2025_1425.gpx',
  description: 'A nice fun walk through the forest',
  tags: 'None',
  uploaded: new Date('2025-07-19T21:29:00').toLocaleString(undefined, {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }),
  points: 801,
  start_coordinate: '49.67947, -124.98416',
  visibility: 'Public',
})
</script>
