import React, { useEffect, useRef, useState } from "react";

export interface ISelectData {
    name: string;
    key: string;
}

export interface ISelector extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "onChange"> {
    onChange: (e: ISelectData) => void;
    data: ISelectData[];
    label: React.ReactNode;
    marked?: string;
}

export default function Selector(props: ISelector) {
    const [isOpen, setIsOpen] = useState(false);
    const { value, onChange, data = [], label, marked } = props;
    const dropdownListRef = useRef<HTMLDivElement | null>(null);
    const currentField = data.find((field) => field.key === value);
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownListRef.current && !dropdownListRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };

    }, []);
    return (
        <div className="flex grow justify-center items-center gap-x-2">
            <label id="listbox-label" className="text-[#94A5B9] leading-5 font-normal">{label}</label>
            <div ref={dropdownListRef} className="relative grow w-3/4">
                <button onClick={(e) => { e.stopPropagation(); e.preventDefault(); setIsOpen(true); }} type="button" className="relative cursor-pointer w-full rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6" aria-haspopup="listbox" aria-expanded="true" aria-labelledby="listbox-label">
                    <span className="flex items-center">
                        <span className="block truncate text-[#020618] font-semibold leading-5">{currentField?.name}</span>
                    </span>
                    <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                        <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fillRule="evenodd" d="M10 3a.75.75 0 01.55.24l3.25 3.5a.75.75 0 11-1.1 1.02L10 4.852 7.3 7.76a.75.75 0 01-1.1-1.02l3.25-3.5A.75.75 0 0110 3zm-3.76 9.2a.75.75 0 011.06.04l2.7 2.908 2.7-2.908a.75.75 0 111.1 1.02l-3.25 3.5a.75.75 0 01-1.1 0l-3.25-3.5a.75.75 0 01.04-1.06z" clipRule="evenodd" />
                        </svg>
                    </span>
                </button>
                <ul className={`absolute z-10 mt-1 ${!isOpen && "hidden"} w-full transition ease-in duration-100 max-h-56 overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm`} tabIndex={-1} role="listbox" aria-labelledby="listbox-label" aria-activedescendant="listbox-option-3">
                    {data.map(({ name, key }) => (
                        <li key={key} onClick={() => { onChange({ key, name }); setIsOpen(false); }} className="text-gray-900 flex cursor-pointer hover:bg-gray-50 relative select-none py-2 pl-3 pr-9" id="listbox-option-0" role="option">

                            <div className="flex items-center w-full">
                                <span className="font-normal block truncate">
                                    {
                                        marked && marked === key && (
                                            <sup className="text-lg p-0 text-red-600">
                                                *
                                            </sup>
                                        )
                                    }
                                    {name}
                                </span>
                            </div>

                            {currentField?.key === key && (
                                <span className="text-indigo-600 absolute inset-y-0 right-0 flex items-center pr-4">
                                    <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                        <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                                    </svg>
                                </span>
                            )}
                        </li>
                    ))}

                </ul>
            </div>
        </div>
    );
}