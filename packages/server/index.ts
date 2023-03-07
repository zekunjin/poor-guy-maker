import { Server } from 'socket.io'
import consola from 'consola'
import { SERVER_PORT } from './consts'

const io = new Server({ /* options */ })

io.on('connection', (socket) => {
  consola.success('Socket io connect complete.')
})

io.listen(SERVER_PORT)
consola.success(`Running: http://127.0.0.1:${SERVER_PORT}`)
