"use client";

import type { AssetModel } from "@/api/models";
import { useAssetsStore } from "@/stores/assets";
import { Button, TableCell, TableRow } from "flowbite-react";
import Link from "next/link";
import Asset from "./Asset";

type Props = {
	asset: AssetModel;
	walletId: string;
};

export default function ({ asset, walletId }: Props) {
	const assetFound = useAssetsStore((states) =>
		states.assets.find((a) => a.symbol === asset.symbol),
	);

	const finalAsset = assetFound ? assetFound : asset;

	return (
		<TableRow>
			<TableCell>
				<Asset asset={asset} />
			</TableCell>
			<TableCell>R$ {finalAsset.price}</TableCell>
			<TableCell>
				<Button
					className="w-fit"
					color="light"
					as={Link}
					href={`/assets/${finalAsset.symbol}?walletId=${walletId}`}
				>
					Comprar/Vender
				</Button>
			</TableCell>
		</TableRow>
	);
}
