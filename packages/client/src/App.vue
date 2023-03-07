<script setup lang="ts">
import { useSocket } from './composables/socket'

const { game, player, connect, join, start, end, restart, roll, next } = useSocket()

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

    <button @click="end">
      end
    </button>

    <button @click="restart">
      restart
    </button>

    <button @click="roll">
      roll
    </button>

    <button @click="next">
      next
    </button>

    <div>{{ game }}</div>
  </div>
</template>
