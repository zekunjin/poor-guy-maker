<script setup lang="ts">
import PModal from './PModal.vue'

const props = defineProps<{
  color?: string
  name?: string
  rent?: number | string
  housesRent?: number[] | string[]
  hotelsRent?: number[] | string[]
  housesCost?: number | string
  hotelsCost?: number | string
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
    <div class="bg-white rounded-lg overflow-hidden p-6">
      <div class="w-72 flex flex-col box-border select-none border-4 border-black border-solid p-2">
        <div class="flex flex-col items-center justify-center h-24 border-solid text-center border-2 border-black" :style="{ background: color }">
          <div v-show="rent" class="text-xs">
            TITLE DEED
          </div>

          <div :title="name" class="text-xl font-bold cursor-pointer mt-2">
            {{ name }}
          </div>
        </div>

        <div class="py-3 px-2 flex flex-col gap-2">
          <div class="flex items-center justify-between font-bold">
            <span>Rent</span>
            <span>{{ '$' + Number(rent || 0) }}</span>
          </div>

          <div class="flex items-center justify-between font-bold">
            <span>Rent with color set</span>
            <span>{{ '$' + (Number(rent || 0) * 2) }}</span>
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

        <div class="bg-black h-px" />

        <div class="px-2 py-3 flex flex-col gap-2">
          <div class="flex justify-between">
            <span>Houses cost</span>
            <span>{{ `$${housesCost || 0} each` }}</span>
          </div>

          <div class="flex justify-between">
            <span>Hotels cost</span>
            <div class="text-right">
              <div>{{ `$${hotelsCost || 0} each` }}</div>
              <div class="text-xs">
                {{ `(plus ${(housesRent || []).length} houses)` }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </PModal>
</template>
