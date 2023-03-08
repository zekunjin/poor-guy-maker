import consola from 'consola'
import { GameStatus } from '@poor-guy-maker/shared'
import { Player } from './players/default'
import { shuffle } from './_utils'
import { China } from './boards/china'

export class Game {
  public players: Record<string, Player> = {}
  public status = GameStatus.PENDING
  public order: string[] = []
  public rounds = 0

  public board = new China()

  private _activeIndex = 0

  join (player?: string) {
    if (!player) { return }

    if (this.isPlaying) {
      consola.warn(`Game has already started, player ${player} cannot join.`)
      return
    }

    if (this.players[player]) { return }

    this.players[player] = new Player()
    consola.success(`Player ${player} join the game.`)
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
    consola.success(`Game started by player ${player}.`)
    this.status = GameStatus.PLAYING
    this.order = shuffle(keys)
  }

  roll (player: string) {
    if (!this.isPlaying) { return }
    if (!this.isActive(player)) { return }

    consola.success(`Player ${player} roll dices.`)
    this.players[player]?.roll(this, player)
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
    this._activeIndex = 0
    consola.success(`Game restarted by player ${player}.`)
  }

  next () {
    if (!this.isActive) { return }
    if (!this.active.next()) { return }

    this._activeIndex = this._activeIndex + 1

    if (this._activeIndex > this.order.length - 1) {
      this._activeIndex = 0
      this.rounds = this.rounds + 1
    }
  }

  isActive (player: string) {
    return this.order[this._activeIndex] === player
  }

  get isPlaying () {
    return this.status === GameStatus.PLAYING
  }

  get active () {
    const tk = this.order[this._activeIndex]
    return this.players[tk]
  }
}
