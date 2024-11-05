import { useEffect, useMemo, useRef } from "react";
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
import { IRound } from "~/data/consts";



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

const InvitationsByYear = (props: { id: string; rounds?: IRound[] }) => {
  const chartRef = useRef<HTMLDivElement | null>(null);
  const chartRefInst = useRef<ECharts | null>(null);
  const { id, rounds } = props;

  const options = useMemo(() => {
    // Aggregate number of invitations by year and program
    function summarizeInvitations(data: any) {
      const summary: any = {};
      const programs: any = {};
      data.forEach((item: any) => {
        const year = new Date(item.drawDate).getFullYear();
        const programName = item.drawName;
        if (!programs[programName]) {
          programs[programName] = {
            name: programName,
            type: "bar",
            stack: "total",
            label: {
              show: true,
            },
            emphasis: {
              focus: "series",
            },
            data: [],
          };
        }
        if (!summary[year]) {
          summary[year] = { total: 0 };
        }

        if (!summary[year][programName]) {
          summary[year][programName] = {
            numberOfDraws: 0,
            drawSize: 0,
          };
        }
        const invitations = parseInt(item.drawSize.replace(",", ""));
        summary[year][programName].numberOfDraws += 1;
        summary[year][programName].drawSize += invitations;
        summary[year].total += invitations;
      });

      return [summary, programs];
    }
    const [summarizedData, programs] = summarizeInvitations(rounds) as [
      any[],
      { [key: string]: any }
    ];
    const dataYears = Object.keys(summarizedData).sort();
    for (const yearSummary of Object.values(summarizedData)) {
      const availableProgramsThisYear =
        Object.keys(yearSummary as any).filter((key) => key !== "total") || [];
      for (const [programName, programData] of Object.entries(programs)) {
        if (availableProgramsThisYear.includes(programName)) {
          programData.data.push(yearSummary[programName].drawSize);
        } else {
          programData.data.push('-');
        }
      }
    }
    return {
      tooltip: {
        trigger: "axis",
        axisPointer: {
          // Use axis to trigger tooltip
          type: "shadow", // 'shadow' as default; can also be 'line' or 'shadow'
        },
      },
      legend: {},
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true,
      },
      yAxis: {
        type: "value",
      },
      xAxis: {
        type: "category",
        data: dataYears,
      },
      series: Object.values(programs),
    };
  }, [rounds]);
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

export default InvitationsByYear;
