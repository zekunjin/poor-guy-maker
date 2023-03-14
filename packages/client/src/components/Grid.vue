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

const emit = defineEmits(['click'])
</script>

<template>
  <div
    class="flex flex-col relative items-center justify-between bg-white py-4 overflow-hidden rounded-lg flex-shrink-0 box-border cursor-pointe transition-all cursor-pointer duration-300 hover:shadow-xl"
    :style="{
      width: `${GRID_WIDTH}px`,
      height: `${GRID_HEIGHT}px`,
      borderTop: `4px solid ${color || 'transparent'}`
    }"
    @click="emit('click')"
  >
    <div class="text-center">
      {{ name }}
    </div>

    <div>
      <span v-if="price">{{ '$' + price }}</span>
    </div>

    <div class="absolute top-0 left-0 right-0 bottom-0 opacity-25" :style="{ background: color }" />
  </div>
</template>
