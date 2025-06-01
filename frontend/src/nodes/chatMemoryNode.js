import React, { useState } from "react";
import NodeBase from "./NodeBase";
import { useStore } from "../store";

const ChatMemoryNode = ({ id, data, ...props }) => {
  const [currName, setCurrName] = useState(
    data?.inputName || id.replace("time_")
  );
  const handleNameChange = (e) => {
    setCurrName(e.target.value);
  };

  const removeNode = useStore((state) => state.removeNode);
  return (
    <NodeBase
      id={id}
      variant="ChatMemory"
      onRemove={() => removeNode(id)}
      handleNameChange={handleNameChange}
      currName={currName}
    />
  );
};

export default ChatMemoryNode;
