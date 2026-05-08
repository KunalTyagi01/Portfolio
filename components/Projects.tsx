"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";
import { projects } from "@/data/portfolio";
import { Section } from "./Section";

const MAX_BULLETS = 3;

function ProjectCard({
  project,
  index,
}: Readonly<{ project: (typeof projects)[0]; index: number }>) {
  const [expanded, setExpanded] = useState(false);
  const Icon = project.icon;
  const extra = project.features.length - MAX_BULLETS;

  return (
    <motion.article
      className="glass flex flex-col h-full overflow-hidden rounded-3xl p-6"
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, delay: index * 0.06 }}
    >
      <div className="mb-6 flex items-start justify-between gap-4">
        <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan/10 text-cyan">
          <Icon size={24} />
        </div>
        <span className="badge-accent rounded-full border px-3 py-1 text-xs font-semibold">
          Client Project
        </span>
      </div>
      <p className="accent-label mb-2 text-sm font-bold uppercase">
        {project.role}
      </p>
      <h3 className="font-display text-xl font-semibold sm:text-2xl text-white">
        {project.name}
      </h3>
      <p className="mt-4 text-sm leading-6 text-slate-400">
        {project.description}
      </p>
      <div className="mt-6 flex flex-wrap gap-2">
        {project.tech.map((tech) => (
          <span
            key={tech}
            className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-slate-300"
          >
            {tech}
          </span>
        ))}
      </div>
      <ul className="mt-6 space-y-3 border-t border-white/10 pt-5">
        {project.features.slice(0, MAX_BULLETS).map((feature) => (
          <li
            key={feature}
            className="flex gap-3 text-sm leading-6 text-slate-300"
          >
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-mint" />
            {feature}
          </li>
        ))}
        <AnimatePresence>
          {expanded &&
            project.features.slice(MAX_BULLETS).map((feature) => (
              <motion.li
                key={feature}
                className="flex gap-3 overflow-hidden text-sm leading-6 text-slate-300"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.22 }}
              >
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-mint" />
                {feature}
              </motion.li>
            ))}
        </AnimatePresence>
      </ul>
      {extra > 0 && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="mt-3 flex items-center gap-1.5 text-xs font-semibold text-cyan transition-colors hover:text-mint"
        >
          {expanded ? (
            <>
              <ChevronUp size={14} /> Show less
            </>
          ) : (
            <>
              <ChevronDown size={14} /> Show {extra} more
            </>
          )}
        </button>
      )}
      <div className="mt-auto pt-6">
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm leading-6 text-slate-400">
          Source code is private due to client confidentiality.
        </div>
      </div>
    </motion.article>
  );
}

export function Projects() {
  return (
    <Section
      id="projects"
      eyebrow="Projects"
      title="Premium product work, shaped into case studies."
    >
      <div className="grid gap-5 lg:grid-cols-3">
        {projects.map((project, index) => (
          <ProjectCard key={project.name} project={project} index={index} />
        ))}
      </div>
    </Section>
  );
}
