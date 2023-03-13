import { Board } from '@poor-guy-maker/core'
import { chance } from '../grids/chance'
import { communityChest } from '../grids/communitChest'
import { incomeTax } from '../grids/incomeTax'
import { jail } from '../grids/jail'
import { electricCompany } from '../grids/lands/electricCompany'
import { parking } from '../grids/parking'
import { start } from '../grids/start'
import { policeStation } from '../grids/policeStation'
import * as lands from '../grids/lands'
import { luxuryTax } from '../grids/luxuryTax'

export class Classic extends Board {
  public grids = [
    start,
    lands.mediterRaneanAvenue,
    communityChest,
    lands.balticAvenue,
    incomeTax,
    lands.readingRailroad,
    lands.orientalAvenue,
    chance,
    lands.vermontAvenue,
    lands.connecticutAvenue,
    jail,
    lands.stCharlesPlace,
    electricCompany,
    lands.statesAvenue,
    lands.virginiaAvenue,
    lands.pennsylvaniaRailroad,
    lands.stJamesPlace,
    communityChest,
    lands.tennesseeAvenue,
    lands.newYorkAvenue,
    parking,
    lands.kentuckyAvenue,
    chance,
    lands.indianaAvenue,
    lands.illinoisAvenue,
    lands.bAndORailroad,
    lands.atlanticAvenue,
    lands.ventnorAvenue,
    lands.waterWorks,
    lands.marvinGardens,
    policeStation,
    lands.pacificAvenue,
    lands.northCarolinaAvenue,
    communityChest,
    lands.pennsylvaniaAvenue,
    lands.shortLine,
    chance,
    lands.parkPlace,
    luxuryTax,
    lands.boardWalk
  ]

  public groups = [
    [lands.mediterRaneanAvenue.tk, lands.balticAvenue.tk],
    [lands.orientalAvenue.tk, lands.vermontAvenue.tk, lands.connecticutAvenue.tk],
    [lands.stCharlesPlace.tk, lands.statesAvenue.tk, lands.virginiaAvenue.tk],
    [lands.stJamesPlace.tk, lands.tennesseeAvenue.tk, lands.newYorkAvenue.tk],
    [lands.indianaAvenue.tk, lands.illinoisAvenue.tk],
    [lands.atlanticAvenue.tk, lands.ventnorAvenue.tk, lands.marvinGardens.tk],
    [lands.pacificAvenue.tk, lands.northCarolinaAvenue.tk, lands.pennsylvaniaAvenue.tk],
    [lands.parkPlace.tk, lands.boardWalk.tk]
  ]
}

export const classic = new Classic()
