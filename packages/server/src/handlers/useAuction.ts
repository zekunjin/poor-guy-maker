import { AuctionAction, SocketEvent } from '@poor-guy-maker/shared'
import { defineSocketHandler } from '../_utils'
import { io } from '../..'

export interface AuctionDTO {
  event: AuctionAction
  num: number
}

export const useAuction = defineSocketHandler(SocketEvent.AUCTION, (_, game, player, { event, num }: AuctionDTO) => {
  if (!game.auction) { return }
  game.auction.onActions[event](game, player, num)
  io.emit(SocketEvent.SYNC_GAME, game)
})
