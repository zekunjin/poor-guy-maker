<script setup lang="ts">
defineProps<{
  visible: boolean
}>()

const emit = defineEmits(['update:visible'])
</script>

<template>
  <Teleport to="body">
    <div v-if="visible" class="w-screen h-screen fixed top-0 left-0 flex items-center justify-center z-50 bg-black/75" @click="emit('update:visible', false)">
      <div @click.stop>
        <slot />
      </div>
    </div>
  </Teleport>
</template>
