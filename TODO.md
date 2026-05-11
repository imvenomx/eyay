# Eey Aay Website — Improvement Roadmap

> Full audit of `eeyaay.it` — bugs, missing features, creative upgrades, and "wow factor" additions.
> Priorities: **P0** = broken/must-fix, **P1** = high impact, **P2** = medium impact, **P3** = nice-to-have polish.

---

## P0 — Critical Fixes (Broken / Non-Functional)

- [ ] **Contact form does nothing** — `onSubmit` just calls `preventDefault()`. No backend, no email, no API route. Submissions are silently lost. Wire up to an API route (e.g. Resend, SendGrid, or a serverless function that emails `hello@eeyaay.com`).
- [ ] **Newsletter signup does nothing** — Footer email input has state but no submit handler. Connect to Mailchimp, ConvertKit, Resend, or a custom endpoint.
- [ ] **Social links are dead** — LinkedIn, Twitter/X, Instagram in header mega-menu and footer are `<span>` elements with no `href`. Replace with actual `<a>` tags pointing to real profiles.
- [ ] **Privacy & Terms pages are `href="#"`** — Footer links to "Privacy" and "Termini & Condizioni" go nowhere. Create actual legal pages or link to hosted documents.
- [ ] **Chat modal depends on missing API key** — `MOONSHOT_API_KEY` env var is required. If not set, the chat returns a 500 error. Either add a fallback UI ("Chat coming soon") or switch to a more reliable provider.
- [ ] **`ignoreBuildErrors: true` in `next.config.mjs`** — TypeScript errors are silently swallowed. Remove this flag and fix any build errors properly.
- [ ] **`unoptimized: true` for images** — Next.js Image optimization is completely disabled. All images serve at full size with no format conversion, lazy sizing, or CDN optimization. Remove this flag.
- [ ] **No form validation on contact page** — No required fields, no email format check, no error messages. Add Zod schema validation (already installed) with inline error states.

---

## P1 — High Impact Features & Improvements

### Add a Blog Section
- [ ] **Create `/blog` route** — List page with grid/masonry layout of articles, filterable by category (AI, Automation, Growth, Case Studies).
- [ ] **Create `/blog/[slug]` dynamic route** — Individual article pages with rich typography, table of contents sidebar, reading time estimate, and share buttons.
- [ ] **Blog data layer** — Start with MDX files in a `/content/blog` directory. Structure: frontmatter (title, date, author, category, excerpt, coverImage) + MDX body. Later migrate to a headless CMS (Sanity, Contentful, or Payload).
- [ ] **Blog navigation** — Add "Blog" link to header mega-menu `pageLinks` array and footer navigation.
- [ ] **Blog SEO** — Dynamic metadata per post, JSON-LD `Article` schema, auto-generated `sitemap.xml` entries, RSS feed at `/blog/feed.xml`.
- [ ] **Blog design** — Match the existing aesthetic: dark/light sections, VCR mono headings, binary hover effects on post cards, staircase transitions between sections.
- [ ] **Related posts** — Show 2-3 related articles at the bottom of each post based on shared categories.
- [ ] **Blog CTA** — Each post should end with a contextual CTA (e.g., "Need help with AI chatbots? Let's talk.") linking to the relevant service page.

### Creative & "Wow Factor" Upgrades
- [ ] **Case studies / portfolio section** — Add a `/case-studies` page showcasing real projects with before/after metrics, client logos, and testimonials. This is the single biggest credibility booster missing.
- [ ] **Interactive service demos** — For key services (AI Chatbot, Voice Agent), embed a live mini-demo or interactive playground. Even a fake chat window that shows a scripted conversation would be more engaging than text descriptions.
- [ ] **Micro-interactions on service pages** — Service detail pages are text-heavy and static. Add animated icons, interactive diagrams, or scroll-triggered illustrations for each service block.
- [ ] **Cursor trail / magnetic buttons** — Enhance the custom cursor with a trailing particle effect and make CTA buttons "magnetically" attract the cursor when nearby (like Apple or Awwwards-level sites).
- [ ] **Text scramble/decode animations on scroll** — Apply the binary hover effect to section headings on first scroll-in (not just hover). Creates a "decrypting intelligence" vibe.

### SEO & Discoverability
- [ ] **Add `sitemap.xml`** — Auto-generate with Next.js `app/sitemap.ts` covering all pages, services, and future blog posts.
- [ ] **Add `robots.txt`** — Create `app/robots.ts` with proper allow/disallow rules.
- [ ] **Structured data (JSON-LD)** — Add `Organization`, `LocalBusiness`, `Service`, and `WebSite` schema markup to relevant pages. Critical for Google rich results.
- [ ] **Canonical URLs** — Ensure every page has a proper canonical URL to avoid duplicate content issues.
- [ ] **English alternate hreflang** — Since there's IT/EN language toggle, add `hreflang` tags so search engines know about both versions.

### Performance
- [ ] **Optimize OG image** — `ogimg.png` is 380KB. Convert to WebP or use the dynamic `/api/og` endpoint instead.
- [ ] **Reduce particle count on mobile** — 5000 particles in the hero sphere can cause frame drops on low-end phones. Detect device capability and reduce to 2000 on mobile and fix the scroll hero in mobile idk why
- [] **Fix the translation if its bugged somewhere do an audit, testing**

