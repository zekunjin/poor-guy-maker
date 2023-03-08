export enum SocketEvent {
  ROLL_DICES = 'roll dices',
  START_GAME = 'start game',
  JOIN_GAME = 'join game',
  LEAVE_GAME = 'leave game',
  SYNC_GAME = 'sync game',
  GEN_PLAYER = 'gen player',
  PAUSE_GAME = 'pause game',
  RESTART_GAME = 'restart game',
  NEXT_PLAYER = 'next player',
  SELECT_ACTION = 'select action'
}

export enum GameStatus {
  PENDING,
  PLAYING,
  PAUSE
}

export enum PlayerAction {
  BUY = 'buy',
  AUCTION = 'auction',
  BID = 'bid'
}
