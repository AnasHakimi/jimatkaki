from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from sqlalchemy import text, func
from typing import List

from models import PriceReportResponse, PriceReportCreate, PriceFeedItem, Hero
import models
import sql_models
from database import engine, get_db

# Create tables (Bronze only, dbt handles the rest)
sql_models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="JimatKaki API", version="0.1.0")

# CORS Middleware
origins = [
    "http://localhost:5173",
    "http://localhost:5174",
    "http://localhost:5175",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/api/report", response_model=models.PriceReportResponse)
def create_report(report: models.PriceReportCreate, db: Session = Depends(get_db)):
    db_report = sql_models.PriceReport(**report.model_dump())
    db.add(db_report)
    db.commit()
    db.refresh(db_report)
    return db_report

@app.get("/api/feed", response_model=List[models.PriceFeedItem])
def get_feed(db: Session = Depends(get_db)):
    try:
        # Try Gold Layer
        result = db.execute(text("SELECT * FROM price_feed_mart LIMIT 100"))
        return result.mappings().all()
    except Exception:
        # Fallback to Bronze
        bronze_result = db.query(sql_models.PriceReport).order_by(sql_models.PriceReport.created_at.desc()).limit(100).all()
        # Mock freshness status
        return [{**r.__dict__, "freshness_status": "FRESH"} for r in bronze_result]

@app.get("/api/leaderboard", response_model=List[models.Hero])
def get_leaderboard(db: Session = Depends(get_db)):
    try:
        # Try Gold Layer
        result = db.execute(text("SELECT * FROM hero_leaderboard"))
        return result.mappings().all()
    except Exception:
         # Fallback logic
        result = db.query(
            sql_models.PriceReport.reported_by, 
            func.count(sql_models.PriceReport.id).label('total_reports')
        ).group_by(sql_models.PriceReport.reported_by).order_by(text('total_reports DESC')).limit(5).all()
        return result

@app.get("/")
def read_root():
    return {"message": "Welcome to JimatKaki API"}

