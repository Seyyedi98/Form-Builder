"use client";

import { IoMdCheckbox } from "react-icons/io";
import { Label } from "../../ui/shadcn/label";
import { Input } from "../../ui/shadcn/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { checkboxFieldPropertiesSchema, propertiesSchema } from "@/schemas";
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
import { Checkbox } from "../../ui/shadcn/checkbox";
import { CheckCheckIcon } from "lucide-react";

const type = "CheckboxField";

const extraAttributes = {
  label: "Checkbox Field",
  helperText: "Helper Text",
  required: false,
};

export const checkboxFieldFormElement = {
  type,
  construct: (id) => ({
    id,
    type,
    extraAttributes,
  }),

  CanvasBtnElement: {
    icon: CheckCheckIcon,
    label: "Checkbox Filed",
  },

  CanvasComponent: CanvasComponent,
  formComponent: FormComponent,
  propertiesComponent: PropertiesComponent,

  validate: (formElement, currentValue) => {
    const element = formElement;
    if (element.extraAttributes.required) {
      return currentValue === true;
    }
    return true;
  },
};

function CanvasComponent({ elementInstance }) {
  const element = elementInstance;

  const { label, required, helperText } = element.extraAttributes;
  const id = `checkbox-${element.id}`;
  return (
    <div className="flex items-top space-x-2">
      <Checkbox id={id} />
      <div className="grid gap-1.5  pr-4 leading-none">
        <Label htmlFor={id}>
          {label}
          {required && "*"}
        </Label>
      </div>
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
  const [value, setValue] = useState(defaultValue === true ? true : false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setError(isInvalid === true);
  }, [isInvalid]);

  const element = elementInstance;
  const { label, required, helperText } = element.extraAttributes;

  const id = `checkbox-${element.id}`;
  return (
    <div className="flex items-top space-x-2">
      <Checkbox
        id={id}
        checked={value}
        className={cn(error && "border-red-500")}
        onCheckedChange={(checked) => {
          let value = false;
          if (checked === true) value = true;
          setValue(value);

          if (!submitValue) return;
          const stringValue = value ? "true" : "false";
          const valid = checkboxFieldFormElement.validate(element, stringValue);
          setError(!valid);
          submitValue(element.id, stringValue);
        }}
      />
      <div className="grid gap-1.5 leading-none pr-4">
        <Label htmlFor={id} className={cn(error && "text-red-500")}>
          {label}
          {required && "*"}
        </Label>
      </div>
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
    resolver: zodResolver(checkboxFieldPropertiesSchema),
    mode: "onBlur",
    defaultValues: {
      label: element.extraAttributes.label,
      helperText: element.extraAttributes.helperText,
      required: element.extraAttributes.required,
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
        required: values.required,
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
