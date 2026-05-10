import { profile } from "@/data/portfolio";
import { ArrowUp } from "lucide-react";

export function Footer() {
  return (
    <footer className="section-shell border-t border-white/10 py-8 text-sm text-slate-500">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {new Date().getFullYear()} {profile.name}. Built with Care.
        </p>
        <a
          href="#home"
          className="group inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold text-slate-300 transition-all hover:border-mint/40 hover:bg-mint/10 hover:text-mint"
        >
          <ArrowUp
            size={13}
            className="transition-transform group-hover:-translate-y-0.5"
          />
          Back to top
        </a>
      </div>
    </footer>
  );
}
