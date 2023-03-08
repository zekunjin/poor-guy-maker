import { Game } from '../../game'
import { Grid } from '../grid'

export class Block extends Grid {
  public price: number
  public owner?: string

  constructor (name: string, price: number) {
    super(name)
    this.price = price
  }

  event (game: Game): void {
    game.active.at = this
  }
}

export const isBlock = (value: any): value is Block => value?.constructor === Block
