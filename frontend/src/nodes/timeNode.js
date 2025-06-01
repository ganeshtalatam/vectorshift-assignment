import React, { useState } from "react";
import NodeBase from "./NodeBase";
import { useStore } from "../store";

const TimeNode = ({ id, data, ...props }) => {
  const [currName, setCurrName] = useState(
    data?.inputName || id.replace("time-", "time_")
  );
  const handleNameChange = (e) => {
    setCurrName(e.target.value);
  };

  const removeNode = useStore((state) => state.removeNode);
  return (
    <NodeBase
      id={id}
      variant="Time"
      currName={currName}
      handleNameChange={handleNameChange}
      onRemove={() => removeNode(id)}
    />
  );
};

export default TimeNode;
