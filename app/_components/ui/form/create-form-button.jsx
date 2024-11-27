"use client";

import { CreateForm } from "@/actions/form/create-form";
import { FormSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { FileDiff } from "lucide-react";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { ImSpinner2 } from "react-icons/im";
import { Button } from "../shadcn/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../shadcn/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../shadcn/form";
import { Input } from "../shadcn/input";
import { Textarea } from "../shadcn/textarea";
import { FormError } from "./form-error";
import { FormSuccess } from "./form-success";
import { useRouter } from "next/navigation";
import { toast } from "@/hooks/use-toast";

const CreateFormButton = () => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  function onSubmit(values) {
    startTransition(async () => {
      setError("");
      setSuccess("");
      await CreateForm(values).then((data) => {
        if (data?.success) {
          toast({
            title: "عملیات موفقیت آمیز",
            description: "فرم با موفقت ساخته شد",
          });
          setSuccess(data.success);
          form.reset();
          router.push(`/dashboard/builder/${data.formId}`);
        }
        if (data?.error) {
          setError(data.error);
        }
      });
    });
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="group border border-primary/40 h-[190px] items-center
         justify-center flex flex-col hover:border-primary hover:cursor-pointer
         border-dashed gap-4"
        >
          <FileDiff className="w-24 h-24 text-muted-primary group-hover:text-primary" />
          <p className="font-bold text-xl text-muted-foreground group-hover:text-primary">
            ایجاد فرم جدید
          </p>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>ایجاد فرم جدید</DialogTitle>
          <DialogDescription>شروع به ساختن یک فرم جدید کنید!</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
            <div className="space-y-4">
              {/* Name field */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>نام فرم</FormLabel>‌
                    <FormControl>
                      <Input disabled={isPending} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Description field */}
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>توضیحات</FormLabel>‌
                    <FormControl>
                      <Textarea {...field} rows={5} disabled={isPending} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormError message={error} />
            <FormSuccess message={success} />
            <DialogFooter>
              <Button type="submit" disabled={isPending} className="w-full">
                {isPending ? (
                  <ImSpinner2 className="animate-spin" />
                ) : (
                  <span>Save</span>
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateFormButton;
