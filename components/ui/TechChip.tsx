import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type TechChipProps = Readonly<{
  children: ReactNode;
  className?: string;
}>;

export function TechChip({ children, className }: TechChipProps) {
  return (
    <span
      className={cn(
        "rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-slate-300",
        className,
      )}
    >
      {children}
    </span>
  );
}
