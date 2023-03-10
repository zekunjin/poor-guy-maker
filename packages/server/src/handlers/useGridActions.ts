import { GridAction, SocketEvent } from '@poor-guy-maker/shared'
import { defineSocketHandler } from '../_utils'
import { io } from '../..'

export interface GridActionDTO {
  action: GridAction
}

export const useGridActions = defineSocketHandler(SocketEvent.AUCTION, (_, game, p, { action }: GridActionDTO) => {
  const player = game.players[p]
  if (!player) { return }
  player.at?.onActions[action](game, p)
  io.emit(SocketEvent.SYNC_GAME, game)
})
