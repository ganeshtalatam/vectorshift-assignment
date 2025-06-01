import { Handle, Position } from "reactflow";
import { Mentions } from "antd";
import {
  FiLogIn,
  FiLogOut,
  FiFileText,
  FiX,
  FiHelpCircle,
  FiPlus,
  FiEdit2,
} from "react-icons/fi";
import { MdOutlineTransform, MdChat } from "react-icons/md";
import { useStore } from "../store";
import "./NodeBase.css";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { RiOpenaiFill } from "react-icons/ri";

const NODE_CONFIG = {
  Input: {
    icon: <FiLogIn size={22} />,
    description: "Pass data of different types into your workflow",
    fields: [
      {
        label: "Type",
        help: "Type of input",
        type: "dropdown",
        options: ["Text", "File"],
        badge: "Dropdown",
      },
    ],
    handles: [{ type: "source", position: Position.Right, id: "value" }],
    showName: true,
  },
  Output: {
    icon: <FiLogOut size={22} />,
    description: "Output data of different types from your workflow",
    fields: [
      {
        label: "Type",
        help: "Type of output",
        type: "dropdown",
        options: ["Text", "File"],
        badge: "Dropdown",
      },
    ],
    handles: [{ type: "target", position: Position.Left, id: "value" }],
    showName: true,
  },
  Transformation: {
    icon: <MdOutlineTransform size={22} />,
    description: "Output data of different types from your workflow",
    fields: [
      {
        label: "Type",
        help: "Type of output",
        type: "dropdown",
        options: ["Text", "File"],
        badge: "Dropdown",
      },
    ],
    handles: [{ type: "target", position: Position.Left, id: "value" }],
    showName: true,
  },
  Text: {
    icon: <FiFileText size={22} />,
    description:
      "Accepts Text from upstream nodes and allows you to write additional text / concatenate different texts to pass to downstream nodes.",
    fields: [
      {
        label: "Text",
        help: "Text input",
        type: "mentions",
        badge: "Text",
        required: true,
      },
    ],
    handles: [{ type: "target", position: Position.Left, id: "output" }],
    showName: true,
  },
  LLM: {
    icon: <RiOpenaiFill size={18} />,
    description: "This is a LLM",
    fields: [],
    handles: [
      {
        type: "target",
        position: Position.Left,
        id: "system",
        style: { top: "33%" },
      },
      {
        type: "target",
        position: Position.Left,
        id: "prompt",
        style: { top: "66%" },
      },
      { type: "source", position: Position.Right, id: "response" },
    ],
    showName: false,
  },
  ChatMemory: {
    icon: <MdChat size={22} />,
    description: "Give connected nodes access to conversation history.",
    fields: [
      {
        label: "Memory Type",
        help: "Type of memory buffer",
        type: "dropdown",
        options: [
          "Full - Formatted",
          "Full - Raw",
          "Message Buffer",
          "Token Buffer",
          "Vector Database",
        ],
        defaultValue: "Token Buffer",
        badge: "Dropdown",
      },
    ],
    handles: [{ type: "source", position: Position.Right, id: "memory" }],
    showName: true,
  },
  Time: {
    icon: <AccessTimeIcon size={22} color="#6366f1" />,
    description: "Outputs the current time (often connected to LLM node)",
    fields: [
      {
        label: "Timezone",
        help: "Select the timezone",
        type: "dropdown",
        options: [
          "America/Grand Turk | GMT-04:00",
          "America/Grenada | GMT-04:00",
          "America/Guadeloupe | GMT-04:00",
          "America/Guatemala | GMT-06:00",
          "America/Guayaquil | GMT-05:00",
          "America/Guyana | GMT-04:00",
          "America/Halifax | GMT-03:00",
          "America/Havana | GMT-04:00",
          "America/Hermosillo | GMT-07:00",
          "America/Indiana/Knox | GMT-05:00",
          "America/Indiana/Marengo | GMT-04:00",
        ],
        badge: "Dropdown",
      },
      {
        label: "Output Format",
        help: "Select the output format",
        type: "dropdown",
        options: ["DD-MM-YYYY / HH:MM:SS", "DD/ MM/ YYYY", "Timestamp"],
        badge: "Dropdown",
      },
    ],
    handles: [
      { type: "source", position: Position.Right, id: "processed_time" },
    ],
    showName: true,
  },
};

