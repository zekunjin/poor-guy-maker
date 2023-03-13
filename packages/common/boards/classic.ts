import { Board } from '@poor-guy-maker/core'
import { chance } from '../grids/chance'
import { communityChest } from '../grids/communitChest'
import { incomeTax } from '../grids/incomeTax'
import { jail } from '../grids/jail'
import { balticAvenue, connecticutAvenue, mediterRaneanAvenue, newYorkAvenue, orientalAvenue, pennsylvaniaRailroad, readingRailroad, statesAvenue, stCharlesPlace, stJamesPlace, tennesseeAvenue, vermontAvenue, virginiaAvenue } from '../grids/lands'
import { electricCompany } from '../grids/lands/electricCompany'
import { parking } from '../grids/parking'
import { start } from '../grids/start'

export class Classic extends Board {
  public grids = [
    start,
    mediterRaneanAvenue,
    communityChest,
    balticAvenue,
    incomeTax,
    readingRailroad,
    orientalAvenue,
    chance,
    vermontAvenue,
    connecticutAvenue,
    jail,
    stCharlesPlace,
    electricCompany,
    statesAvenue,
    virginiaAvenue,
    pennsylvaniaRailroad,
    stJamesPlace,
    communityChest,
    tennesseeAvenue,
    newYorkAvenue,
    parking
  ]

  public groups = [
    [mediterRaneanAvenue.tk, balticAvenue.tk],
    [orientalAvenue.tk, vermontAvenue.tk, connecticutAvenue.tk],
    [stCharlesPlace.tk, statesAvenue.tk, virginiaAvenue.tk],
    [stJamesPlace.tk, tennesseeAvenue.tk, newYorkAvenue.tk]
  ]
}

export const classic = new Classic()
