import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { MemberCard } from "@/components/MemberCard";
import { Building2 } from "lucide-react";

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
      </div>
    </>
  );
}

