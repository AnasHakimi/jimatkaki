from pydantic import BaseModel
from typing import Optional
from datetime import datetime
from uuid import UUID

class PriceReportCreate(BaseModel):
    item_name: str
    price: float
    store_name: str
    category: Optional[str] = "General"
    reported_by: str

class PriceReportResponse(PriceReportCreate):
    id: UUID
    created_at: datetime
    
    class Config:
        from_attributes = True

class PriceFeedItem(PriceReportResponse):
    freshness_status: str

class Hero(BaseModel):
    reported_by: str
    total_reports: int

    class Config:
        from_attributes = True
