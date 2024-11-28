"use client";

import { HiCursorClick } from "react-icons/hi";
import { FormElements } from "../editor/form-elements";
import { Button } from "../ui/shadcn/button";
import { useCallback, useRef } from "react";

const FormSubmit = ({ formUrl, content }) => {
  const formValue = useRef({});

  const submitValue = useCallback((key, value) => {
    formValue.current[key] = value;
  }, []);

  const submitForm = () => {
    console.log(formValue.current);
  };

  return (
    <div className="flex justify-center w-full h-full items-center p-8">
      <div
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
