import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { GlassSection, GlassCard } from "@/components/GlassSection";
import { Clock } from "lucide-react";

const DAYS = [
  { label: "Day 1", date: "October 12, 2026" },
  { label: "Day 2", date: "October 13, 2026" },
];

export default function SchedulePage() {
  return (
    <>
      <PageHero
        title="Schedule"
        subtitle="Full agenda for the workshop day and the main conclave day."
      />

      <GlassSection className="mx-auto max-w-5xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2">
          {DAYS.map((day, i) => (
            <Reveal key={day.label} delay={i * 0.05}>
              <GlassCard className="overflow-hidden">
                <div className="border-b border-white/20 bg-navy-900/90 px-6 py-4 backdrop-blur-md">
                  <p className="text-xl font-bold tracking-wide text-white">{day.label}</p>
                  <p className="text-sm font-medium text-navy-200">{day.date}</p>
                </div>
                <div className="flex flex-col items-center gap-3 px-6 py-14 text-center text-navy-400">
                  <Clock size={32} strokeWidth={1.75} />
                  <p className="text-base font-semibold uppercase tracking-wider text-navy-800">
                    Detailed timings to be announced
                  </p>
                </div>
              </GlassCard>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <GlassCard className="mt-10 p-8 text-base leading-relaxed text-navy-800">
            Session-by-session schedule, workshop tracks, and break timings
            will be published here once finalized.
          </GlassCard>
        </Reveal>
      </GlassSection>
    </>
  );
}
