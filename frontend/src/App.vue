<template>
  <Toaster :duration="8000" theme="dark" closeButton />

  <div class="w-5/6 xl:w-5/6 2xl:w-[50%] mx-auto mt-16">
    <Header />
    <RouterView />
    <Footer />
  </div>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import { useColorMode } from '@vueuse/core'

import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'

import { Toaster } from '@/components/ui/sonner'
import 'vue-sonner/style.css'

const mode = useColorMode()
mode.value = 'dark'
</script>
