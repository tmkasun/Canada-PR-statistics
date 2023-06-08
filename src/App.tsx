import { useState } from "react";
import "./styles.css";
import LineChart from "./components/LineChart";
import { useIRCCData, clearAndParseNumber } from "./data/api";
import { EChartsOption } from "echarts";
import TitleText from "./components/TitleText";
import Statistics from "./components/Statistics";

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
            <LineChart id="c1" options={lineChartOptions} />
          )}
        </div>
      </div>
    </div>
  );
}
