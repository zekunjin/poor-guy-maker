import { ref } from 'vue'
import { io } from 'socket.io-client'
import { Action, SERVER_PORT } from '@poor-guy-maker/shared'

let socket

export const useSocket = () => {
  const connected = ref(false)
  const player = ref()

  const connect = () => {
    socket = io(`http://127.0.0.1:${SERVER_PORT}`)
  }

  const rollDice = () => {
    socket && socket.emit(Action.ROLL_DICE)
  }

  return {
    connected,
    player,
    connect,
    rollDice
  }
}
