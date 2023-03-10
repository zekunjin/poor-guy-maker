import consola from 'consola'
import { Game, Grid } from '@poor-guy-maker/core'
import { jail, Jail } from './jail'

export class PoliceStation extends Grid {
  public jail: Jail

  constructor (jail: Jail) {
    super('Police Station')
    this.jail = jail
  }

  event (game: Game, p: string): void {
    const player = game.players[p]
    player.position = game.board.grids.findIndex(({ tk }) => tk === this.jail.tk)
    player.at = game.board.grids[player.position]
    player.inJail = true
    consola.info(`Player ${p} go to jail.`)
  }
}

export const policeStation = new PoliceStation(jail)
