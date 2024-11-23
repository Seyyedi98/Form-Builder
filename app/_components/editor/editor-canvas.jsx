"use client";

import { DndContext, useDroppable } from "@dnd-kit/core";
import Canvas from "./canvas";
import PreviewDialogBtn from "./preview-dialog-btn";
import PublishFormBtn from "./publish-form-btn";
import SaveFormBtn from "./save-form-btn";
import DragOverlayWrapper from "./drag-overlay-wrapper";

const FormBuilder = ({ form }) => {
  return (
    <DndContext>
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
                <SaveFormBtn />
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
