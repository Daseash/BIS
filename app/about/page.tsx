import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { GlassSection, GlassCard } from "@/components/GlassSection";
import { MapPinned, ClipboardCheck, TrendingUp } from "lucide-react";

const HIGHLIGHTS = [
  {
    icon: MapPinned,
    title: "Regional Relevance",
    description:
      "Chemical Engineering practice applied directly to the Malwa industrial ecosystem.",
  },
  {
    icon: ClipboardCheck,
    title: "BIS Standards",
    description:
      "Insight into standardisation and quality-assurance for national compliance.",
  },
  {
    icon: TrendingUp,
    title: "Collective Impact",
    description:
      "Formally establishing the Malwa Consortium for responsible regional development.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        title="About the Conclave"
        subtitle="A platform bringing academicians, industry, and regulators onto a single stage."
      />

      <GlassSection className="mx-auto max-w-5xl px-4 py-14 sm:px-6 lg:px-8">
        <Reveal>
          <GlassCard className="p-8">
            <p className="leading-relaxed text-gray-700">
              The Malwa Chemical Conclave is a platform bringing academicians,
              industry, and regulators onto a single stage to advance Chemical
              Engineering practice and Industrial Standardisation. The 2026
              edition also formally establishes the{" "}
              <strong className="text-navy-900">Malwa Consortium</strong> — a
              collaborative structure for responsible regional development.
            </p>
          </GlassCard>
        </Reveal>

        <Reveal delay={0.05}>
          <GlassCard className="mt-6 flex flex-col items-center justify-between gap-3 px-6 py-5 sm:flex-row">
            <span className="text-sm font-semibold uppercase tracking-wide text-navy-900">
              2025 Pilot
            </span>
            <span className="text-gray-600">4 Industry Talks (2025)</span>
            <span aria-hidden className="hidden text-navy sm:block">
              &rarr;
            </span>
            <span className="text-sm font-semibold uppercase tracking-wide text-navy-900">
              2026 Flagship
            </span>
            <span className="text-gray-600">7 Integrated Verticals (2026)</span>
          </GlassCard>
        </Reveal>

        <div className="mt-10 grid gap-5 sm:grid-cols-3">
          {HIGHLIGHTS.map((item, i) => {
            const Icon = item.icon;
            return (
              <Reveal key={item.title} delay={i * 0.05}>
                <GlassCard className="h-full p-5">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-navy-900/90 text-white">
                    <Icon size={20} />
                  </div>
                  <p className="mt-4 font-semibold text-navy-900">{item.title}</p>
                  <p className="mt-1 text-sm text-gray-600">{item.description}</p>
                </GlassCard>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={0.1}>
          <GlassCard className="mt-10 p-6 text-sm text-navy-500">
            More about the conclave&apos;s mission, past editions, and detailed
            objectives to be added here.
          </GlassCard>
        </Reveal>
      </GlassSection>
    </>
  );
}
