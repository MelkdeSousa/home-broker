import { io } from 'socket.io-client'

export const socket = io('http://localhost:3000', {
  autoConnect: false,
})

export enum SocketEvents {
  CREATE_ORDER = 'orders/create',
  JOIN_ASSETS = 'join/assets',
  JOIN_ASSET = 'join/asset',
  LEAVE_ASSETS = 'leave/assets',
  LEAVE_ASSET = 'leave/asset',
  ASSET_PRICE_CHANGED = 'assets/price-changed',
  ASSET_DAILY_CREATED = 'asset-daily/created',
}
