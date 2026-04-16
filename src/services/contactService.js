const WEB3FORMS_URL = "https://api.web3forms.com/submit";

/**
 * Submits contact/lead form data to Web3Forms.
 * @param {object} data - Form fields (fullName, email, phone, service, message?)
 * @param {string} [subject] - Optional email subject override
 * @returns {Promise<void>} Rejects on network or API error.
 */
export const submitContactForm = async (
  data,
  subject = "New Contact Form Submission",
) => {
  const accessKey = import.meta.env.VITE_WEB3FORMS_KEY;
  if (!accessKey) throw new Error("Web3Forms access key is not configured.");

  const payload = {
    access_key: accessKey,
    subject,
    from_name: data.fullName,
    ...data,
  };

  const response = await fetch(WEB3FORMS_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(payload),
  });

  const result = await response.json();
  if (!response.ok || result.success === false) {
    throw new Error(result.message || "Submission failed");
  }
};
