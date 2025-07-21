<template>
  <div>
    <div class="flex items-center justify-between">
      <h1 class="text-text-primary font-bold tracking-wide text-xl sm:text-2xl">GPX Statistics</h1>
      <div class="space-x-2 flex">
        <DatePicker />
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Units" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="Metric"> Metric </SelectItem>
              <SelectItem value="imperial"> Imperial </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <Button>
          <Share2 class="size-4" />
          <p>Share</p>
        </Button>
        <Avatar>
          <AvatarImage
            src="https://avatars.githubusercontent.com/u/13861522?v=4"
            alt="@maxwellward"
          />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
    </div>

    <div class="mt-2">
      <Tabs default-value="statistics">
        <TabsList>
          <TabsTrigger value="statistics" @click.stop="emit('toggleView', 'statistics')">
            Statistics
          </TabsTrigger>
          <TabsTrigger value="manage" @click.stop="emit('toggleView', 'manage')">
            Manage Traces
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Share2 } from 'lucide-vue-next'

import { DatePicker } from '@/components/ui/date-picker'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'

const emit = defineEmits<{
  (e: 'toggleView', view: 'statistics' | 'manage'): void
}>()
</script>
