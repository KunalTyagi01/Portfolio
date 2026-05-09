"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { experience } from "@/data/portfolio";
import { Section } from "./Section";

const MOBILE_HIGHLIGHT_LIMIT = 4;

export function Experience() {
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>(
    {},
  );

  return (
    <Section
      id="experience"
      eyebrow="Timeline"
      title="Enterprise products, cloud platforms, and embedded delivery."
    >
      <div className="relative">
        <div className="absolute bottom-0 left-4 top-0 hidden w-px bg-gradient-to-b from-mint via-cyan to-transparent md:block" />
        <div className="space-y-5">
          {experience.map((item, index) => {
            const Icon = item.icon;
            const itemKey = `${item.company}-${item.role}`;
            const expanded = expandedItems[itemKey] === true;
            return (
              <motion.article
                key={itemKey}
                className="relative md:pl-14"
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.06 }}
              >
                <div className="absolute left-0 top-6 hidden h-9 w-9 items-center justify-center rounded-full border border-mint/40 bg-ink text-mint md:flex">
                  <Icon size={18} />
                </div>
                <div className="glass rounded-3xl p-6">
                  <div className="flex flex-col gap-3 border-b border-white/10 pb-5 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <h3 className="font-display text-xl font-semibold sm:text-2xl text-white">
                        {item.company}
                      </h3>
                      <p className="role-accent mt-1 font-semibold">
                        {item.role}
                      </p>
                    </div>
                    <div className="text-left text-sm text-slate-400 sm:text-right">
                      <p>{item.period}</p>
                      <p>{item.location}</p>
                    </div>
                  </div>
                  <ul className="mt-5 grid gap-3">
                    {item.highlights.map((highlight, highlightIndex) => (
                      <li
                        key={highlight}
                        className={`gap-3 text-sm leading-6 text-slate-300 ${
                          highlightIndex >= MOBILE_HIGHLIGHT_LIMIT &&
                          expanded === false
                            ? "hidden sm:flex"
                            : "flex"
                        }`}
                      >
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan" />
                        {highlight}
                      </li>
                    ))}
                  </ul>
                  {item.highlights.length > MOBILE_HIGHLIGHT_LIMIT ? (
                    <button
                      type="button"
                      onClick={() =>
                        setExpandedItems((current) => ({
                          ...current,
                          [itemKey]: current[itemKey] !== true,
                        }))
                      }
                      className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-cyan transition hover:text-mint sm:hidden"
                    >
                      {expanded
                        ? "Show less"
                        : `+${item.highlights.length - MOBILE_HIGHLIGHT_LIMIT} more responsibilities`}
                      <ChevronDown
                        size={14}
                        className={`transition ${expanded ? "rotate-180" : ""}`}
                      />
                    </button>
                  ) : null}
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
