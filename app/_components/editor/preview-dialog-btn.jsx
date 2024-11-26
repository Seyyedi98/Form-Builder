import React from "react";
import { Button } from "../ui/shadcn/button";
import { MdPreview } from "react-icons/md";
import useCanvas from "@/hooks/use-canvas";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "../ui/shadcn/dialog";
import { FormElements } from "./form-elements";

const PreviewDialogBtn = () => {
  const { elements } = useCanvas();
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2">
          <MdPreview className="w-6 h-6" />
          پیش نمایش
        </Button>
      </DialogTrigger>
      <DialogContent className="w-screen h-screen max-h-screen max-w-full flex flex-col flex-grow p-0 gap-0">
        <DialogTitle> </DialogTitle>
        <DialogDescription></DialogDescription>
        <div className="px-4 py-2 border-b">
          <p className="text-lg font-bold text-muted-foreground">پیش نمایش</p>
          <p className="text-sm text-muted-foreground">
            کابران اینگونه فرم شما را مشاهده خواهند کرد
          </p>
        </div>
        <div
          className="bg-accent flex flex-col flex-grow items-center justify-center p-4
         dark:bg-[url(/paper-dark.svg)] bg-[url(/paper.svg)] overflow-y-auto"
        >
          <div
            className="max-w[620px] flex flex-col gap-4 flex-grow bg-background h-full w-full
          rounded-2xl p-8 overflow-y-auto"
          >
            {elements.map((element) => {
              const FormComponent = FormElements[element.type].formComponent;

              return (
                <FormComponent key={element.id} elementInstance={element} />
              );
            })}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PreviewDialogBtn;
