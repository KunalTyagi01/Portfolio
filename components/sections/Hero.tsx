"use client";

import { motion } from "framer-motion";
import { ArrowDown, Mail, MapPin, Phone, Sparkles } from "lucide-react";
import { FaGithub, FaLinkedinIn } from "react-icons/fa6";
import { openContactModal } from "@/components/contact/ContactModal";
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
];

export function Hero() {
  return (
    <section
      id="home"
      className="section-shell relative min-h-screen scroll-mt-24 pt-16 sm:pt-24 md:pt-20"
    >
      <div className="grid min-h-[calc(100vh-7rem)] items-center gap-12 sm:min-h-[calc(100vh-10rem)] lg:grid-cols-[1.08fr_0.92fr]">
        <motion.div
          className="lg:-mt-56"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="hero-chip mb-5 inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold sm:mb-6 sm:px-4 sm:py-2 sm:text-sm">
            <Sparkles size={14} className="sm:h-4 sm:w-4" />
            <span className="sm:hidden">
              Available for Full-Stack, Frontend, Backend
            </span>
            <span className="hidden sm:inline">
              Available for Full-Stack, Frontend, Backend, and Product
              engineering work
            </span>
          </div>
          <h1 className="text-balance font-display text-[2.35rem] font-semibold leading-[1.02] text-white sm:text-5xl lg:text-6xl">
            {profile.name}
            <span className="gradient-text block text-[2.85rem] font-bold sm:text-6xl lg:text-7xl">
              {profile.title}
            </span>
          </h1>
          <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1.5 font-display text-xs font-semibold uppercase tracking-[0.18em] sm:mt-3 sm:gap-x-4 sm:gap-y-2 sm:text-sm sm:tracking-[0.22em]">
            <span className="text-slate-400">Calsoft Pvt Ltd</span>
            <span className="gradient-number">Development Engineer</span>
            <span className="text-slate-400">,</span>
            <span className="text-slate-400">Bengaluru</span>
          </div>
          <p className="mt-4 max-w-2xl text-[0.94rem] leading-6 text-slate-300 sm:mt-6 sm:text-lg sm:leading-8">
            {profile.intro}
          </p>
          <div className="mt-5 flex items-center gap-5 sm:mt-6 sm:gap-6">
            <div className="text-center">
              <p className="gradient-number font-display text-xl font-bold sm:text-2xl">
                2.3
              </p>
              <p className="mt-0.5 text-[9px] font-semibold uppercase tracking-widest text-slate-400 sm:text-[10px]">
                Years Exp.
              </p>
            </div>
            <div
              aria-hidden
              className="h-8 w-px bg-slate-500/55 sm:h-10"
            />
            <div className="text-center">
              <p className="gradient-number font-display text-xl font-bold sm:text-2xl">
                8.01
              </p>
              <p className="mt-0.5 text-[9px] font-semibold uppercase tracking-widest text-slate-400 sm:text-[10px]">
                CGPA
              </p>
            </div>
            <div
              aria-hidden
              className="h-8 w-px bg-slate-500/55 sm:h-10"
            />
            <div className="text-center">
              <p className="gradient-number font-display text-xl font-bold sm:text-2xl">
                10+
              </p>
              <p className="mt-0.5 text-[9px] font-semibold uppercase tracking-widest text-slate-400 sm:text-[10px]">
                Projects
              </p>
            </div>
          </div>
          <div className="mt-5 grid grid-cols-2 gap-3 sm:mt-8 sm:flex sm:flex-row sm:gap-4">
            <a
              href="#projects"
              className="focus-ring inline-flex items-center justify-center gap-2 rounded-full bg-mint px-4 py-2.5 text-sm font-semibold text-ink transition hover:-translate-y-0.5 hover:bg-white sm:px-6 sm:py-3 sm:text-base"
            >
              Projects{" "}
              <ArrowDown size={16} className="sm:h-[18px] sm:w-[18px]" />
            </a>
            <a
              href="#contact-form-start"
              className="focus-ring inline-flex items-center justify-center gap-2 rounded-full border border-white/15 px-4 py-2.5 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:border-cyan hover:text-cyan sm:px-6 sm:py-3 sm:text-base"
            >
              Contact Now
              <ArrowDown size={16} className="sm:h-[18px] sm:w-[18px]" />
            </a>
          </div>
          <div className="mt-4 flex flex-wrap items-center gap-2.5 sm:mt-8 sm:gap-3">
            {socialLinks.map((item) => {
              const Icon = item.icon;
              return item.label === "Email" ? (
                <button
                  key={item.label}
                  type="button"
                  onClick={openContactModal}
                  className="focus-ring inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-slate-200 transition hover:border-mint hover:text-mint sm:h-11 sm:w-11"
                  aria-label={item.label}
                >
                  <Icon size={17} className="sm:h-[19px] sm:w-[19px]" />
                </button>
              ) : (
                <a
                  key={item.label}
                  href={item.href}
                  className="focus-ring inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-slate-200 transition hover:border-mint hover:text-mint sm:h-11 sm:w-11"
                  aria-label={item.label}
                >
                  <Icon size={17} className="sm:h-[19px] sm:w-[19px]" />
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
