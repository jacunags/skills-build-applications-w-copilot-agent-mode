# Octofit Tracker presentation tier

React 19 and Vite presentation tier for Octofit Tracker.

## Configure the API host

In GitHub Codespaces, define `VITE_CODESPACE_NAME` in `octofit-tracker/frontend/.env.local` using the Codespace name. Vite uses it to request the API at `https://<VITE_CODESPACE_NAME>-8000.app.github.dev`.

```dotenv
VITE_CODESPACE_NAME=your-codespace-name
```

The variable is required for Codespaces deployments. If it is unset (or blank), the app safely falls back to `http://localhost:8000` for local development. Restart the Vite server after changing `.env.local`.

The frontend requests collections from `/api/activities/`, `/api/leaderboard/`, `/api/teams/`, `/api/users/`, and `/api/workouts/`. Responses may be a direct array or a paginated object containing `results`.

## Development

Install dependencies with `npm install`, then run `npm run dev` from this directory. Use `npm run build` to build the production bundle.
