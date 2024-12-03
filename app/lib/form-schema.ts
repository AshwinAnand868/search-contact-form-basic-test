import { z } from "zod";

export const formSchema = z.object({
    firstName: z.string().optional(),
    lastName: z.string().min(1, "Last Name is required"), // Last Name is required
    dateOfBirth: z.string().optional(),
    email: z.string().optional(),
    phoneNumber: z
      .string()
      .optional()
      .refine((value) => !value || /^\+1\d{10}$/.test(value), {
        message: "Correct Format: +1XXXXXXXXXX",
      }),
    address: z.string().optional(),
    city: z.string().optional(),
    state: z.string().optional().nullable(),
    zipCode: z
      .string()
      .optional()
      .refine((value) => !value || /^\+1\d{10}$/.test(value), {
        message: "Correct Format eg: A1A 1A1",
      }),
  });
  

  
export type FormData = z.infer<typeof formSchema>;