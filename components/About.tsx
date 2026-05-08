"use client";

import { motion } from "framer-motion";
import { BadgeCheck, GraduationCap } from "lucide-react";
import { aboutHighlights, competencies, profile } from "@/data/portfolio";
import { Section } from "./Section";

export function About() {
  return (
    <Section id="about" eyebrow="About" title="Product-minded engineering with systems depth.">
      <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="glass rounded-3xl p-6 sm:p-8">
          <p className="text-lg leading-8 text-slate-300">{profile.summary}</p>
          <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-start gap-3">
              <GraduationCap className="mt-1 text-mint" size={22} />
              <div>
                <p className="font-semibold text-white">Education</p>
                <p className="mt-1 text-sm leading-6 text-slate-400">{profile.education}</p>
              </div>
              </div>
              <div className="plain-stat-panel min-w-32 rounded-2xl px-5 py-4 text-center">
                <p className="gradient-number font-display text-4xl font-bold leading-none">8.01</p>
                <p className="mt-1 text-xs font-bold uppercase tracking-[0.24em] text-slate-400">CGPA</p>
              </div>
            </div>
          </div>
          <div className="mt-6 grid grid-cols-2 gap-3">
            {aboutHighlights.map((highlight) => (
              <div key={highlight.label} className="rainbow-panel rounded-2xl p-4">
                <p className="gradient-number font-display text-2xl font-bold">{highlight.value}</p>
                <p className="mt-1 text-xs leading-5 text-slate-400">{highlight.label}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
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
