import { AuctionAction } from 'packages/shared'
import { Game } from './game'
import { Land } from './land'

export interface AuctionHistory {
  price: number
  by: string
}

export class Auction {
  public current = 0
  public players: string[] = []
  public land: Land
  public histories: AuctionHistory[] = []

  public activeIndex = 0

  public onActions: Record<AuctionAction, (game: Game, player: string, num: number) => void> = {
    bid: (_: Game, player: string, num: number) => {
      if (!this.isActive(player)) { return }
      if (this.max >= num) { return }
      this.histories.push({ by: player, price: num })
      this.next()
    },

    skip: (game: Game, player: string) => {
      this.remove(player)
      if (this.players.length > 1) { this.next() }
      const last = this.histories.at(-1)

      if (last && last.by) {
        const p = game.players[last.by]
        p.onActions.buy(game, last.by, this.land, last.price)
      }

      game.auction = undefined
    }
  }

  constructor (game: Game, land: Land) {
    this.land = land
    this.activeIndex = game.activeIndex
    this.players = game.order
  }

  next () {
    this.activeIndex = this.activeIndex + 1

    if (this.activeIndex > this.players.length - 1) {
      this.activeIndex = 0
    }
  }

  remove (player: string) {
    const i = this.players.findIndex(item => item === player)
    i ?? this.players.splice(i, 1)
  }

  isActive (player: string) {
    return player === this.active
  }

  get active () {
    return this.players[this.activeIndex]
  }

  get max () {
    if (!this.histories.length) { return 0 }
    return this.histories.at(-1)!.price
  }
}
