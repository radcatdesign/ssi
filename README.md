# Silent Spring Institute homepage redesign

A redesign of [silentspring.org](https://silentspring.org/) using the Institute's own copy, links and photography, with GSAP motion throughout.

## Run it

```bash
npm install
npm run dev      # local dev server
npm run build    # type-check and build to dist/
```

Stack: Vite, React, TypeScript, Tailwind CSS v4, GSAP 3 (ScrollTrigger, SplitText).

## Design

- **Palette.** Robin's-egg blue and the Institute's own orange (`#DA532C`), on a cool eggshell white with deep spruce for ink. The robin is the bird Rachel Carson's *Silent Spring* is remembered for.
- **The egg.** The hero photo sits in an egg shape with a robin's-egg shell leaning behind it. Everything else on the page uses plain rectangular frames.
- **Type.** Bricolage Grotesque for headlines and interface text, Newsreader for reading copy. Both are self-hosted through Fontsource.
- **Motion.** One vocabulary across the page: text rises line by line out of a mask, image frames open with a top-down wipe. All of it switches off under `prefers-reduced-motion`.

## Where things live

| Path | What |
| --- | --- |
| `src/content.ts` | Every piece of copy, every link and image URL |
| `src/styles.css` | Tokens and all section styles |
| `src/lib/motion.ts` | GSAP setup and the shared `reveal()` helper |
| `src/components/` | One file per page section |
| `src/components/gems/` | Motion components adapted from BYQ Supply |

## BYQ Supply references

Three gems from the BYQ Supply library were rebuilt here with their motion values intact and their styling replaced. No site was created in BYQ.

| Section | Gem |
| --- | --- |
| Core values statement | [Scroll Text Reveal](https://app.byq.supply/gems/scroll-text-reveal-01) |
| Our Science questions | [Sticky Media Swap](https://app.byq.supply/gems/sticky-media-swap-01) |
| Our Impact numbers | [Odometer Counter](https://app.byq.supply/gems/odometer-counter-01) |

## Before this goes live

- Images and the logo load straight from silentspring.org. Move them into this repo or a CDN, at larger sizes, before launch. Several source files are small (354 x 199 news thumbnails).
- The Donate button points at the Support Our Work page. Swap in the donation form URL in `src/content.ts`.
- The one-line descriptions under the five research questions and the seven impact milestones are condensed from the Our Science and Our Impact pages. Check them against approved copy.
- `index.html` carries `noindex` so this build does not compete with the live site in search. Remove it at launch.
