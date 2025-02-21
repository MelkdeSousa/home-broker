export class CreateAssetDto {
  name: string
  symbol: string
  image: string
  price: number
}

export class CreateAssetDailyDto {
  date: Date
  price: number
  symbol: string
}
