"use client";

import { MdTextFields } from "react-icons/md";

const type = "TextField";

export const TextFieldFormElement = {
  type,
  construct: (id) => ({
    id,
    type,
    extraAttributes: {
      label: "Text Field",
      helperText: "Helper Text",
      required: false,
      placeHolder: "Value here",
    },
  }),

  designerBtnElement: {
    icon: MdTextFields,
    label: "Text Filed",
  },

  designerComponent: () => <div>Designer Component</div>,
  formComponent: () => <div>Form Component</div>,
  propertiesComponent: () => <div>Propertis Component</div>,
};
