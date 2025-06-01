// textNode.js

import { useStore } from "../store";
import { useState } from "react";
import NodeBase from "./NodeBase";

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || "");
  // Simpler default name: use data?.inputName or fallback to id
  const [currName, setCurrName] = useState(
    data?.inputName || `${id.replace("text-", "text_")}`
  );
  const handleNameChange = (e) => {
    setCurrName(e.target.value);
  };

  const handleTextChange = (value) => {
    setCurrText(value);
  };

  const removeNode = useStore((state) => state.removeNode);

  return (
    <NodeBase
      id={id}
      variant="Text"
      currText={currText}
      currName={currName}
      handleNameChange={handleNameChange}
      onTextChange={handleTextChange}
      onRemove={() => removeNode(id)}
    />
  );
};
