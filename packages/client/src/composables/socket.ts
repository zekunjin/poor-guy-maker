import { ref } from 'vue'
import { io } from 'socket.io-client'
import { SocketEvent, SERVER_PORT } from '@poor-guy-maker/shared'

let socket

export const useSocket = () => {
  const connected = ref(false)
  const player = ref()

  const connect = () => {
    socket = io(`http://127.0.0.1:${SERVER_PORT}`)
    socket.on('connect', () => { player.value = socket.id })
  }

  const join = () => {
    socket.on(SocketEvent.JOIN_GAME, player.value)
  }

  const rollDice = () => {
    if (!socket) { return }
    socket.emit(SocketEvent.ROLL_DICES)
  }

  return {
    connected,
    player,
    connect,
    join,
    rollDice
  }
}
