import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { GlassSection, GlassCard } from "@/components/GlassSection";
import { PlaceholderBlock } from "@/components/PlaceholderBlock";
import { Building2 } from "lucide-react";
import { cn } from "@/lib/cn";

const TIERS = [
  {
    name: "Title Partner",
    amount: "₹2,00,000+",
    accent: "bg-navy-900",
    benefits: [
      "Category exclusivity",
      "Branding on LED screens",
      "Digital hoardings & big banners",
      "Digital standees & announcement mentions",
      "Instagram reel (2) & posts (4)",
      "Website branding + hyperlink",
      "20–25 min Industry Talk slot",
      "Award & workshop association",
      "Stage + digital acknowledgement",
    ],
  },
  {
    name: "Gold Partner",
    amount: "₹1,00,000",
    accent: "bg-navy-700",
    benefits: [
      "Branding on LED screens",
      "Digital hoardings & big banners",
      "Digital standees & announcement mentions",
      "Instagram reel (1) & posts (2)",
      "Website branding + hyperlink",
      "Award association",
      "Stage + digital acknowledgement",
    ],
  },
  {
    name: "Silver Partner",
    amount: "₹60,000",
    accent: "bg-navy-500",
    benefits: [
      "Branding on LED screens",
      "Big banners",
      "Announcement mentions",
      "Instagram post (1)",
      "Website branding",
      "Digital acknowledgement",
    ],
  },
  {
    name: "Associate Partner",
    amount: "₹30,000",
    accent: "bg-navy-300",
    benefits: [
      "Logo on event collaterals",
      "Digital standees",
      "Social media acknowledgement",
      "Website logo placement",
    ],
  },
];

const SPONSOR_LOGO_SLOTS = Array.from({ length: 6 });

export default function SponsorsPage() {
  return (
    <>
      <PageHero
        title="Sponsors"
        subtitle="Partner with the Malwa Chemical Conclave 2026."
      />

      <GlassSection className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
        <Reveal>
          <h2 className="text-xl font-semibold text-navy-900">Sponsorship Tiers</h2>
        </Reveal>

        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {TIERS.map((tier, i) => (
            <Reveal key={tier.name} delay={i * 0.05}>
              <GlassCard className="flex h-full flex-col overflow-hidden">
                <div className={cn("px-4 py-3 text-white", tier.accent)}>
                  <p className="text-sm font-semibold">{tier.name}</p>
                </div>
                <div className="flex flex-1 flex-col px-4 py-4">
                  <p className="text-2xl font-semibold text-navy-900">{tier.amount}</p>
                  <ul className="mt-4 space-y-2 text-sm text-gray-600">
                    {tier.benefits.map((b) => (
                      <li key={b} className="flex gap-2">
                        <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-navy" />
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              </GlassCard>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <h2 className="mt-14 text-xl font-semibold text-navy-900">Our Sponsors</h2>
          <p className="mt-1 text-sm text-gray-600">
            Confirmed sponsor logos will be placed here as partnerships are finalized.
          </p>
        </Reveal>

        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {SPONSOR_LOGO_SLOTS.map((_, i) => (
            <Reveal key={i} delay={i * 0.03}>
              <GlassCard className="p-2">
                <PlaceholderBlock icon={Building2} label="Sponsor logo" aspect="aspect-square" />
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </GlassSection>
    </>
  );
}
