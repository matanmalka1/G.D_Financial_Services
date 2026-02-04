import * as z from "zod";
import { parsePhoneNumberFromString } from "libphonenumber-js";
import metadata from "libphonenumber-js/metadata.min.json";

export const buildLeadCaptureSchema = (t) =>
  z.object({
    fullName: z
      .string()
      .min(2, t.modalForm.fullNameError || "Full name is required"),
    email: z
      .string()
      .email(t.modalForm.emailInvalid || "Invalid email address"),
    phone: z
      .string()
      .min(1, t.modalForm.phoneError || "Phone is required")
      .refine(
        (val) => parsePhoneNumberFromString(val, metadata)?.isValid(),
        t.modalForm.phoneError || "Phone is required",
      ),
    service: z
      .string()
      .min(1, t.modalForm.serviceError || "Select a service"),
  });
