import { OrderType } from "@/api/models";
import { Badge } from "flowbite-react";

export default function ({ type }: { type: OrderType }) {
	return (
		<Badge color={type === OrderType.BUY ? "blue" : "red"} className="w-fit">
			{type === OrderType.BUY ? "Compra" : "Venda"}
		</Badge>
	);
}
