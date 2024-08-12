import { object, string } from "zod";

export const signInSchema = object({
  login: string({ required_error: "login is required" })
    .min(1, "login is required")
    .max(22, "Password must be less than 32 characters")
    .optional(),
  email: string({ required_error: "Email is required" })
    .min(1, "Email is required")
    .email("Invalid email"),
  password: string({ required_error: "Invalid password" })
    .min(1, "Password is required")
    .min(8, "Password must be more than 8 characters")
    .max(32, "Password must be less than 32 characters")
    .refine((value) => {
      const validations = {
        letter: /[a-z]/.test(value),
        capital: /[A-Z]/.test(value),
        number: /[0-9]/.test(value),
        length: value.length >= 8,
      };
      return (
        validations.letter &&
        validations.capital &&
        validations.number &&
        validations.length
      );
    }, "Password must contain at least one letter, one capital letter, one number, and be at least 8 characters long"),
});
