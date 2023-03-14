<script setup lang="ts">
withDefaults(defineProps<{
  size?: number
  src?: string
}>(), { size: 32, src: '' })
</script>

<template>
  <div class="rounded-full overflow-hidden bg-pink-500 flex items-center justify-center text-white" :style="{ width: `${size}px`, height: `${size}px` }">
    <slot>
      <img v-if="src" class="block w-full h-full" :src="src">
    </slot>
  </div>
</template>
