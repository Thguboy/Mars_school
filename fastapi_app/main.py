from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .database import engine, Base
from .routers import api, pages
from . import auth

Base.metadata.create_all(bind=engine)

app = FastAPI(title="Mars Space API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # Update for production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router, prefix="/api", tags=["auth"])
app.include_router(api.router, prefix="/api", tags=["api"])
app.include_router(pages.router, prefix="/api/pages", tags=["pages"])

@app.get("/")
def read_root():
    return {"message": "Welcome to Mars Space API"}
