import { z } from "zod";

export const signInValidator = z.object({
  username: z
    .string()
    .min(5, { message: "Username должен иметь как минимум 5 сиволов" })
    .max(50, "Username не может превышать 50 символов"),
  // email: z.string().email({ message: "Невалидный формат email" }),
  password: z
    .string()
    .min(5, { message: "Пароль должен содержать минимум 5 символов" })
    .max(50, "Пароль не может превышать 50 символов"),
});
