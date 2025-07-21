<template>
  <div class="mx-auto flex-col mt-18 space-y-2 text-center">
    <p class="text-muted-foreground font-semibold">
      Built with ❤️ by
      <a href="https://maxward.ca" target="_blank" class="underline">Max</a>
    </p>
    <p class="text-sm text-muted-foreground/50 font-normal">© {{ year }} Maxwell Ward</p>
    <Button
      variant="link"
      class="text-muted-foreground/75"
      @click="showAcknowledgmentsDialog = true"
      >Acknowledgments</Button
    >
    <Dialog v-model:open="showAcknowledgmentsDialog">
      <Acknowledgments @close="showAcknowledgmentsDialog = false" />
    </Dialog>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Button from '@/components/ui/button/Button.vue'
import Acknowledgments from '@/components/acknowledgments.vue'
import { Dialog } from '@/components/ui/dialog'

const year = ref(new Date().getFullYear())
const showAcknowledgmentsDialog = ref(false)
</script>
