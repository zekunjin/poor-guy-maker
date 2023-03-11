import { AuctionAction, PlayerAction } from './enums'

export interface BuyLandDTO {
  land: string
  price: number
}

export interface ActPlayerDTO {
  action: PlayerAction,
  params: any
}

export interface BuildHouseDTO {
  land: string
}

export interface AuctionDTO {
  action: AuctionAction,
  params: any
}
