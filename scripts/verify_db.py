import os
from sqlalchemy import create_engine, text
from dotenv import load_dotenv

# Load env from backend/.env
load_dotenv(os.path.join(os.path.dirname(__file__), '../backend/.env'))

db_url = os.getenv("DATABASE_URL")
if not db_url or "YOUR-PASSWORD" in db_url:
    print("❌ Error: Please update backend/.env with your actual DATABASE_URL first.")
    exit(1)

try:
    engine = create_engine(db_url)
    with engine.connect() as conn:
        print("✅ Successfully connected to the database!")
        
        # Check for price_reports table
        result = conn.execute(text("SELECT to_regclass('public.price_reports');"))
        if result.scalar():
            print("✅ Table 'price_reports' exists.")
            
            # Check row count
            count = conn.execute(text("SELECT COUNT(*) FROM price_reports")).scalar()
            print(f"📊 Current row count in 'price_reports': {count}")
        else:
            print("❌ Table 'price_reports' does NOT exist. Please run schema.sql!")

except Exception as e:
    print(f"❌ Connection failed: {e}")
