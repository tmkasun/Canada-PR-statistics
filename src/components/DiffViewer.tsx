import React, { useState } from "react";

export const DiffViewer: React.FC<{ diff: number, invert?: boolean }> = (props) => {
  const [showHighTool, setShowHighTool] = useState(false);
  const [showLowTool, setShowLowTool] = useState(false);
  const { diff, invert = false } = props;
  return (
    <div className="relative flex">
      {diff > 0 && (
        <span
          onMouseEnter={() => setShowHighTool(true)}
          onMouseLeave={() => setShowHighTool(false)}
          style={{
            color: invert ? "red" : "green",
            cursor: "default"
          }}
        >
          ▲{showHighTool && <div className="absolute bg-slate-100 p-1 shadow rounded-lg capitalize w-52">Relative to last draw</div>}
        </span>
      )}
      {diff < 0 && (
        <span
          onMouseEnter={() => setShowLowTool(true)}
          onMouseLeave={() => setShowLowTool(false)}
          style={{ color: invert ? "green" : "red" }}
        >
          {" "}
          ▼ {showLowTool && <div className="absolute bg-slate-100 p-1 shadow rounded-lg capitalize w-52">Decreased relative to last draw</div>}
        </span>
      )}
    </div>
  );
};

export default DiffViewer;
