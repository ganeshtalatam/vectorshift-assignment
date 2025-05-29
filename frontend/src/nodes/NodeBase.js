import React from "react";
import { Handle, Position } from "reactflow";

// interface NodeProps {
//   id: string;
//   label: string;
//   variant: "Text" | "Input" | "Output" | "LLM";
// }

// interface handleProps {
//   type: "source" | "target";
//   position: "Left" | "Right";
//   id: string;
//   style?: React.CSSProperties;
// }

// interface inputProps {
//   type: "text" | "file";
//   value: string;
//   onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
// }

const NodeBase = ({
  id,
  variant,
  value,
  currName,
  currText,
  onTextChange,
  onNameChange,
  onTypeChange,
}) => {
  return (
    <div style={{ width: 200, height: 80, border: "1px solid black" }}>
      {variant === "LLM" && (
        <div>
          <Handle
            type="target"
            position={Position.Left}
            id={`${id}-system`}
            style={{ top: `${100 / 3}%` }}
          />
          <div>
            <span>LLM</span>
          </div>
          <Handle
            type="target"
            position={Position.Left}
            id={`${id}-prompt`}
            style={{ top: `${200 / 3}%` }}
          />
          <div>
            <span>This is a LLM.</span>
          </div>
          <Handle
            type="source"
            position={Position.Right}
            id={`${id}-response`}
          />
        </div>
      )}
      {(variant === "Input" || variant === "Output") && (
        <div>
          {variant === "Input" && (
            <Handle
              type="source"
              position={Position.Right}
              id={`${id}-value`}
            />
          )}
          <div>
            <span>{variant}</span>
          </div>

          <div>
            <label>
              Name:
              <input type="text" value={currName} onChange={onNameChange} />
            </label>
            <label>
              Type:
              <select value={value} onChange={onTypeChange}>
                <option value="Text">Text</option>
                <option value="File">File</option>
              </select>
            </label>
          </div>
          {variant === "Output" && (
            <Handle type="target" position={Position.Left} id={`${id}-value`} />
          )}
        </div>
      )}
      {variant === "Text" && (
        <div>
          <div>
            <span>{variant}</span>
          </div>
          <div>
            <label>
              Text:
              <input type="text" value={currText} onChange={onTextChange} />
            </label>
          </div>
          <Handle type="source" position={Position.Right} id={`${id}-output`} />
        </div>
      )}
    </div>
  );
};

export default NodeBase;
