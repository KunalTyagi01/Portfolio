"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Award, GraduationCap, HeartHandshake, Sparkles, X } from "lucide-react";
import { useEffect, useState } from "react";
import { certifications, extracurriculars, trainingCertificates } from "@/data/portfolio";
import { Section } from "./Section";

const issuerStyles: Record<string, string> = {
  Aviatrix: "issuer-aviatrix",
  Calyptus: "issuer-calyptus"
};

const highlightIcons = [HeartHandshake, Sparkles];
const MOBILE_CERT_FOCUS_LIMIT = 4;
type Certification = (typeof certifications)[0];

function CertificationModal({
  cert,
  onClose,
}: Readonly<{ cert: Certification; onClose: () => void }>) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center px-4 py-6"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.1 }}
    >
      <button
        type="button"
        aria-label="Close certification panel"
        className="skills-modal-backdrop absolute inset-0 cursor-default"
        onClick={onClose}
      />
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-labelledby="certification-modal-title"
        className="skills-modal-panel relative z-10 w-full max-w-sm rounded-3xl p-5 shadow-2xl"
        initial={{ opacity: 0, y: 22, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 18, scale: 0.96 }}
        transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="absolute inset-x-0 top-0 h-1 rounded-t-3xl bg-[linear-gradient(90deg,#635bff,#ff4d8d,#ff7a1a,#2dd4bf)]" />
        <div className="mb-5 flex items-start justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-mint/10 text-mint">
              <Award size={22} />
            </div>
            <div>
              <p className="accent-label text-xs font-bold uppercase">
                Certification
              </p>
              <h3
                id="certification-modal-title"
                className="mt-1 font-display text-xl font-semibold text-white"
              >
                {cert.name}
              </h3>
              <p className={`mt-2 inline-flex rounded-full border px-3 py-1 text-sm font-semibold ${issuerStyles[cert.issuer] ?? "border-cyan/25 bg-cyan/10 text-cyan"}`}>
                {cert.issuer}
              </p>
            </div>
          </div>
          <button
            type="button"
            aria-label="Close"
            onClick={onClose}
            className="drawer-close inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition"
          >
            <X size={16} />
          </button>
        </div>
        <div className="flex max-h-[52vh] flex-wrap gap-2 overflow-y-auto pr-1">
          {cert.focus.map((item) => (
            <span
              key={item}
              className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-sm font-medium text-slate-300"
            >
              {item}
            </span>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

export function Achievements() {
  const [selectedCert, setSelectedCert] = useState<Certification | null>(null);

  return (
    <Section id="achievements" eyebrow="Certifications" title="Cloud, AI, and engineering fundamentals.">
      <div className="mb-6 grid grid-cols-2 gap-3 sm:gap-5">
        {certifications.map((cert, index) => (
          <div key={cert.name} className="glass rounded-3xl p-4 sm:p-8">
            <div className="mb-3 flex items-start gap-2.5 sm:mb-5 sm:gap-3">
              <div className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-mint/10 text-mint sm:h-12 sm:w-12 sm:rounded-2xl">
                <Award size={17} className="sm:h-[21px] sm:w-[21px]" />
              </div>
              <div>
                <p className="accent-label text-[0.68rem] font-bold uppercase sm:text-sm">
                  {index === 0 ? "Featured Certification" : "Certification"}
                </p>
                <h3 className="mt-1.5 font-display text-base font-semibold leading-6 text-white sm:mt-2 sm:text-2xl sm:leading-8">
                  {cert.name}
                </h3>
                <p className={`mt-2 inline-flex rounded-full border px-2.5 py-0.5 text-xs font-semibold sm:px-3 sm:py-1 sm:text-sm ${issuerStyles[cert.issuer] ?? "border-cyan/25 bg-cyan/10 text-cyan"}`}>
                  {cert.issuer}
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              {cert.focus.map((item, itemIndex) => (
                <span key={item} className={`rounded-full border border-white/10 bg-white/[0.04] px-2 py-0.5 text-[0.68rem] font-medium text-slate-300 sm:px-3 sm:py-1.5 sm:text-sm ${
                  itemIndex >= MOBILE_CERT_FOCUS_LIMIT
                    ? "hidden sm:inline-flex"
                    : ""
                }`}>
                  {item}
                </span>
              ))}
              {cert.focus.length > MOBILE_CERT_FOCUS_LIMIT ? (
                <button
                  type="button"
                  aria-haspopup="dialog"
                  aria-label={`Open all ${cert.name} certification skills`}
                  onClick={() => setSelectedCert(cert)}
                  className="rounded-full border border-cyan/20 bg-cyan/10 px-2 py-0.5 text-[0.68rem] font-semibold text-cyan transition hover:border-mint hover:text-mint sm:hidden"
                >
                  +{cert.focus.length - MOBILE_CERT_FOCUS_LIMIT} more
                </button>
              ) : null}
            </div>
          </div>
        ))}
      </div>
      <div className="glass rounded-3xl p-5 sm:p-8">
        <div className="mb-5 flex items-start gap-3 sm:mb-7 sm:items-center">
          <div className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-coral/10 text-coral sm:h-12 sm:w-12">
            <GraduationCap size={23} />
          </div>
          <p className="max-w-2xl text-sm leading-6 text-slate-300 sm:text-base sm:leading-7">
            Certificate-backed training focused on programming fundamentals, databases, algorithms, and problem solving.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4">
          {trainingCertificates.map((training, index) => (
            <div
              key={training.name}
              className={`rounded-2xl border border-white/10 bg-white/[0.03] p-4 ${
                index === 0 ? "col-span-2 md:col-span-1" : ""
              }`}
            >
              <p className="text-sm font-semibold leading-5 text-white sm:text-base sm:leading-6">
                {training.name}
              </p>
              <p className="mt-1 text-xs font-semibold text-coral sm:text-sm">
                {training.issuer}
              </p>
              <div className="mt-3 flex flex-wrap gap-1.5 sm:mt-4 sm:gap-2">
                {training.focus.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-white/10 bg-white/[0.04] px-2 py-0.5 text-[0.68rem] font-medium text-slate-300 sm:px-2.5 sm:py-1 sm:text-xs"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6 border-t border-white/10 pt-5 sm:mt-8 sm:pt-6">
          <p className="accent-label mb-3 text-xs font-bold uppercase sm:mb-4 sm:text-sm">Additional Highlights</p>
        </div>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-2 md:gap-4">
          {extracurriculars.map((item, index) => {
            const Icon = highlightIcons[index] ?? Sparkles;
            return (
            <div key={item} className="rounded-2xl border border-mint/20 bg-mint/[0.06] p-4 shadow-[0_0_28px_rgba(73,242,194,0.08)] sm:p-5">
              <Icon className="mb-3 text-mint sm:mb-4" size={19} />
              <p className="text-xs font-semibold leading-5 text-white sm:text-base sm:leading-7">{item}</p>
            </div>
            );
          })}
        </div>
      </div>
      <AnimatePresence>
        {selectedCert ? (
          <CertificationModal
            cert={selectedCert}
            onClose={() => setSelectedCert(null)}
          />
        ) : null}
      </AnimatePresence>
    </Section>
  );
}
