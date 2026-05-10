"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { experience } from "@/data/portfolio";
import { Section } from "@/components/ui/Section";

const MOBILE_HIGHLIGHT_LIMIT = 4;
type ExperienceItem = (typeof experience)[0];

function ExperienceCard({
  item,
  expanded,
  onToggle,
  compact = false,
}: Readonly<{
  item: ExperienceItem;
  expanded: boolean;
  onToggle: () => void;
  compact?: boolean;
}>) {
  return (
    <div className={`glass rounded-3xl ${compact ? "p-5" : "p-5 sm:p-6"}`}>
      <div className="flex flex-col gap-3 border-b border-white/10 pb-5 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h3 className="font-display text-lg font-semibold text-white sm:text-2xl">
            {item.company}
          </h3>
          <p className="role-accent mt-1 text-sm font-semibold sm:text-base">
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
              highlightIndex >= MOBILE_HIGHLIGHT_LIMIT && expanded === false
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
          onClick={onToggle}
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
  );
}

export function Experience() {
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>(
    {},
  );
  const [activeIndex, setActiveIndex] = useState(0);
  const activeItem = experience[activeIndex];
  const activeItemKey = `${activeItem.company}-${activeItem.role}`;
  const activeExpanded = expandedItems[activeItemKey] === true;

  return (
    <Section
      id="experience"
      eyebrow="Timeline"
      title="Enterprise products, cloud platforms, and embedded delivery."
    >
      <div className="md:hidden">
        <div className="glass mb-4 rounded-3xl p-2">
          <div className="grid grid-cols-2 gap-2">
            {experience.map((item, index) => (
              <button
                key={`${item.company}-${item.role}`}
                type="button"
                onClick={() => setActiveIndex(index)}
                className={`rounded-2xl px-3 py-3 text-left transition ${
                  activeIndex === index
                    ? "bg-mint text-ink shadow-[0_14px_34px_rgba(73,242,194,0.22)]"
                    : "text-slate-300 hover:bg-white/[0.05]"
                }`}
              >
                <span className="block text-xs font-bold uppercase tracking-[0.16em]">
                  {index === 0 ? "Current" : "Internship"}
                </span>
                <span className="mt-1 block text-sm font-semibold leading-5">
                  {item.role}
                </span>
              </button>
            ))}
          </div>
        </div>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeItemKey}
            initial={{ opacity: 0, x: 18 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -18 }}
            transition={{ duration: 0.22 }}
          >
            <ExperienceCard
              item={activeItem}
              expanded={activeExpanded}
              compact
              onToggle={() =>
                setExpandedItems((current) => ({
                  ...current,
                  [activeItemKey]: current[activeItemKey] !== true,
                }))
              }
            />
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="relative hidden md:block">
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
                <ExperienceCard
                  item={item}
                  expanded={expanded}
                  onToggle={() =>
                    setExpandedItems((current) => ({
                      ...current,
                      [itemKey]: current[itemKey] !== true,
                    }))
                  }
                />
              </motion.article>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
