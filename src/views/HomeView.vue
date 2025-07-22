<template>
  <main class="w-full flex flex-col">
    <div class="mt-2">
      <Tabs default-value="statistics">
        <TabsList>
          <TabsTrigger value="statistics" @click.stop="selectedView = 'statistics'">
            Statistics
          </TabsTrigger>
          <TabsTrigger value="manage" @click.stop="selectedView = 'manage'">
            Manage Traces
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>

    <Data v-if="selectedView === 'statistics'" />
    <Manager v-else-if="selectedView === 'manage'" />
  </main>
</template>

<script setup lang="ts">
import { ref } from 'vue'


import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'

import Data from '@/components/Data.vue'
import Manager from '@/components/Manager.vue'

const selectedView = ref<'statistics' | 'manage'>('statistics')
</script>
