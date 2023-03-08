import { Game } from '../game'
import { Grid } from './grid'

export class Go extends Grid {
  constructor () {
    super('go')
  }

  event (game: Game): void {
    game.active.at = this
  }
}
