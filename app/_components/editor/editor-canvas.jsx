"use client";

import {
  DndContext,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import Canvas from "./canvas";
import DragOverlayWrapper from "./drag-overlay-wrapper";
import PreviewDialogBtn from "./preview-dialog-btn";
import PublishFormBtn from "./publish-form-btn";
import SaveFormBtn from "./save-form-btn";
import { useEffect, useState } from "react";
import useCanvas from "@/hooks/use-canvas";
import { ImSpinner2 } from "react-icons/im";
import { Input } from "../ui/shadcn/input";
import { Button } from "../ui/shadcn/button";
import { toast } from "@/hooks/use-toast";
import Link from "next/link";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";

const FormBuilder = ({ form }) => {
  const { setElements } = useCanvas();
  const [isReady, setIsReady] = useState(false);
  const shareUrl = `${window.location.origin}/submit/${form.shareUrl}`;

  const mouseSensor = useSensor(MouseSensor, {
    // Require the mouse to move by 10 pixels before activating
    activationConstraint: {
      distance: 10,
    },
  });

  const touchSensor = useSensor(TouchSensor, {
    // Press delay of 250ms, with tolerance of 5px of movement
    activationConstraint: {
      delay: 250,
      tolerance: 5,
    },
  });
  const sensors = useSensors(mouseSensor, touchSensor);

  useEffect(() => {
    const elements = JSON.parse(form.content);
    setElements(elements);
    setIsReady(true);
  }, [form, setElements]);

  if (!isReady) {
    return (
      <div className="flex flex-col items-center justify-center w-full h-full">
        <ImSpinner2 className="animate-spin h-12 w-12" />
      </div>
    );
  }

  if (form.published) {
    return (
      <>
        <div className="flex flex-col items-center justify-center h-full w-full">
          <div className="max-w-md">
            <h1 className="text-center text-4xl font-bold text-primary border-b pb-2 mb-10">
              فرم منتشر شد
            </h1>
            <h2 className="text-2xl">فرم را به اشتراک بگذارید</h2>
            <h3 className="text-xl text-muted-foreground border-b pb-10">
              هر کسی می توان با لینک ورود، فرم را مشاهده کند
            </h3>
            <div className="my-4 flex flex-col gap-2 items-center w-full border-b pb-4">
              <Input className="w-full" readOnly value={shareUrl} />
              <Button
                className="mt-2 w-full"
                onClick={() => {
                  navigator.clipboard.writeText(shareUrl);
                  toast({
                    description: "آدرس در کلیپ برد ذخیره شد",
                  });
                }}
              >
                کپی
              </Button>
            </div>
            <div className="flex justify-between">
              <Button variant="link" asChild>
                <Link href="/dashboard" className="gap-2">
                  <BsArrowRight />
                  برگرد به صفحه اصلی
                </Link>
              </Button>
              <Button variant="link" asChild>
                <Link href={`/dashboard/forms/${form.id}`} className="gap-2">
                  مشخصات فرم
                  <BsArrowLeft />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <DndContext sensors={sensors}>
      <div className="flex flex-col w-full">
        <div className="flex justify-between border-b-2 p-4 gap-3 items-center">
          <h2 className="truncate font-medium">
            <span className="text-muted-foreground mr-2">فرم: </span>
            {form.name}
          </h2>
          <div className="flex items-center gap-2">
            <PreviewDialogBtn />
            {!form.published && (
              <>
                <SaveFormBtn id={form.id} />
                <PublishFormBtn id={form.id} />
              </>
            )}
          </div>
        </div>
        <div
          className="flex w-full flex-grow items-center justify-center relative
      overflow-y-auto h[200px] bg-accent dark:bg-[url(/paper-dark.svg)] bg-[url(/paper.svg)]"
        >
          <Canvas />
        </div>
      </div>
      <DragOverlayWrapper />
    </DndContext>
  );
};

export default FormBuilder;
