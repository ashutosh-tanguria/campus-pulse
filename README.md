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

- **Backend:** Render/Railway, set `PORT` env var
- **Frontend:** Vercel/Netlify, set `VITE_API_BASE_URL` to deployed backend URL

## Author

Ashutosh Tanguria