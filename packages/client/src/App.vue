<script setup lang="ts">
import { useSocket } from './composables/socket'

const { player, connect, join, start, roll } = useSocket()

connect()
</script>

<template>
  <div>
    <div>poor guy maker client</div>

    <div>player: {{ player }}</div>

    <button @click="join">
      join
    </button>

    <button @click="start">
      start
    </button>

    <button @click="roll">
      roll
    </button>
  </div>
</template>
