import { GridAction, SocketEvent } from '@poor-guy-maker/shared'
import { defineSocketHandler, getParams } from '../_utils'

export interface GridActionDTO {
  action: GridAction
}

export const useGridActions = defineSocketHandler(SocketEvent.GRID_ACTION, (ctx) => {
  const player = ctx.game.players[ctx.player]
  if (!player) { return }
  const params: GridActionDTO = getParams(ctx)
  if (!params) { return }
  player.at?.onActions[params.action](ctx.game, ctx.player)
})
