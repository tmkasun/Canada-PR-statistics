import React, { useState } from "react";
import { DRAW_ENDPOINT, IRound } from "~/data/consts";
import Link from "next/link";
import { IconExternalLink } from "./AppBar";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import calendar from "dayjs/plugin/calendar";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);
dayjs.extend(relativeTime);
dayjs.extend(calendar);

export interface IStatsCard {
    program: IRound | null;
    isLatest?: boolean | null
}
export default function ProgramCard(props: IStatsCard) {
    const { program, isLatest = false } = props;
    const [isToolTipOpen, setIsToolTipOpen] = useState(false);
    return (
        <div className={"relative flex border-l-2 gap-y-4 first:rounded-l-lg last:rounded-r-lg first:border-none flex-col px-8 py-10 bg-gradient-to-br via-white to-white"}>
            <div className="flex  justify-between">
                <Link href={DRAW_ENDPOINT + program?.drawNumber} target="_blank" className="text-blue-600 font-semibold flex justify-center items-center gap-1">
                    #{program?.drawNumber} <IconExternalLink />
                </Link>
                <span className={" flex gap-1"}>
                    {program?.drawDate} (
                    <span className='highlightGreen'>
                        {dayjs(program?.drawDate, ["YYYY-MM-DD", "DD-MM-YYYY"]).fromNow()}
                    </span>)
                </span>
            </div>
            <h2
                onMouseEnter={() => setIsToolTipOpen(true)}
                onMouseLeave={() => setIsToolTipOpen(false)}
                className="font-extrabold text-xl leading-[3rem] text-gray-950 block truncate cursor-help">{program?.drawName}</h2>
            {isToolTipOpen && (
                <div className="absolute bottom-2 bg-gray-950 text-white p-2 whitespace-nowrap rounded-lg">{program?.drawName}</div>
            )}
            {isLatest && (
                <div className="absolute bg-red-50 -top-2 -left-2 p-1 rounded-3xl text-gray-800 shadow-md border border-red-500">NEW</div>
            )}
        </div>
    );
}