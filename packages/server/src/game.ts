import consola from 'consola'
import { GameStatus } from '@poor-guy-maker/shared'
import { Player } from './players/default'
import { Grid } from './grids/grid'
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
    if (this.isPlaying) { return }
    if (!this.players.length) { return }
    consola.success(`Game started by player ${player}.`)
    this.status = GameStatus.PLAYING
    this.order = shuffle(Object.keys(this.players))
  }

  roll (player: string) {
    if (!this.isPlaying) { return 0 }
    consola.success(`Player ${player} roll dices.`)
    return this.players[player]?.roll(this, player)
  }

  go (player: string, steps: number) {
    const p = this.players[player]
    if (!p) { return }
    p.go(steps)
    consola.success(`Player ${player} move ${steps} steps.`)
  }

  end (player: string) {
    this.status = GameStatus.END
    consola.success(`Game ended by player ${player}.`)
  }

  restart (player: string) {
    if (this.status !== GameStatus.END) { return }
    this.status = GameStatus.PENDING
    this.players = {}
    consola.success(`Game restarted by player ${player}.`)
  }

  get isPlaying () {
    return this.status === GameStatus.PLAYING
  }
}
