import { useState } from "react";
import { useIRCCData } from "./data/api";
import { EChartsOption } from "echarts";
import Statistics from "./components/Statistics";
import REBarChart from "./components/BarChart";
import LineChart from "./components/LineChart";
import AppBar from "./components/AppBar";

export default function App() {
  const [lineChartOptions, setLineChartOptions] = useState<null | EChartsOption>(null);
  const { data, isLoading } = useIRCCData(true);

  return (
    <div className="min-h-screen flex flex-col sm:m-1 md:mx-6 justify-start items-center gap-y-8">
      <AppBar />
      <div className="main-grid">
        {!isLoading && <Statistics data={data} onChange={(e) => setLineChartOptions(e)} />}
        <div className="main-graph">
          {isLoading && (
            <span className="flex justify-center items-center ">
              <svg className="animate-spin -ml-1 mr-3 h-8 w-8 text-blue-800" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg> Loading
            </span>
          )}
          <div>
            {!isLoading && lineChartOptions && (
              Array.isArray(lineChartOptions.series) && lineChartOptions.series[0].type === "bar" ?
                (<REBarChart id="c2" options={lineChartOptions} />) : (<LineChart id="c1" options={lineChartOptions} />)
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
