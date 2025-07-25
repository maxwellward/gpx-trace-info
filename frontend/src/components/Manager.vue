<template>
  <div class="container mx-auto pt-6">
    <Alert class="mb-2 block sm:hidden">
      <AlertTitle class="flex items-center justify-between">
        <div class="flex items-center gap-1">
          <TriangleAlert class="size-4" />
          <p>Heads up!</p>
        </div>
        <button
          class="hover:text-red-400 transition-colors duration-150 fade-in fade-out hover:cursor-pointer p-1"
        >
          <X class="size-4" />
        </button>
      </AlertTitle>
      <AlertDescription>
        This table works best on a larger display. You can still use it on smaller displays, but
        your experience may be degraded.
      </AlertDescription>
    </Alert>
    <TraceTable :columns="columns" :data="data" />
  </div>
</template>

<script setup lang="ts">
import type { Trace } from '@/components/trace-table/columns'
import { onMounted, ref } from 'vue'
import { columns } from '@/components/trace-table/columns'
import TraceTable from '@/components/trace-table/trace-table.vue'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { TriangleAlert, X } from 'lucide-vue-next'
import { useTraceStore } from '@/stores/traces'

const traceStore = useTraceStore()

const data = ref<Trace[]>([])

onMounted(async () => {
  data.value = await traceStore.getTraces()
})
</script>
