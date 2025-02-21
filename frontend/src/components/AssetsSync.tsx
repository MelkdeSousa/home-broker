"use client";

import { SocketEvents, socket } from "@/api/websocket";
import { useAssetsStore } from "@/stores/assets";
import { useEffect } from "react";

export default function ({ symbols }: { symbols: string[] }) {
	const changeAsset = useAssetsStore((states) => states.changeAsset);

	useEffect(() => {
		socket.connect();

		socket.emit(SocketEvents.JOIN_ASSETS, JSON.stringify({ symbols }));
		socket.on(SocketEvents.ASSET_PRICE_CHANGED, changeAsset);

		return () => {
			socket.emit(SocketEvents.LEAVE_ASSETS, JSON.stringify({ symbols }));
			socket.off(SocketEvents.ASSET_PRICE_CHANGED);
			socket.disconnect();
		};
	}, [symbols, changeAsset]);

	return null;
}
