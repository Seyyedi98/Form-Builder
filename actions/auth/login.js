"use server";

import { LoginSchema } from "@/schemas";

export const login = async (values) => {
  // server side values validation
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields" };
  }

  return { success: "login credentials verified" };
};