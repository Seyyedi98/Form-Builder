"use server";

import prisma from "@/lib/client";
import { currentUser } from "@/lib/get-user";

export async function GetForms() {
  const user = await currentUser();

  if (!user) return;

  const forms = await prisma.form.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return forms;
}

export async function GetFormById(id) {
  const user = await currentUser();
  if (!user) {
    error: "User not found";
  }

  return await prisma.form.findUnique({
    where: {
      userId: user.id,
      id,
    },
  });
}

export async function UpdateFormContent(id, jsonContent) {
  const user = await currentUser();
  if (!user) {
    error: "User not found";
  }

  return await prisma.form.update({
    where: {
      userId: user.id,
      id,
    },
    data: {
      content: jsonContent,
    },
  });
}
