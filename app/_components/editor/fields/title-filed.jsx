"use client";

import { MdTextFields } from "react-icons/md";
import { Label } from "../../ui/shadcn/label";
import { Input } from "../../ui/shadcn/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { propertiesSchema, TitleFieldPropertiesSchema } from "@/schemas";
import { useEffect, useState } from "react";
import useCanvas from "@/hooks/use-canvas";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../ui/shadcn/form";
import { Switch } from "../../ui/shadcn/switch";
import { cn } from "@/lib/utils";
import { LuHeading1 } from "react-icons/lu";

const type = "TitleField";

const extraAttributes = {
  title: "Title Field",
};

export const TitleFieldFormElement = {
  type,
  construct: (id) => ({
    id,
    type,
    extraAttributes,
  }),

  CanvasBtnElement: {
    icon: LuHeading1,
    label: "Title Filed",
  },

  CanvasComponent: CanvasComponent,
  formComponent: FormComponent,
  propertiesComponent: PropertiesComponent,

  validate: () => true,
};

function CanvasComponent({ elementInstance }) {
  const element = elementInstance;

  const { title } = element.extraAttributes;
  return (
    <div className="flex flex-col gap-2 w-full">
      <Label className="text-muted-foreground">عنوان</Label>
      <p className="text-xl">{title}</p>
    </div>
  );
}

function FormComponent({ elementInstance }) {
  const element = elementInstance;
  const { title } = element.extraAttributes;
  return <p className="text-xl">{title}</p>;
}

function PropertiesComponent({ elementInstance }) {
  const element = elementInstance;
  const { updateElement } = useCanvas();

  const form = useForm({
    resolver: zodResolver(TitleFieldPropertiesSchema),
    mode: "onBlur",
    defaultValues: {
      title: element.extraAttributes.title,
    },
  });

  useEffect(() => {
    form.reset(element.extraAttributes);
  }, [element, form]);

  function applyChanges(values) {
    const { title } = values;
    updateElement(element.id, {
      ...element,
      extraAttributes: {
        title,
      },
    });
  }

  return (
    <Form {...form}>
      <form
        onBlur={form.handleSubmit(applyChanges)}
        className="space-y-3"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        {/* Form Title */}
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>عنوان</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.currentTarget.blur();
                    }
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
