"use client";

import type { AssetModel } from "@/api/models";
import { useRef } from "react";
import Asset from "./Asset";
import Chart, { type ChartComponentRef } from "./Chart";

export default function ({ asset }: { asset: AssetModel }) {
	const chartRef = useRef<ChartComponentRef>(null);

	return <Chart ref={chartRef} header={<Asset asset={asset} />} />;
}
