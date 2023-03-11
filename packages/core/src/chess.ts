import { nanoid } from 'nanoid'

export class Chess {
  public src?: any
  public tk = nanoid()

  constructor (src?: any) {
    this.src = src
  }
}
