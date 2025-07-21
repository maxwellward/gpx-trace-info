<template>
  <DialogContent>
    <DialogHeader>
      <DialogTitle class="flex items-center gap-1">
        <Heart
          class="size-5 text-red-400 cursor-pointer transition-transform duration-200 ease-out"
          :style="{ transform: `scale(${heartScale})` }"
          @click="growHeart"
        />
        <h2>Acknowledgments</h2>
      </DialogTitle>
      <DialogDescription>
        This project wouldn't be possible without the following people and packages. Thank you!
      </DialogDescription>
    </DialogHeader>

    <div class="flex items-center w-full gap-2" v-for="item in acknowledgments" :key="item.name">
      <a :href="item.url" target="_blank" class="text-blue-300 underline">{{ item.name }}</a>
      <Separator class="flex-1 mx-2" />
      <p>{{ item.description }}</p>
    </div>

    <DialogFooter>
      <Button variant="secondary" @click="emit('close')">Close</Button>
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
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import { Heart } from 'lucide-vue-next'
import { ref } from 'vue'

const emit = defineEmits<{
  close: []
}>()

const heartScale = ref(1)
let shrinkInterval: number | null = null

const growHeart = () => {
  // Clear any existing shrink interval
  if (shrinkInterval) {
    clearInterval(shrinkInterval)
    shrinkInterval = null
  }

  // Bounce animation: grow big then settle to slightly larger
  const currentScale = heartScale.value
  const targetScale = Math.min(currentScale + 0.3, 5) // Cap at 3x size
  const bounceScale = targetScale + 0.2 // Overshoot for bounce effect

  // First grow to bounce size
  heartScale.value = bounceScale

  // Then settle back to target size
  setTimeout(() => {
    heartScale.value = targetScale

    // Start shrinking after a delay
    setTimeout(() => {
      startShrinking()
    }, 500)
  }, 100)
}

const startShrinking = () => {
  if (shrinkInterval) return // Already shrinking

  shrinkInterval = setInterval(() => {
    if (heartScale.value <= 1) {
      heartScale.value = 1
      if (shrinkInterval) {
        clearInterval(shrinkInterval)
        shrinkInterval = null
      }
    } else {
      // Shrink speed slows down as it gets closer to original size
      const shrinkRate = Math.max(0.01, (heartScale.value - 1) * 0.05)
      heartScale.value = Math.max(1, heartScale.value - shrinkRate)
    }
  }, 25)
}

const acknowledgments = ref([
  {
    name: 'Shadcn',
    url: 'https://ui.shadcn.com/',
    description: 'Component styles and inspiration',
  },
  {
    name: 'Nuxt Charts',
    url: 'https://nuxtcharts.com/',
    description: 'Chart visualizations',
  },
  {
    name: 'MapLibre',
    url: 'https://maplibre.org/',
    description: 'Maps',
  },
  {
    name: 'OSM Contributors',
    url: 'https://openstreetmap.org/',
    description: 'Mapping the world',
  },
])
</script>
