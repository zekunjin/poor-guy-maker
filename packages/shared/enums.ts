export enum SocketEvent {
  ROLL_DICES = 'roll dices',
  START_GAME = 'start game',
  JOIN_GAME = 'join game',
  SYNC_GAME = 'sync game',
  GEN_PLAYER = 'gen player',
  END_GAME = 'end game',
  RESTART_GAME = 'restart game'
}

export enum GameStatus {
  PENDING,
  PLAYING,
  END
}
