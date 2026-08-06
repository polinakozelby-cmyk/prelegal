import sqlite3

import bcrypt
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, EmailStr

from . import db

router = APIRouter(prefix="/api/auth", tags=["auth"])

MAX_PASSWORD_BYTES = 72


class SignupRequest(BaseModel):
    email: EmailStr
    password: str


class SigninRequest(BaseModel):
    email: EmailStr
    password: str


class AuthResponse(BaseModel):
    email: str


def _check_password_length(password: str) -> None:
    if len(password.encode()) > MAX_PASSWORD_BYTES:
        raise HTTPException(
            status_code=422, detail=f"Password must be {MAX_PASSWORD_BYTES} bytes or fewer"
        )


@router.post("/signup", response_model=AuthResponse, status_code=201)
def signup(payload: SignupRequest) -> AuthResponse:
    _check_password_length(payload.password)
    email = payload.email.lower()
    password_hash = bcrypt.hashpw(payload.password.encode(), bcrypt.gensalt()).decode()

    conn = db.get_connection()
    try:
        conn.execute(
            "INSERT INTO users (email, password_hash) VALUES (?, ?)",
            (email, password_hash),
        )
        conn.commit()
    except sqlite3.IntegrityError:
        raise HTTPException(status_code=409, detail="Email already registered")
    finally:
        conn.close()

    return AuthResponse(email=email)


@router.post("/signin", response_model=AuthResponse)
def signin(payload: SigninRequest) -> AuthResponse:
    _check_password_length(payload.password)
    email = payload.email.lower()

    conn = db.get_connection()
    row = conn.execute(
        "SELECT password_hash FROM users WHERE email = ?", (email,)
    ).fetchone()
    conn.close()

    if row is None or not bcrypt.checkpw(payload.password.encode(), row[0].encode()):
        raise HTTPException(status_code=401, detail="Invalid email or password")

    return AuthResponse(email=email)
