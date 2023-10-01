import { useEffect, useRef } from "react";
import * as echarts from "echarts/core";

import {
    TitleComponent,
    DatasetComponent,
    TooltipComponent,
    GridComponent,
    LegendComponent
} from "echarts/components";
import { BarChart } from "echarts/charts";
import { CanvasRenderer } from "echarts/renderers";
import { ECharts, EChartsOption, EChartsType } from "echarts";

echarts.use([
    TitleComponent,
    DatasetComponent,
    TooltipComponent,
    GridComponent,
    LegendComponent,
    BarChart,
    CanvasRenderer
]);

const REBarChart = (props: { id: string, options: EChartsOption }) => {
    const chartRef = useRef<HTMLDivElement | null>(null);
    const chartRefInst = useRef<ECharts | null>(null);
    const { id, options } = props;
    useEffect(() => {
        if (chartRefInst.current) {
            chartRefInst.current.setOption(options, true);
        }
    }, [options]);
    useEffect(() => {
        console.log(chartRef.current);
        if (chartRef.current) {
            const barChart =
                echarts.getInstanceByDom(chartRef.current) ||
                echarts.init(chartRef.current);
            barChart.setOption(options, true);
            chartRefInst.current = barChart as unknown as EChartsType;
        }
    }, []);
    return (
        <div id={id} ref={chartRef} style={{ width: "100%", height: "80vh" }} />
    );
};

export default REBarChart;
