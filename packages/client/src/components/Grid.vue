<script setup lang="ts">
export interface Player {
  tk: string
  position: number
  color: string
}

defineProps<{
  name: string
  price?: number
  players: Player[]
}>()
</script>

<template>
  <div class="flex flex-col items-center justify-center w-32 py-16 bg-white relative rounded-lg flex-shrink-0">
    <div class="text-center">
      {{ name }}
    </div>
    <div>
      <span v-if="price">{{ '$' + price }}</span>
    </div>

    <div class="absolute bottom-0 left-0 flex gap-1 p-1">
      <div v-for="item in players" :key="item.tk" class="w-3 h-3 rounded-full" :style="{ background: item.color }" />
    </div>
  </div>
</template>
