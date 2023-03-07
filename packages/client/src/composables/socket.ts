import { ref } from 'vue'
import { io } from 'socket.io-client'
import { SocketEvent, SERVER_PORT } from '@poor-guy-maker/shared'

let socket

export const useSocket = () => {
  const connected = ref(false)
  const player = ref()

  const connect = (host = 'http://127.0.0.1') => {
    socket = io(`${host}:${SERVER_PORT}`)
    socket.on(SocketEvent.GEN_PLAYER, (id) => { player.value = id })
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

  return {
    connected,
    player,
    connect,
    join,
    start,
    roll
  }
}
