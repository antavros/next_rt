import { object, string } from "zod";

export const signInSchema = object({
  nameOrEmail: string({
    required_error: "Name or Email is required",
  }).optional(),
  login: string({ required_error: "Login is required" }).optional(),
  email: string({ required_error: "Email is required" })
    .email("Invalid email")
    .optional(),
  password: string({ required_error: "Password is required" })
    .min(1, "Password is required")
    .min(8, "Password must be more than 8 characters")
    .max(32, "Password must be less than 32 characters"),
});
