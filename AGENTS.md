<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Premium AI Website Builder

This repository builds custom, production-grade websites for real businesses. Every site is a distinct piece of design work, not a template with new colors. Act as designer, front-end engineer, and QA in one pass.

For every new site: Taste Skill sets the direction, Hallmark hardens it, the build uses CSS, Motion (with the Motion AI Kit), GSAP, and Aceternity with one owner per effect, and Impeccable reviews and polishes the result.

## Non-negotiables

- **Never invent business facts.** No fabricated testimonials, metrics, client logos, awards, addresses, phone numbers, emails, prices, opening hours, team members, or case studies. If a fact was not supplied, omit it or mark a clearly labeled placeholder.
- **Never ship a generic AI template.** No purple-to-blue SaaS gradient, no three equal feature cards as the whole page, no glassmorphism-on-mesh by default, no emoji icons, no lorem ipsum, no fake product screenshots.
- **Never copy a reference brand's identity.** Design references inform structure and discipline, not logos, copy, typefaces, or trade dress.
- **Every site ships responsive, accessible, animated with restraint, and error-free.** "Looks good in the preview" is not done.
- **Do not touch `app/page.tsx` until a website brief is approved.** The starter homepage stays as-is for now.
- Do not add a dependency for something the existing stack already covers.
- When a request is ambiguous about design direction, make a confident choice and state it in one line. When it is ambiguous about **facts**, ask or omit — never guess.
- **One effect, one owner.** CSS, Motion for React, GSAP, and native view transitions are separate tools. Never animate the same property or element with two of them.
- **Motion is earned.** If an animation does not orient, confirm an action, or reveal hierarchy, delete it. Static sections are a valid design decision.
- **Verify before you reference.** Do not cite a skill, package, MCP server, or CLI helper as available until it is present in this repo or the agent's skill catalog.

## Toolchain and verified availability

Last verified in this repo: 2026-11-04. Re-check at the start of every build; this table is a snapshot, not a permanent guarantee.

| Tool | Verified status | How to use it |
| --- | --- | --- |
| Taste Skill | Available to the agent as `design-taste-frontend` (tasteskill v2) through the `skill` tool. It is not a file under `.agents/skills/` in this repo. | Load it first to set the visual direction. If the skill catalog does not list it, say so and proceed with Hallmark. |
| Hallmark | Installed at `.agents/skills/hallmark/SKILL.md` (also present globally). | Load with the `skill` tool, then read the Floor and only the references the direction needs. |
| Impeccable | Installed at `.agents/skills/impeccable/SKILL.md`. | Use at the end for critique, audit, and polish. Read `reference/craft-floor.md` before UI edits and `reference/animate.md` for motion work. |
| Motion AI Kit | **Installed** with `motion-ai@14.2.0`. The `motion` skill is at `.opencode/skills/motion/SKILL.md`; the `motion` and `motion-plus` MCP servers are registered in `opencode.jsonc`. | Load the `motion` skill for current best practices and docs search. Use the MCP for docs/examples, CSS springs, and Performance Doctor. Motion+ features require signing in to the `motion-plus` server. |
| Motion for React | Installed: `motion@14.9.0`. Import from `motion/react`. | Default JavaScript animation engine for component motion, presence, stagger, gestures, and simple scroll-linked effects. |
| GSAP + ScrollTrigger | **Not installed.** Neither `gsap` nor `@gsap/react` is in `package.json` or `node_modules`. | Do not import it until the user approves the dependency. Install `gsap` (ScrollTrigger ships inside it), plus `@gsap/react` for `useGSAP`, only when a brief genuinely needs a complex timeline. |
| Aceternity UI | Registry configured as `@aceternity` in `components.json`. | Install individual components through the shadcn CLI, then restyle them to the site's tokens. |
| shadcn/ui | Installed: `base-nova` style on `@base-ui/react` (not Radix). | Add primitives with the CLI instead of hand-writing them. |
| Next.js | Installed: `next@16.4.4`, App Router, Turbopack. | Read the bundled guides before writing code. |
| Tailwind CSS | Installed: v4, CSS-first. | Tokens live in `app/globals.css`; there is no `tailwind.config.*`. |

Verification commands:

```bash
# Installed skills
ls .agents/skills
ls .opencode/skills

# Direct dependencies only; missing tools are expected to appear as empty
npm ls motion gsap @gsap/react --depth=0

# Confirm that framer-motion is transitive, not a direct dependency
npm explain framer-motion
```

