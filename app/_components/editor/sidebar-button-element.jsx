import React from "react";
import { Button } from "../ui/shadcn/button";
import { useDraggable } from "@dnd-kit/core";
import { cn } from "@/lib/utils";
import { DatabaseZapIcon, Heading1 } from "lucide-react";

const SidebarBtnElement = ({ formElement }) => {
  const { label, icon: Icon } = formElement.CanvasBtnElement;

  const draggable = useDraggable({
    id: `Canvas-btn-${formElement.type}`,
    data: {
      type: formElement.type,
      isCanvasBtnElement: true,
    },
  });
  return (
    <Button
      ref={draggable.setNodeRef}
      className={cn(
        "flex flex-col gap-2 transition-all rounded-xl border-none bg-secondaryBg duration-300 h-28 w-28 cursor-grab",
        draggable.isDragging && "ring-2 ring-primary"
      )}
      variant="outline"
      {...draggable.listeners}
      {...draggable.attributes}
    >
      <Icon className="h-8 text-3xl w-8 text-iconLight cursor-grab" />
      <p className="text-xs text-textLight">{label}</p>
    </Button>
  );
};

export const SidebarBtnElementDragOverly = ({ formElement }) => {
  const { label, icon: Icon } = formElement.CanvasBtnElement;

  return (
    <Button
      className="flex flex-col gap-2 rounded-xl h-[120px] w-[120px] cursor-grab"
      variant="outline"
    >
      <Icon className="h-8 w-8 text-primary cursor-grab" />
      <p className="text-xs">{label}</p>
    </Button>
  );
};

export default SidebarBtnElement;
