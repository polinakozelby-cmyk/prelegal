# prelegal
Platform for drafting common legal agreements

**Status:** 🚧 In progress — expected completion around 2026-08-13.

## Running the app

The whole app (frontend + backend + database) runs in a single Docker
container.

```
# Mac
scripts/start-mac.sh
scripts/stop-mac.sh

# Linux
scripts/start-linux.sh
scripts/stop-linux.sh

# Windows
scripts/start-windows.ps1
scripts/stop-windows.ps1
```

Once started, the app is available at http://localhost:3000. The SQLite
database is recreated from scratch every time the container starts.

## Project structure

- `frontend/` — Next.js app, statically exported and served by the backend
- `backend/` — FastAPI app (uv project), serves the API and the static frontend
- `templates/` — legal agreement templates
- `scripts/` — start/stop scripts for the Docker container
