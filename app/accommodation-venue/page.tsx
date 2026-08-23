import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { CampusMap } from "@/components/CampusMap";
import { Building, MapPin, Plane, Train, Car, Hotel } from "lucide-react";

export const metadata: Metadata = {
  title: "Accommodation & Venue",
  description: "Campus location, transport directions, and accommodation guidance for IIT Indore.",
};

export default function AccommodationVenuePage() {
  return (
    <>
      <PageHero
        title="Accommodation & Venue"
        subtitle="Campus directions, transport links, and guest house accommodation guidance for delegates visiting IIT Indore."
      />

      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-start">
          {/* Venue & Map */}
          <Reveal>
            <div className="institutional-card p-6 sm:p-8 flex flex-col justify-between h-full">
              <div>
                <span className="inline-block rounded bg-navy-50 px-2.5 py-0.5 text-xs font-bold uppercase tracking-wider text-navy-900 mb-2">
                  Conference Location
                </span>
                <h2 className="text-2xl font-bold text-navy-950">IIT Indore Campus</h2>
                <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                  Indian Institute of Technology Indore, Khandwa Road, Simrol, Indore, Madhya Pradesh &ndash; 453552.
                </p>
                <div className="mt-6 rounded-lg overflow-hidden border border-[#E5E7EB]">
                  <CampusMap className="aspect-[4/3] w-full border-0" />
                </div>
              </div>
            </div>
          </Reveal>

          {/* Transit & Accommodation Info */}
          <div className="space-y-6">
            <Reveal delay={0.05}>
              <div className="institutional-card p-6 border-l-4 border-l-navy">
                <h3 className="text-lg font-bold text-navy-950 flex items-center gap-2 mb-4">
                  <Plane size={18} className="text-navy" /> How to Reach IIT Indore
                </h3>
                <div className="space-y-3 text-sm text-gray-700">
                  <div className="flex items-start gap-2.5">
                    <Plane size={16} className="mt-0.5 shrink-0 text-gray-400" />
                    <div>
                      <strong className="text-navy-950">By Air:</strong> Devi Ahilyabai Holkar Airport, Indore (35 km). Pre-paid airport taxis and app-based cabs are readily available to Simrol campus.
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <Train size={16} className="mt-0.5 shrink-0 text-gray-400" />
                    <div>
                      <strong className="text-navy-950">By Train:</strong> Indore Junction Railway Station (24 km). Regular bus services and city taxis connect to the IIT Indore main gate.
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <Car size={16} className="mt-0.5 shrink-0 text-gray-400" />
                    <div>
                      <strong className="text-navy-950">By Road:</strong> Situated on the Indore–Khandwa State Highway, accessible via public transit buses and cabs from all parts of Indore.
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="institutional-card p-6 border-l-4 border-l-gold">
                <h3 className="text-lg font-bold text-navy-950 flex items-center gap-2 mb-3">
                  <Hotel size={18} className="text-gold-900" /> Accommodation Guidance
                </h3>
                <p className="text-sm text-gray-700 leading-relaxed">
                  Limited on-campus guest house accommodation is reserved for keynote speakers and session chairs. For outstation participants and student delegates, subsidized hostel rooms and a list of recommended partner hotels in Indore city will be shared upon registration confirmation.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </>
  );
}

