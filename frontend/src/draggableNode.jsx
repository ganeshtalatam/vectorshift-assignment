// draggableNode.js

import React from "react";
import "./draggableNode.css";

export const DraggableNode = ({ type, label, children }) => {
  const onDragStart = (event, nodeType) => {
    const appData = { nodeType };
    event.target.style.cursor = "grabbing";
    event.dataTransfer.setData(
      "application/reactflow",
      JSON.stringify(appData)
    );
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <div
      className={`draggable-node ${type}`}
      onDragStart={(event) => onDragStart(event, type)}
      onDragEnd={(event) => (event.target.style.cursor = "grab")}
      draggable
    >
      <div
        style={{
          fontSize: 28,
          marginBottom: 8,
          color: "#222",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {children}
      </div>
      <span
        style={{
          color: "#222",
          fontWeight: 500,
          fontSize: 14,
          letterSpacing: 0.2,
        }}
      >
        {label}
      </span>
    </div>
  );
};
