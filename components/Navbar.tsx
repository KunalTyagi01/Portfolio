"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  Award,
  BriefcaseBusiness,
  Code2,
  FolderKanban,
  Home,
  Mail,
  Menu,
  Moon,
  Sparkles,
  Sun,
  User,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import { navItems, profile } from "@/data/portfolio";

const iconMap = {
  Home,
  About: User,
  Skills: Code2,
  Experience: BriefcaseBusiness,
  Projects: FolderKanban,
  Certifications: Award,
  Contact: Mail,
};

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const savedTheme = window.localStorage.getItem("theme");
    const initialTheme = savedTheme === "dark" ? "dark" : "light";
    setTheme(initialTheme);
    document.documentElement.classList.toggle("dark", initialTheme === "dark");
  }, []);

  useEffect(() => {
    const sectionIds = [
      "home",
      "skills",
      "experience",
      "projects",
      "personal-projects",
      "achievements",
      "about",
      "contact",
    ];
    let rafId: number | null = null;
    const handleScroll = () => {
      if (rafId !== null) return;
      rafId = requestAnimationFrame(() => {
        rafId = null;
        const atBottom =
          window.innerHeight + window.scrollY >=
          document.body.offsetHeight - 80;
        if (atBottom) {
          setActiveSection("contact");
          return;
        }
        let current = "home";
        let closestTop = -Infinity;
        for (const id of sectionIds) {
          const el = document.getElementById(id);
          if (el) {
            const top = el.getBoundingClientRect().top;
            if (top <= 160 && top > closestTop) {
              closestTop = top;
              current = id;
            }
          }
        }
        setActiveSection(current);
      });
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    document.documentElement.classList.toggle("dark", nextTheme === "dark");
    window.localStorage.setItem("theme", nextTheme);
  };

  const sidebarItems = [{ label: "Home", href: "#home" }, ...navItems];

  return (
    <>
      {/* ── Desktop top header (starts after sidebar) ── */}
      <header className="fixed left-14 right-0 top-0 z-50 hidden h-12 items-center justify-between border-b border-black/[0.06] bg-white/95 px-6 backdrop-blur-xl md:flex dark:border-white/[0.08] dark:bg-[#08171d]">
        <a
          href="#home"
          className="focus-ring flex items-center gap-3 rounded-md text-sm"
        >
          <span className="font-semibold text-slate-800 dark:text-white">
            {profile.name.split(" ")[0]}
          </span>
          <span className="font-medium text-mint dark:text-mint">
            {profile.title}
          </span>
        </a>
        <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 dark:border-emerald-500/30 dark:bg-emerald-500/10 dark:text-emerald-400">
          <svg width="6" height="6" viewBox="0 0 6 6" aria-hidden="true">
            <circle
              cx="3"
              cy="3"
              r="3"
              fill="currentColor"
              className="text-emerald-500"
            />
          </svg>
          Open to Opportunities
        </span>
      </header>

      <aside className="fixed bottom-0 left-0 top-0 z-50 hidden w-14 flex-col border-r border-black/[0.06] bg-[#f8fbff]/95 backdrop-blur-xl md:flex dark:border-white/[0.08] dark:bg-[#061015]">
        <a
          href="#home"
          className="focus-ring mx-auto flex h-12 w-14 shrink-0 items-center justify-center font-display text-xs font-bold"
          aria-label={profile.name}
          style={{
            writingMode: "vertical-rl",
            transform: "rotate(180deg)",
            letterSpacing: "0.15em",
          }}
        >
          <span style={{ color: "#0d9488" }}>K</span>
          <span style={{ color: "#2563eb" }}>T</span>
        </a>
        <button
          type="button"
          aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
          onClick={toggleTheme}
          className="focus-ring mx-auto mt-4 inline-flex h-9 w-9 items-center justify-center rounded-xl border border-black/[0.08] text-slate-500 transition hover:border-mint hover:text-mint dark:border-white/15 dark:text-slate-400 dark:hover:border-mint dark:hover:text-mint"
        >
          {theme === "dark" ? <Sun size={19} /> : <Moon size={19} />}
        </button>
        <nav className="flex flex-1 flex-col items-center justify-center gap-4">
          {sidebarItems.map((item) => {
            const Icon =
              iconMap[item.label as keyof typeof iconMap] ?? Sparkles;
            const idForLabel: Record<string, string> = {
              Home: "home",
              About: "about",
              Skills: "skills",
              Experience: "experience",
              Projects: "projects",
              "Personal Projects": "personal-projects",
              Certifications: "achievements",
              Contact: "contact",
            };
            const isActive =
              activeSection ===
                (idForLabel[item.label] ?? item.label.toLowerCase()) ||
              (item.label === "Projects" &&
                activeSection === "personal-projects");
            return (
              <a
                key={item.href}
                href={item.href}
                className={`group relative flex h-9 w-9 items-center justify-center rounded-xl border transition ${
                  isActive
                    ? "border-mint/50 bg-mint/10 text-mint dark:text-mint"
                    : "border-transparent text-slate-400 hover:border-mint/30 hover:bg-mint/10 hover:text-mint dark:text-slate-300"
                }`}
                aria-label={item.label}
              >
                <Icon size={20} />
                <span className="pointer-events-none absolute left-[3.8rem] whitespace-nowrap rounded-full bg-ink px-3 py-1.5 text-xs font-semibold text-white opacity-0 shadow-card transition group-hover:translate-x-1 group-hover:opacity-100">
                  {item.label}
                </span>
              </a>
            );
          })}
        </nav>
        <div className="mb-4 mt-auto flex flex-col items-center gap-4">
          <div className="w-8 border-t border-black/[0.07] dark:border-white/[0.07]" />
          <a
            href={`mailto:${profile.email}`}
            className="group relative flex h-9 w-9 items-center justify-center rounded-xl bg-mint text-ink shadow-[0_8px_24px_rgba(73,242,194,0.28)] transition hover:-translate-y-1 hover:bg-white"
            aria-label="Hire Me"
          >
            <User size={20} />
            <span className="pointer-events-none absolute left-[3.8rem] whitespace-nowrap rounded-full bg-ink px-3 py-1.5 text-xs font-semibold text-white opacity-0 shadow-card transition group-hover:translate-x-1 group-hover:opacity-100">
              Hire Me
            </span>
          </a>
        </div>
      </aside>

      <header className="fixed left-0 right-0 top-0 z-50 border-b border-white/10 bg-ink/72 backdrop-blur-xl md:hidden">
        <nav className="section-shell flex h-14 items-center justify-between">
          <div className="flex min-w-0 flex-1 items-center gap-1.5">
            <a
              href="#home"
              className="focus-ring rounded-md font-display text-sm font-semibold text-white"
            >
              Kunal
            </a>
            <span className="text-white/40">·</span>
            <span className="truncate text-sm font-semibold text-mint">
              Full Stack Developer
            </span>
            <span className="ml-1 hidden shrink-0 rounded-full border border-mint/30 bg-mint/10 px-2 py-0.5 text-[9px] font-semibold text-mint sm:inline-flex">
              ● Open
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
              onClick={toggleTheme}
              className="focus-ring inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/[0.04] text-white transition hover:border-mint hover:text-mint"
            >
              {theme === "dark" ? <Sun size={17} /> : <Moon size={17} />}
            </button>
            <button
              type="button"
              aria-label="Toggle menu"
              onClick={() => setOpen((value) => !value)}
              className="focus-ring inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white"
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </nav>
        <AnimatePresence>
          {open ? (
            <motion.div
              className="border-t border-white/10 bg-ink/96 px-4 py-4"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
            >
              <div className="mx-auto flex max-w-xl flex-col gap-2">
                {sidebarItems.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="rounded-md px-3 py-3 text-slate-200 transition hover:bg-white/5 hover:text-mint"
                  >
                    {item.label}
                  </a>
                ))}
                <a
                  href={`mailto:${profile.email}`}
                  onClick={() => setOpen(false)}
                  className="rounded-md px-3 py-3 font-semibold text-mint transition hover:bg-mint/10"
                >
                  Hire Me
                </a>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </header>
    </>
  );
}
