# Sukumar Dopati — "Talking-Video" Portfolio

Next.js 15 (App Router) · React 19 · TypeScript · Tailwind CSS 4 · Lenis. No GSAP, no three.js, no runtime CDNs.

## Run
```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start
```
All text lives in `src/lib/data.ts` and comes from `public/Sukumar_Dopati_Resume.pdf`. Components only read from it.

## Sections
| # | id | Component | Unique piece |
|---|----|-----------|--------------|
| – | hero | `hero/Hero.tsx` | Looping talking video, ghost first name, sound toggle |
| 01 | about | `sections/About.tsx` | Hanging lanyard ID card (pendulum + flip) |
| 02 | skills | `sections/Skills.tsx` | Periodic table of skills + inspector |
| 03 | work | `sections/Work.tsx` | Expanding accordion (2 projects) |
| 04 | certs | `sections/Certifications.tsx` | Ink-flood index |
| 05 | experience | `sections/Experience.tsx` | Scroll-drawn timeline |
| 06 | achievements | `sections/Achievements.tsx` | Pinned horizontal gallery + count-up |
| 07 | contact | `sections/Contact.tsx` | Hopping-letter heading, copy chip, footer |

## Rebuild the hero video
Needs `ffmpeg` and `numpy`.
```bash
python3 scripts/build-hero-assets.py intro.mp4 portrait.jpg
# custom crop (W:H:X:Y on the source frame):
python3 scripts/build-hero-assets.py intro.mp4 portrait.jpg --crop=832:1040:544:30
```
It crops head-to-toe (default tuned for the supplied 1920×1080 clip), whitens the backdrop (`colorlevels` max 0.92 — the supplied clip's backdrop sits at ~0.94–0.98, so the spec's 0.98 would leave a visible grey box), builds a seamless 0.5 s cross-fade loop (video via `xfade`, audio via an equal-power numpy cross-fade), and exports `public/hero/hero.mp4`, `hero.webm`, `public/portrait-bust.webp` and `public/og.jpg`. The loop is 9.5 s.

## Notes
- Sound: the hero tries to autoplay with sound; if the browser blocks it, it plays muted and unlocks on the first pointer/key/touch. It pauses below 35 % visibility.
- Work/Achievements show only what the résumé states. Panel UIs are labelled "Illustrative UI".
- Achievements numbers are the award years (2026/2025/2024) and the NPTEL score (90%).

## Credits & licences
- Brand logos in `public/logos/` are from [devicon](https://devicon.dev) (MIT, see `public/logos/LICENSE-devicon.txt`). Logos remain trademarks of their owners.
- Fonts (self-hosted from Fontsource): Inter Tight, JetBrains Mono, Instrument Serif — SIL Open Font License 1.1.
