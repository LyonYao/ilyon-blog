@echo off
echo Initializing SQLite database...

REM Activate virtual environment
call venv\Scripts\activate

REM Run the simplified database initialization script
python init_db_simple.py

echo Database initialization complete!
pause