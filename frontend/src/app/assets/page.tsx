import { getAssets, getMyWallet } from "@/api/queries";
import Asset from "@/components/Asset";
import { WalletList } from "@/components/WalletList";
import {
	Button,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeadCell,
	TableRow,
} from "flowbite-react";

export default async function ({
	searchParams,
}: { searchParams: Promise<{ walletId: string }> }) {
	const { walletId } = await searchParams;
	if (!walletId) {
		return <WalletList />;
	}

	const wallet = await getMyWallet(walletId);

	if (!wallet) {
		return <WalletList />;
	}

	const assets = await getAssets();

	return (
		<div className="flex flex-col space-y-5 flex-grow">
			<article className="format">
				<h1>Meus ativos</h1>
			</article>
			<div className="overflow-x-auto w-full">
				<Table className="w-full max-w-full table-fixed">
					<TableHead>
						<TableHeadCell>Ativo</TableHeadCell>
						<TableHeadCell>Cotação</TableHeadCell>
						<TableHeadCell>Comprar/Vender</TableHeadCell>
					</TableHead>
					<TableBody>
						{assets.map((asset) => (
							<TableRow key={asset._id}>
								<TableCell>
									<Asset asset={asset} />
								</TableCell>
								<TableCell>R$ {asset.price}</TableCell>
								<TableCell>
									<Button color="light">Comprar/Vender</Button>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</div>
		</div>
	);
}
