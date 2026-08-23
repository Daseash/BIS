import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { Calendar, Clock, Wrench, Presentation, Users, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "Schedule",
  description: "Two-day comprehensive programme schedule for Malwa Chemical Conclave 2026.",
};

const DAYS = [
  {
    dayNumber: "Day 1",
    date: "Monday, October 12, 2026",
    focus: "Technical Masterclasses & Applied Workshops",
    badge: "Workshop Day",
    highlights: [
      "Hands-on Computational Engineering Masterclass",
      "Process Simulation and Optimization Tools",
      "Industrial Standardisation Tutorial by BIS",
      "Student Innovation Expo — Initial Screening",
    ],
  },
  {
    dayNumber: "Day 2",
    date: "Tuesday, October 13, 2026",
    focus: "Flagship Conclave & Industry Dialogue",
    badge: "Conclave Day",
    highlights: [
      "Inaugural Address & Keynote Plenary Sessions",
      "High-Level Interactive BIS Regulatory Panel",
      "One-on-One Faculty–Company Matchmaking",
      "Annual Malwa Chemical Outlook Release & Awards",
    ],
  },
];

export default function SchedulePage() {
  return (
    <>
      <PageHero
        title="Programme Schedule"
        subtitle="Two-day comprehensive roadmap covering applied industrial workshops and flagship conference sessions."
      />

      <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2">
          {DAYS.map((day, i) => (
            <Reveal key={day.dayNumber} delay={i * 0.05}>
              <div className="institutional-card overflow-hidden flex flex-col justify-between h-full">
                <div>
                  <div className="border-b border-[#E5E7EB] bg-[#001B3D] px-6 py-5 text-white">
                    <div className="flex items-center justify-between">
                      <span className="rounded bg-white/15 px-2.5 py-0.5 text-xs font-bold uppercase tracking-wider text-gold-300">
                        {day.badge}
                      </span>
                      <span className="flex items-center gap-1.5 text-xs text-white/70">
                        <Calendar size={13} /> {day.date}
                      </span>
                    </div>
                    <h3 className="mt-3 text-2xl font-bold text-white tracking-tight">{day.dayNumber}</h3>
                    <p className="mt-1 text-xs text-white/80 font-medium">{day.focus}</p>
                  </div>

                  <div className="p-6">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-navy-900 mb-3">
                      Key Highlights &amp; Sessions
                    </h4>
                    <ul className="space-y-2.5">
                      {day.highlights.map((item) => (
                        <li key={item} className="flex items-start gap-2.5 text-sm text-gray-700">
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-navy" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="bg-gray-50 border-t border-gray-100 px-6 py-3 text-xs text-gray-500 flex items-center justify-between">
                  <span className="flex items-center gap-1">
                    <Clock size={13} /> Detailed session timings: 09:00 AM &ndash; 06:00 PM
                  </span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <div className="mt-10 institutional-card p-6 border-l-4 border-l-gold text-sm text-gray-700 leading-relaxed bg-white">
            <strong className="text-navy-950 font-bold block mb-1">Speaker Line-up &amp; Detailed Schedule:</strong>
            Session-by-session schedules, keynote abstracts, parallel track allotments, and venue room allocations will be announced here as speaker confirmations conclude.
          </div>
        </Reveal>
      </div>
    </>
  );
}

