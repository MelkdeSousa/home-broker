"use client";

import type { AssetDailyModel, AssetModel } from "@/api/models";
import { SocketEvents, socket } from "@/api/websocket";
import type { Time } from "lightweight-charts";
import { useEffect, useRef } from "react";
import Asset from "./Asset";
import Chart, { type ChartComponentRef } from "./Chart";

type Props = {
	asset: AssetModel;
	data?: { time: Time; value: number }[];
};

export default function ({ asset, data }: Props) {
	const chartRef = useRef<ChartComponentRef>(null);

	const { symbol } = asset;

	useEffect(() => {
		socket.connect();

		socket.emit(SocketEvents.JOIN_ASSET, { symbol });
		socket.on(SocketEvents.ASSET_DAILY_CREATED, (daily: AssetDailyModel) => {
			chartRef.current?.update({
				time: (Date.parse(daily.date) / 1000) as Time,
				value: daily.price,
			});
		});

		return () => {
			socket.emit(SocketEvents.LEAVE_ASSET, { symbol });
			socket.off(SocketEvents.ASSET_DAILY_CREATED);
			socket.disconnect();
		};
	}, [symbol]);

	return <Chart ref={chartRef} data={data} header={<Asset asset={asset} />} />;
}
