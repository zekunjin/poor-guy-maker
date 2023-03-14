import { SocketEvent } from '@poor-guy-maker/shared'
import { defineSocketHandler } from '../_utils'

export const useRollDices = defineSocketHandler(SocketEvent.ROLL_DICES, async (ctx) => {
  await ctx.game.roll(ctx.player)
})
