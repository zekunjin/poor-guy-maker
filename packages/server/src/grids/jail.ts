import { PlayerDynamicAction } from 'packages/shared'
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
    const dices = player.dices.filter(dice => isDice(dice))
    if (dices.length < 2) { return Promise.resolve(true) }
    const isSame = dices.every(({ points }) => points === dices[0].points)

    if (isSame) {
      player.dynamicActions.delete(PlayerDynamicAction.PAY_BAIL)
      player.dynamicActions.delete(PlayerDynamicAction.CANCEL)
    }

    return Promise.resolve(isSame)
  }
}
