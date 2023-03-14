<script setup lang="ts">
import { ref } from 'vue'
import { AuctionAction, COLORS } from '@poor-guy-maker/shared'
import { useGame } from './composables/useGame'
import Board from './components/Board.vue'
import Chess from './components/Chess.vue'
import PBtn from './components/PBtn.vue'

const num = ref(0)

const { me, game, player, actions, connect, ready, leave, start, pause, restart, roll, next, action, auctionAction, gridAction } = useGame()

const getGamePlayer = (tk: string) => {
  return game.value?.players?.[tk] || {}
}

connect()
</script>

<template>
  <div class="flex flex-col gap-2">
    <div>player: {{ player }}</div>

    <div class="flex gap-2 px-2">
      <Board :grids="game.board?.grids || []" :groups="game.board?.groups || []">
        <Chess v-for="tk, index in Object.keys(game.players || {})" :key="tk" :player="getGamePlayer(tk)" :index="index" />
      </Board>

      <div class="flex flex-col gap-2">
        <div class="flex flex-col bg-gray-100 gap-1 p-1 w-96 rounded-lg">
          <div v-for="item, index in game.order" :key="item" class="px-4 py-3 bg-white flex items-center gap-2 rounded-lg">
            <div class="w-3 h-3 rounded-full" :style="{ background: COLORS[index]}" />
            <span>{{ item === player ? 'me' : item }}</span>
            <span v-show="index === game.activeIndex">(active)</span>
          </div>
        </div>

        <div>game actions</div>

        <div class="flex gap-2">
          <PBtn @click="ready">
            ready
          </PBtn>

          <PBtn @click="leave">
            leave
          </PBtn>

          <PBtn @click="start">
            start
          </PBtn>

          <PBtn @click="pause">
            pause
          </PBtn>

          <PBtn @click="restart">
            restart
          </PBtn>
        </div>

        <div>player actions</div>

        <div class="flex gap-2">
          <PBtn @click="roll">
            roll
          </PBtn>

          <PBtn @click="next">
            next
          </PBtn>
        </div>

        <div class="flex gap-2">
          <PBtn v-for="item in actions" :key="item" @click="action(item)">
            {{ item }}
          </PBtn>
        </div>

        <div>
          grid actions
        </div>

        <div class="flex gap-2">
          <PBtn v-for="item in me?.at?.actions || []" :key="item" @click="gridAction(item)">
            {{ item }}
          </PBtn>
        </div>

        <template v-if="game.auction">
          <div>
            auction actions
          </div>

          <div class="flex gap-2">
            <input v-model="num" type="number">

            <PBtn @click="auctionAction(AuctionAction.BID, num)">
              bid
            </PBtn>

            <PBtn @click="auctionAction(AuctionAction.SKIP)">
              skip
            </PBtn>
          </div>
        </template>
      </div>
    </div>

    <pre>{{ JSON.stringify(game, null, '\t') }}</pre>
  </div>
</template>
