import { Board } from '@poor-guy-maker/core'
import { start } from '../grids/start'
import { jail } from '../grids/jail'
import { policeStation } from '../grids/policeStation'
import { beijing, shanghai } from '../grids/lands'

export class China extends Board {
  public grids = [
    start,
    shanghai,
    jail,
    beijing,
    policeStation
  ]

  public groups = [
    [start.tk],
    [jail.tk],
    [shanghai.tk, beijing.tk]
  ]
}
