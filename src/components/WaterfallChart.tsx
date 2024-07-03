import { useEffect, useRef } from "react";
import * as echarts from "echarts/core";

import {
    TitleComponent,
    DatasetComponent,
    TooltipComponent,
    GridComponent,
    LegendComponent,
    MarkLineComponent,
} from "echarts/components";
import { BarChart } from "echarts/charts";
import { CanvasRenderer } from "echarts/renderers";
import { ECharts, EChartsType } from "echarts";
import { cumulativeSum } from "~/utils/utils";
import { clearAndParseNumber } from "~/data/api";
import { IRound } from "~/data/consts";

const dataPointToRangeMap = {
    dd1: { label: "601-1200", min: 601, max: 1200 },
    dd2: { label: "501-600", min: 501, max: 600 },
    dd3: { label: "451-500", min: 451, max: 500 },
    dd4: { label: "491-500", min: 491, max: 500 },
    dd5: { label: "481-490", min: 481, max: 490 },
    dd6: { label: "471-480", min: 471, max: 480 },
    dd7: { label: "461-470", min: 461, max: 470 },
    dd8: { label: "451-460", min: 451, max: 460 },
    dd9: { label: "401-450", min: 401, max: 450 },
    dd10: { label: "441-450", min: 441, max: 450 },
    dd11: { label: "431-440", min: 431, max: 440 },
    dd12: { label: "421-430", min: 421, max: 430 },
    dd13: { label: "411-420", min: 411, max: 420 },
    dd14: { label: "401-410", min: 401, max: 410 },
    dd15: { label: "351-400", min: 351, max: 400 },
    dd16: { label: "301-350", min: 301, max: 350 },
    dd17: { label: "0 - 300", min: 0, max: 300 },
    dd18: { label: "Total", min: 0, max: 1200 },
};

const aggregatedIndexes = ["dd9", "dd3"];

echarts.use([
    TitleComponent,
    DatasetComponent,
    TooltipComponent,
    GridComponent,
    LegendComponent,
    BarChart,
    CanvasRenderer,
    MarkLineComponent,
]);

const WaterfallChart = (props: { id: string; filteredLastRound: IRound }) => {
    const chartRef = useRef<HTMLDivElement | null>(null);
    const chartRefInst = useRef<ECharts | null>(null);
    const { id, filteredLastRound } = props;

    const steps =
        Object.entries(filteredLastRound)
            .filter(([name]) => name.startsWith("dd"))
            .reverse()
            .map(([step, value]) => [step, clearAndParseNumber(value)])
            .slice(1) || [];
    let cumulativeApplicationsCount = cumulativeSum(
        steps.map(([step, value]) => {
            return aggregatedIndexes.includes(step as string) ? 0 : value;
        }) as number[]
    );
    const dd9 = steps.find(([step]) => step === "dd9") || [];
    const dd9Val = dd9[1] as number;
    const dd3 = steps.find(([step]) => step === "dd3") || [];
    const dd3Val = dd3[1] as number;
    cumulativeApplicationsCount[8] = cumulativeApplicationsCount[9] - dd9Val;
    cumulativeApplicationsCount[14] = cumulativeApplicationsCount[15] - dd3Val;
    const getCRSCutoffXAxis = () => {
        const cutoff = filteredLastRound.drawCRS;
        const range = Object.values(dataPointToRangeMap).find(
            (range) => range.min <= cutoff && range.max >= cutoff
        );
        return range ? range.label : "0 - 300";
    };
    const options = {
        calculable: true,
        tooltip: {
            trigger: "axis",
            axisPointer: {
                type: "shadow",
            },
            formatter: function (params: any) {
                let tar;
                if (params[1] && params[1].value !== "-") {
                    tar = params[1];
                } else {
                    tar = params[2];
                }
                return (
                    tar &&
                    tar.name + "<br/>" + tar.seriesName + " : " + tar.value
                );
            },
        },
        legend: {
            data: ["Applicants", "Aggregated Applicants"],
        },
        grid: {
            left: "3%",
            right: "4%",
            bottom: "3%",
            containLabel: true,
        },
        xAxis: {
            type: "category",
            name: "CRS Score Range",
            data: (function () {
                let list = [];
                for (let i = 0; i < steps.length; i++) {
                    const thisStep = steps[
                        i
                    ][0] as keyof typeof dataPointToRangeMap;
                    list.push(dataPointToRangeMap[thisStep].label);
                }
                return list;
            })(),
        },
        yAxis: {
            type: "value",
            name: "Applications",
        },
        series: [
            {
                name: "Placeholder",
                type: "bar",
                stack: "Total",
                silent: true,
                itemStyle: {
                    borderColor: "transparent",
                    color: "transparent",
                },
                emphasis: {
                    itemStyle: {
                        borderColor: "transparent",
                        color: "transparent",
                    },
                },
                data: cumulativeApplicationsCount,
            },
            {
                name: "Aggregated Applicants",
                type: "bar",
                stack: "Total",
                label: {
                    show: true,
                    position: "top",
                },
                data: steps.map(([step, value], index) =>
                    aggregatedIndexes.includes(step as string) ? value : "-"
                ),
            },
            {
                name: "Applicants",
                type: "bar",
                stack: "Total",
                label: {
                    show: true,
                    position: "bottom",
                },
                data: steps.map(([step, value]) =>
                    aggregatedIndexes.includes(step as string) ? "-" : value
                ),
                markLine: {
                    data: [{ name: "Cutoff CRS", xAxis: getCRSCutoffXAxis() }],
                    label: {
                        formatter: `Cutoff CRS: ${filteredLastRound.drawCRS}`,
                        opacity: 1,
                        fontSize: 15,
                    },
                    lineStyle: {
                        color: "red",
                        width: 2,
                        opacity: 0.2,
                    },
                },
            },
        ],
    };
    useEffect(() => {
        if (chartRefInst.current) {
            chartRefInst.current.setOption(options, true);
        }
    }, [options]);
    useEffect(() => {
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

export default WaterfallChart;
