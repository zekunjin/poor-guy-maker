import consola from 'consola'
import { isDice } from '../dices/default'
import { Game } from '../game'
import { Player } from '../players/default'
import { Grid } from './grid'

export class Jail extends Grid {
  constructor () {
    super('Jail')
  }

  event (game: Game): void {
    game.active.at = this
  }

  afterRoll (_: Game, player: Player): Promise<boolean> {
    if (!player.inJail) { return Promise.resolve(true) }
    if (player.releaseRounds < player.rounds) { return Promise.resolve(true) }

    const dices = player.dices.filter(dice => isDice(dice))
    if (dices.length < 2) { return Promise.resolve(true) }
    const isSame = dices.every(({ points }) => points === dices[0].points)

    if (isSame) {
      player.inJail = false
      consola.info('Current player get out of jail')
    }

    return Promise.resolve(isSame)
  }
}
