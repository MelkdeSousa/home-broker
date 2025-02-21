"use client";

import type { WalletAssetModel } from "@/api/models";
import { useAssetsStore } from "@/stores/assets";
import { Button, TableCell, TableRow } from "flowbite-react";
import Link from "next/link";
import Asset from "./Asset";

type Props = {
	walletAsset: WalletAssetModel;
	walletId: string;
};

export default function ({ walletAsset, walletId }: Props) {
	const assetFound = useAssetsStore((states) =>
		states.assets.find((asset) => asset.symbol === walletAsset.asset.symbol),
	);

	const asset = assetFound ? assetFound : walletAsset.asset;

	return (
		<TableRow>
			<TableCell>
				<Asset asset={asset} />
			</TableCell>
			<TableCell>R$ {asset.price}</TableCell>
			<TableCell>{walletAsset.shares}</TableCell>
			<TableCell>
				<Button
					color="light"
					as={Link}
					href={`/assets/${asset.symbol}?walletId=${walletId}`}
				>
					Comprar/Vender
				</Button>
			</TableCell>
		</TableRow>
	);
}
