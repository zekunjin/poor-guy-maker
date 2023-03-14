<script setup lang="ts">
export interface Props {
  disabled?: boolean
  loading?: boolean
  block?: boolean
  size?: 'default' | 'large' | 'small'
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
  loading: false,
  block: false,
  size: 'default'
})

const emit = defineEmits(['click'])
</script>

<template>
  <button
    :class="{ 'w-full': props.block, 'disabled-btn': props.loading || props.disabled }"
    class="group relative flex items-center justify-center rounded-md border border-transparent bg-primary-600 py-2 px-4 font-medium text-white hover:bg-primary-700 focus:outline-none"
    @click="!props.disabled && emit('click')"
  >
    <slot />
  </button>
</template>

<style scoped>
.disabled-btn {
  @apply cursor-not-allowed pointer-events-none text-black text-opacity-25 bg-black bg-opacity-10
}
</style>