- The `skill` tool's own catalog is authoritative for Taste Skill.
- `npx motion-ai` is already installed; re-running it changes agent config, so ask first. `npm install gsap` and `npm install @gsap/react` are dependency changes too — never run them silently.
- If a tool is absent, use the closest installed equivalent and state the substitution; do not pretend the absent tool was used.

## Stack

| Layer | Choice | Notes |
| --- | --- | --- |
| Framework | Next.js 16 (App Router) | Turbopack, `cacheComponents`, `partialPrefetching` enabled |
| UI | React 19.3 + TypeScript (strict) | Server Components by default |
| Styling | Tailwind CSS v4 | CSS-first config, no `tailwind.config.*` |
| Components | shadcn/ui (`base-nova` style) | Built on `@base-ui/react`, not Radix |
| Signature components | Aceternity UI | Registry already configured in `components.json` |
| Component motion | Motion for React (`motion`) | Import from `motion/react`; `framer-motion` is an internal dependency only |
| Timeline motion | GSAP + ScrollTrigger | Not installed; add only with approval for complex sequences |
| Page transitions | React `<ViewTransition>` | React 19.3; works in the App Router with no configuration |
| Micro-motion | CSS keyframes + `tw-animate-css` | Default for hover, focus, and simple entrances |
| Icons | `lucide-react` | One icon family per site |
| Utils | `cn` via `@/lib/utils` | Re-exported from the `cn` package |

Project layout: `app/` at the root (no `src/`), path alias `@/*` → `./*`.

### Before writing code

1. Read the relevant Next.js 16 guide from `node_modules/next/dist/docs/` — at minimum:
   - `01-app/01-getting-started/03-layouts-and-pages.md`
   - `01-app/01-getting-started/04-linking-and-navigating.md`
   - `01-app/01-getting-started/05-server-and-client-components.md`
   - `01-app/01-getting-started/12-images.md`
   - `01-app/01-getting-started/13-fonts.md`
   - `01-app/01-getting-started/14-metadata-and-og-images.md`
   - `01-app/02-guides/forms.md` and `01-app/02-guides/server-actions.md` when forms are involved
   - `01-app/02-guides/view-transitions.md` and `01-app/03-api-reference/03-file-conventions/template.md` when page transitions are involved
2. Inspect `package.json`, `components.json`, `app/globals.css`, and existing components before adding anything.
3. Check for `DESIGN.md` / `PRODUCT.md` at the root. If either exists, it is authoritative and overrides the defaults below.
4. Verify the tools you plan to use with the commands above. Do not reference GSAP or any other absent tool as installed.
5. For motion work, load the `motion` skill and read Impeccable's `reference/craft-floor.md` and `reference/animate.md`, plus Hallmark's Floor, before writing animation code.

### Known starter quirks

- shadcn `base-nova` components import primitives from `@base-ui/react`. Add new primitives with the CLI instead of hand-writing Radix imports.
- `lib/utils.ts` re-exports `cn` from the `cn` package. Import it as `import { cn } from "@/lib/utils"` in application code.
- Tailwind v4 has no JS config. Tokens live in `:root` / `.dark` and are exposed to utilities through the `@theme inline` block in `app/globals.css`.
- Fonts are loaded with `next/font` in `app/layout.tsx`, exposed as CSS variables on `<html>`, and mapped in `@theme inline`. The current site uses `--font-bodoni` / `--font-jost`; map `--font-sans` and `--font-heading` directly to those variables. Never write `--font-sans: var(--font-sans)`, which is circular.
- Aceternity components may require `@tabler/icons-react` or `clsx`; both exist. Prefer Lucide in new code and never mix icon families in one interface.
- `motion@14.9.0` re-exports `framer-motion`, which exists only as its transitive dependency. Always import from `motion/react`; never import `framer-motion` directly or add it as a direct dependency.
- GSAP is absent. `import "gsap"` will fail until the dependency is approved and installed.
- Motion AI Kit is installed project-scope. The `motion` skill lives in `.opencode/skills/motion/`, and `opencode.jsonc` registers the hosted `motion` and `motion-plus` MCP servers. The free `motion` server works without an account; `motion-plus` needs a Motion+ sign-in for gated examples and audits.
- React 19.3 provides `<ViewTransition>` from `react`, and the App Router activates it on navigation without configuration. Prefer it for route transitions before adding a JS transition library.
- The current site animates with CSS keyframes and utilities in `app/globals.css` (`rise`, `rule-in`, `portrait-in`, `menu-in`) plus a global reduced-motion block. Do not retrofit Motion or GSAP into that site without an explicit brief.

