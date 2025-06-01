// toolbar.js
import { DraggableNode } from "./draggableNode";
import InputIcon from "@mui/icons-material/Input";
import OutputIcon from "@mui/icons-material/Output";
import TransformIcon from "@mui/icons-material/Transform";
import { FileText } from "lucide-react";
// import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import ChatIcon from "@mui/icons-material/Chat";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { RiOpenaiFill } from "react-icons/ri";

export const PipelineToolbar = () => {
  const dragNodes = [
    { type: "customInput", label: "Input", icon: <InputIcon /> },
    { type: "customOutput", label: "Output", icon: <OutputIcon /> },
    { type: "text", label: "Text", icon: <FileText /> },
    { type: "llm", label: "LLM", icon: <RiOpenaiFill /> },
    {
      type: "transformation",
      label: "Transformation",
      icon: <TransformIcon />,
    },
    { type: "chatMemory", label: "Chat Memory", icon: <ChatIcon /> },
    { type: "time", label: "Time", icon: <AccessTimeIcon /> },
  ];
  return (
    <div style={{ padding: "10px" }}>
      <div
        style={{
          marginTop: "20px",
          display: "flex",
          flexWrap: "wrap",
          gap: "10px",
        }}
      >
        {dragNodes.map((node) => (
          <DraggableNode key={node.type} type={node.type} label={node.label}>
            {node.icon}
          </DraggableNode>
        ))}
      </div>
    </div>
  );
};
