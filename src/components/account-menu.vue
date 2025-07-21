<template>
  <DropdownMenu>
    <DropdownMenuTrigger>
      <Avatar>
        <AvatarImage
          src="https://avatars.githubusercontent.com/u/13861522?v=4"
          alt="@maxwellward"
        />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    </DropdownMenuTrigger>
    <DropdownMenuContent>
      <DropdownMenuLabel>Hi, maxwellward</DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuItem class="group">
        <a href="https://openstreetmap.org" target="_blank" class="flex items-center gap-1 group">
          <SquareArrowOutUpRight class="size-4 mt-0.5" />
          <p>OpenStreetMap Profile</p>
        </a>
      </DropdownMenuItem>
      <DropdownMenuItem>
        <a
          href="https://github.com/maxwellward/gpx-trace-info"
          target="_blank"
          class="flex items-center gap-1 group"
        >
          <Github class="size-4 mt-0.5" />
          <p>GitHub</p>
        </a>
      </DropdownMenuItem>
      <DropdownMenuItem class="flex items-center gap-1 group" @click="handleLogout">
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
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

import { SquareArrowOutUpRight, LogOut, Github } from 'lucide-vue-next'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()

const handleLogout = () => {
  authStore.logout()
}
</script>
