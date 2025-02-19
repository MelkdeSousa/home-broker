import { type AssetModel, OrderType } from "@/api/models";
import Asset from "@/components/Asset";
import AssetChart from "@/components/AssetChart";
import OrderForm from "@/components/OrderForm";
import TabsItem from "@/components/TabsItem";
import { Card, Tabs } from "flowbite-react";

export async function getAsset(symbol: string): Promise<AssetModel> {
	const response = await fetch(`http://localhost:3000/assets/${symbol}`);
	return response.json();
}

type Props = {
	params: Promise<{ assetSymbol: string }>;
	searchParams: Promise<{ walletId: string }>;
};

export default async function ({ params, searchParams }: Props) {
	const { assetSymbol } = await params;
	const { walletId } = await searchParams;
	const asset = await getAsset(assetSymbol);

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
					<AssetChart asset={asset} />
				</div>
			</div>
		</div>
	);
}
