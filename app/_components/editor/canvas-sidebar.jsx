import React from "react";
import { FormElements } from "./form-elements";
import SidebarBtnElement from "./sidebar-button-element";
import useCanvas from "@/hooks/use-canvas";
import FormPropertiesSidebar from "./form-properties-sidebar";
import FormElementsSidebar from "./form-elements-sidebar";

const CanvasSidebar = () => {
  const { selectedElement } = useCanvas();

  return (
    <aside
      className="w-[340px] max-w-[400px] flex flex-col flex-grow gap-2
    border-l-2 border-muted p-4 bg-background overflow-y-auto max-h-fit"
    >
      {selectedElement ? (
        <FormPropertiesSidebar />
      ) : (
        <FormElementsSidebar formElement={FormElements.TextField} />
      )}
    </aside>
  );
};

export default CanvasSidebar;
