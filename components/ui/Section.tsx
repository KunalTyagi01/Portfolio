"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

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
  const verticalSpacing = compactMobile ? "py-9 sm:py-16" : "py-10 sm:py-16";
  const headerSpacing = compactMobile ? "mb-6 sm:mb-9" : "mb-7 sm:mb-9";

  return (
    <motion.section
      id={id}
      className={cn("section-shell scroll-mt-16", verticalSpacing, className)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className={cn(headerSpacing, "max-w-3xl")}>
        <p className="accent-label mb-2 text-xs font-bold uppercase sm:mb-3 sm:text-sm">
          {eyebrow}
        </p>
        <h2 className="font-display text-2xl font-semibold leading-8 text-white sm:text-4xl sm:leading-tight">
          {title}
        </h2>
      </div>
      {children}
    </motion.section>
  );
}
