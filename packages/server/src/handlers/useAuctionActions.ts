import { AuctionAction, SocketEvent } from '@poor-guy-maker/shared'
import { defineSocketHandler } from '../_utils'
import { io } from '../..'

export interface AuctionDTO {
  action: AuctionAction
  num: number
}

export const useAuctionActions = defineSocketHandler(SocketEvent.AUCTION, (_, game, player, { action, num }: AuctionDTO) => {
  if (!game.auction) { return }
  game.auction.onActions[action](game, player, num)
  io.emit(SocketEvent.SYNC_GAME, game)
})
