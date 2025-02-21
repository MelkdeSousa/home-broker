"use client";

import {
	type AreaData,
	AreaSeries,
	type IChartApi,
	type ISeriesApi,
	type Time,
	createChart,
} from "lightweight-charts";
import type React from "react";
import {
	type Ref,
	useEffect,
	useImperativeHandle,
	useLayoutEffect,
	useRef,
} from "react";

type ChartRef = {
	_api: IChartApi | null;
	api(): IChartApi;
	free(): void;
};

export type ChartComponentRef = {
	update: (data: { time: Time; value: number }) => void;
};

export default function Chart(props: {
	header: React.ReactNode;
	data?: AreaData<Time>[];
	ref: Ref<ChartComponentRef>;
}) {
	const { header, data, ref } = props;
	const chartContainerRef = useRef<HTMLDivElement>(null);
	const chartRef = useRef<ChartRef>({
		_api: null,
		api() {
			if (!this._api) {
				// biome-ignore lint/style/noNonNullAssertion: <explanation>
				this._api = createChart(chartContainerRef.current!, {
					width: 0,
					height: 0,
					timeScale: {
						timeVisible: true,
					},
				});
				this._api.timeScale().fitContent();
			}
			return this._api;
		},
		free() {
			if (this._api) {
				this._api.remove();
			}
		},
	});
	const seriesRef = useRef<ISeriesApi<"Area">>(null);

	useImperativeHandle(ref, () => ({
		update: (data: { time: Time; value: number }) => {
			// biome-ignore lint/style/noNonNullAssertion: <explanation>
			seriesRef.current!.update(data);
		},
	}));

	useEffect(() => {
		seriesRef.current = chartRef.current.api().addSeries(AreaSeries);
		seriesRef.current.setData(data || []);
	}, [data]);

	useLayoutEffect(() => {
		const currentRef = chartRef.current;
		const chart = currentRef.api();

		const handleResize = () => {
			chart.applyOptions({
				// biome-ignore lint/style/noNonNullAssertion: <explanation>
				width: chartContainerRef.current!.parentElement!.clientWidth,
			});
		};

		window.addEventListener("resize", handleResize);
		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	return (
		<div className="flex-grow relative" ref={chartContainerRef}>
			<div className="absolute top-0 left-0 z-50 bg-gray-100 rounded-md p-2 shadow-md">
				{header}
			</div>
		</div>
	);
}

Chart.displayName = "Chart";
