import { Game, Grid } from '@poor-guy-maker/core'

export class IncomeTax extends Grid {
  constructor () {
    super('Income Tax')
  }

  event (game: Game, p: string): void {
    game.active.at = this
    const player = game.players[p]

    player.assets -= 200
  }
}

export const incomeTax = new IncomeTax()
