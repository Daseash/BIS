import { User } from "lucide-react";
import { cn } from "@/lib/cn";
import { PlaceholderBlock } from "@/components/PlaceholderBlock";

// Mirrors iiti.ac.in's own .member-info-card: rounded-20px, soft drop
// shadow, circular photo, translateY lift on hover.
export function MemberCard({
  name,
  role,
  note,
  image,
  glass = false,
  className,
}: {
  name: string;
  role: string;
  note?: string;
  image?: string;
  glass?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "group flex items-center gap-5 rounded-[20px] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-gold/60 hover:shadow-lg",
        glass
          ? "border border-white/60 bg-white/60 shadow-[0_8px_30px_rgba(0,74,173,0.1)] backdrop-blur-md hover:bg-white/85"
          : "border border-navy-100 bg-white shadow-[1.95px_1.95px_2.6px_rgba(0,0,0,0.1)] hover:bg-navy-50/50",
        className
      )}
    >
      <div className="h-20 w-20 shrink-0 overflow-hidden rounded-full border border-navy-100/50 shadow-sm transition-transform duration-300 group-hover:scale-105">
        {image ? (
          <img src={image} alt={name} className="h-full w-full object-cover object-top" />
        ) : (
          <PlaceholderBlock icon={User} label="" aspect="aspect-square" className="h-20 w-20 rounded-full p-0" />
        )}
      </div>
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-navy transition-colors duration-200 group-hover:text-gold-700">{role}</p>
        <p className="font-semibold text-navy-900 transition-colors duration-200 group-hover:text-navy">{name}</p>
        {note && <p className="text-sm text-gray-500 transition-colors duration-200 group-hover:text-gray-800">{note}</p>}
      </div>
    </div>
  );
}
