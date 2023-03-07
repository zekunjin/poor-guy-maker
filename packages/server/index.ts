import { Server } from 'socket.io'
import consola from 'consola'
import { Action, SERVER_PORT } from '@poor-guy-maker/shared'
import { randomInt } from './utils'

const io = new Server({ cors: { origin: '*' } })

io.on('connection', (socket) => {
  consola.success('Client connect complete.')

  socket.on(Action.ROLL_DICE, () => {
    console.log('dice: ' + randomInt(1, 6))
  })
})

io.listen(SERVER_PORT)
consola.success(`Running: http://127.0.0.1:${SERVER_PORT}`)
