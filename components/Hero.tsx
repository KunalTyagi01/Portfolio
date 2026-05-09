"use client";

import { motion } from "framer-motion";
import { ArrowDown, Mail, MapPin, Phone, Sparkles } from "lucide-react";
import { FaGithub, FaLinkedinIn } from "react-icons/fa6";
import { metrics, profile } from "@/data/portfolio";

const socialLinks = [
  { label: "Email", href: `mailto:${profile.email}`, icon: Mail },
  { label: "LinkedIn", href: profile.linkedin, icon: FaLinkedinIn },
  { label: "GitHub", href: profile.github, icon: FaGithub },
];

const focusAreas = [
  [
    "Full-Stack Engineering",
    "React, Angular, Next.js, TypeScript, Node.js, Golang, Python, PHP",
  ],
  [
    "Product Interfaces",
    "Dashboards, social apps, booking flows, blogs, forms, and reporting",
  ],
  [
    "APIs & Data Systems",
    "REST, GraphQL, Laravel, Sails.js, Express, MongoDB, MySQL, SQLite",
  ],
  [
    "Cloud, AI & Automation",
    "AWS, multi-cloud networking, Docker, Kubernetes, CI/CD, AI fluency",
  ],
  [
    "Quality & Architecture",
    "Testing, RBAC, performance tuning, clean modular design",
  ],
];

export function Hero() {
  return (
    <section
      id="home"
      className="section-shell relative min-h-screen scroll-mt-24 pt-20 sm:pt-24 md:pt-20"
    >
      <div className="grid min-h-[calc(100vh-10rem)] items-center gap-12 lg:grid-cols-[1.08fr_0.92fr]">
        <motion.div
          className="lg:-mt-56"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="hero-chip mb-6 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold">
            <Sparkles size={16} />
            Available for Full-Stack, Frontend, Backend, and Product engineering
            work
          </div>
          <h1 className="text-balance font-display text-4xl font-semibold leading-[1.04] text-white sm:text-5xl lg:text-6xl">
            {profile.name}
            <span className="gradient-text block text-5xl sm:text-6xl lg:text-7xl font-bold">
              {profile.title}
            </span>
          </h1>
          <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 font-display text-sm font-semibold uppercase tracking-[0.22em]">
            <span className="text-slate-400">Calsoft Pvt Ltd</span>
            <span className="gradient-number">Development Engineer</span>
            <span className="text-slate-400">,</span>
            <span className="text-slate-400">Bengaluru</span>
          </div>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
            {profile.intro}
          </p>
          <div className="mt-6 flex items-center gap-6">
            <div className="text-center">
              <p className="gradient-number font-display text-2xl font-bold">
                2.3
              </p>
              <p className="mt-0.5 text-[10px] font-semibold uppercase tracking-widest text-slate-400">
                Years Exp.
              </p>
            </div>
            <div
              aria-hidden
              className="h-10 w-px"
              style={{ backgroundColor: "rgba(100, 116, 139, 0.55)" }}
            />
            <div className="text-center">
              <p className="gradient-number font-display text-2xl font-bold">
                8.01
              </p>
              <p className="mt-0.5 text-[10px] font-semibold uppercase tracking-widest text-slate-400">
                CGPA
              </p>
            </div>
            <div
              aria-hidden
              className="h-10 w-px"
              style={{ backgroundColor: "rgba(100, 116, 139, 0.55)" }}
            />
            <div className="text-center">
              <p className="gradient-number font-display text-2xl font-bold">
                10+
              </p>
              <p className="mt-0.5 text-[10px] font-semibold uppercase tracking-widest text-slate-400">
                Projects
              </p>
            </div>
          </div>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <a
              href="#projects"
              className="focus-ring inline-flex items-center justify-center gap-2 rounded-full bg-mint px-6 py-3 font-semibold text-ink transition hover:-translate-y-0.5 hover:bg-white"
            >
              View Projects <ArrowDown size={18} />
            </a>
            <a
              href="#contact"
              className="focus-ring inline-flex items-center justify-center gap-2 rounded-full border border-white/15 px-6 py-3 font-semibold text-white transition hover:-translate-y-0.5 hover:border-cyan hover:text-cyan"
            >
              Start a Conversation
            </a>
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            {socialLinks.map((item) => {
              const Icon = item.icon;
              return (
                <a
                  key={item.label}
                  href={item.href}
                  className="focus-ring inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-slate-200 transition hover:border-mint hover:text-mint"
                  aria-label={item.label}
                >
                  <Icon size={19} />
                </a>
              );
            })}
          </div>
        </motion.div>
        <motion.div
          className="hidden lg:block glass relative overflow-hidden rounded-[2rem] p-6 sm:-mt-8"
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-cyan/20 blur-3xl" />
          <div className="relative">
            <div className="mb-8 flex items-center justify-between border-b border-white/10 pb-5">
              <div>
                <p className="text-sm text-slate-400">Current Focus</p>
                <p className="mt-1 font-display text-xl font-semibold text-white">
                  Full-Stack Product Engineering
                </p>
              </div>
              <div className="h-3 w-3 rounded-full bg-mint shadow-[0_0_22px_rgba(73,242,194,0.9)]" />
            </div>
            <div className="space-y-4">
              {focusAreas.map(([title, detail]) => (
                <div
                  key={title}
                  className="rounded-2xl border border-white/10 bg-white/[0.03] p-4"
                >
                  <p className="font-semibold text-white">{title}</p>
                  <p className="mt-1 text-sm leading-6 text-slate-400">
                    {detail}
                  </p>
                </div>
              ))}
            </div>
            <div className="mt-7 grid grid-cols-2 gap-3">
              {metrics.map((metric) => (
                <div
                  key={metric.label}
                  className="rainbow-panel rounded-2xl p-4"
                >
                  <p className="gradient-number font-display text-3xl font-bold">
                    {metric.value}
                  </p>
                  <p className="mt-1 text-xs leading-5 text-slate-400">
                    {metric.label}
                  </p>
                </div>
              ))}
            </div>
            <div className="mt-6 flex flex-col gap-2 text-sm text-slate-300 sm:flex-row sm:items-center sm:justify-between">
              <span className="inline-flex items-center gap-2">
                <MapPin size={16} className="text-cyan" /> {profile.location}
              </span>
              <span className="inline-flex items-center gap-2">
                <Phone size={16} className="text-coral" /> {profile.phone}
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
