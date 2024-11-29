"use client";

import { HiCursorClick } from "react-icons/hi";
import { FormElements } from "../editor/form-elements";
import { Button } from "../ui/shadcn/button";
import { useCallback, useRef, useState, useTransition } from "react";
import { toast } from "@/hooks/use-toast";
import { ImSpinner2 } from "react-icons/im";
import { SubmitForm } from "@/actions/form/form";

const FormSubmit = ({ formUrl, content }) => {
  const formValues = useRef({});
  const formErrors = useRef({});
  const [renderKey, setRenderKey] = useState(new Date().getTime());

  const [submitted, setSubmitted] = useState(false);
  const [pending, startTransition] = useTransition();

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

  const submitForm = async () => {
    formErrors.current = {};
    const validForm = validateForm();
    if (!validForm) {
      setRenderKey(new Date().getTime());
      toast({
        title: "خطا",
        description: "پر کردن فیلد های ستاره دار الزامی است",
        variant: "destructive",
      });
      return;
    }

    try {
      const jsonContent = JSON.stringify(formValues.current);
      await SubmitForm(formUrl, jsonContent);
      setSubmitted(true);
    } catch (error) {
      toast({
        title: "خطا",
        description: "خطایی رخ داده است",
        variant: "destructive",
      });
    }
  };

  if (submitted) {
    return (
      <div className="flex justify-center w-full h-full items-center p-8">
        <div
          key={renderKey}
          className="max-w-[620px] flex flex-col gap-4 flex-grow bg-background w-full p-8
      overflow-y-auto border shadow-xl shadow-blue-700 rounded"
        >
          <h1 className="text-2xl font-bold">فرم ثبت شد</h1>
          <p className="text-muted-foreground">
            با تشکر از ثبت اطلاعات، اکنون می توانید پنجره را ببندید
          </p>
        </div>
      </div>
    );
  }

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
            startTransition(submitForm);
          }}
          disabled={pending}
        >
          {!pending ? (
            <>
              <HiCursorClick className="mr-2" />
              ثبت
            </>
          ) : (
            <ImSpinner2 className="animate-spin" />
          )}
        </Button>
      </div>
    </div>
  );
};

export default FormSubmit;
