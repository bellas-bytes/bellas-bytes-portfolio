# Bella's Bytes — Portfolio

A personal portfolio for Isabella Nguyen — a cinematic, scroll-based site spanning DevOps, infrastructure, and applied AI work.

## Live

[https://bellas-bytes.github.io/bellas-bytes-portfolio/](https://bellas-bytes.github.io/bellas-bytes-portfolio/)

## Stack

- **React 19** + **TypeScript** (Create React App)
- **Tailwind CSS** for styling
- **Framer Motion** for entrance + scroll animations
- **OGL** + a GLSL fragment shader for the persistent `Grainient` backdrop
- **react-icons** for tech-stack glyphs
- Custom `Chatime` display font (`public/fonts/chatime.otf`)

## Sections

1. **Hero** — full-bleed cinematic background loop with title, tagline, and a motion scroll cue.
2. **About** — short bio + meta sidebar (currently / focus / based).
3. **Experience** — vertical timeline; each role opens a liquid-glass dialog with the long version.
4. **Projects** — auto-rotating featured carousel with prev/next arrows + dots, plus an expandable accordion list for additional projects.
5. **Tech Stack** — categorized liquid-glass cards (Languages, Frontend, Cloud & Infra, Observability, Backend & Data, Tools, AI Tools).

## Project structure

```
src/
├── App.tsx                       # Section composition
├── index.tsx, index.css          # CRA entry + Tailwind directives
├── components/
│   ├── Nav.tsx                   # Left sidebar nav (responsive: full → dots → mobile top bar)
│   ├── Hero.tsx                  # Hero section
│   ├── About.tsx
│   ├── Experience.tsx            # Timeline + dialog
│   ├── Projects.tsx              # Featured carousel + expandable list
│   ├── TechStack.tsx             # Grid of category cards
│   ├── Grainient.jsx, .css       # WebGL grainient (React Bits)
│   ├── GrainientBackground.tsx   # Fixed grainient wrapper
│   └── Icon.tsx                  # react-icons v5 → React 19 JSX shim
└── data/
    ├── experiences.ts            # Edit to update Experience entries
    ├── projects.ts               # Edit to update Project entries (featured: true → carousel)
    └── techStack.ts              # Edit to update categories and tech chips
```

## Editing content

- **Experience**: `src/data/experiences.ts` — append objects to the array; most recent first.
- **Projects**: `src/data/projects.ts` — set `featured: true` to surface in the showcase carousel; omit for the expandable list below.
- **Tech Stack**: `src/data/techStack.ts` — categories and chips. Add a `react-icons/si` import for a brand glyph, or omit `Icon` for a text-only chip.
- **Socials & nav labels**: `src/components/Nav.tsx`.

## Local development

```bash
npm install
npm start
```

Dev server runs at `http://localhost:3000`.

## Build & deploy

```bash
npm run build    # production build to ./build
npm run deploy   # build + publish to gh-pages branch
```

`homepage` is set in `package.json` so paths resolve correctly on GitHub Pages.

## License

MIT
