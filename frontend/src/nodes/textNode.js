// textNode.js

import { useState } from "react";
import NodeBase from "./NodeBase";

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || "{{input}}");

  const handleTextChange = (value) => {
    setCurrText(value);
    console.log(value);
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
