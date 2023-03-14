<script setup lang="ts">
import PModal from './PModal.vue'

const props = defineProps<{
  color?: string
  name?: string
  rent?: number | string
  housesRent?: number[] | string[]
  hotelsRent?: number[] | string[]
  visible: boolean
}>()

const emit = defineEmits(['update:visible'])

const visible = computed({
  get () { return props.visible },
  set (value: boolean) { emit('update:visible', value) }
})
</script>

<template>
  <PModal v-model:visible="visible">
    <div class="bg-white rounded-lg w-96 flex flex-col box-border" :style="{ borderTop: `4px solid ${color || 'transparent'}` }">
      <div class="text-2xl font-bold flex gap-4 items-center py-6 px-8 shadow" :style="{ background: color && color + '66' }">
        <div v-if="color" class="w-4 h-4 rounded-full" :style="{ background: color }" />
        <span>{{ name }}</span>
      </div>

      <div class="py-6 px-8 flex flex-col gap-2">
        <div class="flex items-center justify-center gap-2 text-xl font-bold">
          <span>Rent</span>
          <span>{{ '$' + Number(rent || 0) }}</span>
        </div>

        <div v-for="item, index in housesRent || []" :key="index" class="flex justify-between items-center">
          <span>With {{ index + 1 }} House</span>
          <span>{{ '$' + item }}</span>
        </div>

        <div v-for="item, index in hotelsRent || []" :key="index" class="flex justify-between items-center">
          <span>With {{ index + 1 }} Hotel</span>
          <span>{{ '$' + item }}</span>
        </div>
      </div>

      <div class="pt-6 px-8 pb-10 border-t border-solid flex flex-col gap-2">
        <div class="flex justify-between">
          <span>Houses cost</span>
          <span>each</span>
        </div>

        <div class="flex justify-between">
          <span>Hotels cost</span>
          <span>each</span>
        </div>
      </div>
    </div>
  </PModal>
</template>
