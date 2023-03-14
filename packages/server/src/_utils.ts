import { SocketEvent } from '@poor-guy-maker/shared'
import { Socket } from 'socket.io'
import { Game } from '@poor-guy-maker/core'
import { io } from '..'

export interface Context {
  socket: Socket
  game: Game
  player: string
}

export const defineSocketHandler = (key: SocketEvent, event: (context: Context, params: any) => any) => (context: Context) => {
  context.socket.on(key, async (params: any) => {
    if (!context.game) { return }
    const res = await event(context, params)
    if (res) { io.emit(SocketEvent.BROADCAST, res) }
    io.emit(SocketEvent.SYNC_GAME, context.game)
  })
}

export const defineGurad = (setup: (game: Game, player: string) => Promise<boolean>) => (game: Game, player: string) => {
  setup(game, player)
}
