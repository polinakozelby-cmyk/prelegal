# prelegal-backend

FastAPI backend for the Prelegal platform. Serves the API under `/api` and the
built frontend as static files.

## Development

```
uv sync
uv run uvicorn prelegal_backend.main:app --reload --port 3000
```

## Tests

```
uv run pytest
```
