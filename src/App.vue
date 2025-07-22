<template>
  <div class="w-5/6 xl:w-5/6 2xl:w-[50%] mx-auto mt-16">
    <RouterView />
  </div>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import { useColorMode } from '@vueuse/core'

const mode = useColorMode()
mode.value = 'dark'
</script>
