import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { buildContactSchema } from "../validation/contactSchema";

/**
 * Shared contact/lead form hook to centralize validation, defaults, and reset.
 * Use `includeMessage: false` for shorter lead forms that omit the message field.
 */
export const useContactForm = (t, onSuccess, options = {}) => {
  const { includeMessage = true, includeService = true } = options;

  const activeSchema = useMemo(() => {
    const schema = buildContactSchema(t);
    const fieldsToOmit = {};
    if (!includeMessage) fieldsToOmit.message = true;
    if (!includeService) fieldsToOmit.service = true;
    return Object.keys(fieldsToOmit).length > 0 ? schema.omit(fieldsToOmit) : schema;
  }, [t, includeMessage, includeService]);

  const defaultValues = useMemo(
    () => ({
      fullName: "",
      email: "",
      phone: "",
      ...(includeService ? { service: "" } : {}),
      ...(includeMessage ? { message: "" } : {}),
    }),
    [includeService, includeMessage],
  );

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
