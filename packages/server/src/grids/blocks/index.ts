import { Game } from '../../game'
import { Player } from '../../players/default'
import { Grid } from '../grid'

export class Block extends Grid {
  public price: number
  public owner?: Player

  constructor (name: string, price: number) {
    super(name)
    this.price = price
  }

  event (game: Game, player: string): void {
    game.players[player]?.action(game, this)
  }
}

export const isBlock = (value: any): value is Block => value?.constructor === Block
