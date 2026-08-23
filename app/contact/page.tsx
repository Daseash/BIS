import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { GlassSection, GlassCard } from "@/components/GlassSection";
import { CampusMap } from "@/components/CampusMap";
import { Mail, MapPin, Phone } from "lucide-react";

export default function ContactPage() {
  return (
    <>
      <PageHero title="Contact Us" subtitle="Reach out to the organizing team." />

      <GlassSection className="mx-auto max-w-5xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2">
          <Reveal>
            <div className="space-y-5">
              <GlassCard className="p-5">
                <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-navy">
                  <MapPin size={14} /> Address
                </p>
                <p className="mt-2 text-sm text-gray-700">
                  Department of Chemical Engineering, IIT Indore, Simrol,
                  453552, Indore&ndash;Khandwa Road, Indore, Madhya Pradesh
                </p>
              </GlassCard>
              <GlassCard className="p-5">
                <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-navy">
                  <Mail size={14} /> Email
                </p>
                <a
                  href="mailto:chemenggoffice@iiti.ac.in"
                  className="mt-2 inline-block text-sm text-gray-700 hover:text-navy"
                >
                  chemenggoffice@iiti.ac.in
                </a>
              </GlassCard>
              <GlassCard className="p-5">
                <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-navy">
                  <Phone size={14} /> Phone
                </p>
                <p className="mt-2 text-sm text-gray-700">
                  Student coordinator contact number to be added.
                </p>
              </GlassCard>
            </div>
          </Reveal>

          <Reveal delay={0.05}>
            <GlassCard className="p-2">
              <CampusMap className="aspect-[4/3]" />
            </GlassCard>
          </Reveal>
        </div>
      </GlassSection>
    </>
  );
}
