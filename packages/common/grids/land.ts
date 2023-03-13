import { Game, Grid } from '@poor-guy-maker/core'

export class Land extends Grid {
  public price: number
  public owner?: string
  public rent = 30

  public housesRent = [90, 250, 700, 875]
  public hotelsRent = [1050]

  public houses = 0
  public hotels = 0

  public housesCost = 50
  public hotelsCost = 50

  constructor (name: string, price: number) {
    super(name)
    this.price = price
  }

  event (game: Game, p: string): void {
    const player = game.players[p]

    game.active.at = this
    if (!this.owner) { return }

    player.transfer(game, this.owner, this._getRentCosts(game))
  }

  _getRentCosts (game: Game) {
    if (this.hotels) { return this.hotelsRent[this.hotels - 1] }
    if (this.houses) { return this.housesRent[this.houses - 1] }

    const group = game.board.groups.find(item => item.includes(this.tk)) || []

    const owns = game.board.grids.filter((item) => {
      if (!isLand(item)) { return false }
      return group.includes(item.tk) && item.owner === this.owner
    })

    const isDouble = group.length === owns.length ? 2 : 1

    return this.rent * isDouble
  }
}

export const isLand = (value: any): value is Land => value?.constructor === Land
