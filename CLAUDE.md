# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository layout

This repo contains a single project, `StarterKit/`, an Astro multi-framework starter (Astro + React + Vue + Svelte, with MDX) used as a base for building small interview/demo apps as Astro "islands". All commands below are run from `StarterKit/`.

`plan.md` (repo root, in Russian) documents the design plan for the Pong game implementation living at `StarterKit/src/pong/` — read it before making structural changes to that feature.

## Commands

Run from `StarterKit/`:

- `npm install` — install dependencies
- `npm run dev` — start dev server at `localhost:4321`
- `npm run build` — production build to `./dist/`
- `npm run preview` — preview the production build locally
- `npm run astro ...` — run arbitrary Astro CLI commands (e.g. `npm run astro check` for type-checking)

There is no test runner or linter configured in this project.

## Architecture

### Multi-framework page pattern

Each UI framework gets its own route under `src/pages/<framework>/index.astro`, which wraps a framework-specific `Welcome` component (`src/frameworks/<framework>/Welcome.*`) in the shared `src/layouts/Layout.astro`. Non-Astro framework components are mounted with `client:only="<framework>"` since they aren't server-rendered.

`src/frameworks/astro/FrameworkSelector.astro` renders the dropdown (shown on every page via `Layout.astro`) that navigates between `/readme`, `/astro`, `/react`, `/vue`, `/svelte` by doing a full page redirect (`window.location.href`) — it is not a client-side router. The site root `/` redirects to `/readme` (configured in `astro.config.mjs`).

When adding a new framework example or demo page, follow this same page → layout → framework component structure rather than inlining markup directly into the route.

### Pong game (`src/pong/`)

A self-contained two-player Pong implementation mounted as a React island at `/pong` (`src/pages/pong/index.astro` → `PongApp` via `client:only="react"`). Internal structure, per `plan.md`:

- `index.tsx` — root component; owns top-level screen state (`start | play | end`) via `useState`, plus players/duration/final score. Screen transitions happen only through explicit handlers (`handleStart`, `handleGameEnd`, `handleRestart`).
- `components/` — `StartScreen`, `GameScreen`, `GameCanvas`, `ScoreBoard`, `PlayerLabels`, `WinnerModal`.
- `hooks/` — `useGameEngine` (match state as refs + simulation step), `useAnimationFrame` (rAF + delta time), `useKeyboard` (pressed-key set for WASD/arrow controls), `useCountdown` (match timer + pre-serve pause).
- `engine/` — pure logic: `physics.ts` (ball movement, wall bounce), `collision.ts` (paddle collision, goal detection), `input.ts` (keys → paddle movement), `factory.ts` (`createBall`/`createPaddle`/`createInitialGame`).
- `utils/`, `theme/`, `types/`, `styles/` — geometry/formatting helpers, color palette, shared types (`Game`, `Board`, `Paddle`, `Ball`, `Player`), and CSS.

Key design rule: **game-loop state (ball/paddle positions) lives in `useRef`, not `useState`** — the canvas is redrawn imperatively at ~60fps via `requestAnimationFrame`, and React state/re-renders are reserved for infrequent events (goals, timer ticks, match end, screen changes). Don't move per-frame physics into React state.

Bounce angle off paddles depends on where the ball hits the paddle (classic arcade Pong), not a fixed reflection. A match ends when the timer reaches zero (no early win by point threshold); tied scores at timeout result in a draw.

## Notes

- `dist/`, `.astro/`, and `node_modules/` are build/generated artifacts — do not hand-edit.
- The `__MACOSX/` directory at the repo root is a macOS zip-extraction artifact, not part of the project.
- UI copy (README, StartScreen, etc.) is written in Russian; match the existing language when editing user-facing text in these areas.
