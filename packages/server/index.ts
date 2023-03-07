import { Server } from 'socket.io'
import consola from 'consola'
import { SERVER_PORT, SocketEvent } from '@poor-guy-maker/shared'
import { Game } from './src/game'

let game: Game

const io = new Server({ cors: { origin: '*' } })

io.on('connection', (socket) => {
  consola.success('Connect complete.')

  socket.on(SocketEvent.START_GAME, () => { game = new Game() })

  socket.on(SocketEvent.JOIN_GAME, (id: string) => {
    if (!game) { return }
    game.join(id)
  })

  socket.on(SocketEvent.ROLL_DICES, () => {
    if (!game) { return }

    game.roll()
    socket.broadcast.emit(SocketEvent.ROLL_DICES, game.points)
  })
})

io.listen(SERVER_PORT)
consola.success(`Running: http://127.0.0.1:${SERVER_PORT}`)
