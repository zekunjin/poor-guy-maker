import { randomInt } from '../../utils'
import { Game } from '../game'

export class Dice {
  public points = 0

  roll (game: Game, player: string) {
    const p = game.players[player]
    if (!p) { return }
    this.points = randomInt(1, 6)
    p.move(this.points)
  }
}
