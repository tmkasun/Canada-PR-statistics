import { useEffect, useRef } from "react";
import * as echarts from "echarts/core";

import {
  TitleComponent,
  DatasetComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
} from "echarts/components";
import { BarChart } from "echarts/charts";
import { CanvasRenderer } from "echarts/renderers";
import { ECharts, EChartsOption, EChartsType } from "echarts";
import { cumulativeSum } from "~/utils/utils";
import { clearAndParseNumber } from "~/data/api";
import { IRound } from "~/data/consts";

const dataPointToRangeMap = {
  dd1: "601-1200",
  dd2: "501-600",
  dd3: "451-500",
  dd4: "491-500",
  dd5: "481-490",
  dd6: "471-480",
  dd7: "461-470",
  dd8: "451-460",
  dd9: "401-450",
  dd10: "441-450",
  dd11: "431-440",
  dd12: "421-430",
  dd13: "411-420",
  dd14: "401-410",
  dd15: "351-400",
  dd16: "301-350",
  dd17: "0 - 300",
  dd18: "Total",
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
]);

const WaterfallChart = (props: { id: string; filteredLastRound: IRound }) => {
  const chartRef = useRef<HTMLDivElement | null>(null);
  const chartRefInst = useRef<ECharts | null>(null);
  const { id, filteredLastRound } = props;

  const draws = Object.entries(filteredLastRound)
    .filter(([name]) => name.startsWith("dd"))
    .reverse()
    .map(([step, value]) => [step, clearAndParseNumber(value)])
    .slice(1);
  let cumulativeApplicationsCount = cumulativeSum(
    draws.map(([step, value]) => {
      return aggregatedIndexes.includes(step) ? 0 : value;
    })
  );
  cumulativeApplicationsCount[8] = cumulativeApplicationsCount[9] - draws.find(([step]) => step === "dd9")[1];
  cumulativeApplicationsCount[14] = cumulativeApplicationsCount[15] - draws.find(([step]) => step === "dd3")[1];
  const options = {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
      formatter: function (params) {
        let tar;
        if (params[1] && params[1].value !== "-") {
          tar = params[1];
        } else {
          tar = params[2];
        }
        return tar && tar.name + "<br/>" + tar.seriesName + " : " + tar.value;
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
        for (let i = 0; i < draws.length; i++) {
          list.push(dataPointToRangeMap[draws[i][0]]);
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
        data: draws.map(([step, value], index) =>
          aggregatedIndexes.includes(step) ? value : "-"
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
        data: draws.map(([step, value], index) =>
          aggregatedIndexes.includes(step) ? "-" : value
        ),
        markPoint: {
          data: [
            { name: "Max", value: 182.2, xAxis: 7, yAxis: 183 },
            { name: "Min", value: 2.3, xAxis: 11, yAxis: 3 },
          ],
        },
        markLine: {
          data: [{ type: "average", name: "Avg" }],
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

export default WaterfallChart;
