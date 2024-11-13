
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes.items import items_router as items
from app.routes.auth import auth_router as auth

app = FastAPI()

# Set up CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(auth)
app.include_router(items)
