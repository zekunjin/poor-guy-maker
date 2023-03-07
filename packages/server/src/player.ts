import { Dice } from './dice'

export class Player {
  public position = 0
  public dices: Dice[] = [new Dice()]

  roll () {
    this.dices.forEach(dice => dice.roll())
    return this.points
  }

  go (step: number) {
    this.position = this.position + step
  }

  get points () {
    return this.dices.reduce((acc, cur) => acc + cur.points, 0)
  }
}
