import * as z from "zod";

export const LoginSchema = z.object({
  email: z.string().email({ message: "آدرس ایمیل نامعتبر است" }),
  password: z.string().min(1, { message: "رمز عبور نامعتبر" }),
});

export const RegisterSchema = z.object({
  email: z.string().email({ message: "آدرس ایمیل نامعتبر است" }),
  password: z
    .string()
    .min(6, { message: "رمز عبور باید بیش از ۶ کاراکتر باشد" }),
  name: z.string().min(1, {
    message: "",
  }),
});
