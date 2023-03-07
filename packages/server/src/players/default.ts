import { Dice } from '../dices/default'
import { Game } from '../game'

export class Player {
  public assets = 0
  public position = 0
  public dices: Dice[] = [new Dice(), new Dice()]

  roll (game: Game, player: string) {
    this.dices.forEach(dice => dice.roll(game, player))
    return this.points
  }

  go (step: number) {
    this.position = this.position + step
  }

  get points () {
    return this.dices.reduce((acc, cur) => acc + cur.points, 0)
  }
}
