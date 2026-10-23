# Pragati web (Tab 2)

Next.js 14 (App Router) + TypeScript + Tailwind + ECharts. Reads the ML artifacts through a thin mock API.

## Run
```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm run lint && npm run typecheck
```
The mock API reads `technical/ml/artifacts/<institute>/*.json`, falling back to `artifacts/samples/`.
If the artifacts are elsewhere (for example in another worktree), set `ARTIFACTS_DIR` in `.env.local`.

## Folder map
- `app/` pages: `capture`, `teacher`, `student/[id]`, `parent/[id]`, `owner`, `data-card`, `how-it-works`; `api/mock/...` route handlers.
- `lib/types.ts` one zod schema per artifact file; `lib/api.ts` the only fetch client; `lib/app-context.tsx` language, institute, `useData`.
- `components/` shell (header, role switcher), `ui.tsx` primitives and origin chips, `echart.tsx` themed chart wrapper.

## Swap to the real API
Change `NEXT_PUBLIC_API_BASE` (default `/api/mock`) and, if the path shape differs, `urlFor` in `lib/api.ts`. Nothing else.

## Data to screen
| Screen | Files |
|---|---|
| Teacher | mastery, risk, student (names) |
| Student | student, percentile |
| Parent | parent, reports, student |
| Owner | owner, risk, mastery, moat |
| Data card | datacard, figures/*.png |
| How it works | scaling, models |
| Capture | datacard, mastery (simulated) |

Student/parent ids `_` resolve to the first student by roll number. Students are never sorted by performance.
