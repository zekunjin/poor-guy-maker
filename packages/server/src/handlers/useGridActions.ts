import { GridAction, SocketEvent } from '@poor-guy-maker/shared'
import { defineSocketHandler } from '../_utils'

export interface GridActionDTO {
  action: GridAction
}

export const useGridActions = defineSocketHandler(SocketEvent.GRID_ACTION, (ctx, { action }: GridActionDTO) => {
  const player = ctx.game.players[ctx.player]
  if (!player) { return }
  player.at?.onActions[action](ctx.game, ctx.player)
})
