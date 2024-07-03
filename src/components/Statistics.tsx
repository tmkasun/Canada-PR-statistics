import { useEffect, useMemo, useState } from "react";
import {
    DRAW_ENDPOINT,
    IIRCCData,
    IRound,
    PROGRAMS,
    SUPPORTED_PARAMS,
} from "../data/consts";

import { quantile, mean, min } from "simple-statistics";
import { clearAndParseNumber } from "../data/api";
import { EChartsOption } from "echarts";
import getChartOptions from "../data/chartOptions";
import Selector from "./Selector";
import REBarChart from "./BarChart";
import LineChart from "./LineChart";
import StatsCard from "./StatsCard";
import ProgramCard from "./ProgramCard";

import customParseFormat from "dayjs/plugin/customParseFormat";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import calendar from "dayjs/plugin/calendar";
import { Activities, IActivity } from "./Activities";
import WaterfallChart from "./WaterfallChart";

dayjs.extend(customParseFormat);
dayjs.extend(relativeTime);
dayjs.extend(calendar);

type StatisticsProps = {
    data: IIRCCData | null;
    isLoading?: boolean;
};

function Statistics(props: StatisticsProps) {
    const { isLoading, data } = props;
    const [program, setProgram] = useState(PROGRAMS[1]);
    const [selectedRound, setSelectedRound] = useState<null | IRound>(null);
    const [filteredRounds, setFilteredRounds] = useState<null | IRound[]>(null);
    const [yParam, setYParam] = useState<keyof IRound>("drawCRS");
    const [duration, setDuration] = useState("a");
    const [programs, setPrograms] = useState<string[]>(PROGRAMS);
    const [lineChartOptions, setLineChartOptions] =
        useState<null | EChartsOption>(null);

    const latest80Rounds = useMemo(() => {
        let latest80Rounds: IActivity[] = [];
        if (data) {
            latest80Rounds = data.rounds.slice(0, 80).map((round) => {
                const parsedDateTime = dayjs(round.drawDate);
                if (!parsedDateTime.isValid()) {
                    throw new Error(
                        `Error parsing the date time => ${round.drawDate}`
                    );
                } else {
                    return {
                        name: round.drawName,
                        time: parsedDateTime,
                        id: round.drawNumber,
                    };
                }
            });
        }
        return latest80Rounds;
    }, [data]);

    useEffect(() => {
        if (!data) {
            return;
        }
        const xAxisData = [];
        const dataPoints = [];
        const draws = [...data.rounds].reverse();
        const filteredRounds: IRound[] = [];
        const programs = new Set<string>();
        for (let round of draws) {
            programs.add(round.drawName);
            const checkYear = (year: string, duration: string) => {
                switch (duration) {
                    case "a":
                        return true;
                    case "t":
                        return year.includes("2024");
                    case "l":
                        return year.includes("2023");
                    case "lt":
                        return year.includes("2024") || year.includes("2023");
                    default:
                        return true;
                }
            };
            if (
                round.drawName === program &&
                checkYear(round.drawDate, duration)
            ) {
                xAxisData.push(round.drawDate);
                const parameter = clearAndParseNumber(round[yParam] as string);
                dataPoints.push(parameter);
                filteredRounds.push(
                    Object.fromEntries(
                        Object.entries(round).map(
                            ([key, value]: [string, string]) => {
                                if (SUPPORTED_PARAMS.includes(key)) {
                                    return [key, clearAndParseNumber(value)];
                                }
                                return [key, value];
                            }
                        )
                    )
                );
            }
        }
        xAxisData.unshift("date");
        dataPoints.unshift(program);
        setFilteredRounds(filteredRounds);
        const yAxisData = dataPoints;
        const chartType = xAxisData.length > 5 ? "line" : "bar";
        let opts = getChartOptions(yParam, xAxisData, yAxisData, chartType);
        setLineChartOptions(opts as EChartsOption);
        setPrograms([...programs]);
    }, [program, data, yParam, duration]);

    useEffect(() => {
        if (data) {
            setProgram(data.rounds[0].drawName);
        }
    }, [data]);

    let filteredLastRound = null;
    let beforeFilteredLastRound = null;
    const isDataAvailable = lineChartOptions;
    if (filteredRounds) {
        filteredLastRound =
            selectedRound || filteredRounds[filteredRounds.length - 1];
        beforeFilteredLastRound = filteredRounds[filteredRounds.length - 2];
    }

    let totalDraws;
    if (isDataAvailable) {
        const xAxisData = lineChartOptions?.xAxis as NonNullable<
            { data: [] }[]
        >;
        totalDraws = xAxisData[0].data.length - 1;
    }

    return (
        <>
            <div className="grid-cols-2 grid-rows-2 sm:grid-rows-none sm:grid-cols-4 700 w-full grid border rounded-lg">
                <ProgramCard
                    isLatest={data && data.rounds[0].drawName === program}
                    program={filteredLastRound}
                />
                <StatsCard
                    onClick={() => setYParam("drawCRS")}
                    label="CRS Score"
                    invert
                    value={filteredLastRound?.drawCRS || -1}
                    lastValue={beforeFilteredLastRound?.drawCRS}
                />
                <StatsCard
                    onClick={() => setYParam("drawSize")}
                    label="Draw Size"
                    value={filteredLastRound?.drawSize || -1}
                    lastValue={beforeFilteredLastRound?.drawSize}
                />
                <StatsCard
                    onClick={() => setYParam("dd18")}
                    label="Pool size"
                    invert
                    value={parseInt(filteredLastRound?.dd18 || "")}
                    lastValue={parseInt(beforeFilteredLastRound?.dd18 || "")}
                />
            </div>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="flex flex-col sm:flex-row w-full sm:w-fit gap-8">
                    <div className="w-80 ">
                        <Selector
                            marked={
                                (data && data.rounds[0].drawName) || undefined
                            }
                            label="Program:"
                            data={programs.map((p) => ({ name: p, key: p }))}
                            value={program}
                            onChange={(newP) => {
                                setProgram(newP.key);
                                setSelectedRound(null);
                            }}
                        />
                    </div>
                    <div className="flex justify-center items-center gap-6">
                        <div>In Last </div>
                        <div className="flex justify-center gap-x-4 items-center">
                            <button
                                className={`py-1 px-2 cursor-pointer border-b-2 ${
                                    duration === "t"
                                        ? "bg-blue-50 border-blue-600"
                                        : "hover:bg-slate-50 border-gray-300"
                                }`}
                                onClick={() => setDuration("t")}
                            >
                                1 Year
                            </button>
                            <button
                                className={`py-1 px-2 cursor-pointer border-b-2 ${
                                    duration === "lt"
                                        ? "bg-blue-50 border-blue-600"
                                        : "hover:bg-slate-50 border-gray-300"
                                }`}
                                onClick={() => setDuration("lt")}
                            >
                                2 Year
                            </button>
                            <button
                                className={`py-1 px-2 cursor-pointer border-b-2 ${
                                    duration === "a"
                                        ? "bg-blue-50 border-blue-600"
                                        : "hover:bg-slate-50 border-gray-300"
                                }`}
                                onClick={() => setDuration("a")}
                            >
                                All-time
                            </button>
                        </div>
                    </div>
                </div>

                {/* Fix style */}
                <div className="w-80">
                    <Selector
                        label="Y Axis:"
                        data={SUPPORTED_PARAMS.map((p) => ({
                            name: p,
                            key: p,
                        }))}
                        value={yParam}
                        onChange={(newP) => setYParam(newP.key as any)}
                    />
                </div>
            </div>
            {filteredLastRound && lineChartOptions && (
                <>
                    <div className="flex flex-col-reverse sm:flex-row">
                        <div className="flex flex-col gap-y-4">
                            <div className="p-7 flex flex-col justify-start gap-6 rounded-2xl border border-gray-100 bg-gray-50 w-full sm:w-72">
                                <h2 className="text-gray-950 text-xl font-semibold leading-6">
                                    Statistics
                                </h2>
                                <div className="flex flex-col gap-3">
                                    <div className="flex text-gray-500 justify-between items-center">
                                        Total Draws{" "}
                                        <span className="text-indigo-900 font-semibold">
                                            {totalDraws}
                                        </span>
                                    </div>
                                    <div className="flex text-gray-500 justify-between items-center">
                                        Mean CRS Score{" "}
                                        <span className="text-indigo-900 font-semibold">
                                            {filteredRounds &&
                                                mean(
                                                    filteredRounds.map(
                                                        (r) => r.drawCRS
                                                    )
                                                ).toFixed(0)}
                                        </span>
                                    </div>
                                    <div className="flex text-gray-500 justify-between items-center">
                                        Min CRS Score{" "}
                                        <span className="text-indigo-900 font-semibold">
                                            {filteredRounds &&
                                                min(
                                                    filteredRounds.map(
                                                        (r) => r.drawCRS
                                                    )
                                                )}
                                        </span>
                                    </div>
                                    <div className="flex text-gray-500 justify-between items-center">
                                        90% CRS Score{" "}
                                        <span className="text-indigo-900 font-semibold">
                                            {filteredRounds &&
                                                quantile(
                                                    filteredRounds.map(
                                                        (r) => r.drawCRS
                                                    ),
                                                    0.9
                                                )}
                                        </span>
                                    </div>
                                </div>
                                <div className="draw-stats statsPanel w-full sm:w-fit">
                                    {program === "No Program Specified" && (
                                        <>
                                            <div>Next Potential Draw:</div>
                                            <div className="">
                                                <span
                                                    style={{
                                                        color: "red",
                                                        marginRight: "0.5rem",
                                                    }}
                                                >
                                                    {filteredLastRound &&
                                                        dayjs(
                                                            filteredLastRound?.drawDate,
                                                            [
                                                                "YYYY-MM-DD",
                                                                "DD-MM-YYYY",
                                                            ]
                                                        )
                                                            .add(4, "week")
                                                            .fromNow()}
                                                </span>
                                                <span>
                                                    (
                                                    {filteredLastRound &&
                                                        dayjs(
                                                            filteredLastRound?.drawDate,
                                                            [
                                                                "YYYY-MM-DD",
                                                                "DD-MM-YYYY",
                                                            ]
                                                        )
                                                            .add(4, "week")
                                                            .calendar()}
                                                    )
                                                </span>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>
                            <div className="py-7 flex flex-col w-full justify-start gap-6 rounded-2xl border border-gray-100 bg-gray-50 sm:w-72">
                                <h2 className="text-gray-950 text-xl px-7 font-semibold leading-6">
                                    Recent Draws
                                </h2>
                                <div className="px-3">
                                    <Activities
                                        onClick={(drawNumber) => {
                                            const program = data?.rounds.find(
                                                (r) =>
                                                    r.drawNumber === drawNumber
                                            );
                                            if (program) {
                                                setProgram(program.drawName);
                                                setSelectedRound(program);
                                            }
                                        }}
                                        data={latest80Rounds}
                                        selectedDrawID={
                                            selectedRound?.drawNumber
                                        }
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="grow w-full sm:w-fit">
                            {!isLoading &&
                                lineChartOptions &&
                                (Array.isArray(lineChartOptions.series) &&
                                lineChartOptions.series[0].type === "bar" ? (
                                    <REBarChart
                                        id="c2"
                                        options={lineChartOptions}
                                    />
                                ) : (
                                    <LineChart
                                        id="c1"
                                        options={lineChartOptions}
                                    />
                                ))}
                        </div>
                    </div>
                    <div>
                        <h2 className="text-gray-950 text-xl font-semibold leading-6">
                            Score Distribution
                        </h2>
                        <WaterfallChart
                            filteredLastRound={filteredLastRound}
                            id="c3"
                        />
                    </div>
                </>
            )}
        </>
    );
}

export default Statistics;
