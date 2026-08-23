# Design System — Malwa Chemical Conclave 2026

This supersedes the generic navy/gold system in [CLAUDE.md](CLAUDE.md) for
this specific site: **white-dominant with institutional blue as an accent
only**, sampled directly from the department's own logo, matching how
iiti.ac.in actually reads — mostly white/light pages, blue used for text,
links, buttons, borders, and icons rather than large solid color panels.
Not the brochure PDF's teal/gold/rust poster branding either (that palette
was for the print brochure, not the website).

**Revision note:** the first pass used solid `navy-900` panels for the
navbar, hero, footer, and stat/CTA bands. That read as "a blue website"
rather than "a white institutional website with blue accents," so every
full-bleed panel was flattened to white or `navy-50` — navy now only
appears as text, icons, borders, underlines, and small button fills.

## Color palette

| Token | Hex | Source / usage |
|---|---|---|
| `navy` (primary) | `#004AAD` | Sampled directly from the Chemical Engineering dept logo. Links, buttons, icons, active states — the only place pure navy fills anything more than a button or icon badge. |
| `navy-950` | `#001B3D` | Reserved for very high-contrast text if ever needed; no longer used as a background |
| `navy-900` | `#002F6C` | Headings, solid button fills (Register Now, Submit), sponsor tier accent strips |
| `navy-800` | `#003D8F` | Button hover states |
| `navy-700` | `#00429C` | Sponsor tier accent strip (Gold Partner) |
| `navy-600` / `navy-500` | `#1462C4` / `#2E77D6` | Sponsor tier accent strips (Silver Partner) |
| `navy-200` | `#B9D2F2` | Outline-button borders |
| `navy-100` | `#E4EDFB` | Card borders, dividers, nav border, hover fills |
| `navy-50` | `#F4F8FE` | Section background tint (PageHero banner, stats band, alternating home sections) — the only "colored" background used, and it's barely off-white |
| `offwhite` | `#F7F9FC` | Page background |
| Gray body text | `#374151` / `#6B7280` | Paragraph copy |

No gold, no gradients, no purple, and — after the revision above — no solid
navy backgrounds either. White is the dominant surface everywhere; blue is
purely an accent (text/icons/borders/buttons), never a full section fill,
except the barely-tinted `navy-50` used for gentle section separation.

## Typography

**Outfit** (Google Fonts), loaded via `next/font/google` in `app/layout.tsx`
— self-hosted by Next.js, no external font request at runtime.
- Headings: 600–700 weight, tight tracking.
- Body: 400–500 weight, `text-gray-600`/`text-gray-700`, generous line-height.

**Verified against the live iiti.ac.in stylesheet** (`css/pages/pages.css`,
`css/components/components.css`) — they use `font-family: 'Outfit', sans-serif`
throughout their own site too, so no change was needed here; it was already
a match. Their page titles (`.partials-page-header__title`) use font-weight
**300** at a large size — `PageHero` now does the same instead of a bold 600.

## Logos

Extracted directly from the department's brochure PDF at full resolution:
- `public/logos/iit-indore-emblem.png` — official IIT Indore seal.
- `public/logos/chemical-engineering-logo.png` — Dept. of Chemical
  Engineering badge (gear + flask mark).

Used together in the Navbar (emblem left, dept logo right) and Footer,
mirroring the brochure's own header layout and the compflu2026 reference
site's dual-logo header.

## Layout rules (anti-AI-template)

Same spirit as the general [CLAUDE.md](CLAUDE.md) system, applied here:

1. **Flat cards, not glassy gradient cards** — except on About and Invited
   Speakers, where you explicitly asked for a glass theme; see below.
   Elsewhere: `rounded-md`, 1px `navy-100` border, `shadow-sm` only.
2. **Pill-shaped buttons** (`rounded-full`) — this one flips the original
   "sharp buttons" rule. iiti.ac.in's own CSS uses `border-radius: 40px` /
   `9999px` on every button (`.components-more-btn`,
   `.components-black-more-btn`), confirmed by reading their live
   stylesheet, so `components/Button.tsx` now matches that instead.
3. **No hero gradient blob, and no solid color panel either.** The hero is a
   white section with a real (eventually real) photograph placeholder beside
   it — structured two-column layout, not a centered stack over a colored
   or abstract background.
4. **lucide-react outline icons only** — no emoji, no multi-color icon packs.
5. **Dense/structured over sparse marketing whitespace** — stat bands,
   tables, tiered pricing cards, committee tables, matching an institutional
   site's information density rather than a startup landing page's.
6. **Motion is restrained**: `Reveal` (fade + 16px slide, 0.5s, once per
   element, triggered on scroll into view) is the only page-load animation.
   Hover effects are simple `translate-y`/`scale`/`shadow` transitions
   (150–500ms), no spring overshoot.

## Hover / motion features (per your reference to compflu2026 + IIT Indore aesthetics)

- **Navbar links**: underline draws in on hover (`.hover-underline` in
  `globals.css`), active route stays underlined.
