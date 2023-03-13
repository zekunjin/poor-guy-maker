<script setup lang="ts">
import { computed } from 'vue'
import Grid from './Grid.vue'
import { GRID_GAP, GRID_HEIGHT, GRID_WIDTH } from '@/consts'

const props = withDefaults(defineProps<{
  grids: any[],
  scale: number
}>(), {
  scale: 0.75
})

const grids = computed(() => {
  if (!props?.grids?.length) { return [[]] }

  const chunk = 10

  const res = []
  const arr = props?.grids || []

  for (let i = 0; i < arr.length; i += chunk) {
    res.push(arr.slice(i, i + chunk))
  }
  return res
})
</script>

<template>
  <div
    class="p-1 bg-gray-100 rounded-lg overflow-hidden origin-top-left"
    :style="{
      transform: `scale(${scale})`,
      height: `${(GRID_HEIGHT * 11 + GRID_GAP * 10)}px`,
      width: `${(GRID_WIDTH * 11 + GRID_GAP * 10)}px`
    }"
  >
    <div class="relative w-full h-full">
      <div class="absolute top-0 bottom-0 right-0 left-0 flex flex-col justify-between">
        <div class="flex gap-1">
          <Grid
            v-for="item in grids[2]"
            :key="item.tk"
            :name="item.name"
            :price="item.price"
            :players="[]"
          />
        </div>

        <div class="flex gap-1 flex-row-reverse">
          <Grid
            v-for="item in grids[0]"
            :key="item.tk"
            :name="item.name"
            :price="item.price"
            :players="[]"
          />
        </div>
      </div>

      <div class="absolute top-0 bottom-0 right-0 left-0 flex justify-between">
        <div class="flex gap-1 flex-col-reverse justify-end" :style="{ transform: `translateY(${GRID_HEIGHT + GRID_GAP}px)`}">
          <Grid
            v-for="item in grids[1]"
            :key="item.tk"
            :name="item.name"
            :price="item.price"
            :players="[]"
          />
        </div>

        <div class="flex gap-1 flex-col">
          <Grid
            v-for="item in grids[3]"
            :key="item.tk"
            :name="item.name"
            :price="item.price"
            :players="[]"
          />
        </div>
      </div>
    </div>
  </div>
</template>
