import { SocketEvent } from '@poor-guy-maker/shared'
import { defineSocketHandler } from '../_utils'
import { io } from 'packages/server'

export const useRollDices = defineSocketHandler(SocketEvent.ROLL_DICES, async (_, game, player) => {
  await game.roll(player)
  io.emit(SocketEvent.SYNC_GAME, game)
})
