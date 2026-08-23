import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { GlassSection, GlassCard } from "@/components/GlassSection";
import { PlaceholderBlock } from "@/components/PlaceholderBlock";
import { Building, Map } from "lucide-react";

export default function AccommodationVenuePage() {
  return (
    <>
      <PageHero
        title="Accommodation & Venue"
        subtitle="Everything you need to plan your visit to IIT Indore."
      />

      <GlassSection className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
        <Reveal>
          <div className="grid gap-8 lg:grid-cols-2">
            <div>
              <h2 className="text-xl font-semibold text-navy-900">Venue</h2>
              <p className="mt-2 text-sm text-gray-600">
                Indian Institute of Technology Indore, Simrol, 453552,
                Indore&ndash;Khandwa Road, Indore, Madhya Pradesh.
              </p>
              <div className="mt-4">
                <GlassCard className="p-2">
                  <PlaceholderBlock icon={Map} label="Venue map — to be added" />
                </GlassCard>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-navy-900">Accommodation</h2>
              <p className="mt-2 text-sm text-gray-600">
                On-campus and nearby accommodation details for outstation
                delegates will be published here.
              </p>
              <div className="mt-4">
                <GlassCard className="p-2">
                  <PlaceholderBlock icon={Building} label="Accommodation details — to be added" />
                </GlassCard>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <GlassCard className="mt-10 p-6 text-sm text-navy-500">
            Travel directions, nearest airport/railway station, and campus
            guest house booking instructions to be added here.
          </GlassCard>
        </Reveal>
      </GlassSection>
    </>
  );
}
