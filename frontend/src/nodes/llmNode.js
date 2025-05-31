// llmNode.js

import NodeBase from "./NodeBase";
// import { useState } from "react";
import { useStore } from "../store";

export const LLMNode = ({ id, data }) => {
  const removeNode = useStore((state) => state.removeNode);
  // const [currText, setCurrText] = useState(data?.text || "{{input}}");
  return <NodeBase id={id} variant="LLM" onRemove={() => removeNode(id)} />;
};
