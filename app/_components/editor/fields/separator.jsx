"use client";

import useCanvas from "@/hooks/use-canvas";
import { TitleFieldPropertiesSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { RiSeparator } from "react-icons/ri";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../ui/shadcn/form";
import { Input } from "../../ui/shadcn/input";
import { Label } from "../../ui/shadcn/label";
import { Separator } from "../../ui/shadcn/separator";

const type = "SeparatorField";

export const SeparatorFieldFormElement = {
  type,
  construct: (id) => ({
    id,
    type,
  }),

  CanvasBtnElement: {
    icon: RiSeparator,
    label: "Separator Filed",
  },

  CanvasComponent: CanvasComponent,
  formComponent: FormComponent,
  propertiesComponent: PropertiesComponent,

  validate: () => true,
};

function CanvasComponent({ elementInstance }) {
  return (
    <div className="flex flex-col gap-2 w-full">
      <Label className="text-muted-foreground">جدا کننده</Label>
      <Separator />
    </div>
  );
}

function FormComponent({ elementInstance }) {
  return <Separator />;
}

function PropertiesComponent({ elementInstance }) {
  return <p>این المنت، مشخصات قابل تغییری ندارد</p>;
}