---

## P2 — Medium Impact Improvements

### UX & Design Polish
- [ ] **Service pages all use the same 3 images** — `img1.webp`, `img2.webp`, `img3.webp` rotate across all 15 services. Create or source unique imagery per service for credibility.
- [ ] **Scroll-to-top button** — Long pages (especially service detail) have no way to quickly return to top.
- [ ] **Active nav state** — No indication of which page/section is currently active in the navigation. Highlight the current page in mega-menu and add scroll-spy for homepage sections.
- [ ] **Better 404 page** — Currently using default Next.js 404. Create a branded 404 with the binary effect, a witty message, and navigation links back to key pages.
- [ ] **Success state for contact form** — After submission, show a confirmation message/animation instead of just clearing the form.

### Accessibility (a11y)
- [ ] **ARIA attributes on FAQ accordion** — Missing `aria-expanded`, `aria-controls`, and `role="button"` on the expand/collapse triggers in service pages.
- [ ] **Binary hover effect needs `aria-hidden`** — The glitch text momentarily shows random 1/0 characters which screen readers will announce. Add `aria-hidden` on the transitional state.
- [ ] **Language toggle needs `aria-label`** — The IT/EN switch button has no accessible label.
- [ ] **Form labels need `htmlFor` + `id` pairing** — Contact form labels exist but aren't programmatically linked to inputs.
- [ ] **Color contrast audit** — Several `text-black/40` and `text-white/30` elements may fail WCAG AA contrast ratios. Audit and fix.

### Code Quality & Maintenance
- [ ] **Remove unused components** — `hero-section-old.tsx`, `features-3.tsx`, `agenda.tsx`, `services-detail.tsx`, `services-overview.tsx`, `process-section.tsx`, and the entire `/cloned` directory are dead code.
- [ ] **Centralize navigation data** — Header and footer both hardcode `serviceColumns` and `pageLinks` independently with slightly different content. Extract to a shared `/lib/navigation.ts` config.
- [ ] **Remove `ErrorSuppressor` component** — This monkey-patches `Node.prototype.removeChild` to hide React Three Fiber errors. Fix the actual R3F issue instead of suppressing DOM errors.
- [ ] **Add error boundaries** — No React error boundaries exist. A crash in the 3D hero or chat modal takes down the entire page. Wrap risky components in error boundaries with fallback UI.
- [ ] **Environment variable validation** — No `.env.example` file and no runtime validation of required env vars (e.g., `MOONSHOT_API_KEY`). Add a startup check.
- [ ] **Move hardcoded stats to config** — "150+ projects", "50+ models", etc. are buried in component code. Move to a config file or CMS for easy updates.

---

## P3 — Nice-to-Have Polish

### Creative Additions
- [ ] **Animated logo on hover** — The header logo is a static PNG swap. Create an SVG version with a subtle glitch or morph animation on hover.
- [ ] **Animated favicon** — Use the SVG favicon to add a subtle animation or state indicator (e.g., pulsing dot when chat is active).
- [ ] **Localized placeholders** — Contact form placeholders are in English ("John Doe", "Tell us about your project...") but the site is Italian. Localize them.
- [ ] **Cookie consent banner** — Required by GDPR for Italian/EU users. Currently missing entirely.

### Technical Debt
- [ ] **Upgrade Spline viewer loading** — Currently loaded via `<Script>` tag from unpkg CDN. Use the npm `@splinetool/react-spline` package for better tree-shaking and type safety.
- [ ] **Add testing** — Zero test files exist. Add at minimum: Playwright e2e tests for critical flows (homepage load, navigation, contact form), and unit tests for utility functions.
- [ ] **Bundle analysis** — Run `@next/bundle-analyzer` to identify and reduce large dependencies. Three.js + GSAP + Radix UI + 40 unused Radix packages is heavy.
- [ ] **Remove unused Radix packages** — `package.json` has 40+ Radix UI packages but only a handful are actually imported. Audit and remove unused ones to slim the dependency tree.
- [ ] **PWA support** — Add a `manifest.json` and service worker for installability and offline caching of static assets.
---

## Summary by Priority

| Priority | Count | Focus Area |
|----------|-------|------------|
| **P0**   | 8     | Broken functionality — forms, links, build config |
| **P1**   | 21    | Blog, wow-factor, SEO, performance |
| **P2**   | 23    | UX polish, accessibility, code quality |
| **P3**   | 14    | Creative polish, technical debt |
| **Total**| **66**| |

### Recommended Execution Order
1. Fix all P0 items first (1-2 days) — the site is losing leads right now
2. Build the blog system (P1) — content is king for SEO and credibility
3. Add case studies + testimonials (P1) — biggest trust builder
4. SEO fundamentals (P1) — sitemap, robots, JSON-LD
5. Performance fixes (P1) — lazy-load 3D, reduce hero height
6. Creative "wow" upgrades (P1) — interactive demos, better transitions
7. Accessibility pass (P2) — legal requirement in EU
8. Code cleanup (P2-P3) — remove dead code, add tests
