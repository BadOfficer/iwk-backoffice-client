# IWK Backoffice Client

Administrative back-office single-page app for managing orders, filters, and map-based data. Built with React, TypeScript and Vite; intended as an internal tool for handling orders, viewing order locations on a map, uploading documents, and applying complex filters.

## Live DEMO

Experience the live website:
[IWK-BACKOFFICE](https://iwk-backoffice.vercel.app)

Visit the backend repository:
[IWK-BACKOFFICE-BACKEND](https://github.com/restlessorg/iwk-backoffice)

## Key Features

- Orders list with pagination, sorting and server-side filters
- Order creation and details drawer with editable fields
- Map view showing order coordinates and clusters (Leaflet)
- CSV / file upload support for bulk operations
- Reusable UI primitives: sidebars, drawers, pickers, and modals
- Form validation with `react-hook-form` and `yup`
- Client-side caching & data fetching via `@tanstack/react-query`

## Tech Stack

- Framework: React + TypeScript
- Build: Vite
- UI components: MUI (Material UI)
- Maps: Leaflet + `react-leaflet` (+ clustering)
- HTTP client: Axios
- Forms: `react-hook-form`, `yup`
- Styling: SCSS modules
- Linting/Formatting: ESLint + Prettier

Dependencies (selected): React, React DOM, Vite, Axios, Leaflet, react-leaflet, @tanstack/react-query, MUI, sass

See `package.json` for exact versions and full dependency list.

## Project Structure (high level)

- `src/` — application source
  - `api/` — Axios instance and API helpers
  - `common/` — shared components, hooks, layout (Header, Sidebar)
  - `features/` — domain features (orders, filters, uploads)
  - `pages/` — route pages (orders list, map, create)
  - `ui/` — small UI primitives (map, file uploader, drawers)
  - `types/` — TypeScript models and shared types

## Environment

This project uses Vite environment variables. Create a `.env` file in project root and set at minimum:

```
VITE_API_URL=https://your.api.base.url
```

The Axios instance reads `import.meta.env.VITE_API_URL` (see `src/api/axios.ts`).

## Setup & Development

Prerequisites: Node.js (recommended v18+), npm or yarn.

Install dependencies:

```bash
npm install
# or
yarn install
```

Run local development server:

```bash
npm run dev
# or
yarn dev
```

Available npm scripts (from `package.json`):

- `dev` — start Vite dev server
- `build` — run TypeScript build and create production bundle (`tsc -b && vite build`)
- `preview` — preview the production build
- `lint` — run ESLint

## Building for production

```bash
npm run build
npm run preview
```

## Development notes

- API errors are normalized by the Axios interceptor in `src/api/axios.ts`.
- Map clustering customization lives in `src/ui/map` and `src/ui/picker-marker`.
- Filters and pagination are implemented with server-driven APIs; check `src/features/filters/api` and `src/features/orders/api` for request shapes.

## Where to look first

- `src/pages/orders/OrdersPage.tsx` — orders list and main interactions
- `src/features/orders/api/orders.ts` — backend endpoints for orders
- `src/api/axios.ts` — base Axios instance and error handling
