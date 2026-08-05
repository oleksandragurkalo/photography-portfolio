# Bohdana Kosmyna Photography

Portfolio website for a portrait, love story and family photographer based in Łódź, Poland. Built with React, React Router and Vite, with Ukrainian/Polish language switching.

## Stack

- [React 19](https://react.dev) + [React Router](https://reactrouter.com)
- [Vite](https://vite.dev) for dev/build tooling
- [oxlint](https://oxc.rs/docs/guide/usage/linter.html) for linting
- Plain CSS (no framework), design tokens in `src/styles/tokens.css`

## Getting started

```bash
npm install
npm run dev
```

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the local dev server |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run oxlint |

## Environment variables

Copy `.env.example` to `.env` and fill in the values:

| Variable | Purpose |
| --- | --- |
| `VITE_FORMSPREE_ID` | Form ID from [Formspree](https://formspree.io) (free tier) used to send contact form submissions. Without it, the contact form shows an error instead of sending. |

On Vercel, set the same variable in Project Settings → Environment Variables.

## Project structure

```
src/
  assets/images/   Portfolio and hero photos
  components/      Shared UI (Nav, Footer, Layout, Lightbox, Select, BackToTop, ErrorBoundary)
  data/            Portfolio categories/shoots data model
  i18n/            Language context + UA/PL translation strings
  pages/           Route-level pages (Home, Portfolio, About, Packages, Contact)
  styles/          Global styles and design tokens
```

## Deployment

Deployed on [Vercel](https://vercel.com). `vercel.json` rewrites all routes to `index.html` so client-side routing (react-router-dom) works correctly on hard refresh and direct links.
