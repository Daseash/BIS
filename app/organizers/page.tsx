import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { GlassSection, GlassCard } from "@/components/GlassSection";
import { MemberCard } from "@/components/MemberCard";

const LEADERSHIP = [
  {
    role: "Patron",
    name: "Prof. Suhas S. Joshi",
    note: "Director, IIT Indore",
    image: "/organizers/suhas-joshi.png",
  },
  {
    role: "Chairperson",
    name: "Prof. Eswara Prasad Korimalli",
    note: "HoD, Chemical Engineering",
    image: "/organizers/eswara-prasad.png",
  },
  {
    role: "Advisor",
    name: "Prof. Manish Kumar Goyal",
    note: "IIT Indore",
    image: "/organizers/manish-goyal.png",
  },
  {
    role: "Faculty Coordinator",
    name: "Dr. Preetika Karnal",
    note: "IIT Indore",
    image: "/organizers/preetika-karnal.jpg",
  },
  {
    role: "Co-Faculty Coordinator",
    name: "Dr. Ranjeet Kumar",
    note: "IIT Indore",
    image: "/organizers/ranjeet-kumar.jpg",
  },
  {
    role: "Student Leader",
    name: "Mr. Kavyansh Raj Singh",
    note: "IIT Indore",
    image: "/organizers/kavyansh-raj-singh.jpg",
  },
];

const BIS_CHAPTER_MEMBERS = [
  {
    role: "Core Group Member",
    name: "Mr. Eashwar Chandra Das",
    note: "BIS Student Chapter, IIT Indore",
    image: "/organizers/eashwar-chandra-das.jpeg",
  },
  {
    role: "Core Group Member",
    name: "Mr. Shlok Parikh",
    note: "BIS Student Chapter, IIT Indore",
    image: "/organizers/shlok-parikh.jpg",
  },
  {
    role: "Core Group Member",
    name: "Mr. Abhishek Nigam",
    note: "BIS Student Chapter, IIT Indore",
    image: "/organizers/abhishek-nigam.jpg",
  },
  {
    role: "Core Group Member",
    name: "Ms. Diyali Girisan Smitha",
    note: "BIS Student Chapter, IIT Indore",
    image: "/organizers/diyali-girisan-smitha.jpg",
  },
  {
    role: "Core Group Member",
    name: "Mr. Daksh Vaya",
    note: "BIS Student Chapter, IIT Indore",
    image: "/organizers/daksh-vaya.jpg",
  },
];

const TEAMS = [
  {
    name: "Publicity and Marketing",
    lead: "Mr. Shlok Parikh",
    description: "Posters, banners & newspaper ads · social media · newsletter & brochure",
    image: "/organizers/shlok-parikh.jpg",
  },
  {
    name: "Outreach",
    lead: "Mr. Abhishek Nigam",
    description: "Speaker & workshop outreach · industry and academia liaison",
    image: "/organizers/abhishek-nigam.jpg",
  },
  {
    name: "Web Development",
    lead: "Mr. Nikhilesh Marko",
    description: "Event website & registration portal · live updates & schedule",
    image: "/organizers/nikhilesh-marko.png",
  },
  {
    name: "Operations & Logistics",
    lead: "Ms. Mitali Dave",
    description: "Registrations · on-ground coordination",
    image: "/organizers/mitali-dave.png",
  },
];

export default function OrganizersPage() {
  return (
    <>
      <PageHero
        title="Organizers"
        subtitle="The team behind Malwa Chemical Conclave 2026."
      />

      <GlassSection className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
        <Reveal>
          <h2 className="text-xl font-semibold text-navy-900">Organizing Committee</h2>
        </Reveal>

        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {LEADERSHIP.map((person, i) => (
            <Reveal key={person.name} delay={i * 0.05}>
              <MemberCard
                glass
                name={person.name}
                role={person.role}
                note={person.note}
                image={person.image}
              />
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <h2 className="mt-14 text-xl font-semibold text-navy-900">
            BIS Student Chapter Core Group
          </h2>
          <p className="mt-1 text-sm text-gray-600">
            Department of Chemical Engineering, IIT Indore in association with the Bureau of Indian Standards.
          </p>
        </Reveal>

        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {BIS_CHAPTER_MEMBERS.map((person, i) => (
            <Reveal key={person.name} delay={i * 0.05}>
              <MemberCard
                glass
                name={person.name}
                role={person.role}
                note={person.note}
                image={person.image}
              />
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <h2 className="mt-14 text-xl font-semibold text-navy-900">Event Working Teams</h2>
        </Reveal>

        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          {TEAMS.map((team, i) => (
            <Reveal key={team.name} delay={i * 0.05}>
              <GlassCard className="flex h-full items-center gap-5 p-5">
                <div className="h-16 w-16 shrink-0 overflow-hidden rounded-full border border-navy-100/50 shadow-sm transition-transform duration-300 group-hover:scale-105">
                  <img
                    src={team.image}
                    alt={team.lead}
                    className="h-full w-full object-cover object-top"
                  />
                </div>
                <div>
                  <p className="font-semibold text-navy-900">{team.name}</p>
                  <p className="mt-1 text-sm text-gray-600">{team.description}</p>
                  <p className="mt-2 text-sm font-medium text-navy">Led by {team.lead}</p>
                </div>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </GlassSection>
    </>
  );
}
