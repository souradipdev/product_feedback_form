import * as z from "zod";

export const FormSchema = z.object({
  name: z.string().min(1, {message: "Required field"}),
  email: z.string().email({message: "Enter a valid email"}),
  phone: z.string().min(10, {message: "Provide a valid phone number"}).or(z.literal('')),
})