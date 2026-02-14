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

app = FastAPI(title="KakiJimat API", version="0.1.0")

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
    allow_origin_regex=r"https://.*\.vercel\.app",  # Allow all Vercel deployments
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
    # Read from Gold Layer (dbt view with freshness status)
    try:
        result = db.execute(text("""
            SELECT 
                id, item_name, category, price, store_name, 
                reported_by, created_at, freshness_status
            FROM price_feed_mart 
            ORDER BY created_at DESC 
            LIMIT 100
        """))
        return result.mappings().all()
    except Exception as e:
        # Fallback to Bronze if Gold view doesn't exist yet
        print(f"Gold layer not available: {e}")
        bronze_result = db.query(sql_models.PriceReport).order_by(sql_models.PriceReport.created_at.desc()).limit(100).all()
        # Mock freshness status as fallback
        return [{"freshness_status": "FRESH", **r.__dict__} for r in bronze_result]

@app.get("/api/leaderboard", response_model=List[models.Hero])
def get_leaderboard(db: Session = Depends(get_db)):
    # FORCE BRONZE (Real-time) for Demo
    # try:
    #     # Try Gold Layer
    #     result = db.execute(text("SELECT * FROM hero_leaderboard"))
    #     return result.mappings().all()
    # except Exception:
    if True:
        # Fallback logic (Bronze Layer Aggregation)
        result = db.query(
            sql_models.PriceReport.reported_by, 
            func.count(sql_models.PriceReport.id).label('total_reports')
        ).group_by(sql_models.PriceReport.reported_by).order_by(text('total_reports DESC')).limit(10).all()
        
        # Convert to dictionary for Pydantic model
        return [{"reported_by": row[0], "total_reports": row[1]} for row in result]

@app.get("/")
def read_root():
    return {"message": "Welcome to KakiJimat API"}

