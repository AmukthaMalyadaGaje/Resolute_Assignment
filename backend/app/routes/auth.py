from fastapi import Response
from fastapi import APIRouter, HTTPException, Response
from app.database import db
from app.auth import get_password_hash, create_access_token, verify_password
from app.schemas import Token, UserCreate, UserLogin

auth_router = APIRouter()

COOKIE_NAME = "access_token"


@auth_router.post("/signup", response_model=Token)
async def signup(user: UserCreate, response: Response):
    user_exist = await db["users"].find_one({"username": user.username})
    if user_exist:
        raise HTTPException(
            status_code=400, detail="Username already registered")

    hashed_password = get_password_hash(user.password)
    user_data = {"username": user.username, "password": hashed_password}
    await db["users"].insert_one(user_data)
    access_token = create_access_token({"sub": user.username})

    # Set the access token in an HTTP-only, secure cookie
    response.set_cookie(
        key=COOKIE_NAME,
        value=access_token,
        httponly=True,
        secure=True,  # Set to True if using HTTPS
        samesite="Lax",
    )
    return {"access_token": access_token, "token_type": "bearer"}


@auth_router.post("/login", response_model=Token)
async def login(user: UserLogin, response: Response):
    db_user = await db["users"].find_one({"username": user.username})
    if not db_user or not verify_password(user.password, db_user["password"]):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    access_token = create_access_token({"sub": user.username})
    print("access_token", access_token)

    # Set the access token in the cookies
    response.set_cookie(
        key="access_token",
        value=access_token,
        httponly=True,
        secure=True,
        samesite="Lax",
    )
    return {"access_token": access_token, "token_type": "bearer"}
