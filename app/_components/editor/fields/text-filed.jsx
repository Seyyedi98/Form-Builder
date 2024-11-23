"use client";

import { MdTextFields } from "react-icons/md";
import { Label } from "../../ui/shadcn/label";
import { Input } from "../../ui/shadcn/input";

const type = "TextField";

const extraAttributes = {
  label: "Text Field",
  helperText: "Helper Text",
  required: false,
  placeHolder: "Value here",
};

export const TextFieldFormElement = {
  type,
  construct: (id) => ({
    id,
    type,
    extraAttributes,
  }),

  CanvasBtnElement: {
    icon: MdTextFields,
    label: "Text Filed",
  },

  CanvasComponent: CanvasComponent,
  formComponent: () => <div>Form Component</div>,
  propertiesComponent: () => <div>Propertis Component</div>,
};

function CanvasComponent({ elementInstance }) {
  const element = elementInstance;
  const { label, required, placeHolder, helperText } = element.extraAttributes;
  return (
    <div className="flex flex-col gap-2 w-full">
      <Label>
        {label}
        {required && "*"}
      </Label>
      <Input readOnly disabled placeholder={placeHolder} />
      {helperText && (
        <p className="text-muted-foreground text-[0.8rem]">{helperText}</p>
      )}
    </div>
  );
}
