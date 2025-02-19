import type { OrderModel } from "@/api/models";
import Asset from "@/components/Asset";
import OrderStatusBadge from "@/components/OrderStatusBadge";
import OrderTypeBadge from "@/components/OrderTypeBadge";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeadCell,
	TableRow,
} from "flowbite-react";

export async function getOrders(walletId: string): Promise<OrderModel[]> {
	const response = await fetch(
		`http://localhost:3000/orders?walletId=${walletId}`,
	);
	return response.json();
}

export default async function ({
	searchParams,
}: { searchParams: Promise<{ walletId: string }> }) {
	const { walletId } = await searchParams;
	const orders = await getOrders(walletId);

	return (
		<div className="flex flex-col space-y-5 flex-grow">
			<article className="format">
				<h1>Minha Carteira</h1>
			</article>
			<div className="overflow-x-auto w-full">
				<Table className="w-full max-w-full table-fixed">
					<TableHead>
						<TableHeadCell>Ativo</TableHeadCell>
						<TableHeadCell>Preço</TableHeadCell>
						<TableHeadCell>Quantidade</TableHeadCell>
						<TableHeadCell>Tipo</TableHeadCell>
						<TableHeadCell>Status</TableHeadCell>
					</TableHead>
					<TableBody>
						{orders.map((order) => (
							<TableRow key={order._id}>
								<TableCell>
									<Asset asset={order.asset} />
								</TableCell>
								<TableCell>R$ {order.asset.price}</TableCell>
								<TableCell>{order.shares}</TableCell>
								<TableCell>
									<OrderTypeBadge type={order.type} />
								</TableCell>
								<TableCell>
									<OrderStatusBadge status={order.status} />
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</div>
		</div>
	);
}
