# Malwa Chemical Conclave 2026 — Project Plan

Official website for the Malwa Chemical Conclave 2026, hosted by the
Department of Chemical Engineering, IIT Indore (BIS Student Chapter, in
association with the Bureau of Indian Standards). Venue: IIT Indore.
Date: **October 12–13, 2026**.

Reference sites used:
- [compflu2026.iitrpr.ac.in](https://compflu2026.iitrpr.ac.in/) — nav structure and page breakdown for an IIT-hosted conference microsite.
- [iiti.ac.in](https://www.iiti.ac.in/) — official IIT Indore branding reference. Their live CSS was read directly (`css/pages/pages.css`, `css/components/components.css`, `css/partials/partials.css`) to confirm the real font (Outfit — already matched), button shape (pill, `border-radius: 40px`), and member-card/page-header structure, which the site's components now copy. See design.md for the specifics.
- The department's own brochure PDF (`BIS ke liye full logo wala (1).pdf`) — logos, About copy, stats, verticals, committee, sponsorship tiers. Already mined for content; see design.md for what was pulled in vs. left blank.

## Status: Done ✅

- [x] Tech stack decided: **Next.js 16 (App Router) + TypeScript + Tailwind CSS v4**
- [x] `framer-motion`, `lucide-react`, `clsx`, `tailwind-merge` installed
- [x] IIT Indore emblem and Chemical Engineering department logo extracted from the PDF and placed in `public/logos/`
- [x] Institutional blue sampled directly from the logo: **#004AAD**
- [x] Navbar (sticky, both logos, hover-underline links, mobile menu) and Footer built
- [x] All 9 pages scaffolded and routed: Home, About, Schedule, Invited Speakers, Sponsors, Organizers, Accommodation & Venue, Registration, Contact Us
- [x] Home page hero with hover-animated campus-photo placeholder, stats band, "what the conclave brings together" verticals grid (scroll-reveal animation on every section)
- [x] Registration form built and wired to a live API route (`app/api/registration/route.ts`) that writes to MongoDB
- [x] `npm run build` passes clean; dev server verified in-browser, including a real form submission through the API route
- [x] `.env.local` created with your MongoDB Atlas username/password (gitignored — never committed)
- [x] Theme flattened from solid navy panels to white-dominant with blue as accent only (navbar/footer/hero/stats/CTA all now white or `navy-50`)
- [x] Live campus location map (`components/CampusMap.tsx`) added to Home ("Find Us" section) and Contact Us
- [x] Pill-shaped 3D-press buttons (`components/Button.tsx`) matching iiti.ac.in's real button CSS, used for every CTA site-wide
- [x] Member-card component (`components/MemberCard.tsx`) matching iiti.ac.in's real `.member-info-card`, used on Invited Speakers and Organizers
- [x] Glass theme (`components/GlassSection.tsx`) applied to About and Invited Speakers only, per your request
- [x] Breadcrumb page headers (`Home > Page`) matching iiti.ac.in's real page-header structure
- [x] `.mcp.json` added with the Google Stitch MCP server config you provided (gitignored — the token never ships with the site; **restart Claude Code for the new MCP server to actually load**, it won't appear in this running session)

## Status: Blocked on you 🔴

- [ ] **Paste your real Atlas cluster hostname into `.env.local`.** I only have `IITINDORE` / `iitindore` as username/password — Atlas also needs the cluster address (looks like `cluster0.ab1cd.mongodb.net`), found in Atlas → Database → Connect → Drivers. Replace `REPLACE_WITH_YOUR_CLUSTER_HOST` in `.env.local` with it. Also confirm in Atlas → Network Access that the IIT server's IP (or `0.0.0.0/0` if you're OK with that) is allow-listed, or submissions will fail even with the right hostname.
- [ ] Whoever manages the IIT Indore web server needs to confirm they'll actually run this as a live Node.js process (`npm run build` + `npm run start`), not just host static files — you said this was already confirmed, worth double-checking with them once it's time to deploy.
- [ ] Send campus/event photographs — hero image, speaker photos, venue photos — to drop into the placeholder boxes.
- [ ] Speaker names, bios, and photos for the Invited Speakers page.
- [ ] Finalized schedule (session-by-session timings for Oct 12 and Oct 13).
- [ ] Confirmed sponsor logos for the Sponsors page.
- [ ] Registration fee amounts (currently marked "to be announced").
- [ ] Organizer/committee headshots (names and roles are already filled in from the brochure).
- [ ] Accommodation details and a venue/campus map.

## How to run it

```bash
npm install
npm run dev      # http://localhost:3000
```

```bash
npm run build && npm run start   # production build
```

## Architecture notes

- **Pages** live in `app/<route>/page.tsx` (App Router). Each page is a plain
  React Server Component unless it needs interactivity (Registration, Navbar),
  in which case it's marked `"use client"`.
- **Registration → MongoDB**: `app/registration/page.tsx` (client form) →
  `POST /api/registration` (`app/api/registration/route.ts`) →
  `lib/mongodb.ts` (cached connection) → `malwa_chemical_conclave.registrations`
  collection. Open the same `MONGODB_URI` in **MongoDB Compass** any time to
  browse, filter, or export registrations — no admin panel needed.
- **Shared UI**: `components/Navbar.tsx`, `components/Footer.tsx`,
  `components/PageHero.tsx` (banner for inner pages), `components/Reveal.tsx`
  (scroll fade-in wrapper), `components/PlaceholderBlock.tsx` (dashed-border
  box marking where a real photo/logo goes).
- See [design.md](design.md) for the full visual system and the anti-AI-template layout rules this site follows.

## Content policy for this build

Per your instruction, every tab exists and is fully styled, but **only
already-finalized brochure content was pre-filled** (event name, tagline,
dates, venue, stats, the 7 verticals, committee names/roles, sponsorship
tier pricing). Anything that depends on assets you haven't sent yet — photos,
speaker bios, the real schedule, sponsor logos, fee amounts — is left as a
clearly labeled placeholder so you can fill it in with follow-up prompts.
