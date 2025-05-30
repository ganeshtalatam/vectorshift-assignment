// submit.js
import { useStore } from "./store";
import { shallow } from "zustand/shallow";

export const SubmitButton = () => {
  const selector = (state) => ({
    getNodeID: state.getNodeID,
    getAllNodesByType: state.getAllNodesByType,
    onConnect: state.onConnect,
  });

  const { onConnect } = useStore(selector, shallow);
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <button type="submit" onClick={() => console.log(onConnect())}>
        Submit
      </button>
    </div>
  );
};
