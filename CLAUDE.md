# BIS — Institutional Design System

This project follows the **IIT Indore institutional aesthetic**: formal, structured,
credibility-first. It intentionally avoids generic "AI-generated SaaS" visual patterns
(centered hero + 3 rounded gradient cards + emoji icons). Follow these rules for any
UI work in this repo.

## Stack

- **framer-motion** — animation (subtle, purposeful only — no bouncy/gradient-heavy motion)
- **lucide-react** — icons (outline style, institutional, never emoji)
- **clsx** + **tailwind-merge** — class composition; use a shared `cn()` utility
  (`clsx` for conditional classes, `twMerge` to resolve Tailwind conflicts)

```ts
// lib/cn.ts
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

## Color palette

| Token | Hex | Usage |
|---|---|---|
| `navy` (primary) | `#002B49` | Headers, nav bars, primary text on light, primary buttons, footer |
| `gold` (accent) | `#C59B27` | Accent lines, hover states, active tab underline, small highlights, borders — **never** as a large fill |
| `navy-50`–`navy-900` | tints/shades of `#002B49` | Section backgrounds, subtle borders, muted text |
| White / off-white `#F7F7F5` | | Page background, card background |
| Neutral gray `#4B5563` | | Body copy on white |

Rules:
- Navy and white/off-white carry the page. Gold is a **seasoning**, not a background —
  use it for underlines, thin borders, icon accents, and hover/active states only.
- No purple/blue gradients, no glassmorphism, no neon accent colors. This is an
  institutional site, not a startup landing page.
- Buttons: solid navy with white text as primary; gold used only for a thin
  bottom-border/underline accent or a secondary "outline" button style.

```js
// tailwind.config: extend.colors
colors: {
  navy: {
    DEFAULT: "#002B49",
    50: "#E6ECF0", 100: "#CCD9E1", 200: "#99B3C3", 300: "#668DA5",
    400: "#336787", 500: "#002B49", 600: "#00223A", 700: "#001A2C",
    800: "#00111D", 900: "#00090F",
  },
  gold: {
    DEFAULT: "#C59B27", 50: "#FBF5E6", 100: "#F5E8C2", 300: "#DBBD5F",
    500: "#C59B27", 700: "#93741D", 900: "#5C4812",
  },
}
```

## Typography

- **Font:** [Outfit](https://fonts.google.com/specimen/Outfit) (Google Fonts) for all
  headings and UI text. Load via `next/font/google` or a `<link>` to Google Fonts —
  never a generic system-font stack as the primary face.
- Headings: Outfit, semibold/bold (600–700), tight letter-spacing, navy or white
  depending on background.
- Body copy: Outfit regular/medium (400–500), gray-700/neutral, generous line-height
  (1.6–1.7) for readability — this is a content-heavy institutional site, not marketing copy.
- Avoid decorative script fonts, avoid overly rounded "friendly" display fonts.

```css
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&display=swap');

body { font-family: 'Outfit', system-ui, sans-serif; }
```

## Anti-AI layout rules

The goal is to read as a real institution's site, not a template. Avoid the default
patterns an LLM reaches for:

1. **No symmetric 3-card grids as the default answer.** If content naturally has 3
   items, fine — but don't pad or trim content to force a 3-up grid every time.
   Vary layout by content: lists, asymmetric grids, timelines, tables.
2. **No rounded-2xl gradient cards with soft shadows everywhere.** Prefer flat cards
   with a **sharp or minimally-rounded** border (`rounded-sm`/`rounded-md` max), a thin
   1px navy-100 or gold border/divider, and no drop-shadow-heavy "floating" look.
   Shadows, when used, should be subtle (`shadow-sm`) — not glowy or colored.
3. **No centered hero + big blurry gradient blob background.** Heroes should be
   structured: navy or image-backed banner, left-aligned or grid-based content,
   institutional photography (or a solid navy panel) rather than abstract gradient mesh.
4. **No emoji as icons.** Use `lucide-react` outline icons only, sized consistently
   (typically 20–24px), in navy or gold, never multi-color icon sets.
5. **No excessive rounded-full pill buttons everywhere.** Use rectangular or
   slightly-rounded (`rounded-sm`) buttons with sharp, confident edges — consistent
   with a government/academic institution, not a consumer app.
6. **Navigation and structure over novelty.** Use a proper top navbar (navy background,
   white text, gold underline on active/hover) and a real footer with structured
   columns — not a single-page scrolling app shell.
7. **Motion is restrained.** `framer-motion` should be used for fade/slide-in on
   scroll and subtle hover transitions (150–250ms), never bouncy spring overshoot,
   parallax gimmicks, or gradient-animation effects.
8. **Dense, structured content over sparse marketing whitespace.** Institutional
   pages (departments, notices, faculty listings, admissions) favor tables, lists,
   and clearly labeled sections over huge whitespace-heavy single-statement sections.
9. **Borders and dividers do real work.** Use thin gold or navy-100 rule lines to
   separate sections instead of large empty gaps or colored background blocks.

## Component defaults

- **Cards:** white/off-white bg, `border border-navy-100`, `rounded-md`, `shadow-sm`,
  optional 2–3px gold top or left accent border for emphasis — not a full gold fill.
- **Buttons (primary):** `bg-navy text-white rounded-sm hover:bg-navy-600`.
- **Buttons (secondary/outline):** `border border-gold text-navy hover:bg-gold-50`.
- **Links/active states:** gold underline (`border-b-2 border-gold`), not color-fill.
- **Icons:** `lucide-react`, `stroke-navy` or `stroke-gold`, consistent size per context.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
