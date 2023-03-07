import { GameStatus } from 'packages/shared'
import { Area } from './area'
import { Dice } from './dice'
import { Player } from './player'

export class Game {
  public players: Player[] = []
  public map: Area[] = []
  public dices: Dice[] = [new Dice()]
  public status = GameStatus.PENDING

  join (player: string) {
    this.players.push(new Player(player))
  }

  roll () {
    this.dices.forEach((dice) => { dice.roll() })
  }

  go (player: string, step: number) {
    const p = this.players.find(({ token }) => token === player)
    if (!p) { return }
    p.position = p.position + step
  }

  get points () {
    return this.dices.reduce((acc, cur) => acc + cur.points, 0)
  }
}
