import { randomInt } from '../../utils'

export class Dice {
  public points = 0

  roll () {
    this.points = randomInt(1, 6)
  }
}

export const isDice = (value: any): value is Dice => value?.constructor === Dice
