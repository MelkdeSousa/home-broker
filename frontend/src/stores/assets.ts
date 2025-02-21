import type { AssetModel } from "@/api/models";
import { create } from "zustand";

export type AssetsStore = {
	assets: AssetModel[];
	changeAsset: (asset: AssetModel) => void;
};

export const useAssetsStore = create<AssetsStore>((set) => ({
	assets: [],
	changeAsset: (asset) =>
		set((oldState) => {
			const assetIndex = oldState.assets.findIndex(
				(oldAsset) => oldAsset.symbol === asset.symbol,
			);

			if (assetIndex === -1) {
				return { assets: [...oldState.assets, asset] };
			}

			const newAssets = [...oldState.assets];
			newAssets[assetIndex] = asset;

			return { assets: newAssets };
		}),
}));
