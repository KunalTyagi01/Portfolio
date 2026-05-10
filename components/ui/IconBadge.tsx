import type { ComponentType, SVGProps } from "react";
import { cn } from "@/lib/cn";

type IconComponent = ComponentType<SVGProps<SVGSVGElement> & { size?: number }>;

type IconBadgeProps = Readonly<{
  icon: IconComponent;
  size?: number;
  className?: string;
  iconClassName?: string;
}>;

export function IconBadge({
  icon: Icon,
  size = 20,
  className,
  iconClassName,
}: IconBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center justify-center rounded-2xl bg-mint/10 text-mint",
        className,
      )}
    >
      <Icon size={size} className={iconClassName} />
    </span>
  );
}
