import consola from 'consola'
import { PlayerAction } from '@poor-guy-maker/shared'
import { Dice } from '../dices/default'
import { Game } from '../game'
import { isBlock } from '../grids/blocks'
import { Grid } from '../grids/grid'

export class Player {
  public assets = 1500
  public position = 0
  public dices: Dice[] = [new Dice(), new Dice()]
  public actions: PlayerAction[] = [PlayerAction.BUY, PlayerAction.AUCTION, PlayerAction.BID]
  public at?: Grid

  private _remainingTimes = 1

  roll (game: Game, player: string) {
    if (!this._remainingTimes) { return }
    this.dices.forEach(dice => dice.roll())
    this._remainingTimes = this._remainingTimes - 1
    this.afterRoll(game, player, this.points)
    return this.points
  }

  afterRoll (game: Game, player: string, steps: number) {
    this.move(player, steps)
    game.grids[this.position % game.grids.length]?.event(game, player)
  }

  move (player: string, steps: number) {
    this.position = this.position + steps
    consola.success(`Player ${player} moved ${steps} steps`)
  }

  next () {
    if (this._remainingTimes) { return false }

    this._remainingTimes = 1
    return true
  }

  buy (_: Game, player: string) {
    if (!isBlock(this.at)) { return }
    if (this.at.owner) { return }
    if (this.at.price > this.assets) { return }

    this.assets = this.assets - this.at.price
    this.at.owner = player

    consola.success(`Player ${player} bought block ${this.at.name}`)
  }

  auction (_: Game, grid: Grid) { }

  bid (_: Game, grid: Grid) {}

  get points () {
    return this.dices.reduce((acc, cur) => acc + cur.points, 0)
  }

  get disabled () {
    return this.assets < 0
  }
}
