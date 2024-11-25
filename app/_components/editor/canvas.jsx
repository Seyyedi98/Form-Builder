"use client";

import useCanvas from "@/hooks/use-canvas";
import { idGenerator } from "@/lib/idGenerator";
import { cn } from "@/lib/utils";
import { useDndMonitor, useDroppable } from "@dnd-kit/core";
import CanvasElementWrapper from "./canvas-element-wrapper";
import CanvasSidebar from "./canvas-sidebar";
import { FormElements } from "./form-elements";

const Canvas = () => {
  const { elements, addElement, selectedElement, setSelectedElement } =
    useCanvas();

  const droppable = useDroppable({
    id: "canvas-drop-area",
    data: {
      isCanvasDropArea: true,
    },
  });

  useDndMonitor({
    onDragEnd: (event) => {
      const { active, over } = event;
      if (!active || !over) return;

      const isCanvasBtnElement = active.data?.current?.isCanvasBtnElement;
      const isDroppingOverCanvasArea = over.data?.current?.isCanvasDropArea;

      const isDroppingOverCanvasElementTopHalf =
        over.data?.current?.isTopHalfCanvasElement;
      const isDroppingOverCanvasElementBottomHalf =
        over.data?.current?.isBottomHalfCanvasElement;

      const droppingOverCanvasElement =
        isDroppingOverCanvasElementTopHalf ||
        isDroppingOverCanvasElementBottomHalf;

      ///////////////////// 1 ///////////////////////
      // When drop new element on canvas, It will be added as a last item
      if (isCanvasBtnElement && isDroppingOverCanvasArea) {
        const type = active.data?.current?.type;
        const newElement = FormElements[type].construct(idGenerator());

        addElement(elements.length, newElement);
        return;
      }

      ///////////////////// 2 ///////////////////////
      // Drop new element on top or bottom half on canvas element
      if (isCanvasBtnElement && droppingOverCanvasElement) {
        const type = active.data?.current?.type;
        const newElement = FormElements[type].construct(idGenerator());

        const overId = over.data?.current?.elementId;

        const overElementIndex = elements.findIndex((el) => el.id === overId);
        if (overElementIndex === -1) throw new Error("Element not found");

        let indexForNewElement = overElementIndex; // top half
        if (isDroppingOverCanvasElementBottomHalf) {
          indexForNewElement = indexForNewElement + 1;
        }

        addElement(indexForNewElement, newElement);
        return;
      }

      ///////////////////// 2 ///////////////////////
      // Drag canvas element and reposition them
      const reOrderCanvasElement = droppingOverCanvasElement;
    },
  });

  return (
    <div className="flex w-full h-full">
      <CanvasSidebar />
      <div
        className="p-4 w-full"
        onClick={() => {
          if (selectedElement) setSelectedElement(null);
        }}
      >
        <div
          ref={droppable.setNodeRef}
          className={cn(
            "bg-background msx-w-[920px] transition-all duration-300 h-full m-auto rounded-xl flex flex-col flex-grow items-center justify-start flex-1 overflow-y-auto",
            droppable.isOver && "ring-2 ring-primary/30"
          )}
        >
          {!droppable.isOver && elements.length === 0 && (
            <p className="text-3xl text-muted-foreground flex flex-grow items-center font-bold">
              اینجا رها کنید
            </p>
          )}

          {/* Display drop area  */}
          {droppable.isOver && elements.length === 0 && (
            <div className="p-4 w-full">
              <div className="h-[120px] rounded-md bg-primary/30"></div>
            </div>
          )}

          {/* Show dropped elemets */}
          {elements.length > 0 && (
            <div className="flex flex-col w-full gap-2 p-4">
              {elements.map((element) => (
                <CanvasElementWrapper key={element.id} element={element} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Canvas;
