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
        "institutional-card group flex flex-col overflow-hidden rounded-lg border border-[#E5E7EB] bg-white shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-navy-500/40 hover:shadow-md",
        className
      )}
    >
      <div className="relative aspect-square w-full overflow-hidden bg-gray-100 border-b border-[#E5E7EB]">
        {image ? (
          <img
            src={image}
            alt={name}
            loading="eager"
            decoding="async"
            className="h-full w-full object-cover object-top transition-transform duration-300 group-hover:scale-105 [image-rendering:-webkit-optimize-contrast] transform-gpu"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gray-50 text-gray-400">
            <User size={56} strokeWidth={1.5} />
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col justify-between p-5">
        <div>
          <span className="inline-block rounded bg-navy-50 px-2.5 py-0.5 text-xs font-bold uppercase tracking-wider text-navy-900">
            {role}
          </span>
          <h3 className="mt-2 text-base sm:text-lg font-bold text-navy-950 transition-colors group-hover:text-navy">
            {name}
          </h3>
          {note && (
            <p className="mt-1 text-xs sm:text-sm text-gray-600 leading-snug">
              {note}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}


