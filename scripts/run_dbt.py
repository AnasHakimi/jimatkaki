import os
import subprocess
import sys
from urllib.parse import urlparse
from dotenv import load_dotenv

# Load env from backend/.env
env_path = os.path.join(os.path.dirname(__file__), '../backend/.env')
load_dotenv(env_path)

db_url = os.getenv("DATABASE_URL")
if not db_url:
    print("❌ Error: DATABASE_URL not found in backend/.env")
    exit(1)

# Parse DATABASE_URL
# Format: postgresql://user:password@host:port/dbname
try:
    parsed = urlparse(db_url)
    # Decode URL-encoded components (e.g. %40 -> @)
    from urllib.parse import unquote
    username = unquote(parsed.username) if parsed.username else None
    password = unquote(parsed.password) if parsed.password else None
    hostname = parsed.hostname
    port = parsed.port or 5432
    dbname = parsed.path.lstrip('/')
    
    # Force IPv4 resolution to avoid Supabase IPv6 timeouts
    try:
        import socket
        ipv4_host = socket.gethostbyname(hostname)
        print(f"ℹ️ Resolved {hostname} to IPv4: {ipv4_host}")
        hostname = ipv4_host
    except Exception as e:
        print(f"⚠️ Could not resolve to IPv4, keeping original host: {e}")

    # Set env vars for dbt profiles.yml
    os.environ['DB_USER'] = username
    os.environ['DB_PASSWORD'] = password
    os.environ['DB_HOST'] = hostname
    os.environ['DB_PORT'] = str(port)
    os.environ['DB_NAME'] = dbname
    
    print(f"✅ Loaded config for DB: {dbname}@{hostname}")

except Exception as e:
    print(f"❌ Failed to parse DATABASE_URL: {e}")
    exit(1)

# Run dbt command
dbt_cmd = sys.argv[1:]
if not dbt_cmd:
    print("Usage: python run_dbt.py [command] (e.g., deps, run, test)")
    exit(1)

# Path to dbt executable 
# Assuming script is run with the venv python, dbt should be in scripts folder or path
# We'll use "dbt" and rely on shell path or try to find it relative to python exec
python_exec_dir = os.path.dirname(sys.executable)
dbt_exec = os.path.join(python_exec_dir, 'dbt')

# Check if dbt.exe exists (Windows)
if os.path.exists(dbt_exec + '.exe'):
    dbt_exec += '.exe'
elif not os.path.exists(dbt_exec):
    # Fallback to just "dbt" in path
    dbt_exec = "dbt"

cmd = [dbt_exec] + dbt_cmd

print(f"🚀 Running: {' '.join(cmd)}")
print("-" * 40)

# Change cwd to dbt_project
project_dir = os.path.join(os.path.dirname(__file__), '../dbt_project')

try:
    subprocess.run(cmd, cwd=project_dir, check=True, env=os.environ)
    print("-" * 40)
    print("✅ dbt command completed successfully!")
except subprocess.CalledProcessError as e:
    print("-" * 40)
    print(f"❌ dbt command failed with exit code {e.returncode}")
    exit(e.returncode)
except FileNotFoundError:
    print(f"❌ dbt executable not found. Ensure dbt-core is installed.")
    exit(1)
