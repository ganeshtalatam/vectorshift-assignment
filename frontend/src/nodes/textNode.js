// textNode.js

import { useStore } from "../store";
import { useState } from "react";
import NodeBase from "./NodeBase";

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || "");

  const handleTextChange = (value) => {
    setCurrText(value);
    console.log(value);
  };

  const removeNode = useStore((state) => state.removeNode);

  return (
    <NodeBase
      id={id}
      variant="Text"
      currText={currText}
      onTextChange={handleTextChange}
      onRemove={() => removeNode(id)}
    />
  );
};