- **Hero campus photo placeholder**: scales up slightly on hover
  (`group-hover:scale-105`), so once you drop in the real IIT Indore
  campus photograph it'll have the same hover treatment as the reference site.
- **Vertical/team/sponsor-tier cards**: lift on hover (`-translate-y-1` +
  shadow increase).
- **Speaker/sponsor placeholder tiles**: same hover-scale treatment as the
  hero, ready for real photos/logos.
- **Mobile nav menu**: animated height/opacity expand via `framer-motion`.
- **Registration form**: success/error banners animate in with
  `framer-motion`'s `AnimatePresence`; submit button shows a spinner while
  the request is in flight.

## Buttons — copied from iiti.ac.in's real component CSS

Read directly from `iiti.ac.in/css/components/components.css` rather than
guessed. Their system has two button types:
- `.components-more-btn` (light): `#F6F7F8` bg, `1px solid #A7AAAF` border,
  `border-radius: 40px`, arrow slides right on hover.
- `.components-black-more-btn` (dark): `#000B16` bg, white text, same pill
  shape, background lightens on hover.

`components/Button.tsx` reproduces this shape (`rounded-full`, arrow that
slides right via `group-hover:translate-x-1`) using our own navy tokens
instead of their near-black, plus a bottom-ledge `box-shadow` that flattens
and the button drops 3px on `:active` — the classic "3D press button" feel
(the same trick behind most of Uiverse.io's 3D button set), built natively
in Tailwind rather than pasting third-party markup. Two variants: `primary`
(solid navy-900) and `outline` (white, navy border). Used for every call-to-
action site-wide (Register Now, View Schedule, Submit Registration, Get
Notified & Register).

## Member cards — copied from iiti.ac.in's `.member-info-card`

Their people-listing pattern: `border-radius: 20px`, soft drop shadow
(`1.95px 1.95px 2.6px rgba(0,0,0,.15)`), circular photo, `translateY(-2px)`
on hover. `components/MemberCard.tsx` reproduces this exactly and is used
on **Invited Speakers** and **Organizers** — the two pages that are
fundamentally "list of people," matching how IIT Indore's own site
structures the same kind of content.

## Glass theme — About & Invited Speakers only

Per your request, these two pages get a frosted-glass treatment; the rest
of the site stays flat (glass on a plain white page has nothing to show
through, so it only goes where it can actually read as glass):
- `components/GlassSection.tsx` — wraps a page section and drops three
  large soft-blurred blue-tinted blobs behind the content (`blur-3xl`,
  low-opacity `navy-50`/`navy-100`/`navy-200`).
- `components/GlassCard.tsx` — `bg-white/60`, `backdrop-blur-md`,
  `border-white/60`, soft blue-tinted shadow. Used for About's highlight
  cards and 2025→2026 banner, and for the speaker intro note and every
  `MemberCard` (`glass` prop) on the Speakers page.

## Page headers — copied from iiti.ac.in's breadcrumb pattern

Their `.partials-page-header` is a breadcrumb row (Home > Page) above a
large, light-weight (300) title. `components/PageHero.tsx` now matches:
a `Home > {title}` breadcrumb, then the title at `font-light` instead of
the previous `font-semibold`.

## Campus location map

`components/CampusMap.tsx` embeds a live Google Maps iframe (no API key
required — uses the public `/maps?q=...&output=embed` pattern) centered on
the department's address. Used on:
- **Home**, in a new "Find Us" section between the verticals grid and the
  final CTA band.
- **Contact Us**, replacing the old "map to be added" placeholder.

If a real Google Maps API key becomes available later, this can be swapped
for the official Maps Embed API for a guaranteed long-term support contract
— the current approach is the standard key-free technique and works fine
for an informational, non-commercial embed like this.

## Page-by-page content status

| Page | Prefilled from brochure | Left as placeholder |
|---|---|---|
| Home | Title, tagline, date, venue, stats, 7 verticals, About teaser, live campus map | Campus hero photo |
| About | Full About copy, 2025→2026 progress banner, 3 highlight cards | Extended mission/history copy |
| Schedule | Day 1 / Day 2 date headers | All session timings |
| Invited Speakers | Anticipated-sponsor-org note | All speaker names, bios, photos |
| Sponsors | All 4 sponsorship tiers with full pricing/benefits | Confirmed sponsor logos |
| Organizers | Full committee (names + roles) and 4 sub-team leads | Headshots |
| Accommodation & Venue | Venue address | Accommodation details, map |
| Registration | Full working form + DB pipeline | Fee amount |
| Contact Us | Address, dept email, live campus map | Phone number |

## Registration data flow

```
Registration page (client form)
   -> POST /api/registration
   -> lib/mongodb.ts (cached MongoClient)
   -> MongoDB Atlas: malwa_chemical_conclave.registrations
```

Open the same connection string in **MongoDB Compass** to view, filter, sort,
or export (`.json`/`.csv`) submissions at any time — no custom admin UI needed.
