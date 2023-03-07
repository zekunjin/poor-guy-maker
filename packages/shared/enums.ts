export enum SocketEvent {
  ROLL_DICES = 'roll dices',
  START_GAME = 'start game',
  JOIN_GAME = 'join game'
}

export enum GameStatus {
  PENDING,
  PLAYING,
  END
}
