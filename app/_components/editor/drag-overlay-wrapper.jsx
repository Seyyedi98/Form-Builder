import { DragOverlay, useDndMonitor } from "@dnd-kit/core";
import React, { useState } from "react";
import { SidebarBtnElementDragOverly } from "./sidebar-button-element";
import { FormElements } from "./form-elements";
import useCanvas from "@/hooks/use-canvas";

const DragOverlayWrapper = () => {
  const { elements } = useCanvas();
  const [draggedItem, setDraggedItem] = useState(null);
  useDndMonitor({
    onDragStart: (event) => {
      setDraggedItem(event.active);
    },
    onDragCancel: () => {
      setDraggedItem(null);
    },
    onDragEnd: () => {
      setDraggedItem(null);
    },
  });

  if (!draggedItem) return null;

  let node = <div>No drag overly</div>;
  const isSidebarBtnElement = draggedItem.data?.current?.isCanvasBtnElement;

  if (isSidebarBtnElement) {
    const type = draggedItem.data?.current?.type;
    node = <SidebarBtnElementDragOverly formElement={FormElements[type]} />;
  }

  const isCanvasElement = draggedItem.data?.current.isCanvasElement;

  if (isCanvasElement) {
    const elementId = draggedItem.data?.current.elementId;
    const element = elements.find((el) => el.id === elementId);

    if (!element) {
      node = <div>Element not found!</div>;
    } else {
      const CanvasElementComponent = FormElements[element.type].CanvasComponent;
      node = (
        <div className="flex bg-accent border-rounded-md h-[120px] w-full py-2 px-4 opacity-80">
          <CanvasElementComponent elementInstance={element} />
        </div>
      );
    }
  }

  return <DragOverlay>{node}</DragOverlay>;
};

export default DragOverlayWrapper;
