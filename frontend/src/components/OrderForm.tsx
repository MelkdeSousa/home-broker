import { type AssetModel, OrderType } from "@/api/models";
import { Button, Label, TextInput } from "flowbite-react";

type Props = {
	asset: AssetModel;
	type: OrderType;
	walletId: string;
};

export default function ({ asset, type, walletId }: Props) {
	const color = type === OrderType.BUY ? "blue" : "red";
	const title = type === OrderType.BUY ? "Compra" : "Venda";

	return (
		<form action="">
			<input type="hidden" name="assetId" defaultValue={asset._id} />
			<input type="hidden" name="walletId" defaultValue={walletId} />
			<input type="hidden" name="type" defaultValue={type} />

			<div>
				<div className="mb-2">
					<Label htmlFor="shares" value="Quantidade" className={color} />
				</div>
				<TextInput
					type="number"
					name="shares"
					id="shares"
					placeholder="Quantidade"
					required
					min={1}
					step={1}
					defaultValue={1}
					color={type === OrderType.BUY ? "info" : "failure"}
				/>
			</div>
			<br />
			<div>
				<div className="mb-2">
					<Label htmlFor="price" value="Preço R$" className={color} />
				</div>
				<TextInput
					type="number"
					name="price"
					id="price"
					placeholder="Quantidade"
					required
					min={1}
					step={1}
					defaultValue={1}
					color={type === OrderType.BUY ? "info" : "failure"}
				/>
			</div>
			<br />
			<Button type="submit" color={type === OrderType.BUY ? "blue" : "failure"}>
				Confirmar {title}
			</Button>
		</form>
	);
}
