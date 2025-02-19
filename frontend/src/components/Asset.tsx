import type { AssetModel } from "@/api/models";
import Image from "next/image";

export default function ({ asset }: { asset: AssetModel }) {
	return (
		<>
			<div className="flex space-x-1">
				<div className="content-center">
					<Image src={asset.image} alt={asset.symbol} width={30} height={30} />
				</div>
			</div>
			<div className="flex flex-col text-sm">
				<span>{asset.name}</span>
				<span>({asset.symbol})</span>
			</div>
		</>
	);
}
