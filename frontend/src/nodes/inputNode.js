// inputNode.js

import { useState } from "react";
import { useStore } from "../store";
import NodeBase from "./NodeBase";
export const InputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(
    data?.inputName || id.replace("customInput-", "input_")
  );
  const [inputType, setInputType] = useState(data.inputType || "Text");

  const handleNameChange = (e) => {
    setCurrName(e.target.value);
  };

  const handleTypeChange = (e) => {
    setInputType(e.target.value);
  };

  const removeNode = useStore((state) => state.removeNode);

  return (
    <NodeBase
      id={id}
      variant="Input"
      currName={currName}
      value={inputType}
      onNameChange={handleNameChange}
      onTypeChange={handleTypeChange}
      onRemove={() => removeNode(id)}
    />
  );
};
