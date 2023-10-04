import { Dayjs } from "dayjs";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import React, { useState } from "react";

dayjs.extend(relativeTime);


export interface IActivity {
    name: string;
    time: Dayjs;
    id: string
}
export interface IActivities {
    data: IActivity[],
    onClick?: (id: string) => void
}

export const ToolTip = (props: { children: React.ReactNode, message: string }) => {
    const { children, message } = props;
    const [isToolTipOpen, setIsToolTipOpen] = useState(false);

    return (
        <div
            className="relative shrink-0 flex gap-x-1"
            onMouseEnter={() => setIsToolTipOpen(true)}
            onMouseLeave={() => setIsToolTipOpen(false)}
        >
            {children}
            {isToolTipOpen && (
                <div className="absolute top-6 left-0 bg-gray-800 text-white p-2 whitespace-nowrap rounded-lg">{message}</div>
            )}
        </div>
    );

};

export function Activities(props: IActivities) {
    const { data, onClick } = props;

    return (
        <ul role='list' className="m-0 p-0 list-none ">
            {data.map(({ name, time, id }, index) => (
                <li onClick={() => onClick && onClick(id)} key={id} className="flex gap-x-4 relative items-start mt-6 first:mt-0">
                    {data.length - 1 !== index && (<div className="w-6 flex top-0 left-0 absolute -bottom-6 justify-center">
                        <div className=" bg-gray-200 w-[1px]">
                        </div>
                    </div>)}
                    <div className="bg-gray-50 justify-center items-center w-6 h-6 flex relative">
                        <div className=" ring-gray-300 ring-1 bg-gray-200 rounded-full w-[0.375rem] h-[0.375rem]">
                        </div>
                    </div>
                    <div className="hover:bg-white cursor-pointer flex flex-col w-full justify-start items-end">
                        <p className="flex-1 leading-5 py-1 text-gray-950 font-semibold self-start">
                            {name}
                        </p>
                        <ToolTip message={`${time.format("MMMM DD YYYY")}`}>
                            <time
                                dateTime={`${time}`} className="text-gray-700 text-sm">
                                {`${time.fromNow()}`}
                            </time>
                            <sup>
                                <svg className="w-3 h-3 text-blue-700 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 9h2v5m-2 0h4M9.408 5.5h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                </svg>
                            </sup>
                        </ToolTip>
                    </div>

                </li>
            ))}
        </ul>
    );
}