export enum SocketEvent {
  ROLL_DICES = 'roll dices',
  START_GAME = 'start game',
  READY_GAME = 'ready game',
  LEAVE_GAME = 'leave game',
  SYNC_GAME = 'sync game',
  GEN_PLAYER = 'gen player',
  PAUSE_GAME = 'pause game',
  RESTART_GAME = 'restart game',
  NEXT_PLAYER = 'next player',
  SELECT_ACTION = 'select action',
  AUCTION = 'auction',
  GRID_ACTION = 'grid action'
}

export enum GameStatus {
  PENDING,
  PLAYING,
  PAUSE
}

export enum PlayerAction {
  BUY = 'buy',
  AUCTION = 'auction',
  BUILD_HOUSE = 'buildHouse',
  BUILD_HOTEL = 'buildHotel'
}

export enum GridAction {
  PAY_BAIL = 'payBail'
}

export enum AuctionAction {
  BID = 'bid',
  SKIP = 'skip'
}
