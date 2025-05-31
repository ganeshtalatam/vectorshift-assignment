import { useCallback } from "react";
import { Handle, Position } from "reactflow";
import { Mentions } from "antd";
import { shallow } from "zustand/shallow";
import {
  FiLogIn,
  FiLogOut,
  FiFileText,
  FiX,
  FiHelpCircle,
  FiPlus,
  FiEdit2,
} from "react-icons/fi";
import { useStore } from "../store";
import "./NodeBase.css";

const variantIcons = {
  Input: <FiLogIn size={22} />,
  Output: <FiLogOut size={22} />,
  Text: <FiFileText size={22} />,
  LLM: <FiFileText size={22} />,
};

const variantDescriptions = {
  Input: "Pass data of different types into your workflow",
  Output: "Output data of different types from your workflow",
  Text: "Accepts Text from upstream nodes and allows you to write additional text / concatenate different texts to pass to downstream nodes.",
  LLM: "This is a LLM",
};

const selector = (state) => ({
  getNodeID: state.getNodeID,
  getAllNodesByType: state.getAllNodesByType,
  onConnect: state.onConnect,
});

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
  const { getAllNodesByType, onConnect } = useStore(selector, shallow);

  // Handler for Mentions selection
  const handleMentionSelect = useCallback(
    (option) => {
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
    },
    [getAllNodesByType, onConnect, id]
  );

  return (
    <div className="nodebase-card">
      {/* Header Card */}
      <div className="nodebase-header">
        <div className="nodebase-header-row">
          <span className="nodebase-icon">{variantIcons[variant]}</span>
          <span className="nodebase-variant">{variant}</span>
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
        <div className="nodebase-header-desc">
          {variantDescriptions[variant]}
        </div>
      </div>

      {/* Node name */}
      {(variant === "Input" || variant === "Output" || variant === "Text") && (
        <div className="nodebase-name">
          {currName || `${variant.toLowerCase()}_0`}
        </div>
      )}

      {/* Controls */}
      {(variant === "Input" || variant === "Output") && (
        <div className="nodebase-controls-row">
          <label className="nodebase-label">
            Type
            <FiHelpCircle
              size={15}
              color="#6366f1"
              title="Type of input/output"
            />
          </label>
          <span className="nodebase-dropdown-badge">Dropdown</span>
        </div>
      )}

      {(variant === "Input" || variant === "Output") && (
        <div style={{ margin: "0 12px 12px 12px" }}>
          <select
            value={value}
            onChange={onTypeChange}
            className="nodebase-select"
          >
            <option value="Text">Text</option>
            <option value="File">File</option>
          </select>
        </div>
      )}

      {variant === "Text" && (
        <div className="nodebase-text-section">
          <label className="nodebase-text-label">
            Text
            <span className="nodebase-required">*</span>
            <FiHelpCircle size={15} color="#6366f1" title="Text input" />
            <div style={{ flex: 1 }} />
            <button className="nodebase-action-btn" title="Add">
              <FiPlus />
            </button>
            <button className="nodebase-action-btn" title="Edit">
              <FiEdit2 />
            </button>
            <span className="nodebase-type-badge">Text</span>
          </label>
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
        </div>
      )}

      {/* Handles */}
      {variant === "Input" && (
        <Handle
          type="source"
          position={Position.Right}
          id={`${id}-value`}
          style={{ top: "50%", borderColor: "#c7d2fe", borderWidth: 2 }}
        />
      )}
      {variant === "Output" && (
        <Handle
          type="target"
          position={Position.Left}
          id={`${id}-value`}
          style={{ top: "50%", borderColor: "#c7d2fe", borderWidth: 2 }}
        />
      )}
      {variant === "Text" && (
        <Handle
          type="target"
          position={Position.Left}
          id={`${id}-output`}
          style={{ top: "50%", borderColor: "#c7d2fe", borderWidth: 2 }}
        />
      )}
      {variant === "LLM" && (
        <div>
          <Handle
            type="target"
            position={Position.Left}
            id={`${id}-system`}
            style={{ top: `${100 / 3}%` }}
          />
          <Handle
            type="target"
            position={Position.Left}
            id={`${id}-prompt`}
            style={{ top: `${200 / 3}%` }}
          />
          <Handle
            type="source"
            position={Position.Right}
            id={`${id}-response`}
          />
        </div>
      )}
    </div>
  );
};

export default NodeBase;
