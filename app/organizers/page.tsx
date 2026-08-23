import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { MemberCard } from "@/components/MemberCard";

export const metadata: Metadata = {
  title: "Organizing Committee",
  description: "Organizing committee and BIS Student Chapter members of Malwa Chemical Conclave 2026.",
};

const PATRON_AND_CHAIR = [
  {
    role: "Patron",
    name: "Prof. Suhas S. Joshi",
    note: "Director, IIT Indore",
    image: "/organizers/suhas-joshi.png",
  },
  {
    role: "Chairperson",
    name: "Prof. Eswara Prasad Korimalli",
    note: "HoD, Chemical Engineering, IIT Indore",
    image: "/organizers/eswara-prasad.jpeg",
  },
];

const ADVISORS_AND_COORDINATORS = [
  {
    role: "Advisor",
    name: "Prof. Manish Kumar Goyal",
    note: "Professor, IIT Indore",
    image: "/organizers/manish-goyal.png",
  },
  {
    role: "Faculty Coordinator",
    name: "Dr. Preetika Karnal",
    note: "Assistant Professor, IIT Indore",
    image: "/organizers/preetika-karnal.jpg",
  },
  {
    role: "Co-Faculty Coordinator",
    name: "Dr. Ranjeet Kumar",
    note: "Assistant Professor, IIT Indore",
    image: "/organizers/ranjeet-kumar.jpg",
  },
  {
    role: "Student Leader",
    name: "Mr. Kavyansh Raj Singh",
    note: "IIT Indore",
    image: "/organizers/kavyansh.png",
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
        title="Organizing Committee"
        subtitle="Distinguished leadership, faculty coordinators, and student chapter committee behind Malwa Chemical Conclave 2026."
      />

      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        {/* ── 1. Patron & Chairperson (Big, 2 Columns) ────────── */}
        <div>
          <span className="inline-block rounded bg-navy-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-navy-900">
            Institutional Leadership
          </span>
          <h2 className="mt-2 text-2xl sm:text-3xl font-bold tracking-tight text-navy-950">
            Patron &amp; Chairperson
          </h2>
          <p className="mt-1 text-sm text-gray-600">
            Executive leadership and institutional direction from IIT Indore.
          </p>
        </div>

        <div className="mt-8 mx-auto grid max-w-2xl gap-8 sm:grid-cols-2">
          {PATRON_AND_CHAIR.map((person, i) => (
            <Reveal key={person.name} delay={i * 0.05}>
              <MemberCard
                name={person.name}
                role={person.role}
                note={person.note}
                image={person.image}
                className="shadow-md hover:shadow-xl border-navy/20"
              />
            </Reveal>
          ))}
        </div>

        {/* ── 2. Advisors & Coordinators (Smaller, 4 Columns) ──── */}
        <div className="mt-16">
          <span className="inline-block rounded bg-navy-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-navy-900">
            Committee Oversight
          </span>
          <h2 className="mt-2 text-xl sm:text-2xl font-bold tracking-tight text-navy-950">
            Advisors &amp; Faculty Coordinators
          </h2>
          <p className="mt-1 text-sm text-gray-600">
            Academic planning, event stewardship, and student leadership.
          </p>
        </div>

        <div className="mt-8 grid gap-6 grid-cols-2 sm:grid-cols-2 lg:grid-cols-4">
          {ADVISORS_AND_COORDINATORS.map((person, i) => (
            <Reveal key={person.name} delay={i * 0.04}>
              <MemberCard
                name={person.name}
                role={person.role}
                note={person.note}
                image={person.image}
              />
            </Reveal>
          ))}
        </div>

        {/* ── 3. BIS Student Chapter Core Group ─────────────────── */}
        <div className="mt-20">
          <span className="inline-block rounded bg-gold-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-gold-900">
            Student Leadership
          </span>
          <h2 className="mt-2 text-2xl sm:text-3xl font-bold tracking-tight text-navy-950">
            BIS Student Chapter Core Group
          </h2>
          <p className="mt-1 text-sm text-gray-600">
            Student chapter members managing operations, guest relations, technical submissions, and event logistics.
          </p>
        </div>

        <div className="mt-8 grid gap-6 grid-cols-2 sm:grid-cols-3 lg:grid-cols-5">
          {BIS_CHAPTER_MEMBERS.map((person, i) => (
            <Reveal key={person.name} delay={i * 0.04}>
              <MemberCard
                name={person.name}
                role={person.role}
                note={person.note}
                image={person.image}
              />
            </Reveal>
          ))}
        </div>
      </div>
    </>
  );
}

