import os
from contextlib import asynccontextmanager
from pathlib import Path

from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles

from . import db
from .auth import router as auth_router
from .nda_chat import router as nda_chat_router

load_dotenv()


@asynccontextmanager
async def lifespan(app: FastAPI):
    db.init_db()
    yield


app = FastAPI(lifespan=lifespan)
app.include_router(auth_router)
app.include_router(nda_chat_router)


@app.get("/api/health")
def health() -> dict[str, str]:
    return {"status": "ok"}


static_dir = Path(os.environ.get("STATIC_DIR", "static"))
if static_dir.exists():
    app.mount("/", StaticFiles(directory=static_dir, html=True), name="static")
