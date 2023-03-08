import { Game } from '../game'
import { Grid } from './grid'

export class Start extends Grid {
  constructor () {
    super('Start')
  }

  event (game: Game): void {
    game.active.at = this
  }
}
