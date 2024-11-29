import React from "react";
import SidebarBtnElement from "./sidebar-button-element";
import { FormElements } from "./form-elements";
import { Separator } from "../ui/shadcn/separator";

const FormElementsSidebar = () => {
  return (
    <div>
      <p className="text-sm text-foreground/70">
        برای افزودن به صفحه، بکشید و رها کنید
      </p>
      <Separator className="my-2" />
      <div className="grid grid-cols-1 md:grid-cols-2 place-items-center">
        <p
          className="text-sm text-muted-foreground col-span-1 md:col-span-2 my-2
        place-self-start"
        >
          فیلد ها
        </p>
        <SidebarBtnElement formElement={FormElements.TextField} />
        <SidebarBtnElement formElement={FormElements.TitleField} />
      </div>
    </div>
  );
};

export default FormElementsSidebar;
