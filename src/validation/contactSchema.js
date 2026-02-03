import * as z from "zod";
import { isValidPhone } from "../utils/helpers/validation";

export const buildContactSchema = (t) =>
  z.object({
    fullName: z.string().min(2, t.contact.validation.nameMin),
    email: z.string().email(t.contact.validation.emailInvalid),
    phone: z
      .string()
      .min(1, t.contact.validation.phoneRequired)
      .refine((val) => isValidPhone(val), {
        message: t.contact.validation.phoneInvalid,
      }),
    service: z.string().min(1, t.contact.validation.serviceRequired),
    message: z.string().min(10, t.contact.validation.messageMin),
  });
