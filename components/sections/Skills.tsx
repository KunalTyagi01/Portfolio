"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { IconBadge } from "@/components/ui/IconBadge";
import { TechChip } from "@/components/ui/TechChip";
import { skillGroups } from "@/data/portfolio";
import { Section } from "@/components/ui/Section";

const MOBILE_SKILL_LIMIT = 5;
type SkillGroup = (typeof skillGroups)[0];

function SkillsModal({
  group,
  onClose,
}: Readonly<{ group: SkillGroup; onClose: () => void }>) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const Icon = group.icon;

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
        aria-label="Close skills panel"
        className="skills-modal-backdrop absolute inset-0 cursor-default"
        onClick={onClose}
      />
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-labelledby="skills-modal-title"
        className="skills-modal-panel relative z-10 w-full max-w-sm rounded-3xl p-5 shadow-2xl"
        initial={{ opacity: 0, y: 22, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 18, scale: 0.96 }}
        transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="absolute inset-x-0 top-0 h-1 rounded-t-3xl bg-[linear-gradient(90deg,#635bff,#ff4d8d,#ff7a1a,#2dd4bf)]" />
        <div className="mb-5 flex items-start justify-between gap-4">
          <div className="flex items-start gap-3">
            <IconBadge icon={Icon} size={22} className="h-11 w-11" />
            <div>
              <p className="accent-label text-xs font-bold uppercase">
                Skill Group
              </p>
              <h3
                id="skills-modal-title"
                className="mt-1 font-display text-xl font-semibold text-white"
              >
                {group.title}
              </h3>
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
        <div className="flex max-h-[54vh] flex-wrap gap-2 overflow-y-auto pr-1">
          {group.skills.map((skill) => (
            <TechChip
              key={skill}
              className="px-3 py-1.5 text-sm font-medium"
            >
              {skill}
            </TechChip>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

export function Skills() {
  const [selectedGroup, setSelectedGroup] = useState<SkillGroup | null>(null);

  return (
    <Section id="skills" eyebrow="Skills" title="A stack tuned for full-stack products, APIs, cloud, and automation.">
      <div className="grid grid-cols-2 gap-3 md:grid-cols-2 md:gap-4 xl:grid-cols-3">
        {skillGroups.map((group, index) => {
          const Icon = group.icon;
          return (
            <motion.article
              key={group.title}
              className="glass rounded-3xl p-4 transition hover:-translate-y-1 hover:border-mint/40 md:p-6"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: index * 0.05 }}
            >
              <div className="mb-3 flex items-center gap-2.5 md:mb-5 md:gap-3">
                <IconBadge
                  icon={Icon}
                  size={17}
                  className="h-8 w-8 rounded-xl md:h-12 md:w-12 md:rounded-2xl"
                  iconClassName="md:h-[21px] md:w-[21px]"
                />
                <h3 className="font-display text-base font-semibold leading-5 text-white md:text-xl md:leading-7">
                  {group.title}
                </h3>
              </div>
              <div className="flex flex-wrap gap-1.5 md:gap-2">
                {group.skills.map((skill, skillIndex) => (
                  <TechChip
                    key={skill}
                    className={`px-2 py-0.5 text-[0.68rem] font-medium transition hover:border-cyan/50 hover:text-white md:px-3 md:py-1.5 md:text-sm ${
                      skillIndex >= MOBILE_SKILL_LIMIT
                        ? "hidden md:inline-flex"
                        : ""
                    }`}
                  >
                    {skill}
                  </TechChip>
                ))}
                {group.skills.length > MOBILE_SKILL_LIMIT ? (
                  <button
                    type="button"
                    onClick={() => setSelectedGroup(group)}
                    aria-haspopup="dialog"
                    aria-label={`Open all ${group.title} skills`}
                    className="rounded-full border border-cyan/20 bg-cyan/10 px-2 py-0.5 text-[0.68rem] font-semibold text-cyan transition hover:border-mint hover:text-mint md:hidden"
                  >
                    +{group.skills.length - MOBILE_SKILL_LIMIT} more
                  </button>
                ) : null}
              </div>
            </motion.article>
          );
        })}
      </div>
      <AnimatePresence>
        {selectedGroup ? (
          <SkillsModal
            group={selectedGroup}
            onClose={() => setSelectedGroup(null)}
          />
        ) : null}
      </AnimatePresence>
    </Section>
  );
}
