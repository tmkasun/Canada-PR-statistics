import React, { useEffect, useRef, useState } from "react";

const CharAnimator = (props: { char: string }) => {
    const { char } = props;
    return (
        <div style={{ "--item-count": "-92%" } as React.CSSProperties} className="h-10 m-auto overflow-hidden relative before:top-0 before:left-0 before:z-10 before:w-full before:content-[''] before:h-3 before:absolute before:bg-gradient-to-b before:from-[rgba(255,255,255,1)] before:to-[rgba(255,255,255,0)] after:left-0 after:bottom-0 after:z-10 after:w-full after:h-3 after:content-[''] after:absolute after:bg-gradient-to-t after:from-[rgba(255,255,255,1)] after:to-[rgba(255,255,255,0)]">
            <ul className="m-0 p-0 animate-goUp">
                {new Array("k".toLowerCase().charCodeAt(0) - "a".charCodeAt(0)).fill(null).map((_, i) => (
                    <li key={i} className="opacity-100 h-5 p-3 list-none text-xl">
                        {String.fromCharCode("a".charCodeAt(0) + i)}
                    </li>
                ))}
                <li className="opacity-100 h-5 p-3 list-none mt-3 capitalize">
                    {char}
                </li>
            </ul>
        </div>
    );
};

export default function Animate(props: { word: string }) {
    const { word } = props;
    let first = "";
    if (word.length > 0) {
        first = word.split("")[0];
    }
    const [all, setAll] = useState([<CharAnimator key={1} char={first} />]);
    useEffect(() => {
        if (word.length > all.length) {
            let timeOutId = setTimeout(() => { setAll((a) => ([...a, <CharAnimator key={a.length} char={word.split("")[a.length]} />])); }, 100);
            return () => clearTimeout(timeOutId);
        }

    }, [all.length]);
    return (
        <div className="flex">
            {all.map((e, i) => (
                <>{e}</>
            ))}
        </div>
    );

}