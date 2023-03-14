import { SocketEvent } from '@poor-guy-maker/shared'
import { Socket } from 'socket.io'
import { Game } from '@poor-guy-maker/core'
import { io } from '..'

export interface Context {
  socket: Socket
  game: Game
  player: string
  params?: any
}

export const defineSocketHandler = (key: SocketEvent, event: (context: Context) => any) => (context: Context) => {
  context.socket.on(key, async (params: any) => {
    if (!context.game) { return }
    if (params) { context.params = params }
    const res = await event(context)
    if (res) { io.emit(SocketEvent.BROADCAST, res) }
    io.emit(SocketEvent.SYNC_GAME, context.game)
  })
}

export const getParams = (ctx: Context) => {
  return ctx.params || {}
}

export const defineGurad = (setup: (game: Game, player: string) => Promise<boolean>) => (game: Game, player: string) => {
  setup(game, player)
}
