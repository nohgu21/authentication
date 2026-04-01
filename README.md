# KeystrokeAuth

A browser-based authentication demo that identifies users by the timing patterns of their keystrokes.

## How it works

Most authentication systems ask *what* you type. KeystrokeAuth asks *how* you type it. Every person has a unique rhythm when typing — the time between keypresses, how long each key is held down, the natural cadence of their fingers. This app captures and compares those patterns to verify identity.

No passwords are stored. No data leaves your browser.

## Core concepts

- **Dwell time** — how long a key is held down
- **Flight time** — the gap between releasing one key and pressing the next
- **Rhythm profile** — a timing fingerprint built from multiple keystrokes

## Tech stack

- [Next.js 15](https://nextjs.org/) — App Router
- TypeScript
- Tailwind CSS

## Project structure
```
app/
  enroll/
    page.tsx          — record your keystroke rhythm (two attempts)
  hooks/
    useKeystroke.ts   — captures dwell and flight timings on every keypress
  lib/
    compareRhythm.ts  — compares two timing arrays and returns a similarity score (0–1)
  components/
    KeystrokeInput.tsx — input field that silently records keystroke timings
```

## Getting started
```bash
pnpm install
pnpm dev
```

Visit `localhost:3000/enroll` to register your rhythm.

## Status

Work in progress. Homepage coming soon.

## License

MIT