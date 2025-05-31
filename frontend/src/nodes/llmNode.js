// llmNode.js

import NodeBase from "./NodeBase";
import { useStore } from "../store";

export const LLMNode = ({ id, data }) => {
  const removeNode = useStore((state) => state.removeNode);
  return <NodeBase id={id} variant="LLM" onRemove={() => removeNode(id)} />;
};
