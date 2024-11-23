import { CanvasContext } from "@/context/canvas-context";
import { useContext } from "react";

function useCanvas() {
  const context = useContext(CanvasContext);

  if (!context) {
    throw new Error("useCanvas must be used inside a canvasContext");
  }

  return context;
}

export default useCanvas;
