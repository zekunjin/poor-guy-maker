import { nanoid } from 'nanoid'
import { io, Socket } from 'socket.io-client'
import { SocketEvent, SERVER_PORT, CLIENT_ID_KEY, PlayerAction, AuctionAction, GridAction, type BuildHouseDTO } from '@poor-guy-maker/shared'

let socket: Socket

export const useGame = () => {
  const connected = ref(false)
  const game = ref<any>({})

  const tk = ref((() => {
    const id = localStorage.getItem(CLIENT_ID_KEY)
    if (id) { return id }

    const client = nanoid()
    if (!id) { localStorage.setItem(CLIENT_ID_KEY, client) }
    return client
  })())

  const me = computed(() => {
    return game.value?.players?.[tk.value]
  })

  const actions = computed(() => {
    const p = game.value?.players?.[tk.value]
    return (p ? p.actions : []) as PlayerAction[]
  })

  const connect = (host = 'http://127.0.0.1') => {
    socket = io(`${host}:${SERVER_PORT}`, { query: { client: tk.value } })
    socket.on(SocketEvent.SYNC_GAME, (g) => { game.value = g })
  }

  const start = () => {
    socket.emit(SocketEvent.START_GAME)
  }

  const ready = () => {
    socket.emit(SocketEvent.READY_GAME)
  }

  const leave = () => {
    socket.emit(SocketEvent.LEAVE_GAME)
  }

  const roll = () => {
    if (!socket) { return }
    socket.emit(SocketEvent.ROLL_DICES)
  }

  const next = () => {
    if (!socket) { return }
    socket.emit(SocketEvent.NEXT_PLAYER)
  }

  const pause = () => {
    if (!socket) { return }
    socket.emit(SocketEvent.PAUSE_GAME)
  }

  const restart = () => {
    if (!socket) { return }
    socket.emit(SocketEvent.RESTART_GAME)
  }

  const action = (a: PlayerAction, dto?: BuildHouseDTO) => {
    if (!socket) { return }
    socket.emit(SocketEvent.SELECT_ACTION, { action: a, params: dto })
  }

  const auctionAction = (action: AuctionAction, price?: number) => {
    if (!socket) { return }
    socket.emit(SocketEvent.AUCTION, { action, params: { price } })
  }

  const gridAction = (action: GridAction) => {
    if (!socket) { return }
    socket.emit(SocketEvent.GRID_ACTION, { action })
  }

  return {
    connected,
    tk,
    game,
    me,
    actions,
    connect,
    ready,
    leave,
    start,
    roll,
    next,
    pause,
    restart,
    action,
    auctionAction,
    gridAction
  }
}
