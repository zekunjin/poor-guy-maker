import { Game } from './game'
import { Grid } from './grid'

export class Land extends Grid {
  public price: number
  public owner?: string
  public rent = [16, 16 * 2, 16 * 5]

  constructor (name: string, price: number) {
    super(name)
    this.price = price
  }

  event (game: Game): void {
    game.active.at = this
    if (!this.owner) { return }

    const group = game.board.groups.find(item => item.includes(this.tk)) || []

    const num = game.board.grids.filter((item) => {
      if (!isLand(item)) { return false }
      return group.includes(item.tk) && item.owner === this.owner
    })

    const idx = num.length - 1

    game.active.transfer(game, this.owner, this.rent[idx])
  }
}

export const isLand = (value: any): value is Land => value?.constructor === Land
