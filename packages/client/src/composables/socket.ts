import { ref } from 'vue'
import { nanoid } from 'nanoid'
import { io, Socket } from 'socket.io-client'
import { SocketEvent, SERVER_PORT, CLIENT_ID_KEY } from '@poor-guy-maker/shared'

let socket: Socket

export const useSocket = () => {
  const connected = ref(false)
  const game = ref({})

  const player = ref((() => {
    const id = localStorage.getItem(CLIENT_ID_KEY)
    if (id) { return id }

    const client = nanoid()
    if (!id) { localStorage.setItem(CLIENT_ID_KEY, client) }
    return client
  })())

  const connect = (host = 'http://127.0.0.1') => {
    socket = io(`${host}:${SERVER_PORT}`, { query: { client: player.value } })
    socket.on(SocketEvent.SYNC_GAME, (g) => { game.value = g })
  }

  const start = () => {
    socket.emit(SocketEvent.START_GAME)
  }

  const join = () => {
    socket.emit(SocketEvent.JOIN_GAME)
  }

  const roll = () => {
    if (!socket) { return }
    socket.emit(SocketEvent.ROLL_DICES)
  }

  const end = () => {
    if (!socket) { return }
    socket.emit(SocketEvent.END_GAME)
  }

  const restart = () => {
    if (!socket) { return }
    socket.emit(SocketEvent.RESTART_GAME)
  }

  return {
    connected,
    player,
    game,
    connect,
    join,
    start,
    roll,
    end,
    restart
  }
}
