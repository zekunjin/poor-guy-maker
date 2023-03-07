<script setup lang="ts">
import { useSocket } from './composables/socket'

const { connect, join, rollDice } = useSocket()

connect()
</script>

<template>
  <div>
    <div>poor guy maker client</div>
    <button @click="join">
      join
    </button>
    <button @click="rollDice">
      roll
    </button>
  </div>
</template>
