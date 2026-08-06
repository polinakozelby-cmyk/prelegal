# ---- Frontend build stage ----
FROM node:22-alpine AS frontend-build
WORKDIR /app/frontend
COPY frontend/package.json frontend/package-lock.json ./
RUN npm ci
COPY frontend/ .
RUN npm run build

# ---- Backend stage ----
FROM ghcr.io/astral-sh/uv:python3.12-bookworm-slim
WORKDIR /app

COPY backend/pyproject.toml backend/uv.lock backend/README.md ./
COPY backend/src ./src
RUN uv sync --frozen --no-dev

COPY --from=frontend-build /app/frontend/out ./static

EXPOSE 3000
CMD ["uv", "run", "uvicorn", "prelegal_backend.main:app", "--host", "0.0.0.0", "--port", "3000"]
