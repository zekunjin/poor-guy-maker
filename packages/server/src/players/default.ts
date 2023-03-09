import consola from 'consola'
import { PlayerAction } from '@poor-guy-maker/shared'
import { Dice } from '../dices/default'
import { Game } from '../game'
import { isLand, Land } from '../grids/lands'
import { Grid } from '../grids/grid'
import { Auction } from '../auction'

export class Player {
  public assets = 1500
  public position = 0
  public dices: Dice[] = [new Dice(), new Dice()]
  public actions: PlayerAction[] = [PlayerAction.BUY, PlayerAction.AUCTION]
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
    game.board.grids[this.position % game.board.grids.length]?.event(game)
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

  transfer (game: Game, to: string, num: number) {
    const t = game.players?.[to]
    if (!t) { return }
    t.assets += num
    this.assets -= num
    consola.success(`Player ${to} received ${num} rents.`)
  }

  buy (_: Game, player: string, land?: Land, num?: number) {
    const t = land || this.at
    if (!isLand(t)) { return }
    if (t.owner) { return }

    const price = num ?? t.price

    if (price > this.assets) { return }

    this.assets = this.assets - price
    t.owner = player

    consola.success(`Player ${player} bought the block ${t.name}`)
  }

  auction (game: Game) {
    const grid = game.active.at
    if (!isLand(grid)) { return }
    if (game.auction) { return }
    game.auction = new Auction(game, grid)
  }

  get points () {
    return this.dices.reduce((acc, cur) => acc + cur.points, 0)
  }

  get disabled () {
    return this.assets < 0
  }
}
