'use client'

import { type AssetModel, type OrderModel, OrderType } from '@/api/models'
import { socket } from '@/api/websocket'
import { Button, Label, TextInput } from 'flowbite-react'
import { toast } from 'react-toastify'

type Props = {
  asset: AssetModel
  type: OrderType
  walletId: string
}

export default function ({ asset, type, walletId }: Props) {
  const color = type === OrderType.BUY ? 'blue' : 'red'
  const title = type === OrderType.BUY ? 'Compra' : 'Venda'

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const data = Object.fromEntries(formData.entries())

    socket.connect()

    const order: OrderModel = await socket.emitWithAck(
      'orders/create',
      JSON.stringify(data),
    )

    toast(
      `Ordem de ${title} de ${order.shares} ações de ${asset.symbol} criada com sucesso!`,
      { type: 'success', position: 'top-right' },
    )

    socket.disconnect()
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="hidden" name="assetId" defaultValue={asset._id} />
      <input type="hidden" name="walletId" defaultValue={walletId} />
      <input type="hidden" name="type" defaultValue={type} />

      <div>
        <div className="mb-2">
          <Label htmlFor="shares" value="Quantidade" className={color} />
        </div>
        <TextInput
          type="number"
          name="shares"
          id="shares"
          placeholder="Quantidade"
          required
          min={1}
          step={1}
          defaultValue={1}
          color={type === OrderType.BUY ? 'info' : 'failure'}
        />
      </div>
      <br />
      <div>
        <div className="mb-2">
          <Label htmlFor="price" value="Preço R$" className={color} />
        </div>
        <TextInput
          type="number"
          name="price"
          id="price"
          placeholder="Quantidade"
          required
          min={1}
          step={1}
          defaultValue={1}
          color={type === OrderType.BUY ? 'info' : 'failure'}
        />
      </div>
      <br />
      <Button type="submit" color={type === OrderType.BUY ? 'blue' : 'failure'}>
        Confirmar {title}
      </Button>
    </form>
  )
}
