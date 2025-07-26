<template>
  <DialogContent>
    <DialogHeader>
      <DialogTitle class="flex items-center gap-1">
        <RefreshCw class="size-5" />
        <h2>Sync GPX Traces</h2>
      </DialogTitle>
      <DialogDescription class="space-y-2">
        <p>
          Starting a sync will pull all your GPX traces from the OpenStreetMap API, process them on our servers, then
          save their data to your GPX Statistics account.
        </p>
        <p>A sync can take anywhere from a few seconds to a few minutes
          depending on your trace count and server load.</p>
        <p>In order to respect OpenStreetMap's usage policy, there is a one hour cooldown between sync requests.</p>
      </DialogDescription>
    </DialogHeader>

    <DialogFooter>
      <Button @click="handleSync()" :disabled="syncing" class="w-24">
        <LoaderCircle v-if="syncing" class="size-4 animate-spin" />
        <div v-else class="flex items-center gap-1">
          <p>Sync</p>
          <RefreshCw class="size-4" />
        </div>
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
import { Button } from '@/components/ui/button'
import { LoaderCircle, RefreshCw } from 'lucide-vue-next'
import { ref } from 'vue'
import { useTraceStore } from '@/stores/traces'

const emit = defineEmits<{
  close: []
}>()

const { sync } = useTraceStore();

const syncing = ref(false);
const handleSync = async () => {
  try {
    syncing.value = true;
    await sync();
  } finally {
    syncing.value = false;
    emit('close');
  }
}
</script>
