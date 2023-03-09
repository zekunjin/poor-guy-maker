<script setup lang="ts">
import { computed } from 'vue'
import { useSocket } from './composables/socket'

const { game, player, actions, connect, join, leave, start, pause, restart, roll, next, action } = useSocket()

connect()
</script>

<template>
  <div class="flex flex-col gap-2">
    <div>poor guy maker client</div>

    <div>player: {{ player }}</div>

    <div>game actions</div>

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
    </div>

    <div>player actions</div>

    <div class="flex gap-2">
      <button @click="roll">
        roll
      </button>

      <button v-for="item in actions" :key="item" @click="action(item)">
        {{ item }}
      </button>

      <button @click="next">
        next
      </button>
    </div>

    <template v-if="game.auction">
      <div>
        auction
      </div>

      <div class="flex gap-2">
        <button>
          bid
        </button>

        <button>
          skip
        </button>
      </div>
    </template>

    <div class="flex">
      <div
        v-for="item in game.board?.grids"
        :key="item.tk"
        class="border- border-solid border-black py-4 flex flex-col items-center justify-center w-48"
      >
        <div />

        <div>{{ item.name }}</div>

        <div v-if="item.owner">
          owner: {{ item.owner }}
        </div>
      </div>
    </div>

    <pre>{{ JSON.stringify(game, null, '\t') }}</pre>
  </div>
</template>
