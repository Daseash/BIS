import { cn } from "@/lib/cn";

const MAPS_EMBED_SRC =
  "https://maps.google.com/maps?q=Indian%20Institute%20of%20Technology%20Indore&t=&z=14&ie=UTF8&iwloc=&output=embed";

export function CampusMap({ className }: { className?: string }) {
  return (
    <div className={cn("relative h-full min-h-[240px] w-full overflow-hidden rounded-md bg-gray-100", className)}>
      <iframe
        src={MAPS_EMBED_SRC}
        title="IIT Indore Simrol Campus Location Map"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="absolute inset-0 h-full w-full border-0"
        allowFullScreen
      />
    </div>
  );
}
