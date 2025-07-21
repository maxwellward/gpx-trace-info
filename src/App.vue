<template>
  <div class="w-full">
    <div class="w-full xl:w-5/6 2xl:w-3/4 mx-auto">
      <RouterView />
    </div>
  </div>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import { useColorMode } from '@vueuse/core'

const mode = useColorMode()
mode.value = 'dark'
</script>
