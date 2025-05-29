import React from "react";
import { Handle, Position } from "reactflow";
import { Input } from "antd";

import {
  FiLogIn,
  FiLogOut,
  FiFileText,
  FiMaximize2,
  FiX,
  FiHelpCircle,
  FiPlus,
  FiEdit2,
} from "react-icons/fi";

const CARD_WIDTH = 300;

const variantIcons = {
  Input: <FiLogIn size={22} color="#6366f1" />,
  Output: <FiLogOut size={22} color="#6366f1" />,
  Text: <FiFileText size={22} color="#6366f1" />,
  LLM: <FiFileText size={22} color="#6366f1" />,
};

const variantDescriptions = {
  Input: "Pass data of different types into your workflow",
  Output: "Output data of different types from your workflow",
  Text: "Accepts Text from upstream nodes and allows you to write additional text / concatenate different texts to pass to downstream nodes.",
  LLM: "Large Language Model node",
};

const NodeBase = ({
  id,
  variant,
  value,
  currName,
  currText,
  onTextChange,
  onNameChange,
  onTypeChange,
  onRemove,
  onExpand,
}) => {
  return (
    <div
      style={{
        minWidth: CARD_WIDTH,
        maxWidth: CARD_WIDTH,
        background: "#fff",
        border: "2px solid #c7d2fe",
        borderRadius: 8,
        boxShadow: "0 4px 16px rgba(99,102,241,0.08)",
        fontFamily: "Inter, sans-serif",
        position: "relative",
        padding: 0,
        margin: 0,
      }}
    >
      {/* Header Card */}
      <div
        style={{
          background: "#eef2ff",
          borderRadius: 6,
          margin: 8,
          padding: "10px 12px 6px 12px",
          border: "1px solid #e0e7ff",
          display: "flex",
          flexDirection: "column",
          gap: 4,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          {variantIcons[variant]}
          <span style={{ color: "#6366f1", fontWeight: 600, fontSize: 18 }}>
            {variant}
          </span>
          <div style={{ flex: 1 }} />
          {onExpand && (
            <button
              onClick={onExpand}
              style={{
                background: "none",
                border: "none",
                color: "#6366f1",
                fontSize: 16,
                cursor: "pointer",
                marginRight: 2,
                padding: 2,
                borderRadius: 4,
                transition: "background 0.15s",
              }}
              title="Expand"
            >
              <FiMaximize2 />
            </button>
          )}
          {onRemove && (
            <button
              onClick={onRemove}
              style={{
                background: "none",
                border: "none",
                color: "#6366f1",
                fontSize: 18,
                cursor: "pointer",
                padding: 2,
                borderRadius: 4,
                transition: "background 0.15s",
              }}
              title="Remove"
            >
              <FiX />
            </button>
          )}
        </div>
        <div style={{ color: "#000000", fontSize: 11, marginLeft: 0 }}>
          {variantDescriptions[variant]}
        </div>
      </div>

      {/* Node name */}
      {(variant === "Input" || variant === "Output" || variant === "Text") && (
        <div
          style={{
            background: "#ede9fe",
            color: "#6366f1",
            borderRadius: 8,
            padding: "6px 0",
            textAlign: "center",
            fontWeight: 500,
            fontSize: 15,
            letterSpacing: 0.2,
            margin: "0 12px 10px 12px",
          }}
        >
          {currName || `${variant.toLowerCase()}_0`}
        </div>
      )}

      {/* Controls */}
      {(variant === "Input" || variant === "Output") && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            margin: "0 12px 10px 12px",
          }}
        >
          <label
            style={{
              fontSize: 14,
              color: "#444",
              minWidth: 32,
              display: "flex",
              alignItems: "center",
              gap: 2,
            }}
          >
            Type
            <FiHelpCircle
              size={15}
              color="#6366f1"
              title="Type of input/output"
            />
          </label>
          <span
            style={{
              background: "#6366f1",
              color: "#fff",
              borderRadius: 6,
              fontSize: 13,
              fontWeight: 500,
              padding: "2px 8px",
              marginLeft: 2,
            }}
          >
            Dropdown
          </span>
        </div>
      )}

      {(variant === "Input" || variant === "Output") && (
        <div style={{ margin: "0 12px 12px 12px" }}>
          <select
            value={value}
            onChange={onTypeChange}
            style={{
              width: "100%",
              border: "1.5px solid #c7d2fe",
              background: "#fff",
              color: "#222",
              borderRadius: 8,
              padding: "8px 10px",
              fontWeight: 500,
              fontSize: 15,
              outline: "none",
              cursor: "pointer",
              marginTop: 2,
              appearance: "none",
              boxSizing: "border-box",
              transition: "border-color 0.2s",
            }}
            onFocus={(e) => (e.target.style.borderColor = "#6366f1")}
            onBlur={(e) => (e.target.style.borderColor = "#c7d2fe")}
          >
            <option value="Text">Text</option>
            <option value="File">File</option>
          </select>
        </div>
      )}

      {variant === "Text" && (
        <div style={{ margin: "8px 12px" }}>
          <label
            style={{
              fontSize: 14,
              color: "#444",
              fontWeight: 500,
              display: "flex",
              alignItems: "center",
              gap: 4,
            }}
          >
            Text
            <span style={{ color: "#a21caf", marginLeft: 2 }}>*</span>
            <FiHelpCircle size={15} color="#6366f1" title="Text input" />
            <div style={{ flex: 1 }} />
            <button
              style={{
                background: "#ede9fe",
                border: "1px solid #c7d2fe",
                borderRadius: 4,
                padding: "2px 4px",
                marginRight: 2,
                cursor: "pointer",
                color: "#6366f1",
                fontSize: 14,
                marginLeft: 2,
              }}
              title="Add"
            >
              <FiPlus />
            </button>
            <button
              style={{
                background: "#ede9fe",
                border: "1px solid #c7d2fe",
                borderRadius: 4,
                padding: "2px 4px",
                marginRight: 2,
                cursor: "pointer",
                color: "#6366f1",
                fontSize: 14,
              }}
              title="Edit"
            >
              <FiEdit2 />
            </button>
            <span
              style={{
                background: "#6366f1",
                color: "#fff",
                borderRadius: 6,
                fontSize: 13,
                fontWeight: 500,
                padding: "2px 8px",
                marginLeft: 2,
              }}
            >
              Text
            </span>
          </label>
          <Input.TextArea
            type="text"
            value={currText}
            onChange={onTextChange}
            style={{
              marginTop: 6,
              border: "1.5px solid #c7d2fe",
              borderRadius: 8,
              padding: "8px 10px",
              fontSize: 15,
              background: "#fff",
              width: "90%",
              outline: "none",
              transition: "border-color 0.2s",
              color: "#a21caf",
            }}
            onFocus={(e) => (e.target.style.borderColor = "#6366f1")}
            onBlur={(e) => (e.target.style.borderColor = "#c7d2fe")}
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
          type="source"
          position={Position.Right}
          id={`${id}-output`}
          style={{ top: "50%", borderColor: "#c7d2fe", borderWidth: 2 }}
        />
      )}
    </div>
  );
};

export default NodeBase;
