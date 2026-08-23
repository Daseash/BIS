import Link from "next/link";
import {
  ArrowRight,
  Mic,
  Handshake,
  Lightbulb,
  MessagesSquare,
  Wrench,
  Newspaper,
  Trophy,
} from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { GlassSection, GlassCard } from "@/components/GlassSection";
import { CampusMap } from "@/components/CampusMap";
import { Button } from "@/components/Button";
import { AnnouncementTicker } from "@/components/AnnouncementTicker";
import { CountUpStat } from "@/components/CountUpStat";

const STATS = [
  { value: 7, suffix: "", label: "Integrated Verticals" },
  { value: 400, suffix: "+", label: "Prospective Footfall" },
  { value: 5, suffix: "+", label: "Industry Leaders" },
  { value: 5, suffix: "+", label: "Collaborations" },
];

const VERTICALS = [
  {
    icon: Mic,
    title: "Industry Talks",
    description: "Sessions from leading chemical and process industry speakers.",
  },
  {
    icon: Handshake,
    title: "Industry Matchmaking",
    description: "20-minute faculty–company meetings plus expert counselling sessions.",
  },
  {
    icon: Lightbulb,
    title: "Student Innovation Expo",
    description: "Prototypes, posters, startup ideas, patents, and process simulations.",
  },
  {
    icon: MessagesSquare,
    title: "Interactive BIS Panel",
    description:
      "Panel discussion with the Bureau of Indian Standards on regulation and quality assurance.",
  },
  {
    icon: Wrench,
    title: "Hands-on Workshops",
    description: "Practical sessions on tools used across chemical process engineering.",
  },
  {
    icon: Newspaper,
    title: "Annual Outlook",
    description:
      "The Malwa Chemical Outlook — industry trends, faculty research & student projects.",
  },
  {
    icon: Trophy,
    title: "Awards Programme",
    description: "Recognitions across sustainable manufacturing, innovation, and posters.",
  },
];

export default function HomePage() {
  return (
    <>
      {/* ── HERO: Full-viewport background image ──────────────────── */}
      <section className="hero-wrapper">
        <img
          src="/hero-2.jpeg"
          alt="2025 Malwa Chemical Conclave — group photo at IIT Indore"
          className="hero-media"
        />
        <div className="hero-overlay" />
      </section>

      {/* ── ANNOUNCEMENTS TICKER ──────────────────────────────────── */}
      <div id="announcements">
        <AnnouncementTicker />
      </div>

      {/* ── IMPACT: Statement heading + count-up stats ────────────── */}
      <GlassSection className="px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
            <Reveal>
              <h2 className="text-3xl font-light leading-tight tracking-tight text-navy-900 sm:text-4xl lg:text-5xl">
                Bringing academia,
                <br />
                industry, and regulators
                <br />
                onto one stage.
              </h2>
              <Link
                href="/about"
                className="hover-underline mt-6 inline-flex items-center gap-1 text-base font-semibold text-navy"
              >
                About the Conclave <ArrowRight size={16} />
              </Link>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="grid grid-cols-2 gap-4">
                {STATS.map((s) => (
                  <GlassCard key={s.label} className="p-5">
                    <CountUpStat value={s.value} suffix={s.suffix} label={s.label} />
                  </GlassCard>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </GlassSection>

      {/* ── VERTICALS: Glass cards ────────────────────────────────── */}
      <section className="relative isolate overflow-hidden border-t border-white/20 bg-navy-950/90 py-16 lg:py-24">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-20 left-1/4 -z-10 h-72 w-72 rounded-full bg-gold/10 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute bottom-0 right-1/4 -z-10 h-80 w-80 rounded-full bg-navy-400/10 blur-3xl"
        />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <h2 className="max-w-2xl text-3xl font-light leading-tight tracking-tight text-white sm:text-4xl">
              Seven verticals that shape a working conclave.
            </h2>
            <p className="mt-3 max-w-2xl text-base text-white/60 sm:text-lg">
              Across a workshop day and a main conclave day.
            </p>
          </Reveal>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {VERTICALS.map((vertical, i) => {
              const Icon = vertical.icon;
              return (
                <Reveal key={vertical.title} delay={i * 0.04}>
                  <div className="group h-full rounded-md border border-white/15 bg-white/8 p-6 backdrop-blur-md transition-colors hover:border-gold/40 hover:bg-white/12">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gold/90 text-white">
                      <Icon size={20} />
                    </div>
                    <p className="mt-4 text-base font-semibold text-white">{vertical.title}</p>
                    <p className="mt-1.5 text-sm leading-relaxed text-white/60">
                      {vertical.description}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── AT A GLANCE: Glass cards ──────────────────────────────── */}
      <GlassSection className="px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <GlassCard className="p-6">
                <p className="text-xs font-bold uppercase tracking-wide text-gold">Venue</p>
                <p className="mt-2 text-lg font-semibold text-navy-900">
                  Indian Institute of Technology Indore
                </p>
              </GlassCard>
              <GlassCard className="p-6">
                <p className="text-xs font-bold uppercase tracking-wide text-gold">Date</p>
                <p className="mt-2 text-lg font-semibold text-navy-900">October 12&ndash;13, 2026</p>
              </GlassCard>
              <GlassCard className="p-6">
                <p className="text-xs font-bold uppercase tracking-wide text-gold">
                  An initiative of
                </p>
                <p className="mt-2 text-sm leading-relaxed text-gray-700">
                  The BIS Student Chapter, Department of Chemical Engineering, IIT Indore, in
                  association with the Bureau of Indian Standards.
                </p>
              </GlassCard>
            </div>
          </Reveal>
        </div>
      </GlassSection>

      {/* ── FIND US ───────────────────────────────────────────────── */}
      <GlassSection className="px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
              <div>
                <h2 className="text-3xl font-light tracking-tight text-navy-900 sm:text-4xl">
                  Find Us
                </h2>
                <p className="mt-3 text-base text-gray-600 sm:text-lg">
                  Indian Institute of Technology Indore, Simrol, 453552, Indore&ndash;Khandwa
                  Road, Indore, Madhya Pradesh.
                </p>
                <Link
                  href="/accommodation-venue"
                  className="hover-underline mt-5 inline-flex items-center gap-1 text-base font-semibold text-navy"
                >
                  Accommodation &amp; Venue details <ArrowRight size={16} />
                </Link>
              </div>
              <GlassCard className="p-2">
                <CampusMap />
              </GlassCard>
            </div>
          </Reveal>
        </div>
      </GlassSection>

      {/* ── CTA ───────────────────────────────────────────────────── */}
      <section className="relative isolate overflow-hidden border-t border-white/20 bg-navy-950/90 py-16">
        <div
          aria-hidden
          className="pointer-events-none absolute top-0 left-1/2 -z-10 h-64 w-64 -translate-x-1/2 rounded-full bg-gold/10 blur-3xl"
        />
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 px-4 text-center sm:px-6 lg:px-8">
          <p className="text-xs font-bold uppercase tracking-widest text-gold">
            Save the Date
          </p>
          <h2 className="text-3xl font-light text-white sm:text-4xl">
            Registrations opening soon
          </h2>
          <Button href="/registration" className="mt-2">
            Get Notified &amp; Register
          </Button>
        </div>
      </section>
    </>
  );
}
