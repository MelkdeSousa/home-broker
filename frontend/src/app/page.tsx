import { getMyWallet } from "@/api/queries";
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
import Link from "next/link";

export default async function MyWalletList({
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

	return (
		<div className="flex flex-col space-y-5 flex-grow">
			<article className="format">
				<h1>Minha Carteira</h1>
			</article>
			<div className="overflow-x-auto w-full">
				<Table className="w-full max-w-full table-fixed">
					<TableHead>
						<TableHeadCell>Ativo</TableHeadCell>
						<TableHeadCell>Cotação</TableHeadCell>
						<TableHeadCell>Quantidade</TableHeadCell>
						<TableHeadCell>Comprar/Vender</TableHeadCell>
					</TableHead>
					<TableBody>
						{wallet.assets.map((walletAsset) => (
							<TableRow key={walletAsset._id}>
								<TableCell>
									<Asset asset={walletAsset.asset} />
								</TableCell>
								<TableCell>R$ {walletAsset.asset.price}</TableCell>
								<TableCell>{walletAsset.shares}</TableCell>
								<TableCell>
									<Button
										color="light"
										as={Link}
										href={`/assets/${walletAsset.asset.symbol}?walletId=${walletId}`}
									>
										Comprar/Vender
									</Button>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</div>
		</div>
	);
}
