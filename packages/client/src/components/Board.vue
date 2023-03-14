<script setup lang="ts">
import { computed } from 'vue'
import { COLORS } from '@poor-guy-maker/shared'
import PModal from './PModal.vue'
import Grid from './Grid.vue'
import { GRID_GAP, GRID_HEIGHT, GRID_WIDTH } from '@/consts'

const props = withDefaults(defineProps<{
  grids: any[]
  groups: any[]
  scale?: number
}>(), {
  scale: 0.6
})

const w = GRID_WIDTH * 11 + GRID_GAP * 12
const h = GRID_HEIGHT * 11 + GRID_GAP * 12

const visible = ref(false)

const grids = computed(() => {
  if (!props?.grids?.length) { return [[]] }

  const gridColors: Record<string, string> = {}

  props.groups.forEach((group, index) => {
    const c = COLORS[index]
    group.forEach((grid: string) => {
      gridColors[grid] = c
    })
  })

  const chunk = 10

  const res = []
  const arr = props?.grids || []

  for (let i = 0; i < arr.length; i += chunk) {
    res.push(arr.slice(i, i + chunk).map(item => ({ ...item, color: gridColors[item.tk] })))
  }
  return res
})

const onSelect = (grid: any) => {
  visible.value = true
}
</script>

<template>
  <div class="overflow-hidden" :style="{ height: `${h * scale}px`, width: `${w * scale}px` }">
    <div
      class="p-1 bg-gray-100 rounded-lg origin-top-left"
      :style="{
        transform: `scale(${scale})`,
        height: `${h}px`,
        width: `${w}px`
      }"
    >
      <div class="relative w-full h-full">
        <slot />

        <slot name="title">
          <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-8xl font-bold text-gray-300/50 select-none">
            POOR GUY MAKER
          </div>
        </slot>

        <div class="absolute bottom-0 right-0 flex gap-1 flex-row-reverse">
          <Grid
            v-for="item in grids[0]"
            :key="item.tk"
            :name="item.name"
            :price="item.price"
            :color="item.color"
            @click="onSelect(item)"
          />
        </div>

        <div class="absolute left-0 bottom-0 flex gap-1 flex-col-reverse justify-end">
          <Grid
            v-for="item in grids[1]"
            :key="item.tk"
            :name="item.name"
            :price="item.price"
            :color="item.color"
            @click="onSelect(item)"
          />
        </div>

        <div class="absolute top-0 left-0 flex gap-1">
          <Grid
            v-for="item in grids[2]"
            :key="item.tk"
            :name="item.name"
            :price="item.price"
            :color="item.color"
            @click="onSelect(item)"
          />
        </div>

        <div class="absolute right-0 top-0 flex gap-1 flex-col">
          <Grid
            v-for="item in grids[3]"
            :key="item.tk"
            :name="item.name"
            :price="item.price"
            :color="item.color"
            @click="onSelect(item)"
          />
        </div>
      </div>
    </div>
  </div>

  <PModal v-model:visible="visible" />
</template>
