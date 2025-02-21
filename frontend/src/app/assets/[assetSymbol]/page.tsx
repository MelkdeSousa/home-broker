import { OrderType } from "@/api/models";
import { getAsset, getAssetDailies, getMyWallet } from "@/api/queries";
import Asset from "@/components/Asset";
import AssetChart from "@/components/AssetChart";
import OrderForm from "@/components/OrderForm";
import TabsItem from "@/components/TabsItem";
import { WalletList } from "@/components/WalletList";
import { Card, Tabs } from "flowbite-react";
import type { Time } from "lightweight-charts";

type Props = {
	params: Promise<{ assetSymbol: string }>;
	searchParams: Promise<{ walletId: string }>;
};

export default async function ({ params, searchParams }: Props) {
	const { assetSymbol } = await params;
	const { walletId } = await searchParams;

	if (!walletId) {
		return <WalletList />;
	}

	const wallet = await getMyWallet(walletId);

	if (!wallet) {
		return <WalletList />;
	}

	const asset = await getAsset(assetSymbol);

	const assetDailies = await getAssetDailies(assetSymbol);

	const chartData = assetDailies.map((daily) => ({
		time: (Date.parse(daily.date) / 1000).toFixed(0) as Time,
		value: daily.price,
	}));

	return (
		<div className="flex flex-col space-y-5 flex-grow">
			<div className="flex flex-col space-y-2">
				<Asset asset={asset} />
				<span className="ml-2 font-bold text-2xl">R$ {asset.price}</span>
			</div>
			<div className="grid grid-cols-5 flex-grow gap-2">
				<div className="col-span-2">
					<Card>
						<Tabs>
							<TabsItem
								active
								title={<div className="text-blue-700">Comprar</div>}
							>
								<OrderForm
									asset={asset}
									type={OrderType.BUY}
									walletId={walletId}
								/>
							</TabsItem>
							<TabsItem title={<div className="text-red-700">Vender</div>}>
								<OrderForm
									asset={asset}
									type={OrderType.SELL}
									walletId={walletId}
								/>
							</TabsItem>
						</Tabs>
					</Card>
				</div>
				<div className="col-span-3 flex flex-grow">
					<AssetChart asset={asset} data={chartData} />
				</div>
			</div>
		</div>
	);
}
