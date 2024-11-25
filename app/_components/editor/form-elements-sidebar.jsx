import React from "react";
import SidebarBtnElement from "./sidebar-button-element";
import { FormElements } from "./form-elements";

const FormElementsSidebar = () => {
  return (
    <div>
      فیلد ها
      <SidebarBtnElement formElement={FormElements.TextField} />
    </div>
  );
};

export default FormElementsSidebar;
