import { SocketEvent, ActPlayerDTO } from '@poor-guy-maker/shared'
import { Socket } from 'socket.io'
import consola from 'consola'
import { Game } from '@poor-guy-maker/core'
import { defineSocketHandler, getParams } from '../_utils'
import { useAuctionActions } from './useAuctionActions'
import { useRollDices } from './useRollDices'
import { useGridActions } from './useGridActions'

export const useReadyGame = defineSocketHandler(SocketEvent.READY_GAME, (ctx) => {
  ctx.game.ready(ctx.player)
})

export const useLeaveGame = defineSocketHandler(SocketEvent.LEAVE_GAME, (ctx) => {
  ctx.game.leave(ctx.player)
})

export const useStartGame = defineSocketHandler(SocketEvent.START_GAME, (ctx) => {
  ctx.game.start(ctx.player)
})

export const useEndGame = defineSocketHandler(SocketEvent.PAUSE_GAME, (ctx) => {
  ctx.game.pause(ctx.player)
})

export const useRestartGame = defineSocketHandler(SocketEvent.RESTART_GAME, (ctx) => {
  ctx.game.restart(ctx.player)
})

export const useNextPlayer = defineSocketHandler(SocketEvent.NEXT_PLAYER, (ctx) => {
  ctx.game.next()
})

export const useSelectAction = defineSocketHandler(SocketEvent.SELECT_ACTION, (ctx) => {
  const params: ActPlayerDTO = getParams(ctx)
  const act = ctx.game.players[ctx.player].onActions
  if (!params) { return }
  if (!act?.[params.action]) { consola.error(`Do not have action named ${params.action}`) }
  act[params.action](ctx.game, ctx.player, params.params)
})

export const useHandlers = (socket: Socket, game: Game, player: string) => {
  const ctx = { socket, game, player }
  useReadyGame(ctx)
  useLeaveGame(ctx)
  useStartGame(ctx)
  useRollDices(ctx)
  useEndGame(ctx)
  useRestartGame(ctx)
  useNextPlayer(ctx)
  useSelectAction(ctx)
  useAuctionActions(ctx)
  useGridActions(ctx)
}
