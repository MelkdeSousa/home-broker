import type { CreateAssetDto } from 'src/assets/dto/create-asset.dto'
import type { AssetDocument } from 'src/assets/entities/asset.entity'
import type { WalletDocument } from 'src/wallets/entities/wallet.entity'

const createAssets = async () => {
  const assetInput: CreateAssetDto[] = [
    {
      name: 'Google',
      symbol: 'GOOGL',
      price: 23,
      image:
        'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png',
    },
    {
      name: 'Apple',
      symbol: 'AAPL',
      price: 15,
      image:
        'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fpngimg.com%2Fuploads%2Fapple_logo%2Fapple_logo_PNG19674.png&f=1&nofb=1&ipt=95deef4f2a86e4db380635266f2eb9f0bd5acbffa4d5939409a21d2cd7833cd7&ipo=images',
    },
    {
      name: 'Microsoft',
      symbol: 'MSFT',
      price: 56,
      image:
        'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP.HolI6Jw4xVkeYu1zJZWq7QHaCS%26pid%3DApi&f=1&ipt=0b5685c7350a1f8bffd1b5f59c5347c22b7dd56f290b7985d4d02ca68601e1f4&ipo=images',
    },
  ]

  await Promise.all(
    assetInput.map(
      async (body) =>
        await fetch('http://localhost:3000/assets', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(body),
        }),
    ),
  )
}

const createWallet = async () => {
  await fetch('http://localhost:3000/wallets', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  await fetch('http://localhost:3000/wallets', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  })
}

const createWalletAssets = async () => {
  const walletsResponse = await fetch('http://localhost:3000/wallets')
  const wallets = (await walletsResponse.json()) as WalletDocument[]

  const assetsResponse = await fetch('http://localhost:3000/assets')
  const assets = (await assetsResponse.json()) as AssetDocument[]

  const walletAssets = assets.map((asset) => {
    const wallet = wallets[Math.floor(Math.random() * wallets.length)]

    return {
      walletId: wallet._id,
      assetId: asset._id,
      amount: Math.floor(Math.random() * 100),
    }
  })

  walletAssets.forEach(async ({ walletId, ...body }) => {
    await fetch(`http://localhost:3000/wallets/${walletId}/assets`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
  })
}

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

const createAssetDaily = async () => {
  await sleep(5000)

  const assetsResponse = await fetch('http://localhost:3000/assets')
  const assets = (await assetsResponse.json()) as AssetDocument[]

  const asset = assets[Math.floor(Math.random() * assets.length)]

  const assetDailies = {
    symbol: asset.symbol,
    date: new Date(),
    price: asset.price + Math.random() * 10,
  }
  const response = await fetch(
    `http://localhost:3000/assets/${assetDailies.symbol}/dailies`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        date: assetDailies.date,
        price: assetDailies.price,
      }),
    },
  )

  if (!response.ok) console.error(response.statusText)
  else console.log('Created asset daily for', assetDailies.symbol)
}

const seed = async (command: string) => {
  switch (command) {
    case 'assets':
      await createAssets()
      break
    case 'wallet':
      await createWallet()
      break
    case 'wallet-assets':
      await createWalletAssets()
      break
    case 'asset-daily':
      while (true) {
        await createAssetDaily()
      }
      break
    default:
      console.error('Invalid command')
  }
}

seed(process.argv[2])
