import emailjs from "@emailjs/browser";
import {
  EMAILJS_PUBLIC_KEY,
  EMAILJS_SERVICE_ID,
  EMAILJS_TEMPLATE_ID,
} from "./emailjs.config";

export function isEmailConfigured() {
  return Boolean(
    EMAILJS_SERVICE_ID && EMAILJS_TEMPLATE_ID && EMAILJS_PUBLIC_KEY,
  );
}

export async function sendEmailForm(form: HTMLFormElement) {
  if (!isEmailConfigured()) {
    throw new Error("EmailJS environment variables are not configured.");
  }

  return emailjs.sendForm(
    EMAILJS_SERVICE_ID,
    EMAILJS_TEMPLATE_ID,
    form,
    EMAILJS_PUBLIC_KEY,
  );
}
