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
import { openContactModal } from "@/components/ContactModal";
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
    const savedTheme = globalThis.localStorage.getItem("theme");
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
          globalThis.innerHeight + globalThis.scrollY >=
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
    globalThis.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => {
      globalThis.removeEventListener("scroll", handleScroll);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    document.documentElement.classList.toggle("dark", nextTheme === "dark");
    globalThis.localStorage.setItem("theme", nextTheme);
  };

  const sidebarItems = [{ label: "Home", href: "#home" }, ...navItems];
  const mobileSidebarItems = sidebarItems.filter(
    (item) => item.label !== "Contact",
  );

  const navigateFromMobileMenu = (href: string) => {
    setOpen(false);
    const targetId = href.replace("#", "");
    globalThis.setTimeout(() => {
      document.getElementById(targetId)?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
      globalThis.history.replaceState(null, "", href);
    }, 80);
  };

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
          <button
            type="button"
            onClick={openContactModal}
            className="group relative flex h-9 w-9 items-center justify-center rounded-xl bg-mint text-ink shadow-[0_8px_24px_rgba(73,242,194,0.28)] transition hover:-translate-y-1 hover:bg-white"
            aria-label="Hire Me"
          >
            <User size={20} />
            <span className="pointer-events-none absolute left-[3.8rem] whitespace-nowrap rounded-full bg-ink px-3 py-1.5 text-xs font-semibold text-white opacity-0 shadow-card transition group-hover:translate-x-1 group-hover:opacity-100">
              Hire Me
            </span>
          </button>
        </div>
      </aside>

      <header className="fixed left-0 right-0 top-0 z-[60] border-b border-white/10 bg-ink/72 backdrop-blur-xl md:hidden">
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
      </header>
        <AnimatePresence>
          {open ? (
            <>
            <motion.button
              type="button"
              aria-label="Close menu"
              className="fixed inset-0 z-50 bg-slate-950/28 backdrop-blur-[3px] md:hidden dark:bg-slate-950/45"
              onClick={() => setOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            <motion.div
              className="fixed left-0 right-0 top-14 z-[70] max-h-[calc(100dvh-3.5rem)] overflow-y-auto border-t border-black/[0.06] bg-white/95 px-4 py-3 shadow-[0_24px_80px_rgba(15,23,42,0.14)] backdrop-blur-xl md:hidden dark:border-white/10 dark:bg-[linear-gradient(180deg,rgba(6,16,21,0.98),rgba(8,23,29,0.96))]"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              onClick={(event) => event.stopPropagation()}
            >
              <div className="mx-auto flex max-w-xl flex-col gap-2.5">
                <div className="rounded-2xl border border-black/[0.06] bg-gradient-to-br from-white to-cyan/10 p-3 shadow-[0_12px_30px_rgba(15,23,42,0.08)] dark:border-mint/15 dark:from-white/[0.08] dark:to-mint/[0.08] dark:shadow-[0_12px_30px_rgba(0,0,0,0.32)]">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="font-display text-base font-semibold text-slate-950 dark:text-white">
                        {profile.name}
                      </p>
                      <p className="mt-0.5 text-xs font-semibold text-mint">
                        {profile.title}
                      </p>
                    </div>
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-[0.65rem] font-bold text-emerald-700 dark:border-emerald-500/30 dark:bg-emerald-500/10 dark:text-emerald-400">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                      <span>Open</span>
                    </span>
                  </div>
                </div>
                <div className="grid gap-1.5">
                  {mobileSidebarItems.map((item) => {
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
                        onClick={(event) => {
                          event.preventDefault();
                          navigateFromMobileMenu(item.href);
                        }}
                        className={`group flex items-center justify-between rounded-2xl border px-2.5 py-2 transition ${
                          isActive
                            ? "border-mint/45 bg-mint/15 text-slate-950 shadow-[0_10px_30px_rgba(73,242,194,0.14)] dark:bg-mint/12 dark:text-white dark:shadow-[0_10px_30px_rgba(73,242,194,0.1)]"
                            : "border-black/[0.06] bg-white/50 text-slate-700 hover:border-mint/30 hover:bg-mint/10 hover:text-slate-950 dark:border-[#24404a] dark:bg-[#10242c] dark:text-slate-100 dark:hover:border-mint/40 dark:hover:bg-[#123833] dark:hover:text-white"
                        }`}
                      >
                        <span className="flex items-center gap-2.5">
                          <span
                            className={`inline-flex h-8 w-8 items-center justify-center rounded-xl ${
                              isActive
                                ? "bg-mint text-ink"
                                : "bg-slate-100 text-slate-500 group-hover:bg-mint/15 group-hover:text-mint dark:bg-[#18323b] dark:text-slate-100 dark:group-hover:bg-mint/15 dark:group-hover:text-mint"
                            }`}
                          >
                            <Icon size={16} />
                          </span>
                          <span className="text-[0.82rem] font-semibold">
                            {item.label}
                          </span>
                        </span>
                        {isActive ? (
                          <span className="h-1.5 w-1.5 rounded-full bg-mint" />
                        ) : null}
                      </a>
                    );
                  })}
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setOpen(false);
                    openContactModal();
                  }}
                  className="focus-ring inline-flex items-center justify-center gap-2 rounded-2xl bg-mint px-4 py-2.5 text-sm font-semibold text-ink shadow-[0_14px_36px_rgba(73,242,194,0.24)] transition hover:-translate-y-0.5 hover:bg-white"
                >
                  <User size={16} /> Hire Me
                </button>
              </div>
            </motion.div>
            </>
          ) : null}
        </AnimatePresence>
    </>
  );
}
