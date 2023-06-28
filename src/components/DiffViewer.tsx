import React, { useState } from "react";

export const DiffViewer: React.FC<{ diff: number, invert?: boolean }> = (props) => {
  const [showHighTool, setShowHighTool] = useState(false);
  const [showLowTool, setShowLowTool] = useState(false);
  const { diff, invert = false } = props;
  return (
    <div style={{ display: "flex" }}>
      {diff}
      {diff > 0 && (
        <span
          onMouseEnter={() => setShowHighTool(true)}
          onMouseLeave={() => setShowHighTool(false)}
          style={{
            color: invert ? "red" : "green",
            position: "relative",
            cursor: "default"
          }}
        >
          ▲{showHighTool && <div className="hoverToolTip">Increased relative to last draw</div>}
        </span>
      )}
      {diff < 0 && (
        <span
          onMouseEnter={() => setShowLowTool(true)}
          onMouseLeave={() => setShowLowTool(false)}
          style={{ color: invert ? "green" : "red", position: "relative" }}
        >
          {" "}
          ▼ {showLowTool && <div className="hoverToolTip">Decreased relative to last draw</div>}
        </span>
      )}
    </div>
  );
};

export default DiffViewer;
