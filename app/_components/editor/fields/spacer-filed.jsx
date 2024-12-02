"use client";

import useCanvas from "@/hooks/use-canvas";
import {
  SpacerFieldPropertiesSchema,
  TitleFieldPropertiesSchema,
} from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { LuHeading1, LuSeparatorHorizontal } from "react-icons/lu";
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
import { Slider } from "../../ui/shadcn/slider";

const type = "SpacerField";

const extraAttributes = {
  height: 20, // px
};

export const SpacerFieldFormElement = {
  type,
  construct: (id) => ({
    id,
    type,
    extraAttributes,
  }),

  CanvasBtnElement: {
    icon: LuSeparatorHorizontal,
    label: "Spacer Filed",
  },

  CanvasComponent: CanvasComponent,
  formComponent: FormComponent,
  propertiesComponent: PropertiesComponent,

  validate: () => true,
};

function CanvasComponent({ elementInstance }) {
  const element = elementInstance;

  const { height } = element.extraAttributes;
  return (
    <div className="flex flex-col gap-2 w-full items-center">
      <Label className="text-muted-foreground">فاصله: {height} px</Label>
      <LuSeparatorHorizontal className="w-8 h-8" />
    </div>
  );
}

function FormComponent({ elementInstance }) {
  const element = elementInstance;
  const { height } = element.extraAttributes;
  return <div style={{ height, width: "100%" }}></div>;
}

function PropertiesComponent({ elementInstance }) {
  const element = elementInstance;
  const { updateElement } = useCanvas();

  const form = useForm({
    resolver: zodResolver(SpacerFieldPropertiesSchema),
    mode: "onBlur",
    defaultValues: {
      height: element.extraAttributes.height,
    },
  });

  useEffect(() => {
    form.reset(element.extraAttributes);
  }, [element, form]);

  function applyChanges(values) {
    const { height } = values;
    updateElement(element.id, {
      ...element,
      extraAttributes: {
        height,
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
          name="height"
          render={({ field }) => (
            <FormItem>
              <FormLabel>ارتفاع: {form.watch("height")}</FormLabel>
              <FormControl className="pt-2">
                <Slider
                  defaultValue={[field.value]}
                  min={5}
                  max={200}
                  step={1}
                  onValueChange={(value) => {
                    field.onChange(value[0]);
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
