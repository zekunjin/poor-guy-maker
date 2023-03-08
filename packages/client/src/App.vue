<script setup lang="ts">
import { PlayerAction } from '@poor-guy-maker/shared'
import { useSocket } from './composables/socket'

const { game, player, connect, join, start, pause, restart, roll, next, action } = useSocket()

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

    <button @click="pause">
      pause
    </button>

    <button @click="restart">
      restart
    </button>

    <button @click="roll">
      roll
    </button>

    <button @click="action(PlayerAction.BUY)">
      buy
    </button>

    <button @click="action(PlayerAction.AUCTION)">
      auction
    </button>

    <button @click="action(PlayerAction.BID)">
      bid
    </button>

    <button @click="next">
      next
    </button>

    <pre>{{ JSON.stringify(game, null, '\t') }}</pre>
  </div>
</template>
