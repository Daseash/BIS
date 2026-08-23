import { cn } from "@/lib/cn";

const MAPS_EMBED_SRC =
  "https://www.google.com/maps?q=Indian+Institute+of+Technology+Indore,+Khandwa+Road,+Simrol,+Indore,+Madhya+Pradesh+453552&output=embed";

export function CampusMap({ className }: { className?: string }) {
  return (
    <div className={cn("overflow-hidden rounded-md border border-navy-100 shadow-sm", className)}>
      <iframe
        src={MAPS_EMBED_SRC}
        title="IIT Indore campus location"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="aspect-[4/3] w-full"
        style={{ border: 0 }}
      />
    </div>
  );
}
