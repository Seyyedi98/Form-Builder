import { useDraggable, useDroppable } from "@dnd-kit/core";
import { useState } from "react";
import { FormElements } from "./form-elements";
import { BiSolidTrash } from "react-icons/bi";
import useCanvas from "@/hooks/use-canvas";
import { Button } from "../ui/shadcn/button";
import { cn } from "@/lib/utils";

const CanvasElementWrapper = ({ element }) => {
  const [mouseIsOver, setMouseIsOver] = useState(false);
  const { removeElement, selectedElement, setSelectedElement } = useCanvas();

  const draggable = useDraggable({
    id: element.id + "-drag-handler",
    data: {
      type: element.type,
      elementId: element.id,
      isCanvasElement: true,
    },
  });

  // return canvas element component associated with form element
  const CanvasElement = FormElements[element.type].CanvasComponent;

  const topHalf = useDroppable({
    id: element.id + "-top",
    data: {
      type: element.type,
      elementId: element.id,
      isTopHalfCanvasElement: true,
    },
  });

  const bottomHalf = useDroppable({
    id: element.id + "--bottom",
    data: {
      type: element.type,
      elementId: element.id,
      isBottomHalfCanvasElement: true,
    },
  });

  // Hide currently draggind item in canvas
  if (draggable.isDragging) {
    return null;
  }

  return (
    <div
      ref={draggable.setNodeRef}
      {...draggable.listeners}
      {...draggable.attributes}
      className="relative h-[120px] flex flex-col text-foreground hover:cursor-pointer
     rounded-md ring-1 ring-accent ring-inset"
      onMouseEnter={() => {
        setMouseIsOver(true);
      }}
      onMouseLeave={() => {
        setMouseIsOver(false);
      }}
      onClick={(e) => {
        e.stopPropagation();
        setSelectedElement(element);
      }}
    >
      {/* Top droppable half */}
      <div
        ref={topHalf.setNodeRef}
        className="absolute w-full h-1/2 rounded-t-md"
      />

      {/* Bottom droppable half */}
      <div
        ref={bottomHalf.setNodeRef}
        className="absolute w-full bottom-0 h-1/2 rounded-b-md"
      />

      {mouseIsOver && (
        <>
          {/* Remove element btn */}
          <div className="absolute left-0 h-full">
            <Button
              className="justify-center h-full border rounded-md rounded-r-none bg-red-500
            "
              variant="outline"
              onClick={(e) => {
                e.stopPropagation();
                removeElement(element.id);
              }}
            >
              <BiSolidTrash className="h-6 w-6" />
            </Button>
          </div>
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
        animate-pulse"
          >
            <p className="text-muted-foreground text-sm">کلیک کنید یا بکشید</p>
          </div>
        </>
      )}
      {topHalf.isOver && (
        <div className="absolute top-0 w-full rounded-md h-[7px] bg-primary rounded-b-none" />
      )}
      <div
        className={cn(
          "flex w-full items-center rounded-md transition-all duration-200 h-[120px] bg-accent/40 px-4 py-2 pointer-events-none opacity-100",
          mouseIsOver && "opacity-30"
        )}
      >
        <CanvasElement elementInstance={element} />
      </div>
      {bottomHalf.isOver && (
        <div className="absolute bottom-0 w-full rounded-md h-[7px] bg-primary rounded-t-none" />
      )}
    </div>
  );
};

export default CanvasElementWrapper;
