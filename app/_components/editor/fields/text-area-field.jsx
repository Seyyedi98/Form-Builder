"use client";

import { MdTextFields } from "react-icons/md";
import { Label } from "../../ui/shadcn/label";
import { Input } from "../../ui/shadcn/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { propertiesSchema, TextAreaFieldPropertiesSchema } from "@/schemas";
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
import { BsTextareaResize } from "react-icons/bs";
import { Textarea } from "../../ui/shadcn/textarea";
import { Slider } from "../../ui/shadcn/slider";

const type = "TextAreaField";

const extraAttributes = {
  label: "TextArea Field",
  helperText: "Helper Text",
  required: false,
  placeHolder: "Value here",
  rows: 3,
};

export const TextAreaFieldFormElement = {
  type,
  construct: (id) => ({
    id,
    type,
    extraAttributes,
  }),

  CanvasBtnElement: {
    icon: BsTextareaResize,
    label: "TextArea Filed",
  },

  CanvasComponent: CanvasComponent,
  formComponent: FormComponent,
  propertiesComponent: PropertiesComponent,

  validate: (formElement, currentValue) => {
    const element = formElement;
    if (element.extraAttributes.required) {
      return currentValue.length;
    }
    return true;
  },
};

function CanvasComponent({ elementInstance }) {
  const element = elementInstance;

  const { label, required, placeHolder, helperText, rows } =
    element.extraAttributes;
  return (
    <div className="flex flex-col gap-2 w-full">
      <Label>
        {label}
        {required && "*"}
      </Label>
      <Textarea readOnly disabled placeholder={placeHolder} />
      {helperText && (
        <p className="text-muted-foreground text-[0.8rem]">{helperText}</p>
      )}
    </div>
  );
}

function FormComponent({
  elementInstance,
  submitValue,
  isInvalid,
  defaultValue,
}) {
  const [value, setValue] = useState(defaultValue || "");
  const [error, setError] = useState(false);

  useEffect(() => {
    setError(isInvalid === true);
  }, [isInvalid]);

  const element = elementInstance;
  const { label, required, placeHolder, helperText, rows } =
    element.extraAttributes;
  return (
    <div className="flex flex-col gap-2 w-full">
      <Label className={cn(error && "text-red-500")}>
        {label}
        {required && "*"}
      </Label>
      <Textarea
        rows={rows}
        className={cn(error && "border-red-500")}
        placeholder={placeHolder}
        onChange={(e) => setValue(e.target.value)}
        onBlur={(e) => {
          if (!submitValue) return;
          const isValid = TextFieldFormElement.validate(
            element,
            e.target.value
          );
          setError(!isValid);
          if (!isValid) return;
          submitValue(element.id, e.target.value);
        }}
        value={value}
      />
      {helperText && (
        <p
          className={cn(
            "text-muted-foreground text-[0.8rem]",
            error && "text-red-500"
          )}
        >
          {helperText}
        </p>
      )}
    </div>
  );
}

function PropertiesComponent({ elementInstance }) {
  const element = elementInstance;
  const { updateElement } = useCanvas();

  const form = useForm({
    resolver: zodResolver(TextAreaFieldPropertiesSchema),
    mode: "onBlur",
    defaultValues: {
      label: element.extraAttributes.label,
      helperText: element.extraAttributes.helperText,
      required: element.extraAttributes.required,
      placeHolder: element.extraAttributes.placeHolder,
      rows: element.extraAttributes.rows,
    },
  });

  useEffect(() => {
    form.reset(element.extraAttributes);
  }, [element, form]);

  function applyChanges(values) {
    updateElement(element.id, {
      ...element,
      extraAttributes: {
        label: values.label,
        helperText: values.helperText,
        placeHolder: values.placeHolder,
        required: values.required,
        rows: values.rows,
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
          name="label"
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
              <FormDescription>عنوان فرم</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Form Place Holder */}
        <FormField
          control={form.control}
          name="placeHolder"
          render={({ field }) => (
            <FormItem>
              <FormLabel>متن پس زمینه</FormLabel>
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
              <FormDescription>
                این متن به صورت کم رنگ نشان داده خواهد شد
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Form Helper Text */}
        <FormField
          control={form.control}
          name="helperText"
          render={({ field }) => (
            <FormItem>
              <FormLabel>متن راهنما</FormLabel>
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
              <FormDescription>
                متن راهنما یا توضیجاتی که می خواهید در مورد فیلد به کاربران
                نمایش داده شود
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Form Helper Text */}
        <FormField
          control={form.control}
          name="rows"
          render={({ field }) => (
            <FormItem>
              <FormLabel>ردیف ها: {form.watch("rows")}</FormLabel>
              <FormControl>
                <Slider
                  defaultValue={[field.value]}
                  min={1}
                  max={10}
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

        {/* Form required */}
        <FormField
          control={form.control}
          name="required"
          render={({ field }) => (
            <FormItem
              className="flex items-center justify-between rounded-lg border p-3
            shadow-sm"
            >
              <div className="space-y-0.5">
                <FormLabel>اجباری</FormLabel>

                <FormDescription>
                  آیا پر کردن این قیمت برای کاربران اجباری است؟
                </FormDescription>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
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
