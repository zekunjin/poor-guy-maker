import consola from 'consola'
import { GameStatus } from '@poor-guy-maker/shared'
import { Player } from './player'
import { shuffle } from './_utils'
import { Board } from './board'
import { Auction } from './auction'
import { Chess } from './chess'

export class Game {
  public players: Record<string, Player> = {}
  public status = GameStatus.PENDING
  public order: string[] = []
  public rounds = 0
  public auction?: Auction
  public chesses: Chess[] = []

  public board = new Board()

  public activeIndex = 0

  constructor (board: Board) {
    this.board = board
  }

  ready (player: string) {
    if (!player) { return }

    if (this.isPlaying) {
      consola.warn('Game has already started.')
      return
    }

    if (this.players[player]) { return }

    this.players[player] = new Player(this.chesses.pop())
    consola.success(`Player ${player} is ready.`)
  }

  leave (player: string) {
    if (this.isPlaying) {
      consola.warn(`Game has already started, player ${player} cannot leave.`)
      return
    }

    if (!this.players[player]) { return }
    delete this.players[player]
    consola.info(`Player ${player} leave the game.`)
  }

  start (player: string) {
    if (this.isPlaying) { return }
    const keys = Object.keys(this.players)
    if (!keys.length) { return }
    consola.info(`Game started by player ${player}.`)

    this.status = GameStatus.PLAYING
    this.order = shuffle(keys)

    Object.values(this.players).forEach((player) => {
      player.at = this.board.grids[0]
    })
  }

  async roll (player: string) {
    if (!this.isPlaying) { return }
    if (!this.isActive(player)) { return }

    consola.info(`Player ${player} roll dices.`)
    await this.players[player]?.roll(this, player)
  }

  pause (player: string) {
    this.status = GameStatus.PAUSE
    consola.success(`Game ended by player ${player}.`)
  }

  restart (player: string) {
    if (this.status !== GameStatus.PAUSE) { return }
    this.status = GameStatus.PENDING
    this.players = {}
    this.rounds = 0
    this.activeIndex = 0
    this.auction = undefined
    consola.success(`Game restarted by player ${player}.`)
  }

  next () {
    if (!this.isActive) { return }
    if (!this.active?.next()) { return }

    this.activeIndex = this.activeIndex + 1

    if (this.activeIndex > this.order.length - 1) {
      this.activeIndex = 0
      this.rounds = this.rounds + 1
    }
  }

  isActive (player: string) {
    return this.order[this.activeIndex] === player
  }

  get isPlaying () {
    return this.status === GameStatus.PLAYING
  }

  get active () {
    const tk = this.order[this.activeIndex]
    return this.players[tk]
  }
}
