import consola from 'consola'
import { Game } from '../game'

export class Grid {
  public name: string

  constructor (name: string) {
    this.name = name
  }

  event (_game: Game, _player: string) {
    consola.error('Default grid event should be rewriten')
  }
}
