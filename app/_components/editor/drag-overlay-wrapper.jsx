import { DragOverlay, useDndMonitor } from "@dnd-kit/core";
import React, { useState } from "react";
import { SidebarBtnElementDragOverly } from "./sidebar-button-element";
import { FormElements } from "./form-elements";

const DragOverlayWrapper = () => {
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

  return <DragOverlay>{node}</DragOverlay>;
};

export default DragOverlayWrapper;
