<script setup lang="ts">
import { GRID_HEIGHT, GRID_WIDTH } from '@/consts'

export interface Player {
  tk: string
  position: number
  color: string
}

defineProps<{
  name: string
  color?: string
  price?: number
}>()
</script>

<template>
  <div
    class="flex flex-col items-center justify-between bg-white py-4 relative rounded-lg flex-shrink-0 box-border cursor-pointer hover:bg-gray-50 transition-all duration-300"
    :style="{
      width: `${GRID_WIDTH}px`,
      height: `${GRID_HEIGHT}px`,
      borderTop: `4px solid ${color || 'transparent'}`
    }"
  >
    <div class="text-center">
      {{ name }}
    </div>
    <div>
      <span v-if="price">{{ '$' + price }}</span>
    </div>
  </div>
</template>
