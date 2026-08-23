import { User } from "lucide-react";
import { cn } from "@/lib/cn";
import { PlaceholderBlock } from "@/components/PlaceholderBlock";

export function MemberCard({
  name,
  role,
  note,
  image,
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
        "institutional-card group flex items-center gap-5 rounded-lg border border-[#E5E7EB] bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-navy-500/40 hover:shadow-md",
        className
      )}
    >
      <div className="h-18 w-18 shrink-0 overflow-hidden rounded-full border-2 border-[#E5E7EB] shadow-inner transition-transform duration-200 group-hover:border-navy-500/40">
        {image ? (
          <img
            src={image}
            alt={name}
            className="h-full w-full object-cover object-top"
          />
        ) : (
          <PlaceholderBlock
            icon={User}
            label=""
            aspect="aspect-square"
            className="h-18 w-18 rounded-full p-0"
          />
        )}
      </div>
      <div className="min-w-0 flex-1">
        <span className="inline-block rounded bg-navy-50 px-2 py-0.5 text-xs font-bold uppercase tracking-wider text-navy-900">
          {role}
        </span>
        <p className="mt-1.5 text-base font-bold text-navy-950 transition-colors group-hover:text-navy">
          {name}
        </p>
        {note && (
          <p className="mt-0.5 text-xs text-gray-600 leading-snug">
            {note}
          </p>
        )}
      </div>
    </div>
  );
}

