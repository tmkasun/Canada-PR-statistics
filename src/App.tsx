import { useState } from "react";
import "./styles.css";
import { useIRCCData } from "./data/api";
import { EChartsOption } from "echarts";
import TitleText from "./components/TitleText";
import Statistics from "./components/Statistics";
import REBarChart from "./components/BarChart";
import LineChart from "./components/LineChart";

export default function App() {
  const [lineChartOptions, setLineChartOptions] = useState<null | EChartsOption>(null);
  const { data, isLoading } = useIRCCData();

  return (
    <div className="App">
      <TitleText />
      <div className="main-grid">
        {!isLoading && <Statistics data={data} onChange={(e) => setLineChartOptions(e)} />}
        <div className="main-graph">
          {isLoading && <h2>Loading . . .</h2>}
          {!isLoading && lineChartOptions && (
            Array.isArray(lineChartOptions.series) && lineChartOptions.series[0].type === 'bar' ?
              (<REBarChart id="c2" options={lineChartOptions} />) : (<LineChart id="c1" options={lineChartOptions} />)
          )}
        </div>
      </div>
    </div>
  );
}
