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
        <div className="glass rounded-3xl p-6 sm:p-8">
          <p className="text-lg leading-8 text-slate-300">
            Seeking a challenging role as a Full-Stack Developer. Open to
            full-time opportunities, collaborations, and interesting engineering
            problems across frontend, backend, product engineering, MERN, MEAN,
            and cloud-native systems.
          </p>
          <div className="mt-8 space-y-4">
            <button
              type="button"
              onClick={openContactModal}
              className="focus-ring flex w-full items-center gap-3 rounded-2xl border border-white/10 p-4 text-left text-slate-200 transition hover:border-mint/50 hover:text-mint"
            >
              <Mail size={20} /> {profile.email}
            </button>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              className="focus-ring flex items-center gap-3 rounded-2xl border border-white/10 p-4 text-slate-200 transition hover:border-cyan/50 hover:text-cyan"
            >
              <FaLinkedinIn size={20} /> linkedin.com/in/kunal-tyagi-25b0281bb
            </a>
            <a
              href={`tel:${profile.phone}`}
              className="focus-ring flex items-center gap-3 rounded-2xl border border-white/10 p-4 text-slate-200 transition hover:border-coral/50 hover:text-coral"
            >
              <Phone size={20} /> {profile.phone}
            </a>
          </div>
        </div>

        <form className="glass rounded-3xl p-6 sm:p-8" onSubmit={handleSubmit}>
          <div className="flex h-full flex-col gap-5">
            <div>
              <p className="accent-label text-sm font-bold uppercase">
                Contact Form
              </p>
              <h3 className="mt-3 font-display text-3xl font-semibold text-white">
                Send a message directly from the portfolio.
              </h3>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-slate-300">
                  Name
                </span>
                <input
                  className="focus-ring w-full rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-3 text-white placeholder:text-slate-500"
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
                  className="focus-ring w-full rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-3 text-white placeholder:text-slate-500"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  required
                />
              </label>
            </div>
            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-slate-300">
                Message
              </span>
              <textarea
                className="focus-ring min-h-36 w-full resize-none rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-3 text-white placeholder:text-slate-500"
                name="message"
                placeholder="Tell me about the role, project, or collaboration."
                required
              />
            </label>
            <div className="grid gap-3 sm:grid-cols-2">
              <button
                type="submit"
                disabled={status === "sending" || emailConfigured === false}
                className="focus-ring inline-flex items-center justify-center gap-2 rounded-full bg-mint px-6 py-3 font-semibold text-ink transition hover:-translate-y-0.5 hover:bg-white"
              >
                <span>{status === "sending" ? "Sending..." : "Send Message"}</span>
                <Send size={18} />
              </button>
              <a
                href={`mailto:${profile.email}?subject=${encodeURIComponent(
                  "Opportunity for Kunal Tyagi",
                )}`}
                className="mail-action focus-ring inline-flex items-center justify-center gap-3 rounded-full px-5 py-3 font-semibold transition hover:-translate-y-0.5"
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
    </Section>
  );
}
