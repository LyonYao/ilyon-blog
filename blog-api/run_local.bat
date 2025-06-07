@echo off
echo Setting up local environment for blog API...

REM Create virtual environment if it doesn't exist
if not exist venv (
    echo Creating virtual environment...
    python -m venv venv
)

REM Activate virtual environment
echo Activating virtual environment...
call venv\Scripts\activate

REM Install dependencies
echo Installing dependencies...
pip install -r requirements_local.txt

REM Create a simple SQLite-only config
echo Creating SQLite-only config...
echo import os > config.py
echo. >> config.py
echo class Config: >> config.py
echo     SECRET_KEY = 'dev-secret-key' >> config.py
echo     SQLALCHEMY_TRACK_MODIFICATIONS = False >> config.py
echo     JWT_SECRET_KEY = 'jwt-secret-key' >> config.py
echo     SQLALCHEMY_DATABASE_URI = 'sqlite:///blog.db' >> config.py
echo. >> config.py
echo def get_config(): >> config.py
echo     return Config >> config.py

REM Initialize database
echo Initializing database with sample data...
python init_db_simple.py

REM Run the Flask application directly
echo Starting Flask application...
python app_local.py

pause