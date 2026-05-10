"use client";

import { AlertTriangle, CheckCircle2, Mail, Phone, Send, XCircle } from "lucide-react";
import { useState } from "react";
import { FaLinkedinIn } from "react-icons/fa6";
import { openContactModal } from "@/components/ContactModal";
import { profile } from "@/data/portfolio";
import { isEmailConfigured, sendEmailForm } from "@/data/sendEmail";
import { Section } from "./Section";

type FormSubmitEvent = {
  preventDefault: () => void;
  currentTarget: HTMLFormElement;
};

export function Contact() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">(
    "idle",
  );
  const emailConfigured = isEmailConfigured();

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
    <Section id="contact" eyebrow="Contact" title="Let's Connect">
      <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="glass rounded-3xl p-5 sm:p-8">
          <p className="text-sm leading-6 text-slate-300 sm:text-lg sm:leading-8">
            Seeking a challenging role as a Full-Stack Developer. Open to
            full-time opportunities, collaborations, and interesting engineering
            problems across frontend, backend, product engineering, MERN, MEAN,
            and cloud-native systems.
          </p>
          <div className="mt-5 space-y-3 sm:mt-8 sm:space-y-4">
            <button
              type="button"
              onClick={openContactModal}
              className="focus-ring flex w-full items-center gap-2.5 rounded-2xl border border-white/10 p-3 text-left text-sm text-slate-200 transition hover:border-mint/50 hover:text-mint sm:gap-3 sm:p-4 sm:text-base"
            >
              <Mail className="shrink-0" size={17} /> {profile.email}
            </button>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              className="focus-ring flex items-center gap-2.5 rounded-2xl border border-white/10 p-3 text-sm text-slate-200 transition hover:border-cyan/50 hover:text-cyan sm:gap-3 sm:p-4 sm:text-base"
            >
              <FaLinkedinIn className="shrink-0" size={17} /> <span className="min-w-0 break-all">linkedin.com/in/kunal-tyagi-25b0281bb</span>
            </a>
            <a
              href={`tel:${profile.phone}`}
              className="focus-ring flex items-center gap-2.5 rounded-2xl border border-white/10 p-3 text-sm text-slate-200 transition hover:border-coral/50 hover:text-coral sm:gap-3 sm:p-4 sm:text-base"
            >
              <Phone className="shrink-0" size={17} /> {profile.phone}
            </a>
          </div>
        </div>

        <div id="contact-form-start" className="scroll-mt-20 lg:contents">
          <form
            id="contact-form"
            className="glass rounded-3xl p-5 sm:p-8"
            onSubmit={handleSubmit}
          >
          <div className="flex h-full flex-col gap-3.5 sm:gap-5">
            <div>
              <p className="accent-label text-[0.68rem] font-bold uppercase sm:text-sm">
                Contact Form
              </p>
              <h3 className="mt-1.5 font-display text-lg font-semibold leading-6 text-white sm:mt-3 sm:text-3xl sm:leading-10">
                <span className="sm:hidden">Send a message.</span>
                <span className="hidden sm:inline">
                  Send a message directly from the portfolio.
                </span>
              </h3>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 sm:gap-4">
              <label className="block">
                <span className="mb-1.5 block text-sm font-semibold text-slate-300 sm:mb-2">
                  Name
                </span>
                <input
                  className="focus-ring w-full rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-2.5 text-white placeholder:text-slate-500 sm:py-3"
                  name="name"
                  placeholder="Your name"
                  required
                />
              </label>
              <label className="block">
                <span className="mb-1.5 block text-sm font-semibold text-slate-300 sm:mb-2">
                  Email
                </span>
                <input
                  className="focus-ring w-full rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-2.5 text-white placeholder:text-slate-500 sm:py-3"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  required
                />
              </label>
            </div>
            <label className="block">
              <span className="mb-1.5 block text-sm font-semibold text-slate-300 sm:mb-2">
                Message
              </span>
              <textarea
                className="focus-ring min-h-24 w-full resize-none rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-3 text-white placeholder:text-slate-500 sm:min-h-36"
                name="message"
                placeholder="Tell me about the role, project, or collaboration."
                required
              />
            </label>
            <div className="grid gap-3 sm:grid-cols-2">
              <button
                type="submit"
                disabled={status === "sending" || emailConfigured === false}
                className="focus-ring inline-flex items-center justify-center gap-2 rounded-full bg-mint px-5 py-2.5 font-semibold text-ink transition hover:-translate-y-0.5 hover:bg-white sm:px-6 sm:py-3"
              >
                <span>{status === "sending" ? "Sending..." : "Send Message"}</span>
                <Send size={18} />
              </button>
              <a
                href={`mailto:${profile.email}?subject=${encodeURIComponent(
                  "Opportunity for Kunal Tyagi",
                )}`}
                className="mail-action focus-ring inline-flex items-center justify-center gap-3 rounded-full px-5 py-2.5 font-semibold transition hover:-translate-y-0.5 sm:py-3"
              >
                <span
                  className="mail-action-icon inline-flex h-7 w-7 items-center justify-center rounded-full sm:h-8 sm:w-8"
                  aria-hidden="true"
                >
                  <Mail size={16} />
                </span>
                <span>Open Mail App</span>
              </a>
            </div>
            {emailConfigured === false ? (
              <div className="status-message status-message-warning">
                <AlertTriangle className="mt-0.5 shrink-0" size={18} />
                <span>EmailJS env vars are missing. Use Open Mail App for now.</span>
              </div>
            ) : null}
            {status === "success" ? (
              <div className="status-message status-message-success">
                <CheckCircle2 className="mt-0.5 shrink-0" size={18} />
                <span>Message sent successfully. I will get back to you soon.</span>
              </div>
            ) : null}
            {status === "error" ? (
              <div className="status-message status-message-error">
                <XCircle className="mt-0.5 shrink-0" size={18} />
                <span>Message failed to send. Please try Open Mail App.</span>
              </div>
            ) : null}
          </div>
        </form>
        </div>
      </div>
    </Section>
  );
}
