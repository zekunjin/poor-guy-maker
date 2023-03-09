import { AuctionEvent, SocketEvent } from '@poor-guy-maker/shared'
import { defineSocketHandler } from '../_utils'
import { io } from '../..'

export interface AuctionDTO {
  event: AuctionEvent
  num?: number
}

export const useAuction = defineSocketHandler(SocketEvent.AUCTION, (_, game, player, { event, num }: AuctionDTO) => {
  if (!game.auction) { return }
  (game.auction as any)[event](game, player, num)
  io.emit(SocketEvent.SYNC_GAME, game)
})
