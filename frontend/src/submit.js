import { PiRocketLaunchDuotone } from "react-icons/pi";
import React from "react";
import { useStore } from "./store";

export const SubmitButton = () => {
  const [hover, setHover] = React.useState(false);
  const nodes = useStore((state) => state.nodes);
  const edges = useStore((state) => state.edges);

  const handleSubmit = async () => {
    try {
      const response = await fetch("http://localhost:8000/pipelines/parse", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nodes, edges }),
      });
      if (!response.ok) throw new Error("Failed to submit pipeline");
      const data = await response.json();
      alert(
        `Pipeline Info:\n\nNodes: ${data.num_nodes}\nEdges: ${
          data.num_edges
        }\nIs DAG: ${data.is_dag ? "Yes" : "No"}`
      );
    } catch (error) {
      alert("Error submitting pipeline: " + error.message);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <button
        type="button"
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
        onClick={handleSubmit}
      >
        <PiRocketLaunchDuotone style={{ fontSize: "1.6rem" }} />
        Submit
      </button>
    </div>
  );
};
