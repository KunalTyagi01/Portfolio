"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

type SectionProps = {
  id: string;
  eyebrow: string;
  title: string;
  children: ReactNode;
  className?: string;
  compactMobile?: boolean;
};

export function Section({
  id,
  eyebrow,
  title,
  children,
  className = "",
  compactMobile = false,
}: Readonly<SectionProps>) {
  return (
    <motion.section
      id={id}
      className={`section-shell scroll-mt-16 ${compactMobile ? "py-9 sm:py-16" : "py-10 sm:py-16"} ${className}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className={`${compactMobile ? "mb-6 sm:mb-9" : "mb-7 sm:mb-9"} max-w-3xl`}>
        <p className={`accent-label font-bold uppercase ${compactMobile ? "mb-2 text-xs sm:mb-3 sm:text-sm" : "mb-2 text-xs sm:mb-3 sm:text-sm"}`}>
          {eyebrow}
        </p>
        <h2 className={`font-display font-semibold text-white ${compactMobile ? "text-2xl leading-8 sm:text-4xl sm:leading-tight" : "text-2xl leading-8 sm:text-4xl sm:leading-tight"}`}>
          {title}
        </h2>
      </div>
      {children}
    </motion.section>
  );
}
