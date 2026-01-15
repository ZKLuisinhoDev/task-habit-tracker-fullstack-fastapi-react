from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .database import engine, Base
from .routers import auth, tasks

# Create DB tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Task & Habit Tracker API",
    description="Backend for Task Tracker Application demonstrating Junior Full Stack skills.",
    version="1.0.0"
)

# CORS (Cross-Origin Resource Sharing)
origins = [
    "http://localhost:5173", # Vite default
    "http://localhost:5174",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(tasks.router)

@app.get("/")
def read_root():
    return {"message": "Welcome to the Task Tracker API"}
