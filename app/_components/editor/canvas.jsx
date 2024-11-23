"use client";

import { useDroppable } from "@dnd-kit/core";
import CanvasSidebar from "./canvas-sidebar";
import { cn } from "@/lib/utils";
import { useState } from "react";
import useCanvas from "@/hooks/use-canvas";

const Canvas = () => {
  const { elements, addElement } = useCanvas();

  const droppable = useDroppable({
    id: "designer-drop-area",
    data: {
      isDesignerDropArea: true,
    },
  });

  return (
    <div className="flex w-full h-full">
      <CanvasSidebar />
      <div className="p-4 w-full">
        <div
          ref={droppable.setNodeRef}
          className={cn(
            "bg-background msx-w-[920px] transition-all duration-300 h-full m-auto rounded-xl flex flex-col flex-grow items-center justify-start flex-1 overflow-y-auto",
            droppable.isOver && "ring-2 ring-primary/30"
          )}
        >
          {!droppable.isOver && (
            <p className="text-3xl text-muted-foreground flex flex-grow items-center font-bold">
              اینجا رها کنید
            </p>
          )}

          {/* Display drop area  */}
          {droppable.isOver && (
            <div className="p-4 w-full">
              <div className="h-[120px] rounded-md bg-primary/30"></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Canvas;
