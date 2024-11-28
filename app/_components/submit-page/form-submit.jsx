"use client";

import { HiCursorClick } from "react-icons/hi";
import { FormElements } from "../editor/form-elements";
import { Button } from "../ui/shadcn/button";
import { useCallback, useRef, useState } from "react";
import { toast } from "@/hooks/use-toast";

const FormSubmit = ({ formUrl, content }) => {
  const formValues = useRef({});
  const formErrors = useRef({});
  const [renderKey, setRenderKey] = useState(new Date().getTime());

  const validateForm = useCallback(() => {
    for (const field of content) {
      const actualValue = formValues.current[field.id] || "";
      const isValid = FormElements[field.type].validate(field, actualValue);

      if (!isValid) {
        formErrors.current[field.id] = true;
      }
    }

    if (Object.keys(formErrors.current).length > 0) {
      return false;
    }
    return true;
  }, [content]);

  const submitValue = useCallback((key, value) => {
    formValues.current[key] = value;
  }, []);

  const submitForm = () => {
    formErrors.current = {};
    const validForm = validateForm();
    if (!validForm) {
      setRenderKey(new Date().getTime());
      toast({
        title: "خطا",
        description: "پر کردن فیلد های ستاره دار الزامی است",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex justify-center w-full h-full items-center p-8">
      <div
        key={renderKey}
        className="max-w-[620px] flex flex-col gap-4 flex-grow bg-background w-full p-8
      overflow-y-auto border shadow-xl shadow-blue-700 rounded"
      >
        {content.map((element) => {
          const FormElement = FormElements[element.type].formComponent;
          return (
            <FormElement
              key={element.id}
              elementInstance={element}
              submitValue={submitValue}
              isInvalid={formErrors.current[element.id]}
              defaultValue={formValues.current[element.id]}
            />
          );
        })}
        <Button
          className="mt-8"
          onClick={() => {
            submitForm();
          }}
        >
          <HiCursorClick className="mr-2" />
          ثبت
        </Button>
      </div>
    </div>
  );
};

export default FormSubmit;
