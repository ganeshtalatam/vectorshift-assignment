import React, { useState } from "react";
import NodeBase from "./NodeBase";
import { useStore } from "../store";

const TransformationNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(
    data?.inputName || id.replace("transformation-", "transformation_")
  );
  const handleNameChange = (e) => {
    setCurrName(e.target.value);
  };

  const removeNode = useStore((state) => state.removeNode);
  return (
    <NodeBase
      variant="Transformation"
      id={id}
      onRemove={() => removeNode(id)}
      currName={currName}
      handleNameChange={handleNameChange}
    />
  );
};

export default TransformationNode;
