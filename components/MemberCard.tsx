import { User } from "lucide-react";
import { cn } from "@/lib/cn";

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
      tabIndex={0}
      className={cn(
        "group relative aspect-square w-full overflow-hidden rounded-lg border border-[#E5E7EB] bg-gray-100 shadow-sm transition-all duration-300 hover:shadow-lg hover:border-navy focus:outline-none",
        className
      )}
    >
      {/* ── Photo Layer (Visible by default) ────────────────────── */}
      {image ? (
        <img
          src={image}
          alt={name}
          loading="eager"
          decoding="async"
          className="h-full w-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-108 [image-rendering:-webkit-optimize-contrast] transform-gpu"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-gray-50 text-gray-400">
          <User size={64} strokeWidth={1.5} />
        </div>
      )}

      {/* ── Slide-in Details Overlay (Revealed on Hover) ──────────── */}
      <div className="absolute inset-x-0 bottom-0 flex flex-col justify-end bg-gradient-to-t from-[#001B3D] via-[#001B3D]/85 to-transparent p-5 text-white transition-all duration-400 ease-out transform translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 group-focus:translate-y-0 group-focus:opacity-100">
        <span className="inline-block self-start rounded bg-gold px-2.5 py-0.5 text-xs font-bold uppercase tracking-wider text-navy-950 shadow-sm mb-1.5">
          {role}
        </span>
        <h3 className="text-base sm:text-lg font-bold tracking-tight text-white leading-snug">
          {name}
        </h3>
        {note && (
          <p className="mt-1 text-xs text-white/85 leading-snug">
            {note}
          </p>
        )}
      </div>
    </div>
  );
}



