import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { MemberCard } from "@/components/MemberCard";
import { Building2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Invited Speakers",
  description: "Distinguished invited speakers and keynote delegates for Malwa Chemical Conclave 2026.",
};

const SPEAKER_SLOTS = [
  { role: "Plenary Keynote", name: "Speaker Invitation in Progress", note: "Leading Global Chemical Enterprise" },
  { role: "Technical Keynote", name: "Speaker Invitation in Progress", note: "Process Simulation & Safety Expert" },
  { role: "BIS Policy Address", name: "Senior BIS Regulatory Official", note: "Bureau of Indian Standards" },
  { role: "Industry Talk", name: "Speaker Invitation in Progress", note: "Sustainable Refining & Petrochemicals" },
  { role: "Special Lecture", name: "Eminent Academic Scholar", note: "IIT / Global Research Institution" },
  { role: "Industrial Case Study", name: "Chief Technology Officer / VP", note: "Speciality Chemical Manufacturer" },
];

const ANTICIPATED_PARTNERS = [
  "BASF",
  "Shell",
  "Chevron",
  "Procter & Gamble",
  "Unilever",
  "Reliance Industries",
  "Indian Oil Corporation",
  "GAIL India",
];

const PREVIOUS_SPEAKERS = [
  {
    name: "Meghdeep Agrawal",
    role: "Vice President",
    organization: "Safeflex",
    image: "/speakers/meghdeep-agrawal.jpeg",
  },
  {
    name: "Kapil Jat",
    role: "Senior General Manager",
    organization: "Moira Sariya",
    image: "/speakers/kapil-jat.jpeg",
  },
  {
    name: "Arpit Jain",
    role: "Director",
    organization: "Fenton Chemicals",
    image: "/speakers/arpit-jain.webp",
  },
  {
    name: "Shubhanjali Umrao",
    role: "Deputy Director",
    organization: "Bureau of Indian Standards",
    image: "/speakers/shubhanjali-umrao.jpeg",
  },
];

export default function SpeakersPage() {
  return (
    <>
      <PageHero
        title="Invited Speakers"
        subtitle="Eminent scholars, industry leaders, and regulatory officials delivering plenary keynotes and technical talks."
      />

      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        {/* Institutional Partner Banner */}
        <Reveal>
          <div className="institutional-card p-6 sm:p-8 border-l-4 border-l-navy mb-10 bg-white">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-navy-900 mb-2">
              <Building2 size={16} /> Anticipated Participation
            </div>
            <p className="text-sm sm:text-base leading-relaxed text-gray-700">
              The organizing committee is actively confirming distinguished speakers and technical leads from top chemical corporations and academic bodies including:
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {ANTICIPATED_PARTNERS.map((org) => (
                <span
                  key={org}
                  className="rounded-md border border-[#E5E7EB] bg-gray-50 px-3 py-1 text-xs font-semibold text-navy-950"
                >
                  {org}
                </span>
              ))}
            </div>
          </div>
        </Reveal>

        {/* 2026 Speaker Slots */}
        <div className="mb-8">
          <span className="inline-block rounded bg-navy-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-navy-900">
            Conclave 2026
          </span>
          <h2 className="mt-2 text-2xl sm:text-3xl font-bold tracking-tight text-navy-950">
            Confirmed &amp; Upcoming Keynotes
          </h2>
          <p className="mt-1 text-sm text-gray-600">
            Plenary addresses and technical sessions across industry innovation and standardisation.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SPEAKER_SLOTS.map((speaker, i) => (
            <Reveal key={i} delay={i * 0.04}>
              <MemberCard
                name={speaker.name}
                role={speaker.role}
                note={speaker.note}
              />
            </Reveal>
          ))}
        </div>

        {/* ── Previous Speakers Section (Round Images) ─────────────── */}
        <div className="mt-20 pt-12 border-t border-[#E5E7EB]">
          <div className="text-center sm:text-left mb-10">
            <span className="inline-block rounded bg-gold-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-gold-900">
              Distinguished Legacy
            </span>
            <h2 className="mt-2 text-2xl sm:text-3xl font-bold tracking-tight text-navy-950">
              Previous Speakers
            </h2>
            <p className="mt-1 text-sm text-gray-600">
              Eminent industry pioneers and regulatory dignitaries who have addressed past editions of the conclave.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PREVIOUS_SPEAKERS.map((speaker, i) => (
              <Reveal key={speaker.name} delay={i * 0.05}>
                <div className="institutional-card p-6 flex flex-col items-center text-center bg-white h-full group hover:border-navy transition-all duration-300">
                  <div className="relative h-28 w-28 sm:h-32 sm:w-32 rounded-full overflow-hidden border-2 border-gold/40 p-1 bg-gradient-to-br from-gold/20 to-navy/10 shadow-sm group-hover:scale-105 group-hover:border-navy transition-all duration-300 shrink-0">
                    <img
                      src={speaker.image}
                      alt={speaker.name}
                      className="h-full w-full rounded-full object-cover object-top"
                    />
                  </div>
                  <h3 className="mt-4 text-base sm:text-lg font-bold text-navy-950 tracking-tight group-hover:text-navy transition-colors">
                    {speaker.name}
                  </h3>
                  <p className="mt-1 text-xs sm:text-sm font-semibold text-gold-900">
                    {speaker.role}
                  </p>
                  <p className="mt-0.5 text-xs text-gray-500">
                    {speaker.organization}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