## Design direction: Taste → Hallmark → Impeccable

The three skills are sequential, not interchangeable. Load them with the `skill` tool; do not rely on memory of their contents.

### 1. Taste Skill — set the direction

Load `design-taste-frontend` after the intake and before choosing layout or color.

- Use it to commit to a genre, composition, typographic voice, palette posture, and one distinctive decision that a neighboring business would not get.
- It works from the real brief and real material. It never supplies or invents business facts.
- Record the output in a short block: genre, page shape, theme, type pairing, palette intent, and the one non-default decision.
- If the skill is unavailable in the current session, say so once and fall back to Hallmark for direction.

### 2. Hallmark — harden the direction

Use Hallmark after Taste has set the intent, and at the start of every new page build.

- Read the Floor in `SKILL.md`; it binds every output. Then load only the references the chosen direction needs (genre, macrostructure, theme, layout, imagery, craft, gates).
- Use its scripts when available: `node .agents/skills/hallmark/scripts/theme.mjs draw ...` for a direction, and `node .agents/skills/hallmark/scripts/sloplint.mjs <output> --render` before handing back. Fix every `FAIL`; fix or waive every `REFLEX` on the record.
- Let Hallmark pressure-test and deepen the Taste direction: structure, theme, imagery, craft, and the anti-slop gates. If a Hallmark draw proposes a different direction, keep Taste's design intent and fix the weak part rather than silently swapping the concept.
- Honor the Floor rules directly: token-only colors and fonts, no `transition: all`, no animating layout properties, no invented proof, no eyebrow labels in tracked caps, no middle-dot meta strings, `overflow-x: clip`, visible focus states, reduced-motion fallbacks, and the hero readable at 1280×800 without scrolling.

### 3. Impeccable — review and polish

Use Impeccable on the finished design, not as a substitute for direction.

- Start a session with `node .agents/skills/impeccable/scripts/impeccable context` (or `.agents/skills/impeccable/scripts/impeccable.cmd` on a shell without `sh`).
- Read `reference/craft-floor.md` immediately before any UI edit. For motion-specific work, read `reference/animate.md`; for the final pass, use `polish`, `audit`, or `critique` as appropriate.
- Respect its mode model: marketing pages are **Persuade**, dashboards/tools are **Operate**, docs are **Read**, portfolios are **Experience**.
- Fix what the review finds. Do not report a design as polished while known craft or accessibility failures remain.

If the skills conflict on a detail, the order is: the project's locked `DESIGN.md`, then Hallmark's Floor, then the specific brief, then Taste's direction. Motion decisions never override accessibility or performance.

### DESIGN.md and Awesome DESIGN.md

