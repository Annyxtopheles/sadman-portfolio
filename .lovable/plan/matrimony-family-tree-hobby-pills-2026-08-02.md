# Matrimony family tree + hobby pills

## 1. Family cards become capsules, uniform and alive

- Every card (grandparents, parents, self, siblings, extended family) renders at one fixed compact size — same width and same height, no matter how much text a person has. Overflowing text is clamped.
- Cards get fully rounded "capsule" styling (soft pill/rounded-2xl shell, rounded avatar, rounded border) instead of the current hard rectangles. Empty placeholder slots match the same capsule shape and size.
- Hover: a subtle lift plus border/shadow shift (already partly there) refined so it reads as motion, not a jump — and the card expands slightly downward to reveal location, profession, and a short note, with a "Click for details" cue. The expansion overlays neighbouring rows rather than pushing the layout around, so the tree does not reflow.
- Keyboard focus produces the same expanded state; reduced-motion users get the reveal without the movement.

## 2. Click opens a full lightbox

The detail modal already exists; it will be kept and wired to the richer data below (photo, relation, name, bio, birth place/year, education, occupation detail, note, contact links, achievements with QR), with prev/next and Esc.

## 3. The missing piece: the detail fields do not exist in the database

The page and the admin panel already reference `bio`, `birth_place`, `birth_year`, `education`, `occupation_detail`, and `contact_info` on family members, but the `matrimony_family_nodes` table has none of those columns. That is why the extra details never appear and admin edits to them do not stick.

A migration will add those six columns and the public data function will be updated to return them, so:
- the admin panel's existing detail fields actually save, and
- the lightbox actually shows the detailed information.

## 4. Extended family merged into the tree

Extended relatives are rendered in the same canvas as the genealogy, in a clearly labelled band below the immediate family, using identical capsule cards and the same hover/lightbox behaviour, so nothing sits outside the map.

## 5. Hobby / goal pills

The category label pill (the black one, e.g. "Poetry") currently uses a smaller corner radius than the item pills. It will be changed to the same fully-rounded pill shape, so the black category pill and the white outlined item pills differ only by fill — never by roundness. Same change applies to the Goals rows, which share the component.

## Technical notes

- Migration: `ALTER TABLE public.matrimony_family_nodes` add `bio text`, `birth_place text`, `birth_year int`, `education text`, `occupation_detail text`, `contact_info jsonb`; then `CREATE OR REPLACE FUNCTION public.matrimony_data()` to include those keys in the family node JSON.
- Frontend: `src/pages/Matrimony.tsx` — `FamilyCard`, `EmptySlot`, `FamilyTree`, `CategoryChipRows`; `src/index.css` — `.family-card` / `.family-card-reveal` rules for the capsule shape and overlay-style expansion.
- Admin panel already has the detail inputs; no new admin UI is required beyond confirming the fields persist after the migration.
- No changes to photos, quiz, testimonials, or contact sections.
