# Nexus Live

Nexus Live is a real-time, one-to-one chat app built with React and Express. It supports text and media messages, online status, and a customizable chat interface.

## Features

- Sign in and user management with [Clerk](https://clerk.com/)
- One-to-one conversations with message history
- Real-time message delivery and online user status with Socket.IO
- Send text, images, and videos
- Image and video uploads through ImageKit
- Search users and existing conversations
- Light and dark themes, theme presets, and chat wallpapers
- Optional keyboard sounds
- Responsive chat layout for desktop and mobile

## Tech stack

**Frontend:** React 19, Vite, React Router, Zustand, HeroUI, Tailwind CSS, Socket.IO Client  
**Backend:** Node.js, Express 5, MongoDB with Mongoose, Socket.IO  
**Services:** Clerk for authentication, ImageKit for media uploads

## Run locally

### Requirements

- Node.js 22 or later
- npm
- A MongoDB connection string
- A Clerk application
- An ImageKit private key for image and video uploads

### 1. Install dependencies

Open two terminals from the repository root:

```bash
cd backend
npm install
```

```bash
cd frontend
npm install
```

### 2. Configure environment variables

Create `backend/.env`:

```env
PORT=3000
NODE_ENV=development
MONGO_URI=your_mongodb_connection_string
FRONTEND_URL=http://localhost:5173
CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
CLERK_WEBHOOK_SIGNING_SECRET=your_clerk_webhook_signing_secret
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
```

Create `frontend/.env`:

```env
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
```

Use the same Clerk publishable key in both files. Set up a Clerk webhook pointing to `http://localhost:3000/api/webhooks/clerk` while developing, and configure its signing secret in `CLERK_WEBHOOK_SIGNING_SECRET`. User profiles are synchronized to MongoDB through this webhook.

Keep secret keys in environment files or your hosting provider's secret manager. Do not commit them.

### 3. Start the app

In the backend terminal:

```bash
npm run dev
```

In the frontend terminal:

```bash
npm run dev
```

Open the Vite URL printed in the frontend terminal, usually `http://localhost:5173`.

## Production build

The root `Dockerfile` builds the frontend and backend into a single image. The Express server serves the frontend and API from the same origin.

```bash
docker build \
  --build-arg VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key \
  -t nexus-live .
```

Run the container with the backend environment variables set in your deployment platform, including `MONGO_URI`, `CLERK_PUBLISHABLE_KEY`, `CLERK_SECRET_KEY`, `CLERK_WEBHOOK_SIGNING_SECRET`, and `IMAGEKIT_PRIVATE_KEY`. Set `NODE_ENV=production` and the `PORT` expected by your host. Configure Clerk's production webhook URL as `https://your-domain/api/webhooks/clerk` and set `FRONTEND_URL` to your deployed frontend origin.

## Project structure

```text
.
├── backend/
│   └── src/
│       ├── controllers/   # Authentication and message handlers
│       ├── lib/           # Database, Socket.IO, uploads, and scheduled job
│       ├── middlewares/   # Authentication and media upload middleware
│       ├── models/        # MongoDB user and message models
│       ├── routes/        # API routes
│       └── webhooks/      # Clerk user synchronization
├── frontend/
│   └── src/
│       ├── components/    # Chat, authentication, and theme UI
│       ├── contexts/      # Theme and wallpaper state
│       ├── hooks/         # Conversation and UI hooks
│       ├── lib/           # API client and utilities
│       ├── pages/         # App pages
│       └── store/         # Zustand auth and chat state
└── Dockerfile
```

## Scripts

Run these from the relevant `frontend/` or `backend/` directory.

| Command | Description |
| --- | --- |
| `npm run dev` | Start the frontend dev server or backend with Nodemon |
| `npm run build` | Build the frontend assets or copy backend source into `dist/` |
| `npm start` | Start the backend server |
| `npm run lint` | Run Oxlint on the frontend |

## License

No license has been specified yet.
