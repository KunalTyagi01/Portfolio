"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronRight, X } from "lucide-react";
import { projects } from "@/data/portfolio";
import { Section } from "./Section";

const MAX_BULLETS = 3;
type Project = (typeof projects)[0];

function ProjectModal({
  project,
  onClose,
}: Readonly<{ project: Project; onClose: () => void }>) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const Icon = project.icon;

  return (
    <motion.div
      className="fixed inset-0 z-50 flex justify-end"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <button
        aria-label="Close panel"
        className="absolute inset-0 cursor-default bg-black/50"
        onClick={onClose}
      />
      <motion.div
        className="drawer-panel relative z-10 flex h-full w-full flex-col overflow-y-auto p-5 sm:w-[520px] sm:p-8"
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "tween", duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="mb-6 flex items-start justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-cyan/10 text-cyan">
              <Icon size={24} />
            </div>
            <div>
              <p className="accent-label text-xs font-bold uppercase">
                {project.role}
              </p>
              <h2 className="drawer-title font-display text-xl font-semibold sm:text-2xl">
                {project.name}
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="drawer-close mt-1 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition"
          >
            <X size={16} />
          </button>
        </div>
        <p className="drawer-body mb-6 text-sm leading-6">
          {project.description}
        </p>
        <div className="mb-6">
          <p className="drawer-label mb-3 text-xs font-semibold uppercase tracking-widest">
            Tech Stack
          </p>
          <div className="flex flex-wrap gap-2">
            {project.tech.map((tech) => (
              <span
                key={tech}
                className="drawer-tag rounded-full px-3 py-1 text-xs"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
        <div className="mb-8">
          <p className="drawer-label mb-3 text-xs font-semibold uppercase tracking-widest">
            Highlights
          </p>
          <ul className="space-y-3">
            {project.features.map((f) => (
              <li key={f} className="drawer-body flex gap-3 text-sm leading-6">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-mint" />
                {f}
              </li>
            ))}
          </ul>
        </div>
      </motion.div>
    </motion.div>
  );
}

function ProjectCard({
  project,
  index,
  onOpen,
}: Readonly<{ project: Project; index: number; onOpen: () => void }>) {
  const Icon = project.icon;
  const extra = project.features.length - MAX_BULLETS;

  return (
    <motion.article
      className="glass flex h-full flex-col overflow-hidden rounded-3xl p-6"
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
      </ul>
      {extra > 0 && (
        <button
          type="button"
          onClick={onOpen}
          className="mt-3 flex items-center gap-1.5 text-xs font-semibold text-cyan transition-colors hover:text-mint"
        >
          <ChevronRight size={14} /> Show  more
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
  const [selected, setSelected] = useState<Project | null>(null);

  return (
    <Section
      id="projects"
      eyebrow="Projects"
      title="Premium product work, shaped into case studies."
    >
      <div className="grid gap-5 lg:grid-cols-3">
        {projects.map((project, index) => (
          <ProjectCard
            key={project.name}
            project={project}
            index={index}
            onOpen={() => setSelected(project)}
          />
        ))}
      </div>
      <AnimatePresence>
        {selected && (
          <ProjectModal project={selected} onClose={() => setSelected(null)} />
        )}
      </AnimatePresence>
    </Section>
  );
}
