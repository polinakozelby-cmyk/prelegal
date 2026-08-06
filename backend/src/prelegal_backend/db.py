import os
import sqlite3
from pathlib import Path


def get_db_path() -> Path:
    return Path(os.environ.get("DATABASE_PATH", "prelegal.db"))


def get_connection() -> sqlite3.Connection:
    return sqlite3.connect(get_db_path())


def init_db() -> None:
    """Recreate the SQLite database from scratch."""
    db_path = get_db_path()
    if db_path.exists():
        db_path.unlink()

    with get_connection() as conn:
        conn.execute(
            """
            CREATE TABLE users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                email TEXT NOT NULL UNIQUE,
                password_hash TEXT NOT NULL,
                created_at TEXT NOT NULL DEFAULT (datetime('now'))
            )
            """
        )
        conn.commit()
