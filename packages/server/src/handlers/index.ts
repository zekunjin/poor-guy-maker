import { SocketEvent } from 'packages/shared'
import { Socket } from 'socket.io'
import { defineSocketHandler } from '../_utils'
import { io } from '../..'
import { Game } from '../game'

export const useJoinGame = defineSocketHandler(SocketEvent.JOIN_GAME, (_, game, player) => {
  game.join(player)
  io.emit(SocketEvent.SYNC_GAME, game)
})

export const useStartGame = defineSocketHandler(SocketEvent.START_GAME, (_, game, player) => {
  game.start(player)
  io.emit(SocketEvent.SYNC_GAME, game)
})

export const useRollDices = defineSocketHandler(SocketEvent.START_GAME, (_, game, player) => {
  game.roll(player)
  io.emit(SocketEvent.SYNC_GAME, game)
})

export const useEndGame = defineSocketHandler(SocketEvent.END_GAME, (_, game, player) => {
  game.restart()
  io.emit(SocketEvent.SYNC_GAME, game)
})

export const useRestartGame = defineSocketHandler(SocketEvent.END_GAME, (_, game, player) => {
  game.restart()
  io.emit(SocketEvent.SYNC_GAME, game)
})

export const useHandlers = (socket: Socket, game: Game, player: string) => {
  useJoinGame(socket, game, player)
  useStartGame(socket, game, player)
  useRollDices(socket, game, player)
  useEndGame(socket, game, player)
  useRestartGame(socket, game, player)
}
