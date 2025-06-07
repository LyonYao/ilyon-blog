#!/bin/bash
echo "Setting up local environment for blog API..."

# Create virtual environment if it doesn't exist
if [ ! -d "venv" ]; then
    echo "Creating virtual environment..."
    python3 -m venv venv
fi

# Activate virtual environment
echo "Activating virtual environment..."
source venv/bin/activate

# Install dependencies
echo "Installing dependencies..."
pip install -r requirements_local.txt

# Create a simple SQLite-only config
echo "Creating SQLite-only config..."
cat > config.py << EOF
import os

class Config:
    SECRET_KEY = 'dev-secret-key'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    JWT_SECRET_KEY = 'jwt-secret-key'
    SQLALCHEMY_DATABASE_URI = 'sqlite:///blog.db'

def get_config():
    return Config
EOF

# Initialize database
echo "Initializing database with sample data..."
python init_db_simple.py

# Run the Flask application directly
echo "Starting Flask application..."
python app_local.py