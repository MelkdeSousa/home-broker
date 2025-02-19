import { OrderStatus } from "@/api/models";
import { Badge } from "flowbite-react";

export default function ({ status }: { status: OrderStatus }) {
	let color = "info";
	let text = "Desconhecido";

	switch (status) {
		case OrderStatus.PENDING:
			color = "info";
			text = "Pendente";
			break;
		case OrderStatus.OPEN:
			color = "warning";
			text = "Aberto";
			break;
		case OrderStatus.CLOSED:
			color = "success";
			text = "Fechado";
			break;
		case OrderStatus.FAILED:
			color = "failure";
			text = "Falhou";
			break;
	}

	return (
		<Badge color={color} className="w-fit">
			{text}
		</Badge>
	);
}
