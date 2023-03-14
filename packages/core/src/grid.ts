import { nanoid } from 'nanoid'
import consola from 'consola'
import { GridAction } from '@poor-guy-maker/shared'
import { Game } from './game'
import { Player } from './player'

export class Grid {
  public tk: string
  public name: string
  public actions: GridAction[] = []
  public description = ''
  public onActions: Partial<Record<GridAction, any>> = {}

  constructor (name: string) {
    this.tk = nanoid()
    this.name = name
  }

  event (game: Game, _player: string) {
    game.active.at = this
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
