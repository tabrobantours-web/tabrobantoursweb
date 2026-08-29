# Tabroban Tours — Luxury Multi‑Page Website Prototype

## What is included
- `index.html` — premium Sigiriya-led homepage
- `tours.html` — round-tour catalogue + filtering
- `day-tours.html` — Colombo/Kandy day-tour catalogue + filtering
- `destinations.html` — heritage / beaches / hill country / wildlife
- `experiences.html` — activity-led travel inspiration
- `special-interests.html` — specialist tourism and MICE
- `plan-my-trip.html` — progressive 4-step tailor-made inquiry form
- `about.html` — company positioning + fleet
- `contact.html` — contact information + inquiry form
- `partner.html` — B2B partnership page
- `tour-short-break.html` — sample tour-detail page structure

## Design system
Premium Sri Lankan travel direction using:
- deep tea/forest green
- warm ivory
- muted Ceylon-gold accents
- restrained maroon detail
- large editorial typography
- glassmorphism
- cinematic imagery
- GSAP + ScrollTrigger parallax/reveal motion
- mobile menu, filtering, accordion and progressive form interactions
- multi-page View Transition support where the browser supports it

## Preview
Open `index.html` in a modern browser. Internet access is required for Google Fonts, GSAP CDN and the Unsplash prototype imagery.

For local development:
```bash
python3 -m http.server 8080
```
then visit `http://localhost:8080`.

## Production notes
1. Replace the temporary monogram with the approved Tabroban Tours logo.
2. Replace/confirm all imagery with final licensed brand assets.
3. Connect contact, partner and trip-planner forms to the preferred backend/CRM.
4. Add verified TripAdvisor review content and links.
5. Add the verified SLTDA registration number/company facts before launch.
6. Replace the illustrative sample itinerary on `tour-short-break.html` with verified itinerary content.
7. Add analytics, consent management, spam protection and transactional email.
8. Consider converting this static prototype into Next.js / Astro / your preferred CMS once design is approved.

## Revision — 21 Aug 2026
- Replaced the temporary monogram with the supplied Tabroban Tours logo lockup.
- Removed the oversized “SRI LANKA” word from the homepage hero.
- Raised the Tour Finder so it is visible within the first viewport.
- Added dedicated GSAP ScrollTrigger choreography to Handpicked Journeys:
  staggered card reveal, image scrub-parallax, content drift and ambient background motion.

## V3 interaction correction
- Sigiriya hero artwork is clipped inside the hero only; it can no longer bleed over the next section.
- Tour Finder now lives inside the hero and remains visible in the first viewport.
- Handpicked Journeys now uses a pinned GSAP horizontal-scroll sequence.
- Vertical scrolling moves the complete round-tour collection from right to left.
- Each tour image receives a secondary parallax movement while its card crosses the viewport.
- Mobile uses touch-friendly horizontal overflow rather than a forced pinned sequence.

## V4 — requested refinement
- Removed the Featured Landscape / Travel Style / Scroll glass bar from the hero.
- Changed the Tour Finder tab cap to the same Tabroban gold used on CTA buttons.
- Enabled the Handpicked Journeys pinned right-to-left GSAP parallax sequence on mobile too.
- Replaced the old right-side Private Ride animation with five transparent cutout-style PNG vehicles:
  Prius, Wagon R, KDH Van, Coaster Bus and Luxury Bus.
- The fleet now moves one vehicle at a time as the page scrolls.
- Added a TripAdvisor integration-ready review section after “Confidence, before you arrive”.
- No fake review quotes or fake review scores are included; the official widget can be inserted before launch.

## V5 — fleet image swap
- Replaced the Your Private Ride vehicle visuals with the user-supplied cutout images.
- Updated the van label from KDH Van to Hiace Van to match the supplied asset.

## V6 — Download package fix
V5 was missing critical frontend files in the delivered ZIP:
`assets/styles.css`, `assets/app.js`, `assets/tabroban-logo.png`, and `assets/favicon.svg`.

V6 restores and validates all of these files. It also checks all local HTML references
and JavaScript syntax before packaging.

## Real vehicle image swap
This package keeps the previous website version and only replaces the
"Your Private Ride" section vehicle graphics with the user-supplied real vehicle images:
Prius, Wagon R, Hiace Van, Coaster Bus, and Luxury Bus.

## Logo update
- Header / top menu logo changed to the user-supplied dark teal Tabroban Tours logo.
- Footer / bottom area logo changed to the user-supplied gold Tabroban Tours logo.
- The supplied logos were converted to transparent PNGs for clean placement in the website UI.

## Menu / logo update
- Top-menu logo made slightly smaller.
- Added a white highlight box behind the top logo.
- Applied the teal logo to every page header.
- Applied the gold logo to every page footer.
- Added Home as the first desktop and mobile menu item, linking to index.html.

## Mobile responsive fix
- Rebuilt the mobile header/menu spacing.
- Kept the Tour Finder visible and usable on mobile with two compact fields.
- Stabilized the Handpicked Journeys pinned GSAP right-to-left animation on mobile.
- Stabilized the Your Private Ride pinned vehicle sequence on mobile.
- Fixed mobile overflow, section widths, forms, cards, footer, and inner-page hero sizing.
- Desktop styling and interactions remain unchanged.
