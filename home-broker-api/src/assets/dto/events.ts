export const ASSET_PRICE_CHANGED = 'assets/price-changed'

export const JOIN_ASSET = 'join/asset'
export const JOIN_ASSETS = 'join/assets'

export const LEAVE_ASSET = 'leave/asset'
export const LEAVE_ASSETS = 'leave/assets'

export const ASSET_DAILY_CREATED = 'asset-daily/created'

export class JoinLeaveAssetsDto {
  symbols: string[]
}

export class JoinLeaveAssetDto {
  symbol: string
}
