import { SocketEvent, ActPlayerDTO } from '@poor-guy-maker/shared'
import { Socket } from 'socket.io'
import consola from 'consola'
import { Game } from '@poor-guy-maker/core'
import { defineSocketHandler } from '../_utils'
import { io } from '../..'
import { useAuctionActions } from './useAuctionActions'
import { useRollDices } from './useRollDices'
import { useGridActions } from './useGridActions'

export const useReadyGame = defineSocketHandler(SocketEvent.READY_GAME, (_, game, player) => {
  game.ready(player)
  io.emit(SocketEvent.SYNC_GAME, game)
})

export const useLeaveGame = defineSocketHandler(SocketEvent.LEAVE_GAME, (_, game, player) => {
  game.leave(player)
  io.emit(SocketEvent.SYNC_GAME, game)
})

export const useStartGame = defineSocketHandler(SocketEvent.START_GAME, (_, game, player) => {
  game.start(player)
  io.emit(SocketEvent.SYNC_GAME, game)
})

export const useEndGame = defineSocketHandler(SocketEvent.PAUSE_GAME, (_, game, player) => {
  game.pause(player)
  io.emit(SocketEvent.SYNC_GAME, game)
})

export const useRestartGame = defineSocketHandler(SocketEvent.RESTART_GAME, (_, game, player) => {
  game.restart(player)
  io.emit(SocketEvent.SYNC_GAME, game)
})

export const useNextPlayer = defineSocketHandler(SocketEvent.NEXT_PLAYER, (_, game) => {
  game.next()
  io.emit(SocketEvent.SYNC_GAME, game)
})

export const useSelectAction = defineSocketHandler(SocketEvent.SELECT_ACTION, (_, game, player, dto: ActPlayerDTO) => {
  const act = game.players[player].onActions
  if (!act?.[dto.action]) { consola.error(`Do not have action named ${dto.action}`) }
  act[dto.action](game, player, dto.params)
  io.emit(SocketEvent.SYNC_GAME, game)
})

export const useHandlers = (socket: Socket, game: Game, player: string) => {
  useReadyGame(socket, game, player)
  useLeaveGame(socket, game, player)
  useStartGame(socket, game, player)
  useRollDices(socket, game, player)
  useEndGame(socket, game, player)
  useRestartGame(socket, game, player)
  useNextPlayer(socket, game, player)
  useSelectAction(socket, game, player)
  useAuctionActions(socket, game, player)
  useGridActions(socket, game, player)
}
