"use server";

import prisma from "@/lib/client";
import { currentUser } from "@/lib/get-user";
import { FormSchema } from "@/schemas";

export async function CreateForm(data) {
  const validation = FormSchema.safeParse(data);
  const user = await currentUser();

  if (!user) {
    error: "شما به این بخش دسترسی ندارید";
  }

  if (!validation.success) {
    error: "خطا";
  }

  const form = await prisma.form.create({
    data: {
      userId: user.id,
      name: data.name,
      description: data.description,
      content: "[]",
    },
  });

  if (!form) {
    error: "خطای ناشناخته ای رخ داد. لطفا مجددا تلاش نمایید";
  }

  return { success: "فرم با موفقیت ایجاد شد", formId: form.id };
}
