import { io } from 'socket.io-client'

export const socket = io('http://localhost:3000', {
  autoConnect: false,
})

export enum SocketEvents {
  CREATE_ORDER = 'orders/create',
}
