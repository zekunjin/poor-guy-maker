<script setup lang="ts">
import { useSocket } from './composables/socket'

const { connect, rollDice } = useSocket()

connect()
</script>

<template>
  <div>
    <div>poor guy maker client</div>
    <button @click="rollDice">
      roll
    </button>
  </div>
</template>
