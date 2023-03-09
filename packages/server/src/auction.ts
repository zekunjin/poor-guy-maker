import { Game } from './game'
import { Land } from './grids/lands'

export class Auction {
  public current = 0
  public players: string[] = []
  public land: Land

  public activeIndex = 0

  constructor (game: Game, land: Land) {
    this.land = land
    this.activeIndex = game.activeIndex
    this.players = game.order
  }

  bid (_: Game, player: string, num: number) { }

  skip (_: Game, player: string) {}
}
