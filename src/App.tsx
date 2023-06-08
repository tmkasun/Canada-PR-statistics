// @ts-nocheck
import { useEffect, useState } from "react";
import "./styles.css";
// import data from "./mockData";
import LineChart from "./components/LineChart";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { DRAW_ENDPOINT } from "./data/consts";
import { useIRCCData, clearAndParseNumber } from "./data/api";
import DiffViewer from "./components/DiffViewer";

import { quantile, mean, min } from "simple-statistics";
dayjs.extend(relativeTime);

console.clear();

const SUPPORTED_PARAMS = [
  "drawNumber",
  "drawSize",
  "drawCRS",
  "dd1",
  "dd2",
  "dd3",
  "dd4",
  "dd5",
  "dd6",
  "dd7",
  "dd8",
  "dd9",
  "dd10",
  "dd11",
  "dd12",
  "dd13",
  "dd14",
  "dd15",
  "dd16",
  "dd17",
  "dd18"
];

const PROGRAMS = [
  "Federal Skilled Trades",
  "No Program Specified",
  "Provincial Nominee Program",
  "Federal Skilled Worker",
  "Canadian Experience Class"
];

export default function App() {
  const [lineChartOptions, setLineChartOptions] = useState(null);
  const [program, setProgram] = useState(PROGRAMS[1]);
  const [filteredRounds, setFilteredRounds] = useState(null);
  const [yParam, setYParam] = useState("drawCRS");
  const [duration, setDuration] = useState("a");

  let lastRound = null;
  let beforeLastRound = null;
  if (filteredRounds) {
    lastRound = filteredRounds[filteredRounds.length - 1];
    beforeLastRound = filteredRounds[filteredRounds.length - 2];
  }
  const { data, isLoading } = useIRCCData();
  // const isLoading = false;
  useEffect(() => {
    if (!data) {
      return;
    }
    const xAxisData = [];
    const dataPoints = [];
    const draws = [...data.rounds].reverse();
    const filteredRounds = [];
    for (let round of draws) {
      const checkYear = (year, duration) => {
        switch (duration) {
          case "a":
            return true;
          case "t":
            return year.includes("2023");
          case "l":
            return year.includes("2022");
          case "lt":
            return year.includes("2023") || year.includes("2022");
          default:
            return true;
        }
      };
      if (round.drawName === program && checkYear(round.drawDate, duration)) {
        xAxisData.push(round.drawDate);
        const parameter = clearAndParseNumber(round[yParam]);
        dataPoints.push(parameter);
        filteredRounds.push(
          Object.fromEntries(
            Object.entries(round).map(([key, value]) => {
              if (SUPPORTED_PARAMS.includes(key)) {
                return [key, clearAndParseNumber(value)];
              }
              return [key, value];
            })
          )
        );
      }
    }
    const legend = { data: [yParam] };
    xAxisData.unshift("date");
    dataPoints.unshift(program);
    setFilteredRounds(filteredRounds);
    const yAxisData = [
      {
        data: dataPoints,
        emphasis: { focus: "series" },
        name: yParam,
        type: "line"
      }
    ];

    let opts = {
      title: {},
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "cross",
          label: {
            backgroundColor: "#6a7985"
          }
        }
      },
      legend,
      toolbox: {
        feature: {
          saveAsImage: {}
        }
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true
      },
      xAxis: [
        {
          type: "category",
          boundaryGap: false,
          data: xAxisData
        }
      ],
      yAxis: [
        {
          type: "value"
        }
      ],
      series: yAxisData
    };
    setLineChartOptions(opts);
  }, [program, data, yParam, duration]);
  const isDataAvailable = lineChartOptions;

  let totalDraws;
  if (isDataAvailable) {
    totalDraws = lineChartOptions.xAxis[0].data.length;
  }

  return (
    <div className="App">
      <div className="titleText">
        <h1>Canada PR Stats </h1>
        <h3>
          <a
            href="https://www.canada.ca/en/immigration-refugees-citizenship/corporate/mandate/policies-operational-instructions-agreements/ministerial-instructions/express-entry-rounds.html#wb-auto-4"
            target="_blank"
          >
            Source
          </a>
        </h3>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center"
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-start",
            flexDirection: "column",
            rowGap: "1rem"
          }}
        >
          <div className="statsPanel">
            <div>Program:</div>
            <div className="statValue">
              <select
                defaultValue={PROGRAMS[1]}
                onChange={(e) => {
                  setProgram(e.target.value);
                }}
              >
                {PROGRAMS.map((p) => (
                  <option value={p} key={p}>
                    {p}
                  </option>
                ))}
              </select>
            </div>
            <div>Year:</div>
            <div className="statValue">
              <select
                defaultValue={"a"}
                onChange={(e) => {
                  setDuration(e.target.value);
                }}
              >
                <option value={"a"}>All</option>
                <option value={"t"}>This Year</option>
                <option value={"l"}>Last Year</option>
                <option value={"lt"}>Last 2 Years</option>
              </select>
            </div>
            {/* Fix style */}
            <div style={{ marginTop: "2rem" }}></div>
            <div></div>
            <div>Y Axis:</div>
            <div className="statValue">
              {lastRound && (
                <select
                  defaultValue={yParam}
                  onChange={(e) => {
                    setYParam(e.target.value);
                  }}
                >
                  {SUPPORTED_PARAMS.map((p) => (
                    <option value={p} key={p}>
                      {p}
                    </option>
                  ))}
                </select>
              )}
            </div>
          </div>
        </div>
        {lineChartOptions && (
          <div className="statsPanel">
            <div>
              Total Number of Draws in{" "}
              <b style={{ marginLeft: "0.5rem" }}>{program}</b>:
            </div>
            <div className="statValue">{totalDraws}</div>
            {program === "No Program Specified" && (
              <>
                <div>Programs:</div>
                <div className="statValue program-list">
                  {lastRound &&
                    lastRound.drawText2
                      .split(",")
                      .map((t) => <li>{t.trim()}</li>)}
                </div>
              </>
            )}
            <div>Last Draw:</div>
            <div className="statValue">
              {lastRound?.drawDate} ({dayjs(lastRound?.drawDate).fromNow()})
            </div>
            {program === "No Program Specified" && (
              <>
                <div>Next Potential Draw:</div>
                <div
                  className="statValue"
                  style={{
                    color: "red"
                  }}
                >
                  {lastRound &&
                    dayjs(lastRound?.drawDate).add(2.5, "week").fromNow()}
                </div>
              </>
            )}
            <div>Draw Number of the last draw:</div>
            <div className="statValue">
              <a href={DRAW_ENDPOINT + lastRound?.drawNumber} target="_blank">
                {lastRound?.drawNumber}
              </a>
            </div>
            <div>Draw Size:</div>
            <div className="statValue">
              {lastRound?.drawSize} (
              <DiffViewer
                diff={lastRound?.drawSize - beforeLastRound?.drawSize}
              />
              )
            </div>
            <div>Cut off CRS Scoore:</div>
            <div className="statValue">
              {lastRound?.drawCRS} (
              <DiffViewer
                invert
                diff={lastRound?.drawCRS - beforeLastRound?.drawCRS}
              />
              )
            </div>
            <div>
              Cut off CRS Scoore <b style={{ marginLeft: "0.5rem" }}>Mean</b>:
            </div>
            <div className="statValue">
              {filteredRounds &&
                mean(
                  filteredRounds.map((r) => r.drawCRS),
                  0.5
                ).toFixed(2)}
            </div>
            <div>
              Cut off CRS Scoore <b style={{ marginLeft: "0.5rem" }}>Min</b>:
            </div>
            <div className="statValue">
              {filteredRounds && min(filteredRounds.map((r) => r.drawCRS))}
            </div>
            <div>
              Cut off CRS Scoore <b style={{ marginLeft: "0.5rem" }}>90%</b>:
            </div>
            <div className="statValue">
              {filteredRounds &&
                quantile(
                  filteredRounds.map((r) => r.drawCRS),
                  0.9
                )}
            </div>
          </div>
        )}
      </div>

      {isLoading && <h2>Loading . . .</h2>}
      {!isLoading && lineChartOptions && (
        <LineChart id="c1" options={lineChartOptions} />
      )}
    </div>
  );
}
