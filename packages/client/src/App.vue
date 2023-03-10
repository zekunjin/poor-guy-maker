<script setup lang="ts">
import { computed, ref } from 'vue'
import { AuctionAction, COLORS } from '@poor-guy-maker/shared'
import { useGame } from './composables/useGame'
import Grid from './components/Grid.vue'

const num = ref(0)
const { me, game, player, actions, connect, ready, leave, start, pause, restart, roll, next, action, auctionAction, gridAction } = useGame()

const players = computed(() => {
  if (!game.value.players) { return [] }
  const order: string[] = game.value?.order || []
  return order.map((tk, i) => ({
    tk,
    color: COLORS[i],
    ...game.value.players[tk]
  }))
})

connect()
</script>

<template>
  <div class="flex flex-col gap-2">
    <div>poor guy maker client</div>

    <div>player: {{ player }}</div>

    <div>game actions</div>

    <div class="flex gap-2">
      <button @click="ready">
        ready
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

    <div>
      grid actions
    </div>

    <div class="flex gap-2">
      <button v-for="item in me?.at?.actions || []" :key="item" @click="gridAction(item)">
        {{ item }}
      </button>
    </div>

    <template v-if="game.auction">
      <div>
        auction actions
      </div>

      <div class="flex gap-2">
        <input v-model="num" type="number">

        <button @click="auctionAction(AuctionAction.BID, num)">
          bid
        </button>

        <button @click="auctionAction(AuctionAction.SKIP)">
          skip
        </button>
      </div>
    </template>

    <div class="flex gap-1 p-1 overflow-auto bg-gray-100 rounded-lg">
      <Grid
        v-for="item, index in game.board?.grids"
        :key="item.tk"
        :name="item.name"
        :price="item.price"
        :players="players.filter(({ position }) => position === index)"
      />
    </div>

    <div class="flex flex-col bg-gray-100 gap-1 p-1 w-96 rounded-lg">
      <div v-for="item, index in game.order" :key="item" class="px-4 py-3 bg-white flex items-center gap-2 rounded-lg">
        <div class="w-3 h-3 rounded-full" :style="{ background: COLORS[index]}" />
        <span>{{ item === player ? 'me' : item }}</span>
        <span v-show="index === game.activeIndex">(active)</span>
      </div>
    </div>

    <pre>{{ JSON.stringify(game, null, '\t') }}</pre>
  </div>
</template>
