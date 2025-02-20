import type { AssetModel, OrderModel, WalletModel } from "./models";

export async function getMyWallet(
	walletId: string,
): Promise<WalletModel | null> {
	const response = await fetch(`http://localhost:3000/wallets/${walletId}`);

	if (!response.ok) {
		return null;
	}

	return response.json();
}

export async function getAssets(): Promise<AssetModel[]> {
	const response = await fetch("http://localhost:3000/assets");
	return response.json();
}

export async function getOrders(walletId: string): Promise<OrderModel[]> {
	const response = await fetch(
		`http://localhost:3000/orders?walletId=${walletId}`,
	);
	return response.json();
}

export async function getAsset(symbol: string): Promise<AssetModel> {
	const response = await fetch(`http://localhost:3000/assets/${symbol}`);
	return response.json();
}

export async function getWallets(): Promise<WalletModel[]> {
	const response = await fetch("http://localhost:3000/wallets");
	return response.json();
}
