import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { buildContactSchema } from "../validation/contactSchema";

/**
 * Shared contact/lead form hook to centralize validation, defaults, and reset.
 * Use `includeMessage: false` for shorter lead forms that omit the message field.
 */
export const useContactForm = (t, onSuccess, options = {}) => {
  const { includeMessage = true } = options;

  const schema = buildContactSchema(t);
  const activeSchema = includeMessage
    ? schema
    : schema.omit({ message: true });

  const defaultValues = {
    fullName: "",
    email: "",
    phone: "",
    service: "",
    ...(includeMessage ? { message: "" } : {}),
  };

  const form = useForm({
    resolver: zodResolver(activeSchema),
    defaultValues,
  });

  const handleSubmit = async (data) => {
    await onSuccess?.(data);
    form.reset();
  };

  return { form, handleSubmit };
};
