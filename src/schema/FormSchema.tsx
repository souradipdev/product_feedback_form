import * as z from "zod";

export const FormSchema = z.object({
  name: z.string().min(1, {message: "Required field"}),
  email: z.string().email({message: "Enter a valid email"}),
  phone: z.string().min(10, {message: "Provide a valid phone number"}).or(z.literal('')),
  satisfactionRating: z.number().min(1, {message: "Rating required"}),
  easeOfUse: z.number().min(1, {message: "Rating required"}),
  featureCompleteness: z.number().min(1, {message: "Rating required"}),

  recommend: z.union([z.literal("yes"), z.literal("no"), z.undefined()]).refine(val => val === "yes" || val === "no", {message: "Select an option"}),
  customerRecomendation: z.string()
})