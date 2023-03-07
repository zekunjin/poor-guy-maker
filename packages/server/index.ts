import { Server } from 'socket.io'
import consola from 'consola'
import { SERVER_PORT, SocketEvent } from '@poor-guy-maker/shared'
import { Game } from './src/game'
import { useHandlers } from './src/handlers'

export const game = new Game()

export const io = new Server({ cors: { origin: '*' } })

io.on('connection', (socket) => {
  const { client } = socket.handshake.query
  const player = client as string

  if (!player) { return }

  socket.emit(SocketEvent.SYNC_GAME, game)
  consola.success(`Player ${player} connected.`)

  useHandlers(socket, game, player)
})

io.listen(SERVER_PORT)

consola.success(`Running: http://127.0.0.1:${SERVER_PORT}`)
