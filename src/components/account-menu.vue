<template>
  <DropdownMenu>
    <DropdownMenuTrigger>
      <Avatar class="hover:scale-103 transition-all duration-150">
        <AvatarImage :src="profileImage" alt="profile photo" />
      </Avatar>
    </DropdownMenuTrigger>
    <DropdownMenuContent>
      <DropdownMenuLabel>Hi, {{ authStore.displayName || 'you' }}</DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuItem class="group">
        <a :href="`${BASE_URI}/user/${authStore.displayName}`" target="_blank" class="flex items-center gap-1 group">
          <SquareArrowOutUpRight class="size-4 mt-0.5" />
          <p>OpenStreetMap Profile</p>
        </a>
      </DropdownMenuItem>
      <DropdownMenuItem>
        <a href="https://github.com/maxwellward/gpx-trace-info" target="_blank" class="flex items-center gap-1 group">
          <Github class="size-4 mt-0.5" />
          <p>GitHub</p>
        </a>
      </DropdownMenuItem>
      <DropdownMenuItem class="flex items-center gap-1 group hover:cursor-pointer" @click="handleLogout">
        <LogOut class="size-4 mt-0.5" />
        <p>Sign Out</p>
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>

<script setup lang="ts">
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarImage } from '@/components/ui/avatar'

import { SquareArrowOutUpRight, LogOut, Github } from 'lucide-vue-next'
import { useAuthStore } from '@/stores/auth'
import { computed } from 'vue'

const authStore = useAuthStore()
const user = computed(() => authStore.user);

const BASE_URI = import.meta.env.VITE_OSM_BASE_URI;

const profileImage = computed(() => {
  if (user.value?.img) {
    return user.value.img.href;
  } else {
    return `https://api.dicebear.com/9.x/thumbs/svg?seed=${authStore.displayName}`;
  }
})

const handleLogout = () => {
  authStore.logout()
}
</script>
