export type AssetModel = {
	_id: string;
	name: string;
	symbol: string;
	price: number;
	image: string;
};

export type AssetDailyModel = {
	_id: string;
	asset: AssetModel;
	date: string;
	price: number;
};

export type WalletAssetModel = {
	_id: string;
	asset: AssetModel;
	shares: number;
};

export type WalletModel = {
	_id: string;
	assets: WalletAssetModel[];
};

export type OrderModel = {
	_id: string;
	asset: AssetModel;
	shares: number;
	partial: number;
	price: number;
	type: OrderType;
	status: OrderStatus;
};

export enum OrderType {
	BUY = "BUY",
	SELL = "SELL",
}

export enum OrderStatus {
	PENDING = "PENDING",
	OPEN = "OPEN",
	CLOSED = "CLOSED",
	FAILED = "FAILED",
}
