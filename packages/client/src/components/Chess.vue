<script setup lang="ts">
import { computed } from 'vue'
import Avatar from './Avatar.vue'
import { GRID_GAP, GRID_HEIGHT, GRID_WIDTH } from '@/consts'

const props = withDefaults(defineProps<{
  player: any,
  index: number,
  size?: number
}>(), { size: 32 })

const w = GRID_WIDTH * 11 + GRID_GAP * 10
const h = GRID_HEIGHT * 11 + GRID_GAP * 10

const position = computed(() => {
  const { position: gridIndex } = props.player

  if (gridIndex > -1 && gridIndex < 10) {
    return {
      x: w - (gridIndex + 1) * GRID_WIDTH - gridIndex * GRID_GAP + GRID_WIDTH / 2,
      y: h - GRID_HEIGHT + GRID_HEIGHT / 2
    }
  }

  if (gridIndex > 9 && gridIndex < 20) {
    return {
      x: w - 11 * GRID_WIDTH - 10 * GRID_GAP + GRID_WIDTH / 2,
      y: h - (gridIndex - 10 + 1) * GRID_HEIGHT - (gridIndex - 10) * GRID_GAP + GRID_HEIGHT / 2
    }
  }

  if (gridIndex > 19 && gridIndex < 30) {
    return {
      x: (gridIndex - 19) * (GRID_WIDTH + GRID_GAP) - GRID_WIDTH / 2,
      y: GRID_HEIGHT / 2
    }
  }

  if (gridIndex > 29 && gridIndex < 40) {
    return {
      x: 11 * (GRID_WIDTH + GRID_GAP) - GRID_WIDTH / 2,
      y: (gridIndex - 29) * (GRID_HEIGHT + GRID_GAP) - GRID_HEIGHT / 2
    }
  }

  return {
    x: 0,
    y: 0
  }
})
</script>

<template>
  <div
    class="absolute z-10 -translate-x-1/2 -translate-y-1/2 transition-all duration-500"
    :style="{ left: `${position.x}px`, top: `${position.y}px` }"
  >
    <Avatar :size="size">
      {{ player.chess.tk }}
    </Avatar>
  </div>
</template>
