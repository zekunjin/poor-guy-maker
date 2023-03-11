import { AuctionDTO, SocketEvent } from '@poor-guy-maker/shared'
import { defineSocketHandler } from '../_utils'
import { io } from '../..'

export const useAuctionActions = defineSocketHandler(SocketEvent.AUCTION, (_, game, player, { action, params: { price } }: AuctionDTO) => {
  if (!game.auction) { return }
  game.auction.onActions[action](game, player, price)
  io.emit(SocketEvent.SYNC_GAME, game)
})
