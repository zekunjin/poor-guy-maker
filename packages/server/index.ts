import { Server } from 'socket.io'
import consola from 'consola'
import { SERVER_PORT, SocketEvent } from '@poor-guy-maker/shared'
import { Game } from './src/game'

const game = new Game()

const io = new Server({ cors: { origin: '*' } })

io.on('connection', (socket) => {
  const { origin: player } = socket.handshake.headers

  if (!player) { return }

  socket.emit(SocketEvent.GEN_PLAYER, player)
  consola.success(`Player ${player} connected.`)

  socket.on(SocketEvent.JOIN_GAME, () => {
    if (!game) { return }
    game.join(player)
    io.emit(SocketEvent.SYNC_GAME, game)
  })

  socket.on(SocketEvent.START_GAME, () => {
    if (!game) { return }
    game.start(player)
    io.emit(SocketEvent.SYNC_GAME, game)
  })

  socket.on(SocketEvent.ROLL_DICES, () => {
    if (!game) { return }
    game.roll(player)
    io.emit(SocketEvent.SYNC_GAME, game)
  })
})

io.listen(SERVER_PORT)

consola.success(`Running: http://127.0.0.1:${SERVER_PORT}`)
