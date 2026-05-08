"use client";

import { Award, GraduationCap, HeartHandshake, Sparkles } from "lucide-react";
import { certifications, extracurriculars, trainingCertificates } from "@/data/portfolio";
import { Section } from "./Section";

const issuerStyles: Record<string, string> = {
  Aviatrix: "issuer-aviatrix",
  Calyptus: "issuer-calyptus"
};

const highlightIcons = [HeartHandshake, Sparkles];

export function Achievements() {
  return (
    <Section id="achievements" eyebrow="Certifications" title="Cloud, AI, and engineering fundamentals.">
      <div className="mb-6 grid gap-5 lg:grid-cols-2">
        {certifications.map((cert, index) => (
          <div key={cert.name} className="glass rounded-3xl p-6 sm:p-8">
            <div className="mb-5 flex items-start gap-3">
              <div className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-mint/10 text-mint">
                <Award size={23} />
              </div>
              <div>
                <p className="accent-label text-sm font-bold uppercase">
                  {index === 0 ? "Featured Certification" : "Certification"}
                </p>
                <h3 className="mt-2 font-display text-2xl font-semibold text-white">{cert.name}</h3>
                <p className={`mt-2 inline-flex rounded-full border px-3 py-1 text-sm font-semibold ${issuerStyles[cert.issuer] ?? "border-cyan/25 bg-cyan/10 text-cyan"}`}>
                  {cert.issuer}
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {cert.focus.map((item) => (
                <span key={item} className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-sm text-slate-300">
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="glass rounded-3xl p-6 sm:p-8">
        <div className="mb-7 flex items-center gap-3">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-coral/10 text-coral">
            <GraduationCap size={23} />
          </div>
          <p className="max-w-2xl text-slate-300">
            Certificate-backed training focused on programming fundamentals, databases, algorithms, and problem solving.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {trainingCertificates.map((training) => (
            <div key={training.name} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
              <p className="font-semibold text-white">{training.name}</p>
              <p className="mt-1 text-sm text-coral">{training.issuer}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {training.focus.map((item) => (
                  <span key={item} className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-xs text-slate-300">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-8 border-t border-white/10 pt-6">
          <p className="accent-label mb-4 text-sm font-bold uppercase">Additional Highlights</p>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {extracurriculars.map((item, index) => {
            const Icon = highlightIcons[index] ?? Sparkles;
            return (
            <div key={item} className="rounded-2xl border border-mint/20 bg-mint/[0.06] p-5 shadow-[0_0_28px_rgba(73,242,194,0.08)]">
              <Icon className="mb-4 text-mint" size={24} />
              <p className="font-semibold leading-7 text-white">{item}</p>
            </div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
