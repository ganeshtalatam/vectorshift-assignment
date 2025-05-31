// toolbar.js
import { DraggableNode } from "./draggableNode";
import InputIcon from "@mui/icons-material/Input";
import OutputIcon from "@mui/icons-material/Output";
import { FileText } from "lucide-react";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";

export const PipelineToolbar = () => {
  const dragNodes = [
    { type: "customInput", label: "Input", icon: <InputIcon /> },
    { type: "llm", label: "LLM", icon: <ChatBubbleIcon /> },
    { type: "customOutput", label: "Output", icon: <OutputIcon /> },
    { type: "text", label: "Text", icon: <FileText /> },
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
