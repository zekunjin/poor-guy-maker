import { SocketEvent } from '@poor-guy-maker/shared'
import { Socket } from 'socket.io'
import { Game } from '@poor-guy-maker/core'

export const defineSocketHandler = (key: SocketEvent, event: (socket: Socket, game: Game, player: string, params: any) => any) => (socket: Socket, game: Game, player: string) => {
  socket.on(key, (params: any) => {
    if (!game) { return }
    event(socket, game, player, params)
  })
}

export const defineGurad = (setup: (game: Game, player: string) => Promise<boolean>) => (game: Game, player: string) => {
  setup(game, player)
}
