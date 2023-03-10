import consola from 'consola'
import { JAIL_BAIL, JAIL_ROUNDS, PlayerAction } from '@poor-guy-maker/shared'
import { Dice } from '../dices/default'
import { Game } from '../game'
import { isLand, Land } from '../grids/lands'
import { Grid } from '../grids/grid'
import { Auction } from '../auction'

export class Player {
  public assets = 1500
  public steps = 0
  public position = 0
  public rounds = 0
  public releaseRounds = 0
  public dices: Dice[] = [new Dice(), new Dice()]
  public actions: PlayerAction[] = [PlayerAction.BUY, PlayerAction.AUCTION]
  public at?: Grid

  private _inJail = false
  private _remainingTimes = 1

  public onActions: Record<PlayerAction, (game: Game, player: string, land?: Land, num?: number) => void> = {
    buy: (_: Game, player: string, land?: Land, num?: number) => {
      const t = land || this.at
      if (!isLand(t)) { return }
      if (t.owner) { return }

      const price = num ?? t.price

      if (price > this.assets) { return }

      this.assets = this.assets - price
      t.owner = player

      consola.success(`Player ${player} bought the land ${t.name}`)
    },

    auction: (game: Game) => {
      const grid = game.active.at
      if (!isLand(grid)) { return }
      if (game.auction) { return }
      game.auction = new Auction(game, grid)
    }
  }

  beforeRoll (game: Game, _player: string) {
    return this.at?.beforeRoll(game, this)
  }

  async roll (game: Game, player: string) {
    if (!this._remainingTimes) { return }
    const valid = await this.beforeRoll(game, player)
    if (!valid) { return }
    this.dices.forEach(dice => dice.roll())

    this.rounds++
    this._remainingTimes--

    this.afterRoll(game, player, this.points)
    return this.points
  }

  async afterRoll (game: Game, player: string, steps: number) {
    const valid = await this.at?.afterRoll(game, this)
    if (!valid) { return }
    this.move(game, player, steps)
    this.getGrid(game)?.event(game, player)
  }

  move (game: Game, player: string, steps: number) {
    let i = 1
    while (i < steps) {
      this.steps++
      this.position = (this.position + 1) % game.board.grids.length
      this.getGrid(game)?.passbyEvent(game, player)
      i++
    }
    this.steps++
    this.position = (this.position + 1) % game.board.grids.length

    consola.info(`Player ${player} moved ${steps} steps`)
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

  getGrid (game: Game) {
    return game.board.grids[this.position]
  }

  payBail () {
    this.assets -= JAIL_BAIL
  }

  get points () {
    return this.dices.reduce((acc, cur) => acc + cur.points, 0)
  }

  get disabled () {
    return this.assets < 0
  }

  get inJail () {
    return this._inJail
  }

  set inJail (value) {
    if (value) { this.releaseRounds = this.rounds + JAIL_ROUNDS }
    this._inJail = value
  }
}
