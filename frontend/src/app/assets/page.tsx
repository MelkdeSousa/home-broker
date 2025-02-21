import { getAssets, getMyWallet } from "@/api/queries";
import AssetsSync from "@/components/AssetsSync";
import AssetsTableRow from "@/components/AssetsTableRow";
import { WalletList } from "@/components/WalletList";
import { Table, TableBody, TableHead, TableHeadCell } from "flowbite-react";

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
							<AssetsTableRow
								key={asset._id}
								asset={asset}
								walletId={wallet._id}
							/>
						))}
					</TableBody>
				</Table>
			</div>
			<AssetsSync symbols={assets.map(({ symbol }) => symbol)} />
		</div>
	);
}
