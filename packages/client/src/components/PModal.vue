<script setup lang="ts">
withDefaults(defineProps<{
  visible: boolean
}>(), { visible: false })
</script>

<template>
  <div v-if="visible" class="w-screen h-screen fixed z-20">
    <slot />
  </div>
</template>
