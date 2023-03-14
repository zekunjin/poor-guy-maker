<script setup lang="ts">
import { computed } from 'vue'
import Avatar from './Avatar.vue'
import { GRID_GAP, GRID_HEIGHT, GRID_WIDTH } from '@/consts'

const props = defineProps<{
  player: any,
  index: number
}>()

const w = GRID_WIDTH * 11 + GRID_GAP * 10
const h = GRID_HEIGHT * 11 + GRID_GAP * 10

const position = computed(() => {
  if (!props.player) {
    return {
      x: 0,
      y: 0
    }
  }

  const { position } = props.player

  return {
    x: w,
    y: h
  }
})
</script>

<template>
  <div class="absolute z-10" :style="`transform: translate(${position.x}px, 100px);`">
    {{ position }}
    <Avatar>{{ player.chess.tk }}</Avatar>
  </div>
</template>
