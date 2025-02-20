import { getWallets } from '@/api/queries'
import {
  Alert,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from 'flowbite-react'
import Link from 'next/link'

export async function WalletList() {
  const wallets = await getWallets()
  return (
    <div className="flex flex-col space-y-5 flex-grow">
      <Alert color="failure">Nenhuma wallet escolhida</Alert>
      <article className="format">
        <h1>Carteiras existentes</h1>
      </article>
      <div className="overflow-x-auto w-full">
        <Table className="w-full max-w-full table-fixed">
          <TableHead>
            <TableHeadCell>ID</TableHeadCell>
            <TableHeadCell>Acessar</TableHeadCell>
          </TableHead>
          <TableBody>
            {wallets.map((wallet) => (
              <TableRow key={wallet._id}>
                <TableCell>{wallet._id}</TableCell>
                <TableCell>
                  <Link href={`/?walletId=${wallet._id}`}>Acessar</Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
