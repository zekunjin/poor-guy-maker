import { GridAction, SocketEvent } from '@poor-guy-maker/shared'
import { Context, defineSocketHandler } from '../_utils'

export interface GridActionDTO {
  action: GridAction
}

export const useGridActions = defineSocketHandler(SocketEvent.GRID_ACTION, (ctx: Context<GridActionDTO>) => {
  const player = ctx.game.players[ctx.player]
  if (!player) { return }
  if (!ctx.params) { return }
  player.at?.onActions[ctx.params.action](ctx.game, ctx.player)
})
