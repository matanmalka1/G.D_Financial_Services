import * as z from "zod";
import { parsePhoneNumberFromString } from "libphonenumber-js";
import metadata from "libphonenumber-js/metadata.min.json";

export const buildContactSchema = (t) =>
  z.object({
    fullName: z.string().min(2, t.contact.validation.nameMin),
    email: z.string().email(t.contact.validation.emailInvalid),
    phone: z
      .string()
      .min(1, t.contact.validation.phoneRequired)
      .refine((val) => {
        return parsePhoneNumberFromString(val, metadata)?.isValid();
      }, {
        message: t.contact.validation.phoneInvalid,
      }),
    service: z.string().min(1, t.contact.validation.serviceRequired),
    message: z.string().min(10, t.contact.validation.messageMin),
  });
