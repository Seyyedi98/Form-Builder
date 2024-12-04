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
      <div className="grid grid-cols-1 gap-y-2 md:grid-cols-2 place-items-center">
        <p
          className="text-sm mt-4 text-muted-foreground col-span-1 md:col-span-2 my-2
        place-self-start"
        >
          فیلد ها
        </p>
        <SidebarBtnElement formElement={FormElements.TitleField} />
        <SidebarBtnElement formElement={FormElements.SubtitleField} />
        <SidebarBtnElement formElement={FormElements.ParagraphField} />
        <SidebarBtnElement formElement={FormElements.SeparatorField} />
        <SidebarBtnElement formElement={FormElements.SpacerField} />
        <p
          className="text-sm mt-4 text-muted-foreground col-span-1 md:col-span-2 my-2
        place-self-start"
        >
          گزینه های فرم
        </p>
        <SidebarBtnElement formElement={FormElements.TextField} />
        <SidebarBtnElement formElement={FormElements.NumberField} />
        <SidebarBtnElement formElement={FormElements.TextAreaField} />
        <SidebarBtnElement formElement={FormElements.DateField} />
        <SidebarBtnElement formElement={FormElements.SelectField} />
        <SidebarBtnElement formElement={FormElements.checkboxField} />
      </div>
    </div>
  );
};

export default FormElementsSidebar;
