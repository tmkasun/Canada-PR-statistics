import React from "react";
import DiffViewer from "./DiffViewer";

export interface IStatsCard {
    value: number | string;
    lastValue?: number;
    label: React.ReactNode;
    invert?: boolean;
    onClick?: () => void
}
export default function StatsCard(props: IStatsCard) {
    const { value, lastValue, label, invert = false, onClick } = props;
    let change = 0;
    if (lastValue && typeof value !== "string") {
        change = value - lastValue;

    }
    const isPositive = change > 0;
    const sign = change === 0 ? "" : isPositive ? "+" : "-";
    const bgColor = sign === "+" ? invert ? "from-red-100" : "from-green-100" : sign === "-" && (invert ? "from-green-100" : "from-red-100");
    const signColor = sign === "+" ? invert ? "text-red-600" : "text-green-600" : sign === "-" && (invert ? "text-green-600" : "text-red-600");
    return (
        <div onClick={() => onClick && onClick()} className={`flex hover:shadow-md transition cursor-pointer border-l-2 gap-y-4 first:rounded-l-lg last:rounded-r-lg border-b-2 sm:border-b-0 first:border-none flex-col px-8 py-10 bg-gradient-to-br ${bgColor} via-white to-white`}>
            <div className="flex  justify-between">
                <span className="text-gray-500 font-semibold">
                    {label}
                </span>
                {change !== 0 && (<span className={`${signColor} flex gap-1`}>
                    {`${sign} ${Math.abs(change)}`}
                    <DiffViewer invert={invert} diff={change} />
                </span>)}
            </div>
            <h2 className="font-extrabold text-4xl leading-normal text-gray-950 block truncate">{value}</h2>
        </div>
    );
}