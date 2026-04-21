# Vitality Retreat Lombok — Proposal

Interactive videography proposal for Brenda Gutierrez / Vitality Retreats. Mobile-first single-page React app.

## Stack

React 19 · Vite · TypeScript · Tailwind CSS v3

## Local

```bash
npm install
npm run dev
```

Open http://localhost:5173.

## Build

```bash
npm run build
```

Outputs to `dist/`.

## Deploy (Vercel)

1. Push this repo to GitHub.
2. Import the repo in Vercel.
3. Framework preset: **Vite**. Build command, output dir, and install command are auto-detected — leave defaults.
4. Deploy. Every push to `main` auto-deploys.

## Structure

- `src/App.tsx` — all sections, state, WhatsApp link, count-up animation
- `src/index.css` — Tailwind base + typography utilities
- `index.html` — Google Fonts (Fraunces, Inter)
- `tailwind.config.js` — palette + font families
