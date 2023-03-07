import consola from 'consola'
import { GameStatus } from '@poor-guy-maker/shared'
import { Player } from './player'
import { Grid } from './grid'
import { shuffle } from './_utils'

export class Game {
  public players: Record<string, Player> = {}
  public map: Grid[] = []
  public status = GameStatus.PENDING
  public active?: Player
  public order: string[] = []

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

  start (player: string) {
    consola.success(`Game start by player ${player}.`)
    this.status = GameStatus.PLAYING
    this.order = shuffle(Object.keys(this.players))
  }

  roll (player?: string) {
    if (!this.isPlaying) { return 0 }
    if (!player) { return 0 }

    return this.players[player].roll()
  }

  go (player: string, step: number) {
    const p = this.players[player]
    if (p) { p.go(step) }
  }

  get isPlaying () {
    return this.status === GameStatus.PLAYING
  }
}
