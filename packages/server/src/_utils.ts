import { SocketEvent } from '@poor-guy-maker/shared'
import { Socket } from 'socket.io'
import { Game } from './game'

export const shuffle = (array: any[]) => {
  let currentIndex = array.length
  let temporaryValue
  let randomIndex

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex -= 1

    temporaryValue = array[currentIndex]
    array[currentIndex] = array[randomIndex]
    array[randomIndex] = temporaryValue
  }

  return array
}

export const defineSocketHandler = (key: SocketEvent, event: (socket: Socket, game: Game, player: string) => any) => (socket: Socket, game: Game, player: string) => {
  socket.on(key, () => {
    if (!game) { return }
    event(socket, game, player)
  })
}

export const defineGurad = (setup: (game: Game, player: string) => Promise<boolean>) => (game: Game, player: string) => {
  setup(game, player)
}
