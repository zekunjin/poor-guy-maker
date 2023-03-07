import { Dice } from '../dices/default'
import { Game } from '../game'

export class Player {
  public assets = 0
  public position = 0
  public dices: Dice[] = [new Dice(), new Dice()]

  private _remainingTimes = 1

  roll (game: Game, player: string) {
    if (!this._remainingTimes) { return }

    this.dices.forEach(dice => dice.roll(game, player))
    this._remainingTimes = this._remainingTimes - 1
    return this.points
  }

  move (step: number) {
    this.position = this.position + step
  }

  next () {
    if (this._remainingTimes) { return false }

    this._remainingTimes = 1
    return true
  }

  get points () {
    return this.dices.reduce((acc, cur) => acc + cur.points, 0)
  }
}
