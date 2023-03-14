<script setup lang="ts">
import PModal from './PModal.vue'

const props = defineProps<{
  color?: string
  name?: string
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
    <div class="bg-white rounded-lg w-96 h-[36rem] p-6 flex flex-col box-border" :style="{ borderTop: `4px solid ${color || 'transparent'}` }">
      <div class="text-xl font-bold flex gap-4 items-center">
        <div v-if="color" class="w-4 h-4 rounded-full" :style="{ background: color }" />
        <span>{{ name }}</span>
      </div>
    </div>
  </PModal>
</template>
