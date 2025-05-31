import { PiRocketLaunchDuotone } from "react-icons/pi";
import React from "react";
// import { useStore } from "reactflow";
import { useStore } from "./store";

export const SubmitButton = () => {
  const [hover, setHover] = React.useState(false);
  const { getAllNodesDataLength, getAllEdgesDataLength } = useStore(
    (state) => ({
      getAllNodesDataLength: state.getAllNodesDataLength,
      getAllEdgesDataLength: state.getAllEdgesDataLength,
    })
  );

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <button
        type="submit"
        style={{
          display: "flex",
          alignItems: "center",
          gap: "4px",
          background: hover ? "#5146e1" : "#635bfa",
          color: "#fff",
          border: "none",
          borderRadius: "12px",
          padding: "13px 24px",
          fontSize: "1.4rem",
          fontWeight: 500,
          cursor: "pointer",
          outline: "none",
          transition: "background 0.2s",
        }}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onClick={() => {
          getAllNodesDataLength();
          getAllEdgesDataLength();
        }}
      >
        <PiRocketLaunchDuotone style={{ fontSize: "1.6rem" }} />
        Submit
      </button>
    </div>
  );
};
