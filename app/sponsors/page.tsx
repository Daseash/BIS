import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { PlaceholderBlock } from "@/components/PlaceholderBlock";
import { Building2, Check, Mail } from "lucide-react";
import { Button } from "@/components/Button";

export const metadata: Metadata = {
  title: "Sponsors & Partners",
  description: "Sponsorship tiers and partnerships for Malwa Chemical Conclave 2026 at IIT Indore.",
};

const TIERS = [
  {
    name: "Title Partner",
    amount: "₹2,00,000+",
    accentHeader: "bg-[#001B3D] text-white",
    badge: "Exclusive Tier",
    badgeColor: "bg-gold-50 text-gold-900",
    benefits: [
      "Category exclusivity across all event marketing",
      "Prime branding on auditorium LED backdrop screens",
      "Prominent digital hoardings & high-traffic banners",
      "Dedicated standees & repeated announcement mentions",
      "Instagram reels (2) & promotional posts (4)",
      "Website home banner branding + direct hyperlink",
      "20–25 minute dedicated Industry Keynote slot",
      "Official award & workshop co-branding",
      "Stage felicitation + digital certificate of partnership",
    ],
  },
  {
    name: "Gold Partner",
    amount: "₹1,00,000",
    accentHeader: "bg-[#002F6C] text-white",
    badge: "Key Partner",
    badgeColor: "bg-navy-50 text-navy-900",
    benefits: [
      "Branding on LED screens and conference hall displays",
      "Digital hoardings & high-traffic entrance banners",
      "Digital standees & session announcement mentions",
      "Instagram reel (1) & promotional posts (2)",
      "Website branding + official company hyperlink",
      "Award association and felicitation on stage",
      "Digital acknowledgement across event collaterals",
    ],
  },
  {
    name: "Silver Partner",
    amount: "₹60,000",
    accentHeader: "bg-[#1462C4] text-white",
    badge: "Associate Tier",
    badgeColor: "bg-gray-100 text-gray-800",
    benefits: [
      "Branding on event screens and banners",
      "Main entrance big banner logo inclusion",
      "Announcement mentions during technical sessions",
      "Instagram promotional post (1)",
      "Website partner directory logo placement",
      "Digital acknowledgement in conference brochure",
    ],
  },
  {
    name: "Associate Partner",
    amount: "₹30,000",
    accentHeader: "bg-[#374151] text-white",
    badge: "Supporting Tier",
    badgeColor: "bg-gray-100 text-gray-800",
    benefits: [
      "Logo on event collaterals and registration kit",
      "Digital standee display in exhibition hallway",
      "Social media acknowledgement & tags",
      "Website logo placement on Sponsors page",
    ],
  },
];

const SPONSOR_LOGO_SLOTS = Array.from({ length: 6 });

export default function SponsorsPage() {
  return (
    <>
      <PageHero
        title="Sponsorship Opportunities"
        subtitle="Collaborate with IIT Indore and gain high-visibility brand alignment with researchers, students, and chemical industry leaders."
      />

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-10">
          <span className="inline-block rounded bg-navy-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-navy-900">
            Partnership Packages
          </span>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-navy-950">
            Sponsorship Tiers &amp; Deliverables
          </h2>
          <p className="mt-1 text-base text-gray-600">
            Choose a tier tailored to your organization&apos;s visibility and recruitment goals.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {TIERS.map((tier, i) => (
            <Reveal key={tier.name} delay={i * 0.04}>
              <div className="institutional-card flex h-full flex-col overflow-hidden">
                <div className={`p-5 ${tier.accentHeader}`}>
                  <span className={`inline-block rounded px-2 py-0.5 text-xs font-bold uppercase tracking-wider ${tier.badgeColor}`}>
                    {tier.badge}
                  </span>
                  <h3 className="mt-2 text-xl font-bold tracking-tight text-white">{tier.name}</h3>
                  <p className="mt-1 text-2xl font-extrabold text-white">{tier.amount}</p>
                </div>

                <div className="flex flex-1 flex-col justify-between p-5 bg-white">
                  <ul className="space-y-2.5 text-xs sm:text-sm text-gray-700">
                    {tier.benefits.map((b) => (
                      <li key={b} className="flex items-start gap-2">
                        <Check size={15} className="mt-0.5 shrink-0 text-navy" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6 pt-4 border-t border-gray-100">
                    <Button
                      href="/contact"
                      variant="outline"
                      className="w-full text-xs py-2"
                    >
                      Inquire Sponsorship
                    </Button>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Confirmed Partners Section */}
        <div className="mt-20">
          <div className="mb-6">
            <h3 className="text-2xl font-bold text-navy-950">Our Industry Partners</h3>
            <p className="text-sm text-gray-600 mt-1">
              Confirmed sponsor logos and corporate partners will be featured below.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {SPONSOR_LOGO_SLOTS.map((_, i) => (
              <Reveal key={i} delay={i * 0.02}>
                <div className="institutional-card p-4 bg-white flex items-center justify-center">
                  <PlaceholderBlock icon={Building2} label="Sponsor Logo" aspect="aspect-video" />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