const NodeBase = ({
  id,
  variant,
  value,
  currName,
  currText,
  onTextChange,
  onTypeChange,
  onRemove,
}) => {
  const config = NODE_CONFIG[variant] || {};

  const { getAllNodesByType, onConnect } = useStore((state) => ({
    getAllNodesByType: state.getAllNodesByType,
    onConnect: state.onConnect,
  }));

  const handleMentionSelect = (option) => {
    const inputNode = getAllNodesByType("customInput").find(
      (node) => node.id.replace("customInput-", "input_") === option.value
    );
    if (inputNode) {
      onConnect({
        source: inputNode.id,
        sourceHandle: `${inputNode.id}-value`,
        target: id,
        targetHandle: `${id}-output`,
      });
    }
  };

  return (
    <div className="nodebase-card">
      {/* Header */}
      <div className="nodebase-header">
        <div className="nodebase-header-row">
          <span className="nodebase-icon">{config.icon}</span>
          <span className="nodebase-variant">{variant}</span>
          <div style={{ flex: 1 }} />
          <div className="nodebase-header-actions">
            <div style={{ flex: 1 }} />
            {onRemove && (
              <button
                onClick={onRemove}
                className="nodebase-action-btn"
                title="Remove"
              >
                <FiX />
              </button>
            )}
          </div>
        </div>
        <div className="nodebase-header-desc">{config.description}</div>
      </div>

      {/* Node Name */}
      {config.showName && (
        <div className="nodebase-name">
          {currName || `${variant.toLowerCase()}_0`}
        </div>
      )}

      {/* Fields */}
      {config.fields &&
        config.fields.map((field, idx) => (
          <div
            key={idx}
            className="nodebase-controls-row"
            style={{
              flexDirection: "column",
              alignItems: "stretch",
            }}
          >
            <div
              className="nodebase-label-row"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <span
                className="nodebase-label"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 4,
                }}
              >
                {field.label}
                {field.required && <span className="nodebase-required">*</span>}
                {field.help && (
                  <FiHelpCircle size={15} color="#6366f1" title={field.help} />
                )}
              </span>
              {field.type === "mentions" && (
                <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                  }}
                >
                  <button
                    className="nodebase-action-btn"
                    title="Add"
                    tabIndex={-1}
                  >
                    <FiPlus />
                  </button>
                  <button
                    className="nodebase-action-btn"
                    title="Edit"
                    tabIndex={-1}
                  >
                    <FiEdit2 />
                  </button>
                  <span className="nodebase-type-badge">{field.badge}</span>
                </span>
              )}
              {field.type === "dropdown" && (
                <span className="nodebase-dropdown-badge">{field.badge}</span>
              )}
            </div>
            {field.type === "dropdown" && (
              <select
                value={value}
                onChange={onTypeChange}
                className="nodebase-select"
              >
                {field.options.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            )}
            {field.type === "mentions" && (
              <Mentions
                placeholder="Type {{ to utilize variables"
                prefix={"{{"}
                options={getAllNodesByType("customInput").map((node) => ({
                  label: node.id.replace("customInput-", "input_"),
                  value: node.id.replace("customInput-", "input_"),
                }))}
                type="text"
                value={currText}
                onChange={onTextChange}
                onSelect={handleMentionSelect}
                className="nodebase-mentions"
                autoSize={{ minRows: 1, maxRows: 5 }}
              />
            )}
          </div>
        ))}

      {/* Handles */}
      {config.handles &&
        config.handles.map((h) => (
          <Handle
            key={h.id}
            type={h.type}
            position={h.position}
            id={`${id}-${h.id}`}
            style={{
              top: h.style?.top || "50%",
              borderColor: "#c7d2fe",
              borderWidth: 2,
              ...h.style,
            }}
          />
        ))}
    </div>
  );
};

export default NodeBase;
