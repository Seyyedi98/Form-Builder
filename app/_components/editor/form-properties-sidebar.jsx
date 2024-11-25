import useCanvas from "@/hooks/use-canvas";
import React from "react";
import { FormElements } from "./form-elements";
import { Button } from "../ui/shadcn/button";
import { AiOutlineClose } from "react-icons/ai";
import { Separator } from "../ui/shadcn/separator";

const FormPropertiesSidebar = () => {
  const { selectedElement, setSelectedElement } = useCanvas();

  if (!selectedElement) return;
  const PropertiesForm = FormElements[selectedElement.type].propertiesComponent;

  return (
    <div className="flex flex-col p-2">
      <div className="flex justify-between items-center">
        <p className="text-sm text-foreground/70">مشخصات فیلد</p>
        <Button
          size="icon"
          variant="ghost"
          onClick={() => {
            setSelectedElement(null);
          }}
        >
          <AiOutlineClose />
        </Button>
      </div>
      <Separator className="mb-4" />
      <PropertiesForm elementInstance={selectedElement} />
    </div>
  );
};

export default FormPropertiesSidebar;
