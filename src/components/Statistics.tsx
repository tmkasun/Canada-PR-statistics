import React, { useEffect, useState } from 'react'
import { DRAW_ENDPOINT, IIRCCData, IRound, PROGRAMS, SUPPORTED_PARAMS } from "../data/consts";
import DiffViewer from "./DiffViewer";

import { quantile, mean, min } from "simple-statistics";
import useIRCCData, { clearAndParseNumber } from '../data/api';
import { EChartsOption } from 'echarts';
import dayjs from 'dayjs';
import relativeTime from "dayjs/plugin/relativeTime";
import calendar from "dayjs/plugin/calendar";
dayjs.extend(relativeTime);
dayjs.extend(calendar);

type StatisticsProps = {
    onChange: (e: EChartsOption) => void;
    data: IIRCCData | null
}

function Statistics(props: StatisticsProps) {
    const { onChange, data } = props;
    const [program, setProgram] = useState(PROGRAMS[1]);
    const [filteredRounds, setFilteredRounds] = useState<null | IRound[]>(null);
    const [yParam, setYParam] = useState<keyof IRound>("drawCRS");
    const [duration, setDuration] = useState("a");
    const [lineChartOptions, setLineChartOptions] = useState<null | EChartsOption>(null);

    useEffect(() => {
        if (!data) {
            return;
        }
        const xAxisData = [];
        const dataPoints = [];
        const draws = [...data.rounds].reverse();
        const filteredRounds: IRound[] = [];
        for (let round of draws) {
            const checkYear = (year: string, duration: string) => {
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
                const parameter = clearAndParseNumber(round[yParam] as string);
                dataPoints.push(parameter);
                filteredRounds.push(
                    Object.fromEntries(
                        Object.entries(round).map(([key, value]: [string, string]) => {
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
                    type: 'category',
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
        onChange(opts as EChartsOption);
        setLineChartOptions(opts as EChartsOption)
    }, [program, data, yParam, duration]);


    let lastRound = null;
    let beforeLastRound = null;
    const isDataAvailable = lineChartOptions;

    if (filteredRounds) {
        lastRound = filteredRounds[filteredRounds.length - 1];
        beforeLastRound = filteredRounds[filteredRounds.length - 2];
    }

    let totalDraws;
    if (isDataAvailable) {
        const xAxisData = lineChartOptions?.xAxis as NonNullable<{ data: [] }[]>
        totalDraws = xAxisData[0].data.length;
    }
    return (
        <>
            <div className="controls">
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
                    <div style={{ marginTop: '1rem' }}>Year:</div>
                    <div style={{ marginTop: '1rem' }} className="statValue">
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
                                    setYParam(e.target.value as keyof IRound);
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
            {beforeLastRound && lastRound && lineChartOptions && (
                <>
                    <div className="last-draw-data statsPanel">
                        <div>
                            Total Number of Draws in{" "}
                            <b style={{ marginLeft: "0.5rem" }}>{program}</b>:
                        </div>
                        <div className="statValue">{totalDraws}</div>
                        {/* {program === "No Program Specified" && (
                            <>
                                <div>Programs:</div>
                                <div className="statValue program-list">
                                    {lastRound &&
                                        lastRound.drawText2
                                            .split(",")
                                            .map((t) => <li>{t.trim()}</li>)}
                                </div>
                            </>
                        )} */}
                        <div>
                            Cut off CRS Scoore <b style={{ marginLeft: "0.5rem" }}>Mean</b>:
                        </div>
                        <div className="statValue">
                            {filteredRounds &&
                                mean(
                                    filteredRounds.map((r) => r.drawCRS)).toFixed(2)}
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
                    <div className="draw-stats statsPanel">

                        <div>Last Draw:</div>
                        <div className="statValue">
                            {lastRound?.drawDate} ({dayjs(lastRound?.drawDate).fromNow()})
                        </div>
                        {program === "No Program Specified" && (
                            <>
                                <div>Next Potential Draw:</div>
                                <div
                                    className="statValue"
                                >
                                    <span style={{
                                        color: "red",
                                        marginRight: '0.5rem'
                                    }}>
                                        {lastRound &&
                                            dayjs(lastRound?.drawDate).add(2.5, "week").fromNow()}
                                    </span>
                                    <span>
                                        (
                                        {lastRound &&
                                            dayjs(lastRound?.drawDate).add(2.5, "week").calendar()}
                                        )

                                    </span>
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
                                diff={lastRound.drawSize - beforeLastRound.drawSize}
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

                    </div>
                </>
            )
            }
        </>
    )
}

export default Statistics