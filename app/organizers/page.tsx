import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { GlassSection } from "@/components/GlassSection";
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
      </GlassSection>
    </>
  );
}
