// outputNode.js

import { useState } from "react";
import NodeBase from "./NodeBase";

export const OutputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(
    data?.outputName || id.replace("customOutput-", "output_")
  );
  const [outputType, setOutputType] = useState(data.outputType || "Text");

  const handleNameChange = (e) => {
    setCurrName(e.target.value);
  };

  const handleTypeChange = (e) => {
    setOutputType(e.target.value);
  };

  return (
    <NodeBase
      id={id}
      variant="Output"
      currName={currName}
      value={outputType}
      onNameChange={handleNameChange}
      onTypeChange={handleTypeChange}
    />
  );
};
