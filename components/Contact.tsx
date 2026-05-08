"use client";

import { Mail, Phone, Send } from "lucide-react";
import { FaLinkedinIn } from "react-icons/fa6";
import { profile } from "@/data/portfolio";
import { Section } from "./Section";

export function Contact() {
  return (
    <Section id="contact" eyebrow="Contact" title="Let's Connect">
      <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="glass rounded-3xl p-6 sm:p-8">
          <p className="text-lg leading-8 text-slate-300">
            Seeking a challenging role as a Full-Stack Developer. Open to
            full-time opportunities, collaborations, and interesting engineering
            problems worth solving — across Full-Stack, Frontend, Backend, MERN,
            MEAN, Product Engineering, and Cloud-Native systems.
          </p>
          <div className="mt-8 space-y-4">
            <a
              href={`mailto:${profile.email}`}
              className="focus-ring flex items-center gap-3 rounded-2xl border border-white/10 p-4 text-slate-200 transition hover:border-mint/50 hover:text-mint"
            >
              <Mail size={20} /> {profile.email}
            </a>
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
        <form
          className="glass rounded-3xl p-6 sm:p-8"
          action={`mailto:${profile.email}`}
          method="post"
          encType="text/plain"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="mb-2 block text-sm font-medium text-slate-300">
                Name
              </span>
              <input
                className="focus-ring w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-white placeholder:text-slate-500"
                name="name"
                placeholder="Your name"
                required
              />
            </label>
            <label className="block">
              <span className="mb-2 block text-sm font-medium text-slate-300">
                Email
              </span>
              <input
                className="focus-ring w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-white placeholder:text-slate-500"
                name="email"
                type="email"
                placeholder="you@example.com"
                required
              />
            </label>
          </div>
          <label className="mt-4 block">
            <span className="mb-2 block text-sm font-medium text-slate-300">
              Message
            </span>
            <textarea
              className="focus-ring min-h-36 w-full resize-none rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-white placeholder:text-slate-500"
              name="message"
              placeholder="Tell me about the opportunity or project."
              required
            />
          </label>
          <button
            type="submit"
            className="focus-ring mt-5 inline-flex items-center justify-center gap-2 rounded-full bg-mint px-6 py-3 font-semibold text-ink transition hover:-translate-y-0.5 hover:bg-white"
          >
            Send Message <Send size={18} />
          </button>
        </form>
      </div>
    </Section>
  );
}
