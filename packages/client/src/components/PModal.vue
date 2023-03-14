<script setup lang="ts">
defineProps<{
  visible: boolean
}>()

const emit = defineEmits(['update:visible'])
</script>

<template>
  <div v-if="visible" class="w-screen h-screen fixed flex items-center justify-center z-20 bg-black/75" @click="emit('update:visible', false)">
    <slot />
  </div>
</template>
