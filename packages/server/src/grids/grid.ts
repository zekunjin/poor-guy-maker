import { nanoid } from 'nanoid'
import consola from 'consola'
import { Game } from '../game'
import { Player } from '../players/default'

export class Grid {
  public tk: string
  public name: string

  constructor (name: string) {
    this.tk = nanoid()
    this.name = name
  }

  event (_game: Game, _player: string) {
    consola.error('Default grid event should be rewritten')
  }

  passbyEvent (_game: Game, _player: string) {}

  beforeRoll (_game: Game, _player: Player) {
    return Promise.resolve(true)
  }

  afterRoll (_game: Game, _player: Player) {
    return Promise.resolve(true)
  }
}
