import React, { useTransition } from "react";
import { Button } from "../ui/shadcn/button";
import { MdOutlinePublish } from "react-icons/md";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/shadcn/alert-dialog";
import { FaIcons } from "react-icons/fa";
import { toast } from "@/hooks/use-toast";
import { PublishForm } from "@/actions/form/form";
import { useRouter } from "next/navigation";

const PublishFormBtn = ({ id }) => {
  const [loading, startTransition] = useTransition();
  const router = useRouter();

  async function publishForm() {
    try {
      await PublishForm(id);
      toast({
        title: "انتشار موفقیت آمیز",
        description: "فرم با موفقیت منتشر شد",
      });
      router.refresh();
    } catch (error) {
      toast({
        title: "انتشار ناموفق",
        description: "خطای ناشناخته ای رخ داده است",
      });
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="outline"
          className="gap-2 text-white bg-gradient-to-r from-indigo-400 to-cyan-400"
        >
          <MdOutlinePublish className="w-6 h-6" />
          انتشار
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>مطمئن هستید؟</AlertDialogTitle>
          <AlertDialogDescription>
            این عملیات قابل بازگشت نیست. بعد از انتشار نمی توانید این فرم را
            ویرایش کنید. <br />
            <span className="font-medium">
              با انتشار این فرم، شما آن را در دسترس عموم قرار می دهید و قادر
              خواهید بود پاسخ ها را جمع آوری نمایید.
            </span>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex gap-2">
          <AlertDialogCancel>بازگشت</AlertDialogCancel>
          <AlertDialogAction
            disabled={loading}
            onClick={(e) => {
              e.preventDefault();
              startTransition(publishForm);
            }}
          >
            تایید {loading && <FaIcons className="animate-spin" />}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default PublishFormBtn;
