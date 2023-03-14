import { AuctionDTO, SocketEvent } from '@poor-guy-maker/shared'
import { defineSocketHandler } from '../_utils'

export const useAuctionActions = defineSocketHandler(SocketEvent.AUCTION, (ctx, { action, params: { price } }: AuctionDTO) => {
  if (!ctx.game.auction) { return }
  ctx.game.auction.onActions[action](ctx.game, ctx.player, price)
})
