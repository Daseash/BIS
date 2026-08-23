import { ImageIcon, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/cn";

export function PlaceholderBlock({
  label = "Photo to be added",
  icon: Icon = ImageIcon,
  className,
  aspect = "aspect-[4/3]",
}: {
  label?: string;
  icon?: LucideIcon;
  className?: string;
  aspect?: string;
}) {
  return (
    <div
      className={cn(
        "flex w-full flex-col items-center justify-center gap-2 rounded-md border-2 border-dashed border-navy-200 bg-navy-50 text-navy-400",
        aspect,
        className
      )}
    >
      <Icon size={28} strokeWidth={1.5} />
      <span className="px-4 text-center text-xs font-medium uppercase tracking-wide">
        {label}
      </span>
    </div>
  );
}
