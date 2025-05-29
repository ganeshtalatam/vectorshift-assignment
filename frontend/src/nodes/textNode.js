// textNode.js

import { useState } from "react";
import NodeBase from "./NodeBase";

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || "{{input}}");

  const handleTextChange = (e) => {
    setCurrText(e.target.value);
  };

  return (
    <NodeBase
      id={id}
      variant="Text"
      currText={currText}
      onTextChange={handleTextChange}
    />
  );
};
