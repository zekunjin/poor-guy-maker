import consola from 'consola'
import { START_REWARD } from '@poor-guy-maker/shared'
import { Game, Grid } from '@poor-guy-maker/core'

export class Start extends Grid {
  constructor () {
    super('Start')
  }

  event (game: Game, player: string): void {
    game.active.at = this
    this.reward(game, player)
  }

  passbyEvent (game: Game, player: string): void {
    this.reward(game, player)
  }

  reward (game: Game, player: string) {
    const p = game.players[player]
    p.assets += START_REWARD
    consola.info('Player was rewarded 200')
  }
}

export const start = new Start()
