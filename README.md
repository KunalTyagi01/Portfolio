# Kunal Tyagi Portfolio

Modern full-stack developer portfolio built with Next.js, React, TypeScript, Tailwind CSS, Framer Motion, and Lucide icons. Content is derived from `Resume.md`.

## Run Locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Production Build

```bash
npm run build
npm run start
```

## Deploy

### Vercel

Import the repository in Vercel and keep the defaults:

- Framework: Next.js
- Build command: `npm run build`
- Output: Next.js default

### Netlify

Use the official Next.js runtime on Netlify:

- Build command: `npm run build`
- Publish directory: `.next`

The contact form currently uses a `mailto:` action so it works without a backend. Replace it with Netlify Forms, Formspree, or an API route when you want message storage.
