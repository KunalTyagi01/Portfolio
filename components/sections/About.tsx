"use client";

import { motion } from "framer-motion";
import { BadgeCheck, GraduationCap } from "lucide-react";
import { aboutHighlights, competencies, profile } from "@/data/portfolio";
import { Section } from "@/components/ui/Section";

export function About() {
  return (
    <Section
      id="about"
      eyebrow="About"
      title="Product-minded engineering with systems depth."
      compactMobile
    >
      <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="glass rounded-3xl p-5 sm:p-8">
          <p className="text-sm leading-6 text-slate-300 sm:text-lg sm:leading-8">{profile.summary}</p>
          <div className="mt-5 rounded-2xl border border-white/10 bg-white/[0.03] p-4 sm:mt-8 sm:p-5">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between sm:gap-5">
              <div className="flex items-start gap-3">
              <GraduationCap className="mt-1 shrink-0 text-mint" size={19} />
              <div>
                <p className="text-sm font-semibold text-white sm:text-base">Education</p>
                <p className="mt-1 text-xs leading-5 text-slate-400 sm:text-sm sm:leading-6">{profile.education}</p>
              </div>
              </div>
              <div className="plain-stat-panel min-w-28 rounded-2xl px-4 py-3 text-center sm:min-w-32 sm:px-5 sm:py-4">
                <p className="gradient-number font-display text-3xl font-bold leading-none sm:text-4xl">8.01</p>
                <p className="mt-1 text-[0.65rem] font-bold uppercase tracking-[0.2em] text-slate-400 sm:text-xs sm:tracking-[0.24em]">CGPA</p>
              </div>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-2.5 sm:mt-6 sm:gap-3">
            {aboutHighlights.map((highlight) => (
              <div key={highlight.label} className="rainbow-panel rounded-2xl p-3 sm:p-4">
                <p className="gradient-number font-display text-xl font-bold sm:text-2xl">{highlight.value}</p>
                <p className="mt-1 text-[0.68rem] leading-4 text-slate-400 sm:text-xs sm:leading-5">{highlight.label}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="hidden gap-3 sm:grid sm:grid-cols-2">
          {competencies.map((item, index) => (
            <motion.div
              key={item}
              className="rounded-2xl border border-white/10 bg-white/[0.035] p-5 transition hover:-translate-y-1 hover:border-mint/45 hover:bg-mint/5"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.035 }}
            >
              <BadgeCheck className="mb-4 text-mint" size={20} />
              <p className="font-medium leading-6 text-slate-100">{item}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}
