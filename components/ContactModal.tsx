"use client";

import { AnimatePresence, motion } from "framer-motion";
import { AlertTriangle, CheckCircle2, Mail, Send, X, XCircle } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { profile } from "@/data/portfolio";
import { isEmailConfigured, sendEmailForm } from "@/data/sendEmail";

export const CONTACT_MODAL_EVENT = "open-contact-modal";

type FormSubmitEvent = {
  preventDefault: () => void;
  currentTarget: HTMLFormElement;
};

export function openContactModal() {
  globalThis.dispatchEvent(new Event(CONTACT_MODAL_EVENT));
}

export function ContactModal() {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">(
    "idle",
  );
  const emailConfigured = isEmailConfigured();

  useEffect(() => {
    const handleOpen = () => setOpen(true);
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    globalThis.addEventListener(CONTACT_MODAL_EVENT, handleOpen);
    globalThis.addEventListener("keydown", handleKeyDown);
    return () => {
      globalThis.removeEventListener(CONTACT_MODAL_EVENT, handleOpen);
      globalThis.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const directMailHref = useMemo(
    () =>
      `mailto:${profile.email}?subject=${encodeURIComponent(
        "Opportunity for Kunal Tyagi",
      )}`,
    [],
  );

  const handleSubmit = (event: FormSubmitEvent) => {
    event.preventDefault();
    const form = event.currentTarget;
    setStatus("sending");
    sendEmailForm(form)
      .then(() => {
        setStatus("success");
        form.reset();
      })
      .catch((error) => {
        setStatus("error");
        if (process.env.NODE_ENV !== "production") {
          // eslint-disable-next-line no-console
          console.error("EmailJS error:", error);
        }
      });
  };

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-[100] grid place-items-center bg-slate-950/35 px-3 py-3 backdrop-blur-md sm:px-4 sm:py-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="contact-modal-title"
        >
          <button
            type="button"
            aria-label="Close contact form"
            className="absolute inset-0 cursor-default"
            onClick={() => setOpen(false)}
          />
          <motion.div
            className="contact-modal-surface relative max-h-[94dvh] w-full max-w-2xl overflow-y-auto rounded-3xl p-5 sm:max-h-[92vh] sm:p-8"
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.96 }}
            transition={{ duration: 0.24 }}
          >
            <div className="mb-4 flex items-start justify-between gap-4 sm:mb-6 sm:gap-5">
              <div>
                <p className="accent-label text-sm font-bold uppercase">
                  Contact
                </p>
                <p className="mt-2 max-w-xl text-sm leading-6 text-slate-400 sm:mt-3">
                  You can also open your mail app if you prefer sending from your own inbox.
                </p>
              </div>
              <button
                type="button"
                aria-label="Close"
                onClick={() => setOpen(false)}
                className="focus-ring inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/15 text-slate-300 transition hover:border-coral hover:text-coral sm:h-11 sm:w-11"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="grid gap-3 sm:grid-cols-2 sm:gap-4">
                <label className="block">
                  <span className="mb-2 block text-sm font-semibold text-slate-300">
                    Name
                  </span>
                  <input
                    className="contact-field focus-ring w-full rounded-2xl px-4 py-2.5 text-white placeholder:text-slate-500 sm:py-3"
                    name="name"
                    placeholder="Your name"
                    required
                  />
                </label>
                <label className="block">
                  <span className="mb-2 block text-sm font-semibold text-slate-300">
                    Email
                  </span>
                  <input
                    className="contact-field focus-ring w-full rounded-2xl px-4 py-2.5 text-white placeholder:text-slate-500 sm:py-3"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    required
                  />
                </label>
              </div>
              <label className="mt-3 block sm:mt-4">
                <span className="mb-2 block text-sm font-semibold text-slate-300">
                  Message
                </span>
                <textarea
                  className="contact-field focus-ring min-h-28 w-full resize-none rounded-2xl px-4 py-3 text-white placeholder:text-slate-500 sm:min-h-40"
                  name="message"
                  placeholder="Tell me about the role, project, or collaboration."
                  required
                />
              </label>
              <div className="mt-4 grid gap-3 sm:mt-6 sm:flex sm:flex-row">
                <button
                  type="submit"
                  disabled={status === "sending" || emailConfigured === false}
                  className="focus-ring inline-flex items-center justify-center gap-2 rounded-full bg-mint px-5 py-2.5 font-semibold text-ink transition hover:-translate-y-0.5 hover:bg-white sm:px-6 sm:py-3"
                >
                  <span>{status === "sending" ? "Sending..." : "Send Message"}</span>
                  <Send size={18} />
                </button>
                <a
                  href={directMailHref}
                  className="mail-action focus-ring inline-flex items-center justify-center gap-3 rounded-full px-5 py-2.5 font-semibold transition hover:-translate-y-0.5 sm:py-3"
                >
                  <span
                    className="mail-action-icon inline-flex h-8 w-8 items-center justify-center rounded-full"
                    aria-hidden="true"
                  >
                    <Mail size={17} />
                  </span>
                  <span>Open Mail App</span>
                </a>
              </div>
              {emailConfigured === false ? (
                <div className="status-message status-message-warning mt-4">
                  <AlertTriangle className="mt-0.5 shrink-0" size={18} />
                  <span>EmailJS env vars are missing. Use Open Mail App for now.</span>
                </div>
              ) : null}
              {status === "success" ? (
                <div className="status-message status-message-success mt-4">
                  <CheckCircle2 className="mt-0.5 shrink-0" size={18} />
                  <span>Message sent successfully. I will get back to you soon.</span>
                </div>
              ) : null}
              {status === "error" ? (
                <div className="status-message status-message-error mt-4">
                  <XCircle className="mt-0.5 shrink-0" size={18} />
                  <span>Message failed to send. Please try Open Mail App.</span>
                </div>
              ) : null}
            </form>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
