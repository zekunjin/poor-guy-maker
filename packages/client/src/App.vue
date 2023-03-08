<script setup lang="ts">
import { useSocket } from './composables/socket'

const { game, player, actions, connect, join, leave, start, pause, restart, roll, next, action } = useSocket()

connect()
</script>

<template>
  <div class="flex flex-col gap-2">
    <div>poor guy maker client</div>

    <div>player: {{ player }}</div>

    <div class="flex gap-2">
      <button @click="join">
        join
      </button>

      <button @click="leave">
        leave
      </button>

      <button @click="start">
        start
      </button>

      <button @click="pause">
        pause
      </button>

      <button @click="restart">
        restart
      </button>

      <button @click="next">
        next
      </button>
    </div>

    <div>Actions</div>

    <div class="flex gap-2">
      <button @click="roll">
        roll
      </button>

      <button v-for="item in actions" :key="item" @click="action(item)">
        {{ item }}
      </button>
    </div>

    <pre>{{ JSON.stringify(game, null, '\t') }}</pre>
  </div>
</template>

<style scoped>
.flex {
  display: flex;
}

.flex-col {
  flex-direction: column;
}

.gap-2 {
  gap: 8px;
}
</style>
