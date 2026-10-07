# BAYHAN STUDIO

Premium experimental website for BAYHAN STUDIO — a digital universe built with Next.js, React Three Fiber, GSAP and Lenis.

## Stack

- Next.js (static export)
- React Three Fiber / Drei / Postprocessing
- GSAP + ScrollTrigger
- Lenis
- TypeScript
- RU / UZ / EN i18n

## Develop

```bash
npm install
npm run dev
```

## Build (GitHub Pages)

```bash
npm run build
```

Output goes to `out/`.

For a project site under `username.github.io/repo`:

```bash
NEXT_PUBLIC_BASE_PATH=/repo npm run build
```

Or set repository variable `NEXT_PUBLIC_BASE_PATH` for the GitHub Actions workflow.
