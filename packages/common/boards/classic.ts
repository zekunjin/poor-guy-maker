import { Board } from '@poor-guy-maker/core'
import { communityChest } from '../grids/communitChest'
import { incomeTax } from '../grids/incomeTax'
import { balticAvenue, mediterRaneanAvenue, orientalAvenue, readingRailroad } from '../grids/lands'
import { start } from '../grids/start'

export class Classic extends Board {
  public grids = [
    start,
    mediterRaneanAvenue,
    communityChest,
    balticAvenue,
    incomeTax,
    readingRailroad,
    orientalAvenue
  ]

  public groups = [
    [start.tk],
    [mediterRaneanAvenue.tk, balticAvenue.tk],
    [orientalAvenue.tk]
  ]
}

export const classic = new Classic()
