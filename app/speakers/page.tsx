import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { GlassSection, GlassCard } from "@/components/GlassSection";
import { MemberCard } from "@/components/MemberCard";

const SPEAKER_SLOTS = Array.from({ length: 6 });

export default function SpeakersPage() {
  return (
    <>
      <PageHero
        title="Invited Speakers"
        subtitle="Industry leaders and academicians speaking at Malwa Chemical Conclave 2026."
      />

      <GlassSection className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
        <Reveal>
          <GlassCard className="p-5 text-sm text-gray-700">
            Confirmed speaker line-up will appear here as invitations are
            accepted. Anticipated participation from organisations including
            BASF, Shell, Chevron, P&amp;G, and Unilever.
          </GlassCard>
        </Reveal>

        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          {SPEAKER_SLOTS.map((_, i) => (
            <Reveal key={i} delay={i * 0.05}>
              <MemberCard
                glass
                name="Speaker name to be added"
                role="Session / Organization"
              />
            </Reveal>
          ))}
        </div>
      </GlassSection>
    </>
  );
}
