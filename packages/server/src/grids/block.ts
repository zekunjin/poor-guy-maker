import { Player } from '../players/default'
import { Grid } from './grid'

export class Block extends Grid {
  public name: string
  public price: number
  public owner?: Player

  constructor (name: string, price: number) {
    super()
    this.name = name
    this.price = price
  }
}
