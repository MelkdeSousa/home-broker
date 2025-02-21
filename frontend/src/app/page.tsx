import { getMyWallet } from "@/api/queries";
import AssetsSync from "@/components/AssetsSync";
import WalletAssetTableRow from "@/components/WalletAssetTableRow";
import { WalletList } from "@/components/WalletList";
import { Table, TableBody, TableHead, TableHeadCell } from "flowbite-react";

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
							<WalletAssetTableRow
								key={walletAsset._id}
								walletAsset={walletAsset}
								walletId={wallet._id}
							/>
						))}
					</TableBody>
				</Table>
			</div>
			<AssetsSync
				symbols={wallet.assets.map(({ asset: { symbol } }) => symbol)}
			/>
		</div>
	);
}
