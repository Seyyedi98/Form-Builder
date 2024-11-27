"use client";

import {
  DndContext,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import Canvas from "./canvas";
import DragOverlayWrapper from "./drag-overlay-wrapper";
import PreviewDialogBtn from "./preview-dialog-btn";
import PublishFormBtn from "./publish-form-btn";
import SaveFormBtn from "./save-form-btn";
import { useEffect } from "react";
import useCanvas from "@/hooks/use-canvas";

const FormBuilder = ({ form }) => {
  const { setElements } = useCanvas();

  const mouseSensor = useSensor(MouseSensor, {
    // Require the mouse to move by 10 pixels before activating
    activationConstraint: {
      distance: 10,
    },
  });

  const touchSensor = useSensor(TouchSensor, {
    // Press delay of 250ms, with tolerance of 5px of movement
    activationConstraint: {
      delay: 250,
      tolerance: 5,
    },
  });
  const sensors = useSensors(mouseSensor, touchSensor);

  useEffect(() => {
    const elements = JSON.parse(form.content);
    setElements(elements);
  }, [form, setElements]);

  return (
    <DndContext sensors={sensors}>
      <div className="flex flex-col w-full">
        <div className="flex justify-between border-b-2 p-4 gap-3 items-center">
          <h2 className="truncate font-medium">
            <span className="text-muted-foreground mr-2">فرم: </span>
            {form.name}
          </h2>
          <div className="flex items-center gap-2">
            <PreviewDialogBtn />
            {!form.published && (
              <>
                <SaveFormBtn id={form.id} />
                <PublishFormBtn />
              </>
            )}
          </div>
        </div>
        <div
          className="flex w-full flex-grow items-center justify-center relative
      overflow-y-auto h[200px] bg-accent dark:bg-[url(/paper-dark.svg)] bg-[url(/paper.svg)]"
        >
          <Canvas />
        </div>
      </div>
      <DragOverlayWrapper />
    </DndContext>
  );
};

export default FormBuilder;
