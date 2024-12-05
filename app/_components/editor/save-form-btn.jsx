import { UpdateFormContent } from "@/actions/form/form";
import useCanvas from "@/hooks/use-canvas";
import { toast } from "@/hooks/use-toast";
import { Save } from "lucide-react";
import { useTransition } from "react";
import { FaSpinner } from "react-icons/fa";
import { Button } from "../ui/shadcn/button";

const SaveFormBtn = ({ id }) => {
  const { elements } = useCanvas();
  const [loading, startTransition] = useTransition();

  const updateFormContent = async () => {
    try {
      const JSONElement = JSON.stringify(elements);
      await UpdateFormContent(id, JSONElement);
      toast({
        title: "عملیات موفقیت آمیز",
        description: "فرم با موفقت ذخیره شد",
      });
    } catch (error) {
      toast({
        title: "عملیات ناموفق",
        description: "هنگام ذخیره سازی خطایی رخ داد",
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
      <Save className="w-4 h-4" />
      ذخیره
      {loading && <FaSpinner className="animate-spin" />}
    </Button>
  );
};

export default SaveFormBtn;
