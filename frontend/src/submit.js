import { PiRocketLaunchDuotone } from "react-icons/pi";
import { useStore } from "./store";
import { Button, notification } from "antd";
import { MdOutlineDone } from "react-icons/md";
import "./submit.css";

export const SubmitButton = () => {
  const nodes = useStore((state) => state.nodes);
  const edges = useStore((state) => state.edges);
  const [api, contextHolder] = notification.useNotification();

  const handleSubmit = async () => {
    try {
      const response = await fetch("http://localhost:8000/pipelines/parse", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nodes, edges }),
      });
      if (!response.ok) throw new Error("Failed to submit pipeline");
      const data = await response.json();

      api.open({
        message: (
          <span style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                width: 28,
                height: 28,
                borderRadius: "50%",
                background: "#12b76a",
              }}
            >
              <MdOutlineDone style={{ color: "#fff", fontSize: 20 }} />
            </span>
            <span style={{ color: "#12b76a", fontWeight: 600, fontSize: 18 }}>
              Successfully Deployed!
            </span>
          </span>
        ),
        description: (
          <div style={{ color: "#222", fontSize: 15, marginTop: 8 }}>
            <b>Nodes:</b> {data.num_nodes} | <b>Edges:</b> {data.num_edges} |{" "}
            <b>Is DAG:</b> {data.is_dag ? "Yes" : "No"}
          </div>
        ),
        placement: "topRight",
        duration: 4,
        style: {
          background: "#fff",
          border: "1.5px solid #12b76a",
          boxShadow: "0 4px 24px 0 rgba(16,185,129,0.10)",
          width: 400,
          borderRadius: "12px",
          padding: "20px 28px",
        },
        icon: null,
        showProgress: true,
        pauseOnHover: true,
      });
    } catch (error) {
      api.error({
        message: "Error",
        description: error.message,
        placement: "bottomLeft",
      });
    }
  };

  return (
    <>
      {contextHolder}
      <div className="submit-btn-container">
        <Button
          type="button"
          className="submit-btn"
          disabled={nodes.length < 1}
          onClick={handleSubmit}
        >
          <PiRocketLaunchDuotone className="submit-btn-icon" />
          Submit
        </Button>
      </div>
    </>
  );
};
