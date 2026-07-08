# Campus Pulse

Campus events and notices dashboard built with React and Express.

## Tech Stack

**Frontend:** React, Vite, React Router, Framer Motion, Lucide Icons
**Backend:** Node.js, Express, JSON file-based data storage (no database)

## Features

- Notice feed with title, category, and posted date
- Event feed with title, venue, and date
- Detail pages for individual notices and events (`/notices/:id`, `/events/:id`)
- Combined keyword search and category filtering
- Dark mode with localStorage persistence
- Pagination with Framer Motion transitions
- Bookmarks persisted in localStorage
- Responsive layout: desktop, tablet, mobile with bottom navigation
- Loading skeletons and error states

## Project Structure
```
campus-pulse/
├── backend/       # Express API serving JSON data
└── frontend/      # React + Vite app
```

## Setup

### Backend

```bash
cd backend
npm install
npm run dev
```

Runs on `http://localhost:5000`

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Runs on `http://localhost:5173`

`frontend/.env` must contain: VITE_API_BASE_URL=http://localhost:5000/api

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|--------------|
| GET | `/api/notices` | All notices (supports `?search=` & `?category=`) |
| GET | `/api/notices/:id` | Single notice |
| GET | `/api/events` | All events (supports `?search=` & `?category=`) |
| GET | `/api/events/:id` | Single event |

## Deployment

- **Backend:** Deployed on Render → https://campus-pulse-backend-ge6l.onrender.com
- **Frontend:** Deployed on Vercel → https://campus-pulse-sigma-steel.vercel.app

Note: the backend is on Render's free tier, so it may take 20–30 seconds to wake up on the first request after a period of inactivity.

## Overview

Campus Pulse is a full-stack dashboard where students can browse campus notices and events in one place. The frontend is a React SPA that talks to a small Express API serving JSON data (no database, kept intentionally simple). It supports combined search and category filtering, URL-based detail routes, dark mode, bookmarks, and pagination, with a fully responsive layout that switches to a bottom navigation bar on mobile. The UI uses a glassmorphism design system built with custom CSS variables for theming.

## Challenges Faced

- **Build failure on Vercel due to Vite version conflict:** The project initially used Vite 8 (with its new rolldown bundler), which threw an internal `Cannot assign to read only property` error during production builds. Downgraded to Vite 5 and `@vitejs/plugin-react` 4.2.1 to get a stable, reproducible build.
- **Blank white screen after deploy:** After the Vite downgrade, the production bundle threw `Uncaught ReferenceError: React is not defined`, since the JSX runtime wasn't being applied correctly by the older plugin version. Fixed by explicitly setting `jsxRuntime: 'automatic'` in `vite.config.js` and doing a clean reinstall of `node_modules`.
- **Combining search and category filtering:** Needed both filters to work together rather than overriding each other, so the backend route accepts both `search` and `category` query params simultaneously and applies them as sequential filters on the same dataset.
- **Deploying frontend and backend separately:** Since the backend is a long-running Express server (not serverless-friendly), it was deployed to Render while the frontend went to Vercel, connected via an environment variable (`VITE_API_BASE_URL`) pointing to the live backend URL.

## Author

Ashutosh Tanguria
## Author

Ashutosh Tanguria