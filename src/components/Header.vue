<template>
  <div>
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-2">
        <DraftingCompass class="size-6" />
        <h1 class="text-text-primary font-bold tracking-wide text-xl sm:text-2xl">GPX Statistics</h1>
      </div>
      <div class="space-x-2 flex">
        <DatePicker v-if="isAuthenticated" />

        <Select v-if="isAuthenticated">
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

        <Button v-if="isAuthenticated">
          <Share2 class="size-4" />
          <p>Share</p>
        </Button>

        <AccountMenu v-if="isAuthenticated" />
        <Button v-else>Sign In</Button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Share2, DraftingCompass } from 'lucide-vue-next'

import { DatePicker } from '@/components/ui/date-picker'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import AccountMenu from '@/components/account-menu.vue'

import { useAuthStore } from '@/stores/auth';

const { isAuthenticated } = useAuthStore();
</script>
