import { Game, Grid } from '@poor-guy-maker/core'

export class LuxuryTax extends Grid {
  constructor () {
    super('Luxury Tax')
  }

  event (game: Game, p: string): void {
    game.active.at = this
    const player = game.players[p]

    player.assets -= 100
  }
}

export const luxuryTax = new LuxuryTax()
