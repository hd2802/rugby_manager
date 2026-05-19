from fastapi import FastAPI
from contextlib import asynccontextmanager
from app.database.connection import init_models
from fastapi.middleware.cors import CORSMiddleware

from app.routes.league_router import league_router

@asynccontextmanager
async def lifespan(app: FastAPI):
    await init_models()
    yield


app = FastAPI(lifespan=lifespan)

app.include_router(league_router, prefix="/api", tags=["Leagues"])

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
