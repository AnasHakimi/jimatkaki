from sqlalchemy import Column, String, Float, DateTime, Text
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.sql import func
import uuid
from database import Base

class PriceReport(Base):
    __tablename__ = "price_reports"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    item_name = Column(Text, nullable=False)
    category = Column(Text, default="General")
    price = Column(Float, nullable=False)
    store_name = Column(Text, nullable=False)
    reported_by = Column(Text, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
