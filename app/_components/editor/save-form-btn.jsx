import React, { useTransition } from "react";
import { HiSaveAs } from "react-icons/hi";
import { Button } from "../ui/shadcn/button";
import useCanvas from "@/hooks/use-canvas";
import { toast } from "@/hooks/use-toast";
import { FaSpinner } from "react-icons/fa";
import { UpdateFormContent } from "@/actions/form/form";

const SaveFormBtn = ({ id }) => {
  const { elements } = useCanvas();
  const [loading, startTransition] = useTransition();

  const updateFormContent = async () => {
    try {
      const JSONElement = JSON.stringify(elements);
      await UpdateFormContent(id, JSONElement);
      toast({
        title: "ذخیره موفقیت آمیز",
        description: "فرم با موفقت ذخیره شد",
      });
    } catch (error) {
      toast({
        title: "ذخیره ناموفق",
        description: "خطایی رخ داد",
        variant: "destructive",
      });
    }
  };

  return (
    <Button
      variant="outline"
      className="gap-2"
      disabled={loading}
      onClick={() => {
        startTransition(updateFormContent);
      }}
    >
      <HiSaveAs className="w-4 h-4" />
      ذخیره
      {loading && <FaSpinner className="animate-spin" />}
    </Button>
  );
};

export default SaveFormBtn;
