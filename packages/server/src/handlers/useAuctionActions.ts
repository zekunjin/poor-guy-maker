import { AuctionDTO, SocketEvent } from '@poor-guy-maker/shared'
import { defineSocketHandler, getParams } from '../_utils'

export const useAuctionActions = defineSocketHandler(SocketEvent.AUCTION, (ctx) => {
  if (!ctx.game.auction) { return }
  const params: AuctionDTO = getParams(ctx)
  if (!params) { return }
  ctx.game.auction.onActions[params.action](ctx.game, ctx.player, params.params.price)
})