- If `DESIGN.md` exists at the root, read it first. It is the locked system: reuse its tokens, type, spacing, radii, and motion character across pages. Amend it with a `## Variants` section instead of overriding it locally, and never overwrite it blindly.
- If no `DESIGN.md` exists, create one when the design direction is approved, using the format in `.agents/skills/hallmark/references/design-md.md` (system, tokens, controls, motion, exports).
- [VoltAgent/awesome-design-md](https://github.com/VoltAgent/awesome-design-md) is the optional reference library (`design-md/<brand>/DESIGN.md`). Use it when:
  - the user names a reference brand or site, or
  - the brief calls for a visual language the team wants to study.
- Borrow **structure and discipline** — type scale ratios, spacing rhythm, surface treatment, component states — never the brand's identity, copy, or assets. Do not commit third-party `DESIGN.md` files into this repo unless the user asks; extract the principles into our own `DESIGN.md` and say which reference informed it.
- When offline or the reference is unavailable, proceed with the skills and state that the reference was not used.

## Intake: understand the business first

Before designing, establish the following. Ask once, in a single message, and only for what is missing.

1. **Business name** and exact spelling/casing.
2. **Niche** — what they actually sell, to whom, and what makes them credible.
3. **Location** — city/region, service area, and whether it is a physical location. Only use location facts that were supplied.
4. **Brand colors** — hex/OKLCH values, or an existing logo/site to sample.
5. **Audience and the one action** the site should drive (call, book, buy, enquire, visit, apply).
6. **Real material** — services, prices, hours, contact details, photos, testimonials, credentials, menus, listings.
7. **Tone** — pick an extreme: editorial, luxury, brutalist, soft, utilitarian, playful, technical, atmospheric. "Clean and modern" is not a direction.
8. **Pages needed** — one-pager or multi-page, and any existing content to preserve.

If the user says "go ahead" or cannot answer, infer the **design direction** and say what you picked. Never infer facts: missing proof is absent, not invented.

## Build workflow — every website

### 1. Understand the brief

Complete the intake above. Write a one-line material inventory: what is real, what imagery exists, and what proof is absent. The design must follow the material, not the other way around.

### 2. Set the direction

Run Taste Skill first, then Hallmark. Record the picks in one short block before building: genre, page shape/macrostructure, theme or token set, type pairing, palette intent, and the one non-default decision.

- Run the mirror test: would a neighboring business in the same niche get this exact layout and palette? If yes, change one meaningful decision.
- Design typography-first: a deliberate display/body pairing, a real type scale, and a measure that stays readable.
- Build a palette from the supplied brand colors. Use one accent with intent; derive neutrals rather than defaulting to pure gray on white.
- Vary composition between sections: asymmetry, full-bleed media, editorial grids, diagonal rhythm, sticky detail — not a stack of identical cards.
- Keep one idea per screen and roughly 80 words of body copy per viewport.

### 3. Plan motion before building

Write a short motion statement for the page before writing animation code:

- The one signature moment (for example, a logo intro, a cinematic hero reveal, or a pinned product sequence).
- The one scroll-linked moment, if any.
- The micro-interactions that support actions and hierarchy.
- The owner of each effect: CSS, Motion, GSAP, or ViewTransition.
- The reduced-motion and no-JavaScript fallback for each.

If the page has no signature moment, say so and keep it static. Do not add a reveal to every section to make the page feel animated.

### 4. Build responsive pages and sections

- Compose from `components/sections/` with one section per file (`hero.tsx`, `services.tsx`, `about.tsx`, `contact.tsx`, etc.), assembled in `app/page.tsx` or the relevant route. Match the existing location (`components/site/`) when extending the current site.
- Mobile-first. Verify at 360, 390, 768, 1024, 1280, and 1440 px. No horizontal scroll at any width.
- Cap and center the container: gutters grow on large screens; the measure and grids do not.
- Use `next/image` with width/height or `fill` + `sizes`, meaningful `alt`, and locally owned assets in `public/`.
- Keep content in a typed `lib/site.ts` (or route-level data module) so copy is editable without touching layout code.
- Server-render all content. Animation is an enhancement wrapped around content, not the source of it.

### 5. Add animation and interaction

Use the decision matrix below. Pick one owner per effect and apply the rules in **Motion and interaction system**.

- Motion for React is the default for component entrance, stagger, presence, gestures, and simple scroll-linked effects. Load the `motion` skill and query the Motion MCP for current patterns before writing a non-trivial effect.
- GSAP is reserved for complex multi-step timelines, cinematic logo introductions, pinned scroll sequences, and scrub-driven scenes — and only after the dependency is approved.
- Aceternity UI is a source of signature components, not a fifth animation engine. Install it through the registry and restyle it.
- Use React `<ViewTransition>` for route transitions. Do not build a parallel route-transition system in Motion or GSAP.
- Every animated client island gets a reduced-motion path. Content must be visible with scripting off.

### 6. Ensure functional navigation and forms

- Navigation: real routes via `next/link`, current-page indication, a keyboard-operable mobile menu (focus trap, Escape, restored focus), and anchors with `scroll-margin-top` for sticky headers.
- Forms: implement a real submission path (Server Action or route handler) with server-side validation and clear success/error states. Use `aria-live` for status. Add a honeypot or rate limit where spam is plausible.
- Never show a success message when nothing was sent. If an email/CRM provider or env var is missing, wire the integration point, fail honestly, and tell the user what to configure.
- Every link and button must go somewhere real. No dead `href="#"` placeholders in a delivered page.
- Animations must never block focus, hide the skip link, or delay the primary action.

### 7. Review and polish

Run Impeccable's `critique`, `audit`, or `polish` on the finished page. Use Hallmark's sloplint and gates as a second opinion. Re-check the motion statement: remove any animation that does not earn its place, and confirm each effect still has one owner.

### 8. Test the code and fix errors

Run, in order, and fix everything before reporting:

```bash
npm run lint
npx tsc --noEmit
npm run build
```

Then run `npm run dev` and check in the browser at every breakpoint:

- console errors and hydration warnings
- failed network requests and 404s
- layout overflow, clipped text, and broken images
- tab order, focus visibility, menu behavior, and form validation
- hero headline, supporting sentence, and primary action visible at 1280×800 without scrolling
- animation-specific checks listed under **Verification and QA**

If Hallmark's linter is available, also run:

```bash
node .agents/skills/hallmark/scripts/sloplint.mjs <output> --render
```

Do not report a site as complete with known failures. If something cannot be verified, say exactly what and why.

## Motion and interaction system

### Principles

- Motion has a job: orient the user, confirm an action, or reveal hierarchy. Decoration alone is not enough.
- Budget: one signature moment per page, at most one scroll-linked scene, and micro-interactions elsewhere. Not every section gets a reveal.
- Animate `transform`, `opacity`, and (sparingly) `clip-path`. Never animate `width`, `height`, `top`, `left`, `margin`, or `font-size`.
- Never use `transition: all`. Transition named properties only.
- No scroll hijacking, no forced smooth-scroll dependency, and no full-screen loading curtain.
- Do not delay first paint, LCP, or the primary action for an intro. The hero must be readable at 1280×800 without scrolling.
- Every effect has three states: normal, `prefers-reduced-motion: reduce`, and no JavaScript. Content is visible and usable in all three.

### Choose one owner per effect

| Need | Owner | Do not also use |
| --- | --- | --- |
| Hover, focus, underline, simple button feedback | CSS with tokens | Motion, GSAP |
| Simple one-time entrance that needs no JS | CSS keyframes / `tw-animate-css` | Motion, GSAP |
| Component mount/unmount, modals, menus, stagger, gestures | Motion for React | GSAP |
| A single scroll-linked element or progress value | Motion (`useScroll`, `useTransform`) | ScrollTrigger |
| Complex timeline, cinematic logo intro, pinned scene, scrub across many elements | GSAP + ScrollTrigger | Motion on the same elements |
| Route or shared-element page transition | React `<ViewTransition>` (+ CSS) | Motion, GSAP |
| Signature visual component | Aceternity UI, restyled | A second animation layer on top |

If two tools are already animating the same property, remove one. Do not "coordinate" two animation engines on one element.

### Motion for React

- Add `"use client"` at the leaf that animates, not the page. Keep the animated boundary as small as possible and pass server-rendered content into it.
- Import from `motion/react`:
  `import { motion, AnimatePresence, MotionConfig, useReducedMotion, useScroll, useTransform } from "motion/react"`
- Wrap animated islands in `<MotionConfig reducedMotion="user">` so reduced-motion preferences are honored by Motion itself.
- Use `whileInView` with `viewport={{ once: true, amount: 0.25 }}` for section reveals. Do not replay reveals on every scroll direction.
- Use `useReducedMotion()` to change values, not only to disable CSS. Scroll-linked and parallax effects must collapse to static.
- Use `AnimatePresence` for exit animations inside a route (dialog, menu, toast). Do not wrap App Router route children in it; the router unmounts them.
- Prefer named variants and a shared transition token set over ad-hoc durations in each component.
- Do not create a `useScroll` listener per section. One scroll-linked scene per page is the budget.

### GSAP and ScrollTrigger

GSAP is not installed. Use it only after the user approves the dependency and you have run `npm install gsap @gsap/react`. ScrollTrigger is included in the `gsap` package and imported from `gsap/ScrollTrigger`.

Use GSAP when the effect is genuinely a timeline: a multi-stage logo introduction, a pinned scene, a scrub through a sequence, or synchronized SVG work. Do not use it for hovers, simple fades, or a reveal that Motion already handles.

- Client-only. Register plugins once in the client module that uses them.
- Use `useGSAP()` from `@gsap/react` with `{ scope: root }` so selectors are scoped and cleanup is automatic.
- Use `gsap.matchMedia()` to scope desktop-only effects and to skip work under `prefers-reduced-motion: reduce`. Revert it on cleanup.
- Create ScrollTriggers once. Prefer `once: true` for entrances. Kill them on unmount and call `ScrollTrigger.refresh()` after fonts and images settle.
- Disable pinning and long scrubs below the desktop breakpoint unless the mobile version is specifically designed and tested.
- Never run GSAP and Motion on the same element or property. If an Aceternity component already animates internally, do not layer a GSAP timeline on it.

Minimal setup, once the dependency is approved:

```tsx
"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function Sequence() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.timeline({
          scrollTrigger: {
            trigger: root.current,
            start: "top 75%",
            once: true,
          },
        }).from(q("[data-line]"), {
          yPercent: 110,
          opacity: 0,
          stagger: 0.08,
        });
      });

      return () => mm.revert();
    },
    { scope: root },
  );

  return <div ref={root} />;
}
```

### Aceternity UI

- Inspect before installing: `npx shadcn@latest view @aceternity/<component>`. Then add with `npx shadcn@latest add @aceternity/<component>`.
- Restyle every installed component to the site's tokens. Remove demo colors, demo copy, demo fonts, and remote demo assets.
- Aceternity components may import `framer-motion`. Rewrite those imports to `motion/react`; do not add `framer-motion` as a direct dependency.
- Check what the registry item adds to `package.json`. Reject duplicate animation libraries or unused icon packs.
- If the component is a heavy canvas, particle, or 3D effect, justify it against the brief and provide a static fallback for reduced motion and low-power devices.
- Do not stack a second animation system on a component that already animates.

### Page transitions

- Use React's `<ViewTransition>` from `react` as the first choice. The App Router activates route transitions automatically; unsupported browsers simply do not animate.
- Use `app/template.tsx` for a short enter-only transition when a native view transition is not appropriate. Do not try to animate route exits with `AnimatePresence`.
- Keep transitions short and use transform/opacity. No full-screen curtains, loaders, or wipe overlays between pages.
- Preserve scroll restoration, focus placement, and the skip link. A transition must not move focus or trap it.
- Under `prefers-reduced-motion: reduce`, the transition is instant.

### Premium patterns and guardrails

| Pattern | Preferred owner | Guardrails |
| --- | --- | --- |
| Branded logo intro | GSAP timeline for multi-stage; Motion or CSS for a simple mark | Static logo is in the DOM first; runs once per session; skippable; roughly 1.2s or less; never a blocking preloader; no overlay that traps pointer or focus; instant under reduced motion |
| Cinematic hero reveal | Motion or CSS | Reveal with transform or `clip-path`, not by starting the LCP image or headline at `opacity: 0`; CTA is interactive immediately; headline, supporting sentence, and action fit at 1280×800 |
| Smooth image reveal | CSS or Motion | Animate a wrapper with `overflow: hidden` and an inner scale/translate; never animate image dimensions; correct `sizes`; no CLS; no parallax on touch |
| Scroll-triggered section animation | Motion `whileInView` | Once only; 8–24px translate plus opacity; not every section; no pinning without GSAP; never hide content that has no JS fallback |
| Staggered typography | Motion or CSS | Headlines only, split by line or word, never body copy or individual characters; keep the accessible name intact; leave room for descenders so `overflow: hidden` does not clip them |
| Elegant hover interaction | CSS | Only under `@media (hover: hover) and (pointer: fine)`; mirror the state with `:focus-visible`; 44×44px targets; transform/opacity only; hover is never the only affordance |
| Polished page transition | React `<ViewTransition>` or `template.tsx` | Short; no loader; focus and scroll preserved; reduced motion instant |

### Motion tokens

- Declare motion roles in `DESIGN.md` and expose them through `@theme inline` in `app/globals.css`; components must not hard-code durations or easing curves.
- Suggested roles, named to match the project's token convention:
  - fast, 160–200ms: hover, focus, small state changes
  - base, 300–400ms: component entrance, menus, dialogs
  - slow, 700–900ms: section and image reveals
  - cinematic, 1000–1200ms: hero and logo introductions
- Use one or two easing tokens per site. The current site's `## Motion` section in `DESIGN.md` is authoritative for that site; do not replace its tokens while extending it.
- If `DESIGN.md` has no motion section, add one before building the animation layer.

## Performance, mobile, and accessibility

### Performance

- Keep pages as Server Components. Isolate animation in small client leaves; never convert a whole page to a client component for motion.
- Import GSAP only in the client component that needs it. Do not register plugins globally or import the whole library at the page level.
- Lazy-load below-the-fold heavy scenes from a client boundary, but keep the content server-rendered so it exists without JavaScript.
- Avoid animating large blurs, box shadows, and filters. They are expensive and usually look worse than a transform.
- Use `will-change` only while an animation is active; do not spray it across sections.
- Pause or kill offscreen loops and scroll work. Clean up listeners, timelines, ScrollTriggers, and observers on unmount and route change.
- No long tasks from animation setup should block interaction on a mid-tier phone. Test with CPU throttling.

### Mobile

- Design the static layout first. Add motion only after the 360px layout is correct.
- Remove or simplify pinned scenes, parallax, cursor followers, and scrub effects below the desktop breakpoint unless there is a designed mobile version.
- Hover is never required to reveal content or complete an action.
- Verify at 360, 390, 768, 1024, 1280, and 1440 px with touch emulation on.

### Accessibility

- WCAG 2.2 AA is the floor: 4.5:1 body contrast, 3:1 large text and UI boundaries, visible `:focus-visible`, full keyboard access, logical heading order, one `h1` per page.
- Honor `prefers-reduced-motion: reduce` in CSS, Motion (`useReducedMotion`, `MotionConfig reducedMotion="user"`), and GSAP (`gsap.matchMedia`). The reduced state is static and complete, not a faster version of the same effect.
- Never flash more than three times per second. Provide pause/stop controls for auto-playing marquees, carousels, or looping video that run longer than five seconds.
- Animations must not move focus, hide the skip link, trap the pointer, or make keyboard navigation depend on motion.
- Split-text effects must keep the readable text in the accessibility tree. Mark decorative duplicate layers `aria-hidden="true"`.
- Scroll-triggered content exists in the DOM and is readable with scripting off. If an entrance starts at `opacity: 0`, provide a `<noscript>` or non-JS state that reveals it.
- Semantic landmarks (`header`, `nav`, `main`, `footer`, `section` with accessible names), labeled inputs, and `alt` text that conveys purpose.
- Touch targets at least 44×44 px; no hover-only affordances; no color-only meaning.
- Test at 200% zoom and with reduced motion enabled. Verify the mobile menu and forms with the keyboard alone.

## Design system rules

- **Tokens only.** Every color, font, radius, shadow, easing, and duration comes from a token declared in `app/globals.css` (`:root` / `.dark`, exposed through `@theme inline`). No literal hex values in components.
- **Type.** Load fonts with `next/font` in `app/layout.tsx`, expose them as CSS variables, and map them in the theme block. Pair a display face with a body face; use the body face for labels and nav.
- **Color.** Build a ramp from the brand color: paper, ink, muted, rule, accent, accent-ink, focus. Check contrast before using a pair.
- **Spacing and radius.** Use a consistent scale. Keep radii intentional — sharp editorial, soft consumer, or pill — not a different radius per component.
- **Surfaces.** Prefer borders, rules, and tone shifts over stacked shadows. No card inside a card.
- **Dark mode.** Only add it when the brief calls for it, and design it deliberately rather than inverting the light palette.
- **Motion.** One character per site, declared in `DESIGN.md`. Reuse the same easing and duration roles everywhere; a new effect does not get a new curve.

## Content integrity

- Copy is specific to the business: its offer, its place, its customers, its voice. No filler such as "unlock your potential" or "solutions that empower".
- Dates, prices, and availability must come from the user. If they will change, make them data, not prose.
- Placeholders are explicit and visibly marked in code (`TODO(content):`), never silently shipped as if real.
- SEO metadata is written per page: unique title, description, canonical, Open Graph image, and `LocalBusiness`/`Organization` JSON-LD only from verified facts.

## Verification and QA

Run the code checks first, then verify motion in a real browser. Do not sign off from a static screenshot.

### Animation QA

- **Reduced motion:** enable `prefers-reduced-motion: reduce`; every entrance, scroll effect, hover transform, and page transition resolves instantly, and all content is visible.
- **No JavaScript:** disable scripting; content is visible, links and forms still work, and nothing is stuck at `opacity: 0`.
- **First paint:** the hero headline, supporting sentence, and primary action are visible at 1280×800 without scrolling; the intro does not block interaction or delay the LCP image.
- **Performance:** throttle the CPU (4× or 6×) and load on a mobile viewport; scrolling and hover remain responsive, with no visible long-task stalls from animation setup.
- **Layout stability:** no CLS from fonts, images, split text, pinned sections, or transforms. Check cumulative layout shift in the Performance panel.
- **Route changes:** navigate with `next/link`; no duplicate ScrollTriggers or listeners, no orphaned animations, focus lands sensibly, scroll restoration is intact, and the skip link still works.
- **Keyboard:** tab through the page; focus is visible before, during, and after animations; no animation traps focus or depends on hover.
- **Touch:** hover-only effects are disabled; tap targets remain 44×44px; no parallax or pinned scene breaks scrolling.
- **Cleanup:** mount and unmount animated components; no console warnings from stale timelines, observers, or `setState` after unmount.
- **One owner:** confirm no element is animated by two libraries or by CSS and JS at the same time.

### Tool checks

- Hallmark: `node .agents/skills/hallmark/scripts/sloplint.mjs <output> --render`; fix every `FAIL`, resolve every `REFLEX`.
- Impeccable: run `critique`, `audit`, or `polish` on the finished page and fix the findings.
- Motion AI Kit: load the `motion` skill for best practices and use the Motion MCP for docs and examples. Run Performance Doctor on the final animation pass; Motion+ audit features require signing in to the `motion-plus` server.
- Re-run `npm ls motion gsap @gsap/react --depth=0` (and `npm explain framer-motion`) if you were unsure which animation engine the project actually has.

## Definition of done

A website is done only when all of these are true:

- [ ] Business facts trace back to the brief; no invented proof.
- [ ] The direction was set with Taste Skill, hardened with Hallmark, and does not read as a template.
- [ ] The finished design was reviewed and polished with Impeccable.
- [ ] All requested pages and sections exist and are responsive at every listed breakpoint.
- [ ] Navigation, CTAs, and forms work end to end.
- [ ] Every effect has one owner; no two animation systems touch the same property.
- [ ] The page has a deliberate motion budget, not a reveal on every section.
- [ ] Logo intros and hero reveals never block content, trap focus, or delay LCP; they are skippable and run once per session.
- [ ] Page transitions use native view transitions or a short `template.tsx` entrance; focus and scroll are preserved.
- [ ] Animations respect reduced motion, and content is visible without JavaScript.
- [ ] No layout shift, no `transition: all`, and no animated layout properties.
- [ ] Keyboard, screen-reader structure, contrast, and focus states pass.
- [ ] `npm run lint`, `npx tsc --noEmit`, and `npm run build` pass.
- [ ] Browser QA found no console errors, broken assets, overflow, or animation jank at 4× CPU throttle.
- [ ] `DESIGN.md` is updated if the design system or motion language was locked or extended.

<!-- BEGIN:nextjs-agent-feedback -->

## Report Next.js feedback

The project owner enabled `experimental.agentFeedback`, authorizing this feedback pass. When enabled, `next dev` writes this block and restores it if removed. Commit `AGENTS.md` with your work to keep the tree clean.

During the current user request, retain anonymized facts as feedback candidates for meaningful or recurring Next.js issues:

- Crashes, hangs, OOMs, or unexpected slowness
- Incorrect behavior, output, errors, or diagnostics
- Missing, unclear, or conflicting documentation
- Unexpected CLI, codemod, Skill, or upgrade behavior and non-obvious workarounds

Continue the current user request without reporting immediately. Routine debugging is not feedback. Verify changes before retaining them as feedback candidates. Never retain code, logs, paths, URLs, secrets, personal information, or project-specific data.

Retain qualifying friction even if it is later fixed or worked around; record the final outcome during the reporting pass.

Before the final response, run one reporting pass. If candidates remain, from this file's directory run `npx --no-install next internal agent-feedback-instructions` once without piping or truncating its output. Follow its output or error guidance. If a network sandbox blocks it, retry with network access; if it still returns no output, continue normally.

<!-- END:nextjs-agent-feedback -->

## graphify

This project has a knowledge graph at graphify-out/ with god nodes, community structure, and cross-file relationships.

When the user types `/graphify`, use the installed graphify skill or instructions before doing anything else.

Rules:
- When graphify-out/graph.json exists, run `graphify query "<question>"` before your first grep, search or source-file read for a codebase question, and put this rule in every subagent prompt that explores code. Read raw files only for lines the graph or an earlier read already located. Use `graphify path "<A>" "<B>"` for relationships and `graphify explain "<concept>"` for focused concepts. These return a scoped subgraph, usually much smaller than GRAPH_REPORT.md or raw grep output.
- Dirty graphify-out/ files are expected after hooks or incremental updates; dirty graph files are not a reason to skip graphify. Only skip graphify if the task is about stale or incorrect graph output, or the user explicitly says not to use it.
- If graphify-out/wiki/index.md exists, use it for broad navigation instead of raw source browsing.
- Read graphify-out/GRAPH_REPORT.md only for broad architecture review or when query/path/explain do not surface enough context.
- After modifying code, run `graphify update .` to keep the graph current (AST-only, no API cost).
- A committed graphify-out/graph.json is rewritten whole on every build, so a large diff to it in a pull request is expected. Do not flag it as churn or suggest skipping the graph rebuild or its hooks.
