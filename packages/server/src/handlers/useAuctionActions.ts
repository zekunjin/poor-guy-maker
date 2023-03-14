import { AuctionDTO, SocketEvent } from '@poor-guy-maker/shared'
import { Context, defineSocketHandler } from '../_utils'

export const useAuctionActions = defineSocketHandler(SocketEvent.AUCTION, (ctx: Context<AuctionDTO>) => {
  if (!ctx.game.auction) { return }
  if (!ctx.params) { return }
  ctx.game.auction.onActions[ctx.params?.action](ctx.game, ctx.player, ctx.params?.params.price)
})
