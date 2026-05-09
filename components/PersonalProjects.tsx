"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ExternalLink, Star, X } from "lucide-react";
import { FaGithub } from "react-icons/fa6";
import { personalProjects } from "@/data/portfolio";
import { Section } from "./Section";

type Project = (typeof personalProjects)[0];

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
        className="absolute inset-0 bg-black/50 cursor-default"
        onClick={onClose}
      />
      <motion.div
        className="drawer-panel relative z-10 flex h-full w-full flex-col overflow-y-auto p-5 sm:p-8 sm:w-[480px]"
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "tween", duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <span className="badge-accent mb-3 inline-block rounded-full border px-3 py-1 text-xs font-semibold">
              Personal
            </span>
            <h2 className="drawer-title font-display text-2xl font-semibold">
              {project.name}
            </h2>
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
        <div className="mb-8 flex-1">
          <p className="drawer-label mb-3 text-xs font-semibold uppercase tracking-widest">
            Highlights
          </p>
          <ul className="space-y-3">
            {project.highlights.map((h) => (
              <li key={h} className="drawer-body flex gap-3 text-sm leading-6">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan" />
                {h}
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-auto flex flex-wrap gap-3">
          {project.github !== "https://github.com/KunalTyagi01" && (
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              className="drawer-github focus-ring inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition"
            >
              <FaGithub size={16} /> GitHub <ExternalLink size={14} />
            </a>
          )}
          {typeof (project as Record<string, unknown>).live === "string" && (
            <a
              href={String((project as Record<string, unknown>).live)}
              target="_blank"
              rel="noreferrer"
              className="drawer-github focus-ring inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition"
            >
              <ExternalLink size={14} /> Live Demo
            </a>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

function FeaturedCard({
  project,
  onClick,
}: Readonly<{ project: Project; onClick: () => void }>) {
  const cardDesc = (project as Record<string, unknown>).cardDescription as
    | string
    | undefined;
  const cardHighlights = (project as Record<string, unknown>).cardHighlights as
    | string[]
    | undefined;
  return (
    <motion.article
      className="glass rounded-3xl p-8"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55 }}
    >
      <div className="grid gap-8 lg:grid-cols-[1fr_220px]">
        <div className="flex flex-col gap-5">
          <div className="flex items-center gap-3">
            <span className="badge-accent rounded-full border px-3 py-1 text-xs font-semibold">
              Personal
            </span>
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-amber-400">
              <Star size={12} fill="currentColor" /> Featured
            </span>
          </div>
          <div>
            <h3 className="mb-2 font-display text-2xl font-semibold sm:text-3xl text-white">
              {project.name}
            </h3>
            <p className="max-w-xl text-base leading-7 text-slate-300">
              {cardDesc ?? project.description}
            </p>
          </div>
          <ul className="grid gap-x-8 gap-y-3 sm:grid-cols-2">
            {(cardHighlights ?? project.highlights.slice(0, 4)).map((h) => (
              <li
                key={h}
                className="flex gap-3 text-sm leading-6 text-slate-300"
              >
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan" />
                {h}
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-3">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onClick();
              }}
              className="focus-ring inline-flex items-center justify-center gap-2 rounded-full bg-mint px-6 py-3 font-semibold text-ink transition hover:-translate-y-0.5 hover:bg-white"
            >
              View Details <ArrowRight size={18} />
            </button>
            {project.github !== "https://github.com/KunalTyagi01" && (
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="focus-ring inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2.5 text-sm font-semibold text-white transition hover:border-mint hover:text-mint"
              >
                <FaGithub size={16} /> GitHub
              </a>
            )}
          </div>
        </div>
        <div className="hidden flex-col justify-start lg:flex">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-slate-500">
            Stack
          </p>
          <div className="flex flex-wrap gap-2">
            {project.tech.map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-slate-300"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.article>
  );
}

function CompactCard({
  project,
  index,
  onClick,
}: Readonly<{ project: Project; index: number; onClick: () => void }>) {
  return (
    <motion.article
      className="glass flex cursor-pointer flex-col rounded-3xl p-6 transition hover:border-white/20"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, delay: index * 0.05 }}
      onClick={onClick}
    >
      <div className="mb-3">
        <span className="badge-accent rounded-full border px-3 py-1 text-xs font-semibold">
          Personal
        </span>
      </div>
      <h3 className="mb-2 font-display text-xl font-semibold text-white">
        {project.name}
      </h3>
      <p className="text-sm leading-6 text-slate-400 line-clamp-3">
        {project.description}
      </p>
      <div className="mt-4 flex flex-wrap gap-1.5">
        {project.tech.slice(0, 5).map((tech) => (
          <span
            key={tech}
            className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-0.5 text-xs text-slate-300"
          >
            {tech}
          </span>
        ))}
        {project.tech.length > 5 && (
          <span className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-0.5 text-xs text-slate-500">
            +{project.tech.length - 5}
          </span>
        )}
      </div>
      <div className="mt-5 flex items-center justify-between">
        <span className="text-xs font-semibold text-cyan transition-colors hover:text-mint">
          View details →
        </span>
        {typeof (project as Record<string, unknown>).live === "string" && (
          <a
            href={String((project as Record<string, unknown>).live)}
            target="_blank"
            rel="noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="focus-ring inline-flex items-center gap-1 rounded-full border border-white/15 px-3 py-1 text-xs font-semibold text-white transition hover:border-mint hover:text-mint"
          >
            <ExternalLink size={11} /> Live Demo
          </a>
        )}
      </div>
    </motion.article>
  );
}

export function PersonalProjects() {
  const [selected, setSelected] = useState<Project | null>(null);
  const featured = personalProjects.find((p) => p.featured);
  const rest = personalProjects.filter((p) => !p.featured);

  return (
    <Section
      id="personal-projects"
      eyebrow="Personal Projects"
      title="Hands-on builds across web apps, APIs, and user workflows."
    >
      <div className="flex flex-col gap-5">
        {featured && (
          <FeaturedCard
            project={featured}
            onClick={() => setSelected(featured)}
          />
        )}
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {rest.map((project, index) => (
            <CompactCard
              key={project.name}
              project={project}
              index={index}
              onClick={() => setSelected(project)}
            />
          ))}
        </div>
      </div>
      <AnimatePresence>
        {selected && (
          <ProjectModal
            key="modal"
            project={selected}
            onClose={() => setSelected(null)}
          />
        )}
      </AnimatePresence>
    </Section>
  );
}
