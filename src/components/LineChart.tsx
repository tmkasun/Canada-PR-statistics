import React, { useEffect, useRef } from "react";
import * as echarts from "echarts/core";
import {
  DatasetComponent,
  GridComponent,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  ToolboxComponent,
} from "echarts/components";
import { LineChart } from "echarts/charts";
import { CanvasRenderer } from "echarts/renderers";
import { ECharts, EChartsOption, EChartsType } from "echarts";

echarts.use([
  TitleComponent,
  DatasetComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
  LineChart,
  CanvasRenderer,
  ToolboxComponent,
]);

const REChart: React.FC<{ id: string; options: EChartsOption }> = (props) => {
  const chartRef = useRef<HTMLDivElement | null>(null);
  const chartRefInst = useRef<ECharts | null>(null);
  const { id, options } = props;
  useEffect(() => {
    if (chartRefInst.current) {
      chartRefInst.current.setOption(options, true);
    }
  }, [options]);
  useEffect(() => {
    if (chartRef.current) {
      const lineChart =
        echarts.getInstanceByDom(chartRef.current) ||
        echarts.init(chartRef.current);
      lineChart.setOption(options, true);
      lineChart.on("click", function (params) {
        // TODO: Add click event
      });
      chartRefInst.current = lineChart as unknown as EChartsType;
    }
  }, []);
  return (
    <div id={id} ref={chartRef} style={{ width: "100%", height: "80vh" }} />
  );
};

export default REChart;
