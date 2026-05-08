"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

type SectionProps = {
  id: string;
  eyebrow: string;
  title: string;
  children: ReactNode;
  className?: string;
};

export function Section({
  id,
  eyebrow,
  title,
  children,
  className = "",
}: Readonly<SectionProps>) {
  return (
    <motion.section
      id={id}
      className={`section-shell scroll-mt-16 py-12 sm:py-16 ${className}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="mb-9 max-w-3xl">
        <p className="accent-label mb-3 text-sm font-bold uppercase">
          {eyebrow}
        </p>
        <h2 className="font-display text-3xl font-semibold text-white sm:text-4xl">
          {title}
        </h2>
      </div>
      {children}
    </motion.section>
  );
}
