import os
from sqlalchemy import create_engine, text
from dotenv import load_dotenv
import uuid

# Load env from backend/.env
load_dotenv(os.path.join(os.path.dirname(__file__), '../backend/.env'))

db_url = os.getenv("DATABASE_URL")

try:
    engine = create_engine(db_url)
    with engine.connect() as conn:
        print("✅ Connected. Attempting to insert a test record...")
        
        test_id = uuid.uuid4()
        stmt = text("""
            INSERT INTO price_reports (id, item_name, price, store_name, reported_by, category)
            VALUES (:id, 'Test Item (Verification)', 9.99, 'Test Store', 'verifier-bot', 'General')
        """)
        
        conn.execute(stmt, {"id": test_id})
        conn.commit()
        print(f"✅ Successfully inserted test record with ID: {test_id}")
        
        # Verify read back
        result = conn.execute(text("SELECT item_name FROM price_reports WHERE id = :id"), {"id": test_id})
        row = result.fetchone()
        if row and row[0] == 'Test Item (Verification)':
             print("✅ Verified read-back of inserted record.")
        else:
             print("❌ Insert appeared successful but could not read back record!")

except Exception as e:
    print(f"❌ Write test failed: {e}")
